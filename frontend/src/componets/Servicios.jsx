import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Servicios() {
  const servicios = [
    { nombre: 'Construcción de edificios', descripcion: 'Construimos edificios de alta calidad...' },
    { nombre: 'Construcción de casas', descripcion: 'Construimos la casa de tus sueños...' },
    { nombre: 'Contratación de arquitectos', descripcion: 'Contrata a los mejores arquitectos...' },
    { nombre: 'Contratación de ingenieros civiles', descripcion: 'Contrata a los mejores ingenieros civiles...' },
    // Agrega más servicios aquí...
  ];

  return (
    <Container>
      <Row>
        {servicios.map((servicio, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <Card.Body>
                <Card.Title>{servicio.nombre}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Servicios;