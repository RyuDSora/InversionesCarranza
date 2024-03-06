import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { Button, Modal, Form,Image  } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { FaEdit,FaTrash } from 'react-icons/fa';

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
const URIPRXIMG    = 'http://'+window.location.hostname+':8000/proyehasimage/';

function ProyectosAdmin(params) {
    
    let [Servicios,setServicios] = useState([]);   //variable para los servicios principales
    const [ShowService, setShowService]= useState(1); //variable para saber que pestaña de servicio esta activa 
    const [Proyectos,setProyectos]= useState([]);  //variable para guardar los proyectos segun el servicio seleccionado
    const [btnSelected, setBtnSelected] = useState(1);//variable...
    const [show, setShow] = useState(false); //variable para mostrar o esconder la modal de +
    const [ProyectoName,setProyectoName] = useState(''); //variable para el nombre del proyecto +
    const [servicioSeleccionado, setServicioSeleccionado] = useState(''); //variable para el servicio seleccionado +
    const [ProyectoDescripcion, setProyectoDescripcion ]= useState(''); //variable para la descripcion +
    const [ProyectoIMG,setProyectoIMG] = useState(null); //variable para la imagen principal +
    const [ProyectoLsIMG,setProyectoLsIMG] = useState([]); //variable para las otras imgs
    const [previewURL, setPreviewURL] = useState('');
    const [previewURLs, setPreviewURLs] = useState([]);
    const [estado,setEstado]= useState(false);
    const [lsImgP, setlsImgP] = useState([]);
    /////////////////////////////////
    
    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const Projew = async () => {
            try {
                await fetch('http://'+window.location.hostname+':8000/images/get')
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
    }, [estado,ShowService]);
    
   
    /////////////////////////////////////////////
    const handleShow = () => setShow(true);
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        //aqui vamos a enviar la imagen principal primero
        try {
            var idIMGPrincipal;
            var servis = null;

            for (let index = 0; index < Servicios.length; index++) {
                if (servicioSeleccionado===Servicios[index].nombre_servicio) {servis = Servicios[index].id;}
            }

            if(!ProyectoIMG){
                alert('cargue una imagen en principal')
                return
              }
            const formdata = new FormData()
            formdata.append('image', ProyectoIMG)
            await fetch('http://'+window.location.hostname+':8000/images/post', {
            method: 'POST',
            body: formdata
            })
            .then(res => res.json())
            .then(data => {
            idIMGPrincipal = data.id;
            })
            .catch(err => {
            console.error(err)
            })
            
            const proyectoAdd = {
                "nombreProyecto":ProyectoName,
                "categoria_servicio":servis,
                "descripcion_proyecto":ProyectoDescripcion,
                "img_principal":idIMGPrincipal
            }
            
            const response = await axios.post(URIProyectos,proyectoAdd);
            
            if (ProyectoLsIMG.length>0) {
                ProyectoLsIMG.map(
                    imag =>{ 
                        const formdatas = new FormData()
                        formdatas.append('image', imag)
                        fetch('http://'+window.location.hostname+':8000/images/post', {
                        method: 'POST',
                        body: formdatas
                        })
                        .then(res => res.json())
                        .then(data => {
                            axios.post(URIPRXIMG,{"idproyecto":response.data.id,"idimagen":data.id})
                        })
                        .catch(err => {
                        console.error(err)
                        
                    });
                    return null;
                    }
                )
            }

        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
        }

        setEstado(true);
        setShow(false);
        setProyectoName('');setServicioSeleccionado('');setProyectoDescripcion('');
        setProyectoIMG(null);setPreviewURL('');setPreviewURL('');setPreviewURLs([]);
        
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProyectoIMG(selectedFile);
        const reader = new FileReader();
        reader.onload = () => {
        setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleFilesChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setProyectoLsIMG(selectedFiles);
    
        // Crear una URL de objeto de datos para cada imagen seleccionada
        const urls = selectedFiles.map((file) => URL.createObjectURL(file));
        setPreviewURLs(urls);
    };
    const handleCancel = () => {
        setProyectoName('')
        setServicioSeleccionado('')
        setProyectoDescripcion('')
        setProyectoIMG(null)
        setPreviewURL('')
        setProyectoLsIMG([])
        setPreviewURLs([])
        setShow(false)
    };
    /* eslint-disable no-restricted-globals */
    const deletedProyecto = (id) => {
        const confirmacion = confirm("¿Estás seguro que deseas borrar este proyecto?");
        if (confirmacion) {
            const response = axios.get(URIPRXIMG);
            if (response.data>0) {
                axios.delete(URIPRXIMG+id);    
            }
            axios.delete(URIProyectos+id).then(resp => {setEstado(true)})
        }
    }; 
    /* eslint-enable no-restricted-globals */
    
    function Seccion(params) { 
        setShowService(params);
        setBtnSelected(params);
    }
    return (
        <Container>
            <div className='p-2'><span className='h5'>Nuestros Proyectos</span></div>
            <div className=''>
                <div className="d-flex justify-content-around bg-inCa rounded-top-4">
                    {Servicios.map(serv => (
                    <div key={serv.nombre_servicio} id={serv.nombre_servicio+'/'+serv.id}>
                        <div className={`${btnSelected === serv.id ? 'border-bottom border-primary border-4': ''} px-3 py-1 d-flex align-items-center`} >
                        <button className='btn text-center btn-outline-light text-dark' onClick={()=>{Seccion(serv.id)}}><span>{serv.nombre_servicio}</span></button>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className='mb-3 bg-inCa rounded-bottom-4'>
                { Proyectos.map(proye=>(
                    <div key={proye.id+proye.nombreProyecto+proye.categoria_servicio+proye.descripcion_proyecto} className='pt-3 shadow-lg p-3 my-2'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row m-2'>
                                <div className='col-sm-3'><span>ID: {proye.id}</span></div>
                                <div className='col-sm-9' ><span title='Nombre Proyecto'>{proye.nombreProyecto}</span></div>
                            </div>
                        </div>
                        
                        <div className='col-sm-2'>
                            <div className='d-flex justify-content-center m-2'>
                                <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5'><FaEdit size={12}/></button></div>
                                <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5' onClick={() => deletedProyecto(proye.id)}><FaTrash size={12}/></button></div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-sm-3 d-flex align-items-center' >
                            <img src={proye.img_principal ? 'http://'+window.location.hostname+':8000/'+proye.img_principal+'inca.jpg' : IMGPrueba} alt="casa" className='w-100' title={'Imagen Principal: '+proye.nombreProyecto}/>
                        </div>
                        <div className='col-sm-9'>
                            <div>
                                <div ><p>{proye.descripcion_proyecto}</p></div>
                            </div>
                            <div className='d-flex flex-wrap'>

                                {lsImgP.map(imagep => (imagep.idproyecto===proye.id ?
                                    (<img key={imagep.idproyecto+' '+imagep.idimagen+' '} src={'http://'+window.location.hostname+':8000/'+imagep.idimagen+'inca.jpg'} alt='img' className='px-2 m-2' style={{maxWidth:100,maxHeight:100}}/>):(<></>)
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            <Button
                title='Agregar Proyecto'
                className='rounded-5 p-2'
                variant="success"
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                onClick={handleShow}>
                    <BsPlus size={24}/>
            </Button>
            <Modal show={show} onHide={handleCancel} 
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar un nuevo proyecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="ProyectoName">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese nombre" 
                            onChange={(e)=>{setProyectoName(e.target.value)}}
                            value={ProyectoName}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicSelect">
                            <Form.Label>Servicio</Form.Label>
                            <Form.Select onChange={(e) => {setServicioSeleccionado(e.target.value)}} value={servicioSeleccionado}>
                            <option value="">Seleccione...</option>
                            {Servicios.map(serv => (
                            <option key={serv.nombre_servicio}>{serv.nombre_servicio}</option>
                            ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                            placeholder="Ingrese la descripcion del proyecto" value={ProyectoDescripcion} 
                            onChange={(e) => setProyectoDescripcion(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="formBasicFile">
                            <Form.Label>Imagen/Foto Principal</Form.Label>
                            <Form.Control type="file" onChange={handleFileChange} />
                        </Form.Group>
                        <div className='mb-2 d-flex justify-content-center'>{previewURL && <Image src={previewURL} thumbnail style={{width:300}}/>}</div>

                        <Form.Group className="mb-3" controlId="formBasicFile">
                          <Form.Label>Imagenes/Fotos Complementarias</Form.Label>
                          <Form.Control type="file" multiple onChange={handleFilesChange} />
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
        </Container>
    );
}
export default ProyectosAdmin;