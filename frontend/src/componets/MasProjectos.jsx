import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container  from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
const URIPRXIMG = 'http://'+window.location.hostname+':8000/proyehasimage/';

export default function MasProyectos() {
    const [servicios, setServicios] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const [id, setId] = useState('');
    const [servName, setServName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                //recupero los servicios padre de la base de datos
                const responseServicios = await axios.get(URIServicios);
                const serviciosData = responseServicios.data.filter(
                    servicio => servicio.servicio_padre === null
                );
                setServicios(serviciosData);
                
                //recupero el id de la categoria de servicio de la URL
                const cadena = window.location.pathname;
                const expresionRegular = /\d+$/;
                if (expresionRegular.test(cadena)) {
                    const ultimosCaracteres = cadena.match(expresionRegular)[0];
                    setId(parseInt(ultimosCaracteres));
                }
                
                //recupero los proyectos pertenecientes a la categoria del servicio
                if (id !== '') {
                    const responseProyectos = await axios.get(URIProyectos);
                    const proyectosFiltrados = responseProyectos.data.filter(
                        proyecto => proyecto.categoria_servicio === id
                    );
                    setProyectos(proyectosFiltrados);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        //recupero el nombre del servicio
        servicios.map(Ser => {if (Ser.id===id) {setServName(Ser.nombre_servicio);return null}})
    }, [id]);

    return (
        <Container>
            <div className='mt-3'>
                <div className='p-2'><span className='h2'>Nuestros Proyectos</span></div>
                <div className='p-2'><span className='h4'>{servName}</span></div>
                <div className='my-2 py-3'>
                    <div className='d-flex flex-wrap px-3 justify-content-around'>
                        {proyectos.map((proyecto, index) => (
                            <div key={'PR:'+proyecto.nombreProyecto+'/'+index} className='col-sm-3 mx-2'>
                                <Project proyecto={proyecto} />
                            </div>
                        ))}
                    </div>
                </div>    
            </div>
        </Container>
    );
}

function Project({ proyecto }) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [listaimgxproyecto, setListaImgxProyecto] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(URIPRXIMG);
                const imgsss = response.data.filter(I => I.idproyecto === proyecto.id);
                setListaImgxProyecto(imgsss);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [proyecto.id]);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);

    return (
        <div style={{ backgroundColor: 'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{proyecto.nombreProyecto}</span></div>
            <div className='px-3'>
                <img src={proyecto.img_principal ? 'http://'+window.location.hostname+':8000/'+proyecto.img_principal+'inca.jpg':IMGPrueba} alt="img" className='w-100 border rounded-3' style={{ height:'385px' }}/>
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
                    <Modal.Title>{proyecto.nombreProyecto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listaimgxproyecto.length > 0 ? 
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        {listaimgxproyecto.map((Q , index) => (
                            <Carousel.Item key={'P'+Q.idproyecto+'I'+Q.idimagen+'index'+index}>
                                <img alt='img' src={'http://'+window.location.hostname+':8000/'+Q.idimagen+'inca.jpg'} style={{ height: '300px', width: '100%' }}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>):
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item >
                            <img alt='img' src={IMGPrueba} style={{ height: '300px', width: '100%' }}/>
                        </Carousel.Item>
                    </Carousel>)}
                    <div><p>{proyecto.descripcion_proyecto}</p></div>
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
