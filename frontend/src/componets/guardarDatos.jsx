import React from 'react';
import Construccion from '../imgs/ServicioContruccion.jpg';
import Remodelacion from '../imgs/ServicioRemodelacion.jpg';
import Planos from '../imgs/ServicioDicenoPlanos.jpg';
import axios from 'axios';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
const Name = () => {
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
    const Proyectos = [];
    
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 1,
                    nombreProyecto: 'Proyecto CR'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!',
                    img_principal: '/no definida'}
            );}
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 2,
                    nombreProyecto: 'Proyecto RM'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!',
                    img_principal: '/no definida'}
            );}
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 3,
                    nombreProyecto: 'Proyecto DP'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!',
                    img_principal: '/no definida'}
            );}
    
    console.log(Proyectos);




    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post(URIServicios,servicios[1]);
            await axios.post(URIServicios,servicios[2]);
            await axios.post(URIServicios,servicios[3]);
            for (let index = 0; index < Proyectos.length; index++) {
                await axios.post(URIProyectos,Proyectos[index]);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
        }
    }
    
    return(
        <form onSubmit={handleSubmit}>
            <input type="submit" />
        </form>
    )
}
export default Name;