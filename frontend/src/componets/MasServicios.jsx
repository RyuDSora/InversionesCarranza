import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'
import { URIServicios,URIViewImagen } from "./Urls.jsx";


function MasServicios() {
  const [serviciosHijo, setServiciosHijo] = useState([]);
  const [servicioPadre, setServicioPadre] = useState(null); // Estado para almacenar los detalles del servicio padre
  const { idServicioPadre } = useParams();

  useEffect(() => {
    const fetchServiciosHijo = async () => {
      try {
        const response = await axios.get(URIServicios);
        const serviciosData = response.data.filter(servicio => servicio.servicio_padre === parseInt(idServicioPadre)); // Filtrar servicios con el mismo ID de servicio padre
        setServiciosHijo(serviciosData);

        // Obteniendo detalles del servicio padre
        const servicioPadreResponse = await axios.get(URIServicios + idServicioPadre);
        setServicioPadre(servicioPadreResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServiciosHijo();
  }, [idServicioPadre]);
  if (!Array.isArray(serviciosHijo) || serviciosHijo.length === 0 || !servicioPadre) {
    return (<div>No se encontraron servicios relacionado a este servicio.</div>);
  }

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">{servicioPadre.nombre_servicio}</h1> {/* Mostrar el nombre del servicio padre */}
      </div>
      <div className="row mt-5">
        {serviciosHijo.map(servicioHijo => (
          <div className="col-md-6 mb-4" key={servicioHijo.id}>
            <div className="card border-primary h-100">
              <img className="card-img-top img-fluid" src={servicioHijo.img_principal ? URIViewImagen + servicioHijo.img_principal + 'inca.jpg' : IMGPrueba} alt="Imagen de servicio" />
              <div className="card-body">
                <h2 className="card-title text-primary">{servicioHijo.nombre_servicio}</h2>
                <p className="card-text">{servicioHijo.detalle_servicio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MasServicios;
