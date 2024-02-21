import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';

function Servicios() {
  const servicios = [
    { 
      nombre: 'Construcción de Oficinas o Espacios de Trabajo', 
      descripcion: 'Construimos oficinas de alta calidad y espacios de trabajo minimalistas.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/324567143_853556549283661_2032805455122645712_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=NDID2dzX9gcAX_qsAqJ&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfCguxyZG5UYtlOoomQCtlgoB-CmjMPFoclBo2N-BSMLrg&oe=65DBFAE6', 
      infoAdicional: 'Información adicional...' 
    },
    { 
      nombre: 'Construcción de Casas', 
      descripcion: 'Construimos la casa de tus sueños.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t39.30808-6/322331734_1335197530666565_1245614110228181443_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=EBjzGQqZgFgAX9bdaHy&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfA_TAuGztruciewHAs9YaA2H8hJ3cTyeDaWXPa9CG8OrA&oe=65DBD15A', 
      infoAdicional: 'Información adicional...' 
    },
    { 
      nombre: 'Diseño de Estructuras', 
      descripcion: 'Diseñamos con los estilos más modernos y de alto rendimiento.', 
      imagen: 'https://scontent.ftgu4-1.fna.fbcdn.net/v/t1.6435-9/102263905_174768493996723_5569305607189909180_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=gpLiD2NeggkAX8_SrLQ&_nc_ht=scontent.ftgu4-1.fna&oh=00_AfB-7ts0jGRS1v8_IV0s2r71F_d-ijTF_Aj-a_wY_Q_jww&oe=65FDD178', 
      infoAdicional: 'Información adicional...' 
    },
    { 
      nombre: 'Contratación de Arquitectos', 
      descripcion: 'Contrata a los mejores Arquitectos de Honduras.', 
      imagen: 'https://img.freepik.com/fotos-premium/concepto-construccion-estructura-reunion-ingenieros-o-arquitectos-proyectos-que-trabajan-socios-herramientas-ingenieria-construccion-modelos-planos-contrato-trabajo-ambas-empresas_265022-20316.jpg', 
      infoAdicional: 'Información adicional...' 
    },
    // Agrega más servicios aquí...
  ];

  return (
    <Container>
      <Row>
        {servicios.map((servicio, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <Card.Img variant="top" src={servicio.imagen} />
              <Card.Body>
                <Card.Title>{servicio.nombre}</Card.Title>
                <Card.Text>{servicio.descripcion}</Card.Text>
                <Card.Text>{servicio.infoAdicional}</Card.Text>
                <Button variant="primary">Más información</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Servicios;