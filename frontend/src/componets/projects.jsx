import React, { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import PR0 from '../imgs/proyectIMG.jpg';
import PR1 from '../imgs/proyectIMG1.jpg';
import PR2 from '../imgs/proyectIMG2.jpg';
import PR3 from '../imgs/proyectIMG4.jpg';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Projects(params) {
    return (
        <Container>
            <div className='bg-light border rounded-3'>
                <div className='p-2 shadow'><span className='h2'>Nuestros Proyectos</span></div>
                
                {Cont('Construcción','/Proyectos/Construccion')}
                <hr />
                {Cont('Remodelación','/Proyectos/Remodelacion')}
                <hr />
                {Cont('Planos','/Proyectos/Planos')}
                
            </div>
        </Container>
    );
}

function Project({ name, image, url }) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    
    return (
        <div style={{ width: '300px' }} className='bg-light border rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{name}</span></div>
            <div className='px-3'>
                <img src={image} alt="img" className='w-100 border rounded-3'/>
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

function More(url) {
    return (
        <div style={{ width: '300px', height: '500px' }} className='bg-light border rounded-3 py-2 my-2 d-flex align-items-center'>
            <a href={url} className='mx-auto'>
                <div className='border rounded-4' style={{ width: '100px', height: '100px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </a>
        </div>
    );
}

function Cont(servicio, url) {
    return (
        <div className='my-2 py-3'>
            <div className='text-start h5 ps-4 ms-2'><span>{servicio}</span></div>
            <div className='d-flex flex-wrap px-3 justify-content-around'>
                <div>{<Project name='Proyecto 1' image={PR0} url={url}/>}</div>
                <div>{<Project name='Proyecto 2' image={PR0} url={url}/>}</div>
                <div>{<Project name='Proyecto 3' image={PR0} url={url}/>}</div>
                <div>{More(url)}</div>
            </div>
        </div>
    );
}
