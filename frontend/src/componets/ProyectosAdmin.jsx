import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form,Image,Container} from 'react-bootstrap';
import { FaEdit,FaTrash,FaArrowRight,FaPlus } from 'react-icons/fa';

/////////////////////////////////////////////////
import Cookies from 'js-cookie';//////////leer cookies
import { encryptionKey,decryptValue } from "./hashes.jsx";
import Stop from './Stop.jsx'/////////////modulo de aviso -->Alto

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png' ///imagen para mostrar si un proyecto no tiene una imagen principal
import {  URIServicios,URIProyectos,URIPRXIMG,URIImagenPost,URIImagenGet,URIDeleteImagen,URIViewImagen} from "./Urls.jsx";
      

function ProyectosAdmin(params) {

    
    //////////////////////////////////////////////////////////

    let [Servicios,setServicios] = useState([]);                         //variable para los servicios principales
    const [ShowService, setShowService]= useState(1);                    //variable para saber el id de la pestaña de servicio esta activa 
    const [Proyectos,setProyectos]= useState([]);                        //variable para guardar los proyectos segun el servicio seleccionado
    const [btnSelected, setBtnSelected] = useState(1);                   //variable...
    ////////////////////////////////////////////////

    ///variables para agregar/editar proyectos
    const [ProyId,setProyId]= useState(1);                               //variable para el id del proyecto
    const [ProyectoName,setProyectoName] = useState('');                 //variable para el nombre del proyecto 
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');//variable para el servicio seleccionado 
    const [ProyectoDescripcion, setProyectoDescripcion ]= useState('');  //variable para la descripcion 
    const [ProyectoIMG,setProyectoIMG] = useState(null);                 //variable para la imagen principal
    const [previewURL, setPreviewURL] = useState('');                    //preview de la img_principal

    //proyecto has image
    const [lsImgP, setlsImgP] = useState([]);                            //recupera la lista de imagenes relacionadas a un proyecto
    const [ProyectoLsIMG,setProyectoLsIMG] = useState([]);               //variable para las otras imgs
    const [previewURLs, setPreviewURLs] = useState([]);                  //preview de las imgs complementarias


    //otras variables
    const [estado,setEstado]= useState(false);                           //si se agrega o edita un proyecto el estado cambia a true       
    const [selectedImage, setSelectedImage] = useState(null);            //iamgen que se le dio click
    
    //Modal de Imagenes
    const [showModal, setShowModal] = useState(false);
    
    //Modal para Agregar Proyectos
    const [show, setShow] = useState(false); //variable para mostrar/esconder la modal de agregar
    const handleShow = () => setShow(true);  //muestra la modal de agregar proyecto

     //Modal para editar proyectos
     const [PP,setPP] = useState([]);   //Proyecto Seleccionado a editar
     const [ImgLsPP,setImgLsPP] = useState([]);
     const [EditImag,setEditImag] = useState(false);
     const [EditLSImag,setEditLsImag] = useState(false);
     const [ShowEdit, setShowEdit] = useState(false);
     const [Ep,setEp] = useState(false)
     const [listaBorrar, setlistaBorrar]=useState([])

    /////////////////////////////////
    //cancelacion de Modals
    const handleCancel = () => {
        setProyId(1)
        setProyectoName('')
        setServicioSeleccionado('')
        setProyectoDescripcion('')
        setProyectoIMG(null)
        setPreviewURL('')
        setlsImgP([])
        setProyectoLsIMG([])
        setPreviewURLs([])
        setEstado(false)
        setSelectedImage(null)
        setShow(false)
        setShowEdit(false)
        setEditImag(false)
        setEditLsImag(false)
        setlistaBorrar([])
    };

    
    const openModal = (image) => {
        setSelectedImage(image);
        setShowModal(true);
      };
    const closeModal = () => {
        setShowModal(false);
      };

    const AddImagenesxProyecto = async (ProyectoId) =>{
        if (ProyectoLsIMG.length>0) {
            ProyectoLsIMG.map(
                imag =>{ 
                    const formdatas = new FormData()
                    formdatas.append('image', imag)
                    fetch(URIImagenPost, {
                    method: 'POST',
                    body: formdatas
                    })
                    .then(res => res.json())
                    .then(data => {
                        axios.post(URIPRXIMG,{"idproyecto":ProyectoId,"idimagen":data.id})
                    })
                    .catch(err => {
                    console.error(err)
                    
                });
                return null;
                }
            )
        }
    }

    ///////////////////
    
    //Guardar proyecto Nuevo
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            var idIMGPrincipal;
            var servis = null;
            //comprobamos a que categoria de servicio pertenece
            for (let index = 0; index < Servicios.length; index++) {
                if (servicioSeleccionado===Servicios[index].nombre_servicio) {servis = Servicios[index].id;}
            }
            //Si hay Imagen en ProyectoIMG se salta esta comprobacion
            if(!ProyectoIMG){alert('cargue una imagen en principal');return}

            //guarda la img_principal y recupera el id en la variable idIMGPrincipal
            const formdata = new FormData()
            formdata.append('image', ProyectoIMG)
            await fetch(URIImagenPost, {method: 'POST',body: formdata})
            .then(res => res.json()).then(data => {
            idIMGPrincipal = data.id;})
            .catch(err => {console.error(err)})
            
            ///con los valores optenidos de los campos del modal y el id de  la imagen principal se crea el json 
            ///para guardar en proyectos.
            const proyectoAdd = {
                "nombreProyecto":ProyectoName,
                "categoria_servicio":servis,
                "descripcion_proyecto":ProyectoDescripcion,
                "img_principal":idIMGPrincipal
            }
            const response = await axios.post(URIProyectos,proyectoAdd);
            //y finalmente guardamos las dema imagenes relacionadas con este proyecto
            AddImagenesxProyecto(response.data.id);
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
        }
        setEstado(true);    //enviamos que el estado cambio para que recargue los proyectos
        ///reiniciamos todos los campos
        handleCancel();
    };
    
    ////////////////////////////
   

    ///proyecto a editar
    useEffect(()=>{
        const resp = async () =>{
            try {
                //llamamos todos los proyectos
                const p = await axios.get(URIProyectos);
                //comprobamos que el proyecto a editar si exista
                const esta = p.data.filter(proye => proye.id === ProyId)
                const SS = async () =>{
                    if (esta.length!==0) {
                        try {
                            const response = await axios.get(URIProyectos+ProyId);
                            setPP(response.data);
                            const response1 = await axios.get(URIPRXIMG);
                            const data = response1.data.filter(proye => proye.idproyecto === ProyId);
                            setImgLsPP(data);
                            
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } 
                SS();
                setPreviewURLs(ImgLsPP);
                        
            } catch (error) {
                console.log(error);
            }
        }
        resp();
        Servicios.map(servicio => {
            if(servicio.id===PP.categoria_servicio){setServicioSeleccionado(servicio.nombre_servicio)}
            return null
        }
        )
        
        setEp(false)
    },[Ep,ProyId,PP.categoria_servicio,Servicios,EditLSImag])

    const openModalEdit = (params) => {
        
        //setProyectoDescripcion(PP.descripcion_proyecto);
        setShowEdit(true);
        setProyId(params);
        setEp(true);
        //setPreviewURLs(lsImgP)
    }
    //Guardar cambios de proyectos

    const GuardarEdit = (lss) => {
        var IdEditar = PP.id;
        var NameEditar = PP.nombreProyecto;
        var DescripEditar = PP.descripcion_proyecto;
        var idIMGPrincipal=PP.img_principal;

        //validar si cambia el nombre
        if (ProyectoName!=='') {
            if (PP.nombreProyecto !== ProyectoName) {
                NameEditar = ProyectoName
            }
        }
        //validar si cambia la descripcion
        if (ProyectoDescripcion!=='') {
            if (PP.descripcion_proyecto !==ProyectoDescripcion) {
                DescripEditar=ProyectoDescripcion
            }            
        }

        const Guardar = async() =>{
            try {
                //validar si hay cambio de imagen
                if (EditImag){ 
                    if(!ProyectoIMG){alert('cargue una imagen en principal');return}
                    //guarda la img_principal y recupera el id en la variable idIMGPrincipal
                    const formdata = new FormData()
                    formdata.append('image', ProyectoIMG)
                    await fetch(URIImagenPost, {method: 'POST',body: formdata})
                    .then(res => res.json()).then(data => {
                        idIMGPrincipal = data.id;})
                    .catch(err => {console.error(err)})
                }
                const DatosEditar = {
                    "nombreProyecto":NameEditar,
                    "descripcion_proyecto":DescripEditar,
                    "img_principal":idIMGPrincipal
                }
                await axios.put(URIProyectos+IdEditar,DatosEditar);
                setEstado(true);
            } catch (error) {
                console.log(error);
            }
        }
        Guardar();
        //validar si hay cambio en la lista de imagenes
        if (EditLSImag) {
            console.log('vamos a editar');
            //editemos
            console.log('lista que viene del modal');
            console.log(lss);
            const lsimg = async () =>{
            try {
                const response = await axios.get(URIPRXIMG);
                const lis = response.data.filter(pr => pr.idproyecto===IdEditar);
               
                //Borrar las imagenes que quito de la lista
                listaBorrar.map(
                    borrar=>{
                        const BB = async() =>{
                            try {
                                if (borrar.id) {
                                    await axios.delete(URIPRXIMG+borrar.id)
                                    await axios.delete(URIDeleteImagen+borrar.idimagen)
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        BB();
                        return null;
                    }
                )
                //agregar nuevas imagenes de la lista
                AddImagenesxProyecto(IdEditar);
            } catch (error) {
                
            }
        }
        lsimg();
        }
        
        //reinicia todos los parametros
        handleCancel();
    }

    const quitarElemento = (objeto) =>{
        let lista = listaBorrar;
        lista.push(objeto);
        setlistaBorrar(lista);
        const nuevoArreglo = previewURLs.filter((elemento) => elemento !== objeto);
        setPreviewURLs(nuevoArreglo);
    }
    
    /////////////////////////////////////////////////////////////////////////////
    //recuperar la lista de servicios principales////////////////////////////////
    useEffect(() => {                           /////////////////////////////////
        const service = async () => {
            try {
                const response = await axios.get(URIServicios);
                const serviciosData = response.data.filter(
                    servicio => servicio.servicio_padre === null);
                setServicios(serviciosData);
                
            } catch (err) {
                console.log(err);
            }
        }
        service();
    }, []);                                     /////////////////////////////////
    //recuperar los proyectos segun la pestaña de servicio seleccionado//////////
    useEffect(() => {                           /////////////////////////////////
        const Projew = async () => {
            try {
                await fetch(URIImagenGet)
                const response = await axios.get(URIProyectos);
                const ProyectoData = response.data.filter(
                    proye => proye.categoria_servicio === ShowService);
                
                setProyectos(ProyectoData);

               const response1 = await axios.get(URIPRXIMG);
                setlsImgP (response1.data);
            } catch (error) {
                console.log(error);
                
            }
        }
    
        Projew();
        setEstado(false);
    }, [estado,ShowService]);                   /////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////
   
    /////////////////////////////////////////////
    
   
    
    ///es para ver la imagen seleccionada
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProyectoIMG(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
        setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };
    ///es para ver la lista de imagenenes seleccionadas en complementarias
    const handleFilesChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setProyectoLsIMG(selectedFiles);
    
        // Crear una URL de objeto de datos para cada imagen seleccionada
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewURLs(urls);
    };
    //editar lista de imagenes a cambiar
    const handleFilesChanges = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setProyectoLsIMG(selectedFiles);
    
        // Crear una URL de objeto de datos para cada imagen seleccionada
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));

        const suma = previewURLs.concat(urls);
        setPreviewURLs(suma);
    };
    
    /* eslint-disable no-restricted-globals */
    const deletedProyecto = (id) => {
        const confirmacion = confirm("¿Estás seguro que deseas borrar este proyecto?");
        const BorrarImgs = async () =>{
            try {
                const response = await axios.get(URIPRXIMG);
                const imagenesBorrar = response.data.filter(Borra => Borra.idproyecto===id);
                
                if (imagenesBorrar.length>0) {
                    imagenesBorrar.map(borrar=>{
                        const F = async (x) =>{
                            try {
                                await axios.delete(URIPRXIMG+x);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                        F(borrar.id);
                        return  null;
                })    
                }
                const P = async () => {try {await axios.delete(URIProyectos+id).then(resp => {setEstado(true)})} catch (error) {console.log(error);}}
                P();
            } catch (error) {
                console.log(error);
            }
        }
        if (confirmacion) {
            BorrarImgs();
        }
    }; 
    
    function Seccion(params) { 
        setShowService(params);
        setBtnSelected(params);
    }



   ///comprobacion de ruta
    if(!Cookies.get('session')){return Stop(false,'Administrador')}else{
        if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true,'Administrador')}
    }
   
    return (
        <Container>
            <div className='p-2'><span className='h5'>Nuestros Proyectos</span></div>
            <div>
                <div className="row bg-inCa rounded-top-4">
                    {Servicios.map((serv,index) => (
                    <div key={'Ser'+serv.nombre_servicio+'/'+index} id={serv.nombre_servicio+'/'+serv.id} className='col-sm d-flex justify-content-center'>
                        <div className={`${btnSelected === serv.id ? 'border-bottom border-primary border-4': ''} px-3 py-1 d-flex align-items-center`} >
                        <button className='btn text-center btn-outline-light text-dark' onClick={()=>{Seccion(serv.id)}}><span>{serv.nombre_servicio}</span></button>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className='mb-3 bg-inCa rounded-bottom-4' id='tb'>
                { Proyectos.map((proye,index)=>(
                    <div key={'PRE'+'/'+index} className='pt-3 shadow-lg p-3 my-2 rounded-4' >
                        <div className='row'>
                            <div className='col-sm-10'>
                                <div className='row m-2'>
                                    <div className='col-sm-3'><span>ID: {proye.id}</span></div>
                                    <div className='col-sm-9' ><span title='Nombre Proyecto'>{proye.nombreProyecto}</span></div>
                                </div>
                            </div>

                            <div className='col-sm-2'>
                                <div className='d-flex justify-content-center m-2'>
                                    <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5' onClick={() => openModalEdit(proye.id)}><FaEdit size={12}/></button></div>
                                    <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5' onClick={() => deletedProyecto(proye.id)}><FaTrash size={12}/></button></div>
                                </div>
                            </div>
                        </div>
                        <div className='row py-2'>
                            <div className='col-sm-3 d-flex align-items-center bg-light rounded-3' >
                                <img src={proye.img_principal ? URIViewImagen+proye.img_principal+'inca.jpg' : IMGPrueba} 
                                     alt="casa" 
                                     className='w-100 rounded-3' 
                                     title={'Imagen Principal: '+proye.nombreProyecto}
                                     onClick={() => openModal(proye.img_principal ? URIViewImagen+proye.img_principal+'inca.jpg' : IMGPrueba)}/>
                            </div>
                            <div className='col-sm-9'>
                                <div id={'desc'+proye.is}><p>{proye.descripcion_proyecto}</p></div>
                                <div className='d-flex overflow-x-auto max-width-100'>
                                    {lsImgP.map((imagep,index) => (imagep.idproyecto===proye.id ?
                                        (<div key={'IP/'+imagep.idproyecto+'/IM/'+imagep.idimagen+'/index/'+index} className='px-2 m-2'><img  
                                        src={URIViewImagen+imagep.idimagen+'inca.jpg'} 
                                        alt='img' 
                                        className='rounded-1' 
                                        style={{maxWidth:100,maxHeight:100}}
                                        onClick={() => openModal(URIViewImagen+imagep.idimagen+'inca.jpg')}
                                  /></div>):(<></>)
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/**Boton flotante para agregar proyectos*/}
            <Button
                title='Agregar Proyecto'
                className='rounded-5 p-2'
                variant="success"
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                onClick={handleShow}>
                    <FaPlus size={24}/>
            </Button>
            {/**Modal para agregar proyectos*/}
            <Modal show={show} onHide={handleCancel} 
                backdrop="static"
                keyboard={false}
                >
                <Modal.Header closeButton>
                    <Modal.Title>Agregar un nuevo proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="ProyectoName">
                            <Form.Label>Nombre *</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombre" 
                            onChange={(e)=>{setProyectoName(e.target.value)}}
                            value={ProyectoName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSelect">
                            <Form.Label>Servicio *</Form.Label>
                            <Form.Select onChange={(e) => {setServicioSeleccionado(e.target.value)}} value={servicioSeleccionado}>
                            <option value="">Seleccione...</option>
                            {Servicios.map((serv,index) => (
                            <option key={'S/'+serv.nombre_servicio+'/'+index}>{serv.nombre_servicio}</option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripcion *</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                            placeholder="Ingrese la descripcion del proyecto" value={ProyectoDescripcion} 
                            onChange={(e) => setProyectoDescripcion(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicFile">
                            <Form.Label>Imagen/Foto Principal *</Form.Label>
                            <Form.Control type="file"  accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        </Form.Group>
                        <div className='mb-2 d-flex justify-content-center'>{previewURL && <Image src={previewURL} thumbnail style={{width:300}}/>}</div>

                        <Form.Group className="mb-3" controlId="formBasicFile">
                          <Form.Label>Imagenes/Fotos Complementarias</Form.Label>
                          <Form.Control type="file" multiple  accept=".jpg, .jpeg, .png" onChange={handleFilesChange} />
                        </Form.Group>
                        <div className='mb-4 d-flex flex-wrap'>
                        {previewURLs.map((url, index) => (
                          <Image key={index} src={url} thumbnail style={{maxWidth:100,maxHeight:100}} className='m-1' />
                        ))}</div>
                        
                        <div className='w-50 m-auto d-flex justify-content-around '>
                            <Button variant="success" type="submit">
                              Guardar
                            </Button>
                            <Button variant="danger" type="button" onClick={handleCancel}>
                              Cancelar
                            </Button>
                        </div>
                        
                    </Form>
                </Modal.Body>
            </Modal>
            {/**Modal para ver Imagenes "ampliadas" */}
            <Modal show={showModal} onHide={closeModal} dialogClassName="modal-dialog-centered" centered>
              <Modal.Body>
                {selectedImage && <img src={selectedImage} alt="Imagen seleccionada" style={{ width: '100%' }} className='rounded-3 mb-2 mt-1'/>}
                <div className='d-flex justify-content-center'><Button variant="secondary" onClick={closeModal}>
                  Cerrar
                </Button></div>
              </Modal.Body>
            </Modal> 
            {/**Modal para editar Proyectos*/}
            <Modal show={ShowEdit} onHide={handleCancel} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title >Editar Proyecto <FaArrowRight size={18}/> ( {PP.id} )</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mt-3">
                        {/**Editar Nombre: si cambia el nuevo valor estara en la varable ProyectoName*/}
                        <Form.Floating className="mb-3">
                          <Form.Control
                            type="text"
                            id="text"
                            placeholder="nombre"
                            name="proyectoname"
                            value={ProyectoName==='' ? PP.nombreProyecto : ProyectoName}
                            onChange={(e) => {setProyectoName(e.target.value)}}
                          />
                          <label htmlFor="proyectoname">Nombre</label>
                        </Form.Floating>
                        {/**editar servicio: este no cambia*/}
                        <Form.Floating className="mb-3">
                          <Form.Control
                            type="text"
                            id="text"
                            placeholder="Servicio"
                            name="proyectoservice"
                            value={servicioSeleccionado}
                            disabled
                          />
                          <label htmlFor="proyectoservice">Servicio</label>
                        </Form.Floating>
                        {/**editar descripcion si cambia se almacenara en ProyectoDescripcion*/}
                        <Form.Floating className="mb-3">
                          <Form.Control
                            as="textarea"
                            id="textarea"
                            placeholder="Descripcion"
                            name="proyectoDescripcion"
                            value={ProyectoDescripcion===''? PP.descripcion_proyecto:ProyectoDescripcion}
                            rows={5}
                            onChange={(e) => {setProyectoDescripcion(e.target.value)}}
                          />
                          <label htmlFor="proyectoDescripcion">Descripcion</label>
                        </Form.Floating>
                        {/**ver imagen principal*/}
                        <hr />
                        <Form.Floating className="mb-3">
                          <div className='mb-2 d-flex justify-content-center pt-5'>
                            {PP.img_principal ? (<img src={URIViewImagen+PP.img_principal+'inca.jpg'} style={{width:100}} alt=''/>):(<>No Image</>)}
                          </div>
                          <label htmlFor="proyectoImg">Imagen/Foto Principal</label>
                        </Form.Floating>
                        {/**opcion para cambiar la imagen principal, si esta activo de mostrara un el input file*/}
                        <div className='form-checked'>
                            <input type="checkbox" className='form-check-input mx-2' 
                                id='check' name='changeImage' 
                                value={EditImag}
                                onChange={(e) => {setEditImag(e.target.checked)}}/>
                            <label className='form-check-label'>Cambiar Imagen principal</label>
                        </div>
                        {EditImag && (
                            <><Form.Group className="my-2" controlId="formBasicFile" >
                                <Form.Label>Nueva Imagen/Foto Principal</Form.Label>
                                <Form.Control type="file"  accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                            </Form.Group>
                            <div className='mb-2 d-flex justify-content-center'>{previewURL && <Image src={previewURL} thumbnail style={{width:300}}/>}</div>
                            </>
                        )}
                        {/**ver la lista de imagenes asociadas */}
                        <hr />
                        <div className="mb-5">
                            <label className='my-3 ms-3' >Imagenes/Fotos Complementarias</label>
                            <div className='d-flex overflow-x-auto max-width-100'>
                                    {ImgLsPP.map((imagep,index) => 
                                        (<div key={'LSD/'+index} className='px-2 m-2'>
                                            <img src={URIViewImagen+imagep.idimagen+'inca.jpg'} 
                                                alt='img' className='rounded-1' style={{maxWidth:100,maxHeight:100}}/>
                                        </div>)
                                    )}
                            </div>
                        </div>
                        {/***opcion para editar la lista de imagenes asociadas, si esta activo de mostrara un el input file */}
                        <div className='form-checked'>
                            <input type="checkbox" className='form-check-input mx-2' 
                                id='check2' name='changeLSImage' 
                                value={EditLSImag}
                                onChange={(e) => {setEditLsImag(e.target.checked)}}/>
                            <label className='form-check-label'>Editar lista Imagenes/fotos complementarias</label>
                        </div>
                        {EditLSImag && (
                            <>
                            <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Label>Editar Imagenes/Fotos Complementarias</Form.Label>
                                <Form.Control type="file" multiple  accept=".jpg, .jpeg, .png" onChange={handleFilesChanges} />
                            </Form.Group>
                            <div className='mb-4 d-flex overflow-x-auto max-width-100'>
                                {previewURLs.map((url, index) => (
                                  <div key={'TH/'+index} className='px-2 m-2'>
                                    <div className='d-flex justify-content-center '><Button className='m-2 btn btn-danger' onClick={()=>{quitarElemento(url)}}><FaTrash/></Button></div>
                                    {url.id ? 
                                    (<img src={URIViewImagen+url.idimagen+'inca.jpg'} style={{width:100}} alt=''/>)
                                    :(<img src={url} style={{maxWidth:100,maxHeight:100}} className='rounded-1' />)}
                                  </div>
                                ))}
                            </div>
                            </>
                        )}
                        <br /><hr />
                        <div className='text-center'>¿Está seguro de hacer estos cambios?</div>

                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <div className='w-50 m-auto d-flex justify-content-around '>
                        <Button variant="success" type="submit" className='mx-1' onClick={()=>{GuardarEdit(previewURLs)}}>
                              Guardar
                        </Button>
                        <Button variant="danger" type="button" className='mx-1' onClick={handleCancel}>
                          Cancelar
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default ProyectosAdmin;
