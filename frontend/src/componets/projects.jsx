import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import {Carousel, Button, Spinner, Modal } from 'react-bootstrap';

//estas son imagenes estaticas, luego pasaran a ser llamadas desde servidor.
import PR0 from '../imgs/proyectIMG.jpg';
import PR1 from '../imgs/proyectIMG1.jpg';
import PR2 from '../imgs/proyectIMG2.jpg';
import PR3 from '../imgs/proyectIMG4.jpg';


//urls para el pedido al servidor
const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';

//funcion principal
export default function Projects(params) {
    //variables de estado
    let [Servicios,setServicios] = useState([]); //aqui se guardaran los servicios padre 1,2,3
    let [Proyectos, setProyectos] = useState([]);//aqui se guardaran todos los proyectos
    let [Prxser, setPrxser] = useState([]) //aqui se guardaran los proyectos segun su categoria(servicio)
    const [lsImg, setLsImg] = useState([]);
    const img = [];
    img[0]={img:PR0}
    img[1]={img:PR1}
    img[2]={img:PR2}
    img[3]={img:PR3}    
    
    useEffect(()=>{
        setLsImg(img)
        console.log(lsImg);
    },[])
    //variable booleana que servira para indicar si esta cargando, esto cuando no le lleguen datos desde el server
    const [mostrarCargando, setMostrarCargando] = useState(true); 
    //variable para ordenar los proyectos por orden de servicio
    const Proyectosxservicios = [];

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
        console.log(Servicios);
    }, []); 

    //efecto para pedir los proyectos al servidor,este solo se ejecutara una vez desde que se carga la pagina
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
    
    //efecto para llamar los proyectos relacionados a cierto servicio, 
    //este se ejecutara cada vez que se da un parametro diferente de servicio o proyecto
    useEffect(() => {
        Servicios.forEach(servicio => {
            const proyectosDelServicio = Proyectos.filter(proyecto => proyecto.categoria_servicio === servicio.id);
            Proyectosxservicios.push({id:servicio.id,proyectosDelServicio});
        });
        Prxser = setPrxser(Proyectosxservicios);
    
    }, [Servicios, Proyectos]);
    
    //contador
    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrarCargando(false);
        }, 200); // 200 milisegundos (0.2 segundos) de retraso antes de mostrar el spinner
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
                            Servicios.map(Serv => (
                                <div key={Serv.id+'p'+Serv.nombre_servicio+'k'}>
                                    {Cont(Serv.id, Serv.nombre_servicio, '/Proyectos/' + Serv.nombre_servicio, Prxser,lsImg)}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </Container>
    );

}

function Cont(ids, servicio, url2, PJ, lsImg) {
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
                                    <div key={Proye.id+Pas} >
                                    <Project name={Pas.nombreProyecto} image={PR2} id={Pas.id} lsImg={lsImg}/>
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
function Project({ name, image, id,lsImg}) {
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
                        {lsImg.map(Imagen => (
                                <Carousel.Item key={Imagen}>
                                    <img alt='img' src={Imagen.img} style={{ height: '400px', width: '100%' }}/>
                                </Carousel.Item>
                            )
                        )}
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


