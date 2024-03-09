// Servicios.js

import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
/*import IMG0 from '../imgs/ServicioContruccion.jpg';
import IMG1 from '../imgs/ServicioRemodelacion.jpg';
import IMG2 from '../imgs/ServicioDicenoPlanos.jpg';*/
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'

const URIServicios = 'http://' + window.location.hostname + ':8000/ServiciosOfrecidos/';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(URIServicios);
        const serviciosData = response.data.filter(servicio => servicio.servicio_padre === null);
        setServicios(serviciosData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServicios();
  }, []);

  const handleButtonClick = servicio => {
    navigate(`/mas-servicios/${servicio.id}`); // Pasar el ID del servicio padre en la URL
  };

  return (
    <Container>
      <Container className="py-3 text-center">
        <h1>Nuestros Servicios</h1>
      </Container>
      <Row className="d-flex justify-content-center">
        {servicios.map((servicio, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="d-flex justify-content-center">
            <Card className="mb-4">
              <Card.Img variant="top" src={servicio.img_principal ? 'http://'+ window.location.hostname+':8000/' + servicio.img_principal+'inca.jpg': IMGPrueba } />
              <Card.Body>
                <Card.Title>{servicio.nombre_servicio}</Card.Title>
                <Card.Text>{servicio.detalle_servicio}</Card.Text>
                <Button variant="primary" onClick={() => handleButtonClick(servicio)}>Más información</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

/*function getImagePath(idServicio) {
  switch (idServicio) {
    case 1:
      return IMG0;
    case 2:
      return IMG1;
    case 3:
      return IMG2;
    default:
      return '';
  }
}*/

export default Servicios;
