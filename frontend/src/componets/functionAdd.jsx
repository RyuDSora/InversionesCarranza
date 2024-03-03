
import PR0 from '../imgs/proyectIMG.jpg';
import PR1 from '../imgs/proyectIMG1.jpg';
import PR2 from '../imgs/proyectIMG2.jpg';
import PR3 from '../imgs/proyectIMG4.jpg';
import React, { useState, useEffect } from 'react';
import {Carousel, Button, Modal } from 'react-bootstrap';
const Cont = (ids, servicio, url2, PJ) => {
    let element;
    for (let index = 0; index < PJ.length; index++) {
        element = PJ[index];
       if(element.proyectosDelServicio.length===0){
        console.log('vacio');
       };
        
    }
    return (
        <div className='my-2 py-3 '>
            <div className='text-start h5 ps-4 ms-2'><span>{servicio}</span></div>
            <div className='row'>
                {element.proyectosDelServicio.length === 0 ? (
                    <div>No hay proyectos</div>
                ) : (
                    <>
                        {PJ.map(Proye => (Proye.id === ids &&
                            Proye.proyectosDelServicio.slice(0, 3).map(Pas => (
                                <div className='col-sm-3'>
                                    <div key={Pas} >
                                    <Project name={Pas.nombreProyecto} image={PR2} id={Pas.id}/>
                                    </div>
                                </div>
                            ))
                        ))}
                        <div className='col-sm-3'>{More(ids, url2)}</div>
                    </>
                )}
            </div>
        </div>
    );
    
}
export default Cont;

function Project({ name, image, id}) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
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