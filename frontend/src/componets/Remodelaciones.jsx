import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imgR1 from '../imgs/SBRemod_Espacios.jpg';
import imgR2 from '../imgs/SBRemod_Materiales.jpg';
import imgR3 from '../imgs/SBRemod_Compromiso.jpg';


const Remodelaciones = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Remodelaciones</h1>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={imgR1} alt="Imagen de diseño de remodelaciones 1" />
        </div>
        <div className="col-md-6">
          <h2>Remodelación de Espacios</h2>
          <p>El primer paso en el proceso de remodelación suele ser la planificación cuidadosa. Esto implica la evaluación detallada de las necesidades y deseos del propietario, así como un análisis minucioso de la estructura actual de la casa. Los profesionales, como arquitectos o diseñadores de interiores, pueden desempeñar un papel crucial en esta etapa, brindando su experiencia para desarrollar un plan que maximice el espacio, la eficiencia y el confort.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={imgR2} alt="Imagen de diseño de remodelaciones 2" />
        </div>
        <div className="col-md-6">
          <h2>Remodelación con materiales de alta calidad</h2>
          <p>La remodelación con materiales de alta calidad es un enfoque que eleva el estándar de transformación de espacios residenciales. Este proceso va más allá de la mera actualización estética, centrándose en la utilización de materiales superiores que no solo añaden elegancia, sino que también aseguran durabilidad y funcionalidad a largo plazo.

</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={imgR3} alt="Imagen de diseño de remodelaciones 3" />
        </div>
        <div className="col-md-6">
          <h2>Nuestro compromiso en remodelaciones</h2>
          <p>En nuestro enfoque hacia las remodelaciones, asumimos un compromiso inquebrantable con la excelencia, la satisfacción del cliente y la materialización de visiones transformadoras. Nos enorgullece ser impulsores de cambios significativos en los hogares, adoptando cada proyecto con una dedicación firme para superar las expectativas y convertir sueños en realidades habitables..</p>
        </div>
      </div> <br /> <br />
    </div>
  );
}

export default Remodelaciones;