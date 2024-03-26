import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import {Project} from './proye.jsx'
import {Spinner, Container } from 'react-bootstrap';

//urls para el pedido al servidor
import { URIServicios,URIProyectos,URICalificacion } from "./Urls.jsx";

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


