import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap';

function Construccion() {
  const { nombreServicio } = useParams();
  
  const servicios = [
    {nombre: 'Construcción'}
  ];

  const servicio = servicios.find(servicio => servicio.nombre === nombreServicio);

  if (!servicio) {
    return <p>Servicio no encontrado</p>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <h1>Construcción</h1>
      <Card className="mb-4">
        <Card.Img variant="top" src={servicio.imagen} />
        <Card.Body>
          <Card.Title>{servicio.nombre}</Card.Title>
          <Card.Text>{servicio.descripcion}</Card.Text>
          <Card.Text>{servicio.infoAdicional}</Card.Text>
          <Button variant="primary">Contactar</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Construccion;
