import React, { useState } from 'react';
import Construccion from '../imgs/ServicioContruccion.jpg';
import Remodelacion from '../imgs/ServicioRemodelacion.jpg';
import Planos from '../imgs/ServicioDicenoPlanos.jpg';
import axios from 'axios';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
//const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
const Name = () => {
    const [ setError] = useState('');
    const [detalle, setDetalle] = useState('');
    const [nombre, setNombre] = useState('');
    const [img, setImg] = useState('');
    const servicios = {
        "1": { 
            nombre_servicio: 'Construcción', 
            detalle_servicio: 'Nos especializamos en la construcción de casas y oficinas de primera calidad.', 
            img_principal: Construccion, 
          },
        "2":{ 
            nombre_servicio: 'Remodelaciones', 
            detalle_servicio: 'Nos especializamos en la construcción de casas y oficinas de trabajo de primera calidad.', 
            img_principal: Remodelacion, 
      
          },
          "3":{ 
            nombre_servicio: 'Diseño de Planos', 
            detalle_servicio: 'Diseñamos los planos de construcción con los estilos más modernos.', 
            img_principal: Planos, 
          }  

    };
    //const proyectos = {};
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            console.log(URIServicios);
            await axios.post(URIServicios,servicios[1]);
            await axios.post(URIServicios,servicios[2]);
            await axios.post(URIServicios,servicios[3]);
            await axios.post(URIServicios,{ 
                nombre_servicio: nombre, 
                detalle_servicio: detalle, 
                img_principal: img, 
              })
            alert('exitosamente');
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
            setError('Se produjo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">nombre servicio</label>
            <input type="text" name="nombre" id="nombre" value={nombre}
                            onChange={(e) => setNombre(e.target.value)}/>
            <br />
            <label htmlFor="decripcion">detalle_servicio</label>
            <input type="textarea" name="decripcion" id="descr" value={detalle}
                            onChange={(e) => setDetalle(e.target.value)}/>
            <br />
            <label htmlFor="imd">img</label>
            <input type="file" name="img" id="" value={img}
                            onChange={(e) => setImg(e.target.value)}/>
            <input type="submit" />
        </form>
    )
}
export default Name;