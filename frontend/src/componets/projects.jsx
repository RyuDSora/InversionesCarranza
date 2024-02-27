import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/esm/Container';
import PR0 from '../imgs/proyectIMG.jpg';
import PR1 from '../imgs/proyectIMG1.jpg';
import PR2 from '../imgs/proyectIMG2.jpg';
import PR3 from '../imgs/proyectIMG4.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';


export default function Projects(params) {
    let [Servicios,setServicios] = useState([]);
    let [Proyectos, setProyectos] = useState([]);
    let [Prxser, setPrxser] = useState([])
    const [mostrarCargando, setMostrarCargando] = useState(true);

    const Proyectosxservicios = [];

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
                const response1 = await axios.get(URIProyectos);
                setProyectos(response1.data);
            } catch (error) {
                console.log(error);
                
            }
        }
    
        Projew();
    }, []);
    
    useEffect(() => {
        // const Proyectosxservicios = {};
        Servicios.forEach(servicio => {
            const proyectosDelServicio = Proyectos.filter(proyecto => proyecto.categoria_servicio === servicio.id);
            Proyectosxservicios.push({id:servicio.id,proyectosDelServicio});
        });
        //console.log(Proyectosxservicios[0]);
        Prxser = setPrxser(Proyectosxservicios);
    
    }, [Servicios, Proyectos]);
    
    //console.log(Prxser[0]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrarCargando(false);
        }, 300); // 2000 milisegundos (2 segundos) de retraso antes de mostrar el spinner
        return () => clearTimeout(timeout);
    }, []);

    return (
        <Container>
            <div className='mt-3 pt-2'>
                <div className='p-2'><span className='h2'>Nuestros Proyectos</span></div>
                {mostrarCargando ? (
                    <div className='pb-4 my-2'>
                        <div className='pb-4 mb-4'><span className='h3'>Cargando...</span></div>
                    </div>
                ) : (
                    <div>
                        {Servicios.length === 0 ? (
                            <div className='pb-4 my-2'>
                                <div className='pb-4 mb-4'><span className='h3'>Cargando...</span></div>
                                <Spinner animation="border" variant="primary" />
                            </div>
                        ) : (
                            Servicios.map(Serv => (
                                <div key={Serv.id + Serv.nombre_servicio}>
                                    {Cont(Serv.id, Serv.nombre_servicio, '/Proyectos/' + Serv.nombre_servicio, Prxser)}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Container>
    );

}

function Cont(ids,servicio, url2,PJ) {
    return (
        <div className='my-2 py-3 '>
            <div className='text-start h5 ps-4 ms-2'><span>{servicio}</span></div>
            <div className='d-flex flex-wrap px-3 justify-content-around'>
                {PJ.map(Proye =>(Proye.id===ids && 
                    Proye.proyectosDelServicio.slice(0, 3).map(Pas => (
                        <div key={Pas.id+Pas.nombreProyecto}>
                            <Project name={Pas.nombreProyecto} image={PR2}/>
                        </div>
                    ))
                ))}
                <div>{More(ids,url2)}</div>
            </div>
        </div>
    );
}
//
function Project({ name, image}) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    
    return (
        <div style={{ width: '300px' }} className='bg-light border rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{name}</span></div>
            <div className='px-3'>
                <img src={image} alt="img" className='w-100 border rounded-3' style={{height:'385px'}}/>
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
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item>
                          <img alt='img' src={PR0} style={{ height: '400px', width: '100%' }}/>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img alt='img' src={PR1} style={{ height: '400px', width: '100%' }}/>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img alt='img' src={PR2} style={{ height: '400px', width: '100%' }}/>
                        </Carousel.Item>
                        <Carousel.Item>
                        <img alt='img' src={PR3} style={{ height: '400px', width: '100%' }}/>
                        </Carousel.Item>
                    </Carousel>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo itaque facere iusto, dignissimos molestias, officiis voluptas incidunt tenetur debitis quisquam a nam fugiat velit, qui repellat possimus corrupti. Provident, ipsum?</div>
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
        <div style={{ width: '300px', height: '500px' }} className='bg-light border rounded-3 py-2 my-2 d-flex align-items-center'>
            <a href={url+id} className='mx-auto'>
                <div className='border rounded-4' style={{ width: '100px', height: '100px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </a>
        </div>
    );
}


