import React, { useState, useEffect } from 'react';
//import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container} from 'react-bootstrap';
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import { URIServicios,URIProyectos,URICalificacion } from "./Urls.jsx";
import {Project} from './proye.jsx'


export default function MasProyectos() {
    const [servicios, setServicios] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    var id ;
    const [servName, setServName] = useState('');
    
    const cadena = window.location.pathname;
    const expresionRegular = /\d+$/;
    if (expresionRegular.test(cadena)) {
        const ultimosCaracteres = cadena.match(expresionRegular)[0];
        id = parseInt(ultimosCaracteres);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                //recupero los servicios padre de la base de datos
                const responseServicios = await axios.get(URIServicios);
                const serviciosData = responseServicios.data.filter(
                    servicio => servicio.servicio_padre === null
                );
                setServicios(serviciosData);
                //recupero los proyectos pertenecientes a la categoria del servicio
                if (id !== '') {
                    const responseProyectos = await axios.get(URIProyectos);
                    const proyectosFiltrados = responseProyectos.data.filter(
                        proyecto => proyecto.categoria_servicio === id
                    );
                    const proyectoWithImages = 
                      await Promise.all(proyectosFiltrados.map(
                            async (p) =>{
                                const imageUrl = 
                                    await fetchImageUrl(p.img_principal);
                          return {...p, imageUrl};
                    }));
                    setProyectos(proyectoWithImages);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        //recupero el nombre del servicio
        servicios.map(Ser => {
            if (Ser.id===id) {
                setServName(Ser.nombre_servicio)}
                return null
            })
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
                                <Project PROYECTTO={proyecto} />
                            </div>
                        ))}
                    </div>
                </div>    
            </div>
        </Container>
    );
}
