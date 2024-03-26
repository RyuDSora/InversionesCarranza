import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import { FaStar} from 'react-icons/fa'
import {Carousel, Button, Spinner, Modal, Container } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

//estas son imagenes estaticas, luego pasaran a ser llamadas desde servidor.
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'

//urls para el pedido al servidor
import { URIServicios,URIProyectos,URIPRXIMG,URICalificacion } from "./Urls.jsx";

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
                const proee=response.data;
                const proyectoWithImages = 
                      await Promise.all(proee.map(
                        async (p) =>{
                            const imageUrl = 
                                await fetchImageUrl(p.img_principal);
                      return {...p, imageUrl};
                }));
                setProyectos(proyectoWithImages);
                
            } catch (error) {
                console.log(error);
            }
        }
        Projew();
    }, []);
    
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
            <div className='text-center h5 ps-4 ms-2'><span className='h4'>{ServiceName}</span></div>
            <div className='row d-flex justify-content-center align-items-center'>
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
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const submitReview = async () => {
        try {
            await axios.post(URICalificacion, {
                projectId: PROYECTTO.id,
                rating,
                review
            });
            setReview(""); // Limpiar el campo de texto

        } catch (err) {
            console.log(err);
        }
    };

   useEffect(()=>{
        const lista = async () => {
            try {
                const response = await axios.get(URIPRXIMG);
                const imgsss = response.data.filter(I => I.idproyecto === PROYECTTO.id);
                
                const proyectoWithImages = 
                      await Promise.all(imgsss.map(
                        async (p) =>{
                            const imageUrl = 
                                await fetchImageUrl(p.idimagen);
                      return {...p, imageUrl};
                }));
                setListaImgxProyecto(proyectoWithImages);
            } catch (err) {
                console.log(err);
            }
        }
    
        lista();
    },[PROYECTTO])
    
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'>
                <span className='h6'>{PROYECTTO.nombreProyecto}</span>
            </div>
            <div className='px-3'>
                <img src={PROYECTTO.imageUrl ? PROYECTTO.imageUrl:IMGPrueba} alt="img" className='w-100 border rounded-3' style={{height:'385px'}}/>
            </div> <br />
            <Button variant="primary" onClick={handleShow}>
                    Detalles
            </Button>

            <div className="d-flex justify-content-center">
                    <ReactStars
                        count={5}
                        onChange={setRating}
                        size={24}
                        activeColor="#ffd700"
                    />
            </div>
                <div className="form-group">
                    <textarea className="form-control" value={review} onChange={e => setReview(e.target.value)} />
                    <button className="btn btn-secondary mt-2 w-30" onClick={submitReview}>Enviar reseña</button>
                </div>

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
        {listaimgxproyecto.length > 0 ? (
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {listaimgxproyecto.map((Q , index) => (
                    <Carousel.Item key={'P'+Q.idproyecto+'I'+Q.idimagen+'index'+index}>
                        <img alt='img' src={Q.imageUrl} style={{ height: '300px', width: '100%' }}/>
                    </Carousel.Item>
                ))}
            </Carousel>
        ) : (
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                    <img alt='img' src={IMGPrueba} style={{ height: '300px', width: '100%' }}/>
                </Carousel.Item>
            </Carousel>
        )}
        <div><p>{PROYECTTO.descripcion_proyecto}</p></div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Close
        </Button>
    </Modal.Footer>
</Modal>
</div>
);
}