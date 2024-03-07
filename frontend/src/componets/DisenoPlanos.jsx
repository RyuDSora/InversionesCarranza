import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgDP1 from '../imgs/SBDisenP_PlanosAlzados.jpg';
import imgDP2 from '../imgs/SBDisenP_PlanosSituacion.jpg';
import imgDP3 from '../imgs/SBDisenP_PlanosPlanta.jpg';

const DisenoPlanos = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Diseño de Planos</h1>
            <div className="row mt-5">
                <div className="col-md-6">
                <img className="img-fluid" src={imgDP1} alt="Imagen de diseño de planos 1" />
                </div>
                <div className="col-md-6">
                    <h2>Plano de Alzados</h2>
                    <p>Los planos de alzados de Inversiones Carranza reflejan la meticulosa atención a los detalles y la calidad de diseño. Cada plano destaca la fachada de los edificios de manera precisa, mostrando la arquitectura distintiva y los elementos estéticos que son la firma de Inversiones Carranza. Los alzados revelan la distribución de ventanas, puertas, y otros elementos estructurales, proporcionando una visión clara de cómo se integrarán en el entorno. La compañía se destaca por su enfoque equilibrado entre la funcionalidad y la estética, garantizando que cada proyecto cumpla con los más altos estándares de diseño arquitectónico. Estos planos son esenciales para la ejecución exitosa de los proyectos de Inversiones Carranza, garantizando una construcción precisa y una estética armoniosa en cada edificación.</p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                <img className="img-fluid" src={imgDP2} alt="Imagen de diseño de planos 2" />
                </div>
                <div className="col-md-6">
                    <h2>Plano de Situación y Emplazamiento</h2>
                    <p>Los planos de situación y emplazamiento de Inversiones Carranza ofrecen una visión estratégica y detallada de la ubicación de sus proyectos en Honduras. Cada plano presenta la disposición geográfica de los terrenos y edificaciones, destacando elementos clave como accesos viales, áreas verdes, y conexiones a servicios públicos. Estos documentos son esenciales para comprender la relación de los proyectos de Inversiones Carranza con el entorno circundante, incluyendo aspectos como topografía, vecindario y posibles impactos ambientales. La compañía se distingue por su enfoque integral en la planificación, utilizando estos planos para asegurar una integración armoniosa en la comunidad y para optimizar la funcionalidad y sostenibilidad de sus desarrollos.</p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                <img className="img-fluid" src={imgDP3} alt="Imagen de diseño de planos 3" />
                </div>
                <div className="col-md-6">
                    <h2>Plano de Planta</h2>
                    <p>Los planos de planta en Inversiones Carranza representan una herramienta fundamental en el diseño y desarrollo de proyectos. Estos planos detallados ofrecen una visión aérea precisa de la distribución interna de los edificios, destacando la disposición de espacios, habitaciones y áreas comunes. Cada plano refleja la atención meticulosa de la compañía a la funcionalidad y eficiencia en el uso del espacio, incorporando elementos como mobiliario, instalaciones y equipos necesarios. En los planos de planta de Inversiones Carranza, se puede observar la cuidadosa planificación de cada nivel, permitiendo a arquitectos, ingenieros y constructores comprender la disposición interna de manera detallada. Estos documentos son esenciales para la coordinación eficiente durante la construcción y garantizan que cada proyecto cumpla con los estándares de calidad y comodidad que caracterizan a la compañía.</p>
                </div>
            </div> <br/> <br/>
        </div>
    );
}

export default DisenoPlanos;

