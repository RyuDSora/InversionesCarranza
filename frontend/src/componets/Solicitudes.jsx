import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { URISolicitudes, URIServicios } from './Urls'; // Importa la URI para las solicitudes y los servicios

function Solicitud({ userId }) {
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState('');
    const [descripcionSolicitud, setDescripcionSolicitud] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false); // Estado para mostrar el mensaje de error

    useEffect(() => {
        // Obtener los servicios de la base de datos al cargar el componente
        const obtenerServicios = async () => {
            try {
                const response = await axios.get(URIServicios); // Usar la URL de servicios definida
                setServicios(response.data); // Actualizar el estado con los servicios obtenidos
            } catch (error) {
                console.error('Error al obtener los servicios:', error);
            }
        };
        obtenerServicios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar campos
        if (!servicioSeleccionado || !descripcionSolicitud) {
            setShowErrorMessage(true); // Mostrar mensaje de error si los campos están vacíos
            return;
        }

        try {
            const solicitudData = {
                id_cliente: userId,
                categoria_servicio: servicioSeleccionado,
                id_estado: 1, // ID del estado "Enviado"
                descripcion_solicitud: descripcionSolicitud
            };
            // Envía la solicitud al backend usando la URI correspondiente
            await axios.post(URISolicitudes, solicitudData);
            // Mostrar mensaje de éxito
            alert('La solicitud se ha realizado con éxito.');
            // Cerrar la modal
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                        <Form.Label>Servicio</Form.Label>
                        <Form.Select onChange={(e) => { setServicioSeleccionado(e.target.value) }} value={servicioSeleccionado}>
                            <option value="">Seleccione un servicio</option>
                            {servicios.map((servicio) => (
                                <option key={servicio.id} value={servicio.id}>{servicio.nombre_servicio}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Detalles</Form.Label>
                        <Form.Control as="textarea" rows={3}
                            placeholder="Ingrese la descripción del proyecto" value={descripcionSolicitud}
                            onChange={(e) => setDescripcionSolicitud(e.target.value)} />
                    </Form.Group>
                    {showErrorMessage && ( // Mostrar mensaje de error solo cuando showErrorMessage sea true
                        <Alert variant="danger" className="mt-3">
                            Por favor, complete todos los campos.
                        </Alert>
                    )}
                    <div className='w-50 m-auto d-flex justify-content-around mt-2'>
                        <Button variant="success" type="submit">
                            Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
    </>
    );
}

export default Solicitud;