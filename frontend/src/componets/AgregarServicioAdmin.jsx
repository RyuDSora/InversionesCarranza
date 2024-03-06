import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Image, Container } from 'react-bootstrap';
import axios from 'axios';

// Importa las imágenes locales
import ServicioContruccion from '../imgs/ServicioContruccion.jpg';
import ServicioRemodelacion from '../imgs/ServicioRemodelacion.jpg';
import ServicioDicenoPlanos from '../imgs/ServicioDicenoPlanos.jpg';

const AgregarServicioAdmin = () => {
    const defaultServices = [
        { id: 1, name: 'Construcción', image: ServicioContruccion },
        { id: 2, name: 'Remodelaciones', image: ServicioRemodelacion },
        { id: 3, name: 'Diseño de Planos', image: ServicioDicenoPlanos },
    ];
    const [services, setServices] = useState(defaultServices);
    const [newService, setNewService] = useState({ name: '', image: '' });

    useEffect(() => {
        // Usa una variable de entorno o una constante para la URL de la API
        const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/services';
        axios.get(API_URL).then(response => {
            const allServices = [...defaultServices, ...response.data];
            setServices(allServices);
        }).catch(error => {
            console.error('Error fetching data from API:', error);
        });
    }, );

    const addService = () => {
        // Implementar la lógica para agregar un servicio
    };

    const editService = serviceId => {
        // Implementar la lógica para editar un servicio
    };

    const deleteService = serviceId => {
        // Implementar la lógica para eliminar un servicio
    };

    return (
        <div>
            <Container className="py-3">
                <h1>Agregar Servicio</h1>
                <p>Utiliza el formulario de abajo para agregar un nuevo servicio.</p>
            </Container>
            <Form onSubmit={addService}>
                <Form.Group controlId="formNewService">
                    <Form.Label>Nombre del Nuevo Servicio</Form.Label>
                    <Form.Control type="text" value={newService.name} onChange={e => setNewService({ ...newService, name: e.target.value })} />
                    <Form.Label>Imagen del Servicio</Form.Label>
                    <Form.Control type="file" onChange={e => setNewService({ ...newService, image: e.target.files[0] })} />
                </Form.Group> <br />
                <Button variant="primary" type="submit">
                    Agregar
                </Button>
            </Form> <br /> <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Servicio</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.name}</td>
                            <td><Image src={service.image} alt={service.name} width="100" /></td>
                            <td><Button variant="warning" onClick={() => editService(service.id)}>Editar</Button></td>
                            <td><Button variant="danger" onClick={() => deleteService(service.id)}>Borrar</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default AgregarServicioAdmin;
