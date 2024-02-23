import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Servicios() {
  const servicios = [
    { 
      nombre: 'Construcción', 
      descripcion: 'Nos especializamos en la construcción de casas y oficinas de primera calidad.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/324567143_853556549283661_2032805455122645712_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=NDID2dzX9gcAX_qsAqJ&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfCguxyZG5UYtlOoomQCtlgoB-CmjMPFoclBo2N-BSMLrg&oe=65DBFAE6', 
    },
    { 
      nombre: 'Remodelaciones', 
      descripcion: 'Nos especializamos en la construcción de casas y oficinas de trabajo de primera calidad.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/322331734_1335197530666565_1245614110228181443_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=EBjzGQqZgFgAX9bdaHy&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfA_TAuGztruciewHAs9YaA2H8hJ3cTyeDaWXPa9CG8OrA&oe=65DBD15A', 

    },
    { 
      nombre: 'Diseño de Planos', 
      descripcion: 'Diseñamos los planos de construcción con los estilos más modernos.', 
      imagen: 'https://scubica.s3.us-west-2.amazonaws.com/scubica/cdfdac5b8e417eaaad3bd6932a2ec85d.jpg', 
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



