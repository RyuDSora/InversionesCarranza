import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Servicios() {
  const servicios = [
    { 
      nombre: 'Construcción', 
      descripcion: 'Construimos oficinas de alta calidad y espacios de trabajo minimalistas.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/324567143_853556549283661_2032805455122645712_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=NDID2dzX9gcAX_qsAqJ&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfCguxyZG5UYtlOoomQCtlgoB-CmjMPFoclBo2N-BSMLrg&oe=65DBFAE6', 
      infoAdicional: 'Información adicional...' 
    },
    { 
      nombre: 'Remodelaciones', 
      descripcion: 'Le damos mantenimiento a tu hogar y oficina.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/322331734_1335197530666565_1245614110228181443_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=EBjzGQqZgFgAX9bdaHy&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfA_TAuGztruciewHAs9YaA2H8hJ3cTyeDaWXPa9CG8OrA&oe=65DBD15A', 
      infoAdicional: 'Información adicional...' 
    },
    { 
      nombre: 'Diseño de Planos', 
      descripcion: 'Diseñamos con los estilos más modernos y con los estandares arquitectonicos mas altos.', 
      imagen: 'https://scubica.s3.us-west-2.amazonaws.com/scubica/cdfdac5b8e417eaaad3bd6932a2ec85d.jpg', 
      infoAdicional: 'Información adicional...' 
    }
    // Agrega más servicios aquí...
];

const navigate = useNavigate();

const handleButtonClick = (servicio) => {
  if (servicio.nombre === 'Construccion') {
    navigate('/construccion');
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
