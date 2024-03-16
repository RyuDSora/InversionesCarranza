import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { FaStar} from 'react-icons/fa'
import {Carousel, Button, Spinner, Modal, Container } from 'react-bootstrap';

//estas son imagenes estaticas, luego pasaran a ser llamadas desde servidor.
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'

//urls para el pedido al servidor
import { URIServicios,URIProyectos,URIPRXIMG,URIImagenGet,URIViewImagen,URICalificacion } from "./Urls.jsx";

//funcion principal
export default function Projects(params) {
    //variables de estado
    let [Servicios,setServicios] = useState([]); //aqui se guardaran las categorias de servicios
    let [Proyectos, setProyectos] = useState([]);//aqui se guardaran todos los proyectos
    
    
    //variable booleana que servira para indicar si esta cargando, esto cuando no le lleguen datos desde el server
    const [mostrarCargando, setMostrarCargando] = useState(true); 



    //efecto para pedir los servicios padre al servidor,este solo se ejecutara una vez desde que se carga la pagina
    useEffect(() => {
        const service = async () => {
            try {
                await axios.get(URIImagenGet)
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

    //efecto para pedir los proyectos al servidor,este solo se ejecutara una vez desde que se carga la pagina
    useEffect(() => {
        const Projew = async () => {
            try {
                const response = await axios.get(URIProyectos);
                setProyectos(response.data);
                
            } catch (error) {
                console.log(error);
            }
        }
        Projew();
    }, []);
    useEffect(()=>{
        //let NuevoProyecto = [];
        Proyectos.map(
            proyecto=>{
                const Calificacion = async() =>{
                    try {
                        const response = await axios.get(URICalificacion+proyecto.id);
                        const Promedio = response.data;
                        var X = Promedio.promedio_calificacion;
                        if (!X) {X='0.00'}else{
                            let ca = X.substring(0, 4);
                            X = ca;
                        }
                        proyecto.calificacion=X
                    } catch (error) {
                        console.log(error);
                    }
                }
                Calificacion()
                return null
            }
        )
    },[Proyectos])
    
    //contador
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrarCargando(false);
        }, 50); // 100 milisegundos (0.2 segundos) de retraso antes de mostrar el spinner
        return () => clearTimeout(timeout);
    }, []);

    //aqui es donde retornara la funcion principal...
    return (
        <Container>
            <div className='mt-3 pt-2'>
                <div className='p-2'><span className='h2'>Nuestros Proyectos</span></div>
                {mostrarCargando ? (
                    <div className='pb-4 my-2'>
                        <div className='pb-4 mb-4'><span className='h3'>Cargando...</span></div>
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <div>
                        {Servicios.length === 0 ? 
                        (//si no encuentra ningun servicio mostrara lo siguiente
                            <div className='pb-4 my-2'>
                                <div className='pb-4 mb-4'><span className='h3'>No hay servicios para mostrar.</span></div>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : 
                        (//si encuentra servicios
                            Servicios.map((Serv,index) => (
                                <div key={'S-'+index}>
                                    {Cont(Serv.id, Serv.nombre_servicio, '/Proyectos/' + Serv.nombre_servicio,Proyectos)}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Container>
    );

}

function Cont(ServiceId, ServiceName, ServiceUrl,LSProyectos) {
    let qwerty = [];
    
    if(LSProyectos.length>0){
        LSProyectos.map(proyecto => {
            if (proyecto.categoria_servicio===ServiceId) {
                qwerty.push(proyecto)
            }
            return null;
        })
    }

    return (
        <div className='my-2 py-3 '>
            <div className='text-start h5 ps-4 ms-2'><span className='h4'>{ServiceName}</span></div>
            <div className='row'>
                {qwerty === 0 ? 
                    (<div><span className='h6'>No hay proyectos de {ServiceName}</span></div>) : 
                    (<>
                    {qwerty.length < 3 ? 
                        (<>
                            {qwerty.map((Proye,index2) => (
                                    <div className='col-sm-3' key={'PS-'+ServiceName+'-'+index2+'/'}>
                                            <Project PROYECTTO={Proye} />
                                    </div>
                                    ))}
                        </>):
                        (<>
                            {qwerty.slice(0,3).map((Proye,index3) => (
                                    <div className='col-sm-3' key={'PS-'+ServiceName+'-'+index3}>
                                       <Project PROYECTTO={Proye} /> 
                                    </div>
                                    
                                    ))}
                            <div className='col-sm-3'>{More(ServiceId, ServiceUrl)}</div>
                        </>)}
                    </>)}
            </div>
        </div>
    );
    
}

function Project({PROYECTTO}) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const [listaimgxproyecto, setListaImgxProyecto] = useState([]);

   useEffect(()=>{
        const lista = async () => {
            try {
                const response = await axios.get(URIPRXIMG);
                const imgsss = response.data;
                let X = [];
                if(imgsss.length>0){
                    imgsss.map(
                        I => {
                            if (I.idproyecto===PROYECTTO.id) {
                                X.push(I);
                            }
                            return null;
                        }
                    )
                }
                setListaImgxProyecto(X);
                
            } catch (err) {
                console.log(err);
            }
        }
    
        lista();
    },[PROYECTTO.id])
    
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'>
                <span className='h6'>{PROYECTTO.nombreProyecto}</span>
            </div>
            <div className='text-start ps-4 mt-1' style={{position:'absolute'}}>
                <span className='bg-light px-1 rounded-3 d-flex align-items-center'>
                    <FaStar className='me-1 text-primary'/>
                    <span>{PROYECTTO.calificacion}</span>
                </span>
            </div>
            <div className='px-3'>
                <img src={PROYECTTO.img_principal ? URIViewImagen+PROYECTTO.img_principal+'inca.jpg':IMGPrueba} alt="img" className='w-100 border rounded-3' style={{height:'385px'}}/>
            </div>
            <Button variant="primary" onClick={handleShow} className='mt-2 pt-2'>
                Detalles
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{PROYECTTO.nombreProyecto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listaimgxproyecto.length>0 ? 
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        {listaimgxproyecto.map((Q , index)=>(
                            <Carousel.Item key={'P'+Q.idproyecto+'I'+Q.idimagen+'index'+index}>
                                <img alt='img' src={URIViewImagen+Q.idimagen+'inca.jpg'} style={{ height: '300px', width: '100%' }}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>):
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item >
                            <img alt='img' src={IMGPrueba} style={{ height: '300px', width: '100%' }}/>
                        </Carousel.Item>
                    </Carousel>)}
                    <div><p>{PROYECTTO.descripcion_proyecto}</p></div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose} >
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function More(id,url) {
    return (
        <div style={{ height: '500px',backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 py-2 my-2 d-flex align-items-center'>
            <a href={url+id} className='mx-auto'>
                <div className='shadow-lg border rounded-4' style={{ width: '100px', height: '100px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </a>
        </div>
    );
}


