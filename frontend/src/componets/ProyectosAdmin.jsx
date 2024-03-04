import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { Button, Modal, Form,Image  } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { FaEdit,FaTrash } from 'react-icons/fa';

import IMGP from '../imgs/imagenX.png';
import IMG1 from '../imgs/CasaAthems.jpg'
import IMG2 from '../imgs/diseño1.jpg'
import IMG3 from '../imgs/diseño2.jpg'

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';

function ProyectosAdmin(params) {
    let [Servicios,setServicios] = useState([]);
    const [btnSelected,setBtnSelected] = useState([true]);
    const [show, setShow] = useState(false);
    const [ProyectoName,setProyectoName] = useState('');
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [ProyectoDescripcion, setProyectoDescripcion ]= useState('');
    const [ProyectoIMG,setProyectoIMG] = useState(null);
    const [ProyectoLsIMG,setProyectoLsIMG] = useState([]);
    const [previewURL, setPreviewURL] = useState('');
    const [previewURLs, setPreviewURLs] = useState([]);



    var lore = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, fugit suscipit! Doloribus, laudantium, harum amet voluptates non nulla veniam quis cupiditate ut delectus dolor? Alias quisquam corporis architecto laudantium illo!'
    /////// de prueba
    const [IdP,setIdp] = useState(46);
    const [NameP, setNameP] = useState('Casa 123');
    const [DescriP, setDescriP] 
    = useState('Se construyó la casa... '+lore+' '+lore+' '+lore+' '+lore);
    const [ImagP, setImgP] = useState(IMGP);
    const [lsImgP, setlsImgP] = useState([IMG1, IMG2, IMG3]);
    /////////////////////////////////
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(ProyectoName);
    console.log(servicioSeleccionado);
    console.log(ProyectoDescripcion);
    console.log(ProyectoIMG);
    console.log(ProyectoLsIMG);
    setShow(false);
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
    }

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

    return (
        <Container>
            <div className='p-2'><span className='h5'>Nuestros Proyectos</span></div>
            <div className=''>
                <div className="d-flex justify-content-around bg-inCa rounded-top-4">
                    {Servicios.map(serv => (
                    <div key={serv.nombre_servicio} id={serv.nombre_servicio+'/'+serv.id}>
                        <div className={`${btnSelected[serv.id-1] ? 'border-bottom border-primary border-4': ''} px-3 py-1 d-flex align-items-center`} >
                        <a className="nav-link  text-center" href={'#section'+serv.id}>{serv.nombre_servicio}</a>
                    </div>
                    </div>
                    ))}
                </div>
            </div>
            <div className='mb-3 bg-inCa rounded-bottom-4'>
                {/*esta es la plantilla*/}
                <div className='pt-3 shadow-lg p-3 my-2'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row m-2'>
                                <div className='col-sm-3'><span>ID: {IdP}</span></div>
                                <div className='col-sm-9' ><span title='Nombre Proyecto'>{NameP}</span></div>
                            </div>
                        </div>
                        
                        <div className='col-sm-2'>
                            <div className='d-flex justify-content-center m-2'>
                                <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5'><FaEdit size={12}/></button></div>
                                <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5'><FaTrash size={12}/></button></div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-sm-3 d-flex align-items-center' >
                            <img src={ImagP} alt="casa" className='w-100' title={'Imagen Principal: '+NameP}/>
                        </div>
                        <div className='col-sm-9'>
                            <div>
                                <div ><p>{DescriP}</p></div>
                            </div>
                            <div className='d-flex flex-wrap'>
                                {lsImgP.map(imagep => (
                                    <img key={imagep} src={imagep} alt='img' className='px-2' style={{maxWidth:100,maxHeight:100}}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/*aqui solo copiare*/}
                <div className='pt-3 shadow-lg p-3 my-2'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row m-2'>
                                <div className='col-sm-3'><span>ID: {IdP}</span></div>
                                <div className='col-sm-9' ><span title='Nombre Proyecto'>{NameP}</span></div>
                            </div>
                        </div>
                        
                        <div className='col-sm-2'>
                            <div className='d-flex justify-content-center m-2'>
                                <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5'><FaEdit size={12}/></button></div>
                                <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5'><FaTrash size={12}/></button></div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-sm-3 d-flex align-items-center' >
                            <img src={ImagP} alt="casa" className='w-100' title={'Imagen Principal: '+NameP}/>
                        </div>
                        <div className='col-sm-9'>
                            <div>
                                <div ><p>{DescriP}</p></div>
                            </div>
                            <div className='d-flex flex-wrap'>
                                {lsImgP.map(imagep => (
                                    <img key={imagep} src={imagep} alt='img' className='px-2' style={{maxWidth:100,maxHeight:100}}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-3 shadow-lg p-3 my-2'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row m-2'>
                                <div className='col-sm-3'><span>ID: {IdP}</span></div>
                                <div className='col-sm-9' ><span title='Nombre Proyecto'>{NameP}</span></div>
                            </div>
                        </div>
                        
                        <div className='col-sm-2'>
                            <div className='d-flex justify-content-center m-2'>
                                <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5'><FaEdit size={12}/></button></div>
                                <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5'><FaTrash size={12}/></button></div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-sm-3 d-flex align-items-center' >
                            <img src={ImagP} alt="casa" className='w-100' title={'Imagen Principal: '+NameP}/>
                        </div>
                        <div className='col-sm-9'>
                            <div>
                                <div ><p>{DescriP}</p></div>
                            </div>
                            <div className='d-flex flex-wrap'>
                                {lsImgP.map(imagep => (
                                    <img key={imagep} src={imagep} alt='img' className='px-2' style={{maxWidth:100,maxHeight:100}}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='pt-3 shadow-lg p-3 my-2'>
                    <div className='row'>
                        <div className='col-sm-10'>
                            <div className='row m-2'>
                                <div className='col-sm-3'><span>ID: {IdP}</span></div>
                                <div className='col-sm-9' ><span title='Nombre Proyecto'>{NameP}</span></div>
                            </div>
                        </div>
                        
                        <div className='col-sm-2'>
                            <div className='d-flex justify-content-center m-2'>
                                <div className='px-1' title='Editar'><button type="button" className='btn btn-warning rounded-5'><FaEdit size={12}/></button></div>
                                <div className='px-1' title='Borrar'><button type="button" className='btn btn-danger rounded-5'><FaTrash size={12}/></button></div>
                            </div>
                        </div>
                    </div>
                    <div className='row py-2'>
                        <div className='col-sm-3 d-flex align-items-center' >
                            <img src={ImagP} alt="casa" className='w-100' title={'Imagen Principal: '+NameP}/>
                        </div>
                        <div className='col-sm-9'>
                            <div>
                                <div ><p>{DescriP}</p></div>
                            </div>
                            <div className='d-flex flex-wrap'>
                                {lsImgP.map(imagep => (
                                    <img key={imagep} src={imagep} alt='img' className='px-2' style={{maxWidth:100,maxHeight:100}}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                
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
                            <Form.Select onChange={(e) => setServicioSeleccionado(e.target.value)} value={servicioSeleccionado}>
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