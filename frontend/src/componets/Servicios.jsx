import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IMG0 from '../imgs/ServicioContruccion.jpg';
import IMG1 from '../imgs/ServicioRemodelacion.jpg';
import IMG2 from '../imgs/ServicioDicenoPlanos.jpg';

const URIServicios = 'http://' + window.location.hostname + ':8000/ServiciosOfrecidos/';

function Servicios() {
  const [servicios, setServicios] = useState([]);

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

  const navigate = useNavigate();

  const handleButtonClick = servicio => {
    switch (servicio.id) {
      case 1:
        navigate('/construccion');
        break;
      case 2:
        navigate('/remodelaciones');
        break;
      case 3:
        navigate('/disenoplanos');
        break;
      default:
        navigate(`/servicio/${servicio.nombre}`);
        break;
    }
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
              <Card.Img variant="top" src={getImagePath(servicio.id)} />
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

// Función para obtener la ruta de la imagen según el nombre del servicio
// Función para obtener la ruta de la imagen según el ID del servicio
function getImagePath(idServicio) {
  switch (idServicio) {
    case 1: // ID del servicio de Construcción
      return IMG0;
    case 2: // ID del servicio de Remodelaciones
      return IMG1;
    case 3: // ID del servicio de Diseño de Planos
      return IMG2;
    default:
      return '';
  }
}

export default Servicios;
