import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../imgs/SBConst_Reconstruccion.jpg';
import img2 from '../imgs/SBConst_Materiales.jpg';
import img3 from '../imgs/SBConst_Compromiso.jpg';


const Construccion = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Construcción</h1>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={img1} alt="Imagen de construcción 1" />
          </div>
        <div className="col-md-6">
          <h2>Reconstrucción de casa</h2>
          <p>La reconstrucción de una casa implica evaluar su estado actual, planificar el diseño, obtener permisos, llevar a cabo la demolición si es necesaria, construir la nueva estructura, instalar sistemas como fontanería y electricidad, completar los acabados interiores y exteriores, y finalmente, obtener las aprobaciones necesarias antes de que la casa esté lista para habitar.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={img2} alt="Imagen de construcción 2" />
          </div>
        <div className="col-md-6">
          <h2>Construcción con materiales de alta calidad</h2>
          <p>En nuestra empresa, nos comprometemos a utilizar exclusivamente materiales de alta calidad en todos nuestros proyectos de construcción. Desde la selección de los materiales hasta su instalación, nos esforzamos por garantizar la durabilidad, la seguridad y la excelencia en cada construcción. Nuestra atención meticulosa a la calidad nos permite ofrecer resultados superiores y satisfacer las expectativas de nuestros clientes en cada proyecto.</p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-6">
        <img className="img-fluid" src={img3} alt="Imagen de construcción 3" />
          </div>
        <div className="col-md-6">
          <h2>Nuestro compromiso de calidad y servicio</h2>
          <p>Nos dedicamos a ofrecer servicios de construcción de casas y oficinas con los más altos estándares de excelencia. Nos esforzamos por superar las expectativas de nuestros clientes en cada etapa del proceso, desde el diseño hasta la entrega final. Nuestro compromiso se refleja en la calidad de los materiales que utilizamos, la atención al detalle en la mano de obra y el servicio excepcional que proporcionamos.</p>
        </div>
      </div> <br/> <br/>
    </div>
  );
}

export default Construccion;

