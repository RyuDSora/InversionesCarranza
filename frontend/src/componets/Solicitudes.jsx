import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image1 from '../imgs/diseno_planos.jpg'; 
import Image2 from '../imgs/pintura.jpg';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';

const services = [
    { id: 1, name: 'Diseño de Planos', description: '', image: Image1 },
    { id: 2, name: 'Pintura', description: '', image: Image2 },
];

function App() {
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    if (selectedService) {
        return (
            <div className="container">
                <h1 className="text-center my-4">Solicitud para {selectedService.name}</h1>
                <Card className="mb-4">
                    <Card.Img variant="top" src={selectedService.image} />
                    <Card.Body>
                        <Card.Title>{selectedService.name}</Card.Title>
                        <Card.Text>{selectedService.description}</Card.Text>
                    </Card.Body>
                </Card>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Ingrese su nombre" />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="formBasicPhone">
                              <Form.Label>Número de teléfono</Form.Label>
                              <Form.Control type="tel" placeholder="Ingrese su número de teléfono" />
                      </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="formBasicMessage">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Ingrese su mensaje" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Enviar Solicitud
                    </Button>
                </Form>
            </div>
        );
    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Seleccione un servicio</h1>
            <Row>
                {services.map(service => (
                    <Col sm={6} md={4} lg={3} key={service.id}>
                        <Card className="mb-4" onClick={() => handleServiceClick(service)}>
                            <Card.Img variant="top" src={service.image} />
                            <Card.Body>
                                <Card.Title>{service.name}</Card.Title>
                                <Card.Text>{service.description}</Card.Text>
                                <Button variant="primary">Seleccionar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default App;
