import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import IMG0 from '../imgs/ServicioContruccion.jpg'
import IMG1 from '../imgs/ServicioRemodelacion.jpg'
import IMG2 from '../imgs/ServicioDicenoPlanos.jpg'

function Servicios() {
  const servicios = [
    { 
      nombre: 'Construcción', 
      descripcion: 'Nos especializamos en la construcción de casas y oficinas de primera calidad.', 
      imagen: IMG0, 
    },
    { 
      nombre: 'Remodelaciones', 
      descripcion: 'Nos destacamos en remodelaciones para cualquier tipo de espacio y servicios de mantenimiento.', 
      imagen: IMG1, 

    },
    { 
      nombre: 'Diseño de Planos', 
      descripcion: 'Diseñamos los planos de construcción con los estilos más modernos.', 
      imagen: IMG2, 
    }
  ];

  const navigate = useNavigate();

  const handleButtonClick = (servicio) => {
    if (servicio.nombre === 'Construcción') {
      navigate('/construccion');
    } else if (servicio.nombre === 'Remodelaciones') {
      navigate('/remodelaciones');
    } else if (servicio.nombre === 'Diseño de Planos') {
      navigate('/disenoplanos'); // Cambia esta línea para redirigir a 'DisenoPlanos.jsx'
    } else {
      navigate(`/servicio/${servicio.nombre}`);
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
              <Card.Img variant="top" src={servicio.imagen} />
              <Card.Body>
                <Card.Title>{servicio.nombre}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
                <Card.Text>{servicio.infoAdicional}</Card.Text>
                <Button variant="primary" onClick={() => handleButtonClick(servicio)}>Más información</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Servicios;



