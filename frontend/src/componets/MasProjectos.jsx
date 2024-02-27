import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container  from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import PR0 from '../imgs/proyectIMG.jpg';
import PR1 from '../imgs/proyectIMG1.jpg';
import PR2 from '../imgs/proyectIMG2.jpg';
import PR3 from '../imgs/proyectIMG4.jpg';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';

export default function MasProyectos() {
    var serv = '';
    var servName = '';

    var cadena  = window.location.pathname;
    var expresionRegular = /\d+$/;
    if (expresionRegular.test(cadena)) {
        var ultimosCaracteres = cadena.match(expresionRegular)[0];
        serv = parseInt(ultimosCaracteres);}

    let [Servicios,setServicios] = useState([]);
    let [Proyectos, setProyectos] = useState([]);
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
        const fetchProyectos = async () => {
            try {
                const response = await axios.get(URIProyectos);
                // Filtrar los proyectos por categoria_servicio igual al ID del servicio obtenido de la URL
                const proyectosFiltrados = response.data.filter(proyecto => proyecto.categoria_servicio === serv);
                setProyectos(proyectosFiltrados);
            } catch (error) {
                console.log(error);
            }
        }
    
        fetchProyectos();
    }, [serv]);
    
    for (let index = 0; index < Servicios.length; index++) {
        if (Servicios[index].id===serv) {
            servName = Servicios[index].nombre_servicio;
        }
    }


    return (
        <Container>
            <div className='bg-light '>
            <div className='p-2'><span className='h2'>Nuestros Proyectos</span></div>
            <div className='p-2'><span className='h4'>{servName}</span></div>
            <div className='my-2 py-3'>
                <div className='d-flex flex-wrap px-3 justify-content-around'>
                    {Proyectos.map(Proy => (
                        <div key={Proy.id+Proy.nombreProyecto}>
                            <Project nombre={Proy.nombreProyecto} img={PR0} />
                </div>))}
                </div>
            </div>    
            </div>
        </Container>
    );}

    

    
function Project({nombre,img}) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    
    return (
        <div style={{ width: '300px' }} className='bg-light border rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{nombre}</span></div>
            <div className='px-3'>
                <img src={img} alt="img" className='w-100 border rounded-3' style={{height:'385px'}}/>
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
                    <Modal.Title>{nombre}</Modal.Title>
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
