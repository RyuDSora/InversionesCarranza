import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form } from 'react-bootstrap';
import { BsArrowRight, BsCheck, BsX  } from 'react-icons/bs'; // Importar íconos

// Importa las URLs correctamente desde el archivo de URLs
import { URISolicitudes, URIEstados ,URIUsuarios,URIServicios } from './Urls';

function SolicitudesAdmin() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [estados, setEstados] = useState([]);
    const [users, setUsers] = useState({});
    const [services, setServices] = useState({});
    const [selectedRequest, setSelectedRequest] = useState('');

    useEffect(() => {
        fetchRequests();
        fetchEstados();
        fetchUsers();
        fetchServices();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(URISolicitudes);
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
        setLoading(false);
    };

    const fetchEstados = async () => {
        try {
            const response = await axios.get(URIEstados);
            setEstados(response.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get(URIUsuarios);
            const usersData = {};
            response.data.forEach(user => {
                usersData[user.id] = user.nombre; // Mapea el ID del usuario al nombre
            });
            setUsers(usersData);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchServices = async () => {
        try {
            const response = await axios.get(URIServicios);
            const servicesData = {};
            response.data.forEach(service => {
                servicesData[service.id] = service.nombre_servicio; // Mapea el ID del servicio al nombre
            });
            setServices(servicesData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const changeRequestStatus = async (requestId, newStatus) => {
        try {
            await axios.put(`${URISolicitudes}/${requestId}`, { id_estado: newStatus });
            const updatedRequests = requests.map(request => {
                if (request.id === requestId) {
                    return { ...request, id_estado: newStatus };
                }
                return request;
            });
            setRequests(updatedRequests);
        } catch (error) {
            console.error('Error changing request status:', error);
        }
    };

    const handleStatusChange = (requestId, newStatus) => {
        setSelectedRequest(''); // Limpiar el estado seleccionado
        changeRequestStatus(requestId, newStatus);
    };

    return (
        <Container>
            <h1>Administrador de Solicitudes</h1>
            {loading ? (
                <p>Cargando solicitudes...</p>
            ) : (
                <div>
                    <h2>Lista de Solicitudes</h2>
                    {/* Filtro por estado */}
                    <Form.Group controlId="formEstado">
                        <Form.Control as="select" value={selectedRequest} onChange={(e) => setSelectedRequest(e.target.value)}>
                            <option value="">Todos los Estados</option>
                            {estados.map((estado) => (
                                <option key={estado.id} value={estado.id}>
                                    {estado.nombre_estado}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID Solicitud</th>
                                <th>Usuario</th>
                                <th>Servicio</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.filter(request => !selectedRequest || request.id_estado === parseInt(selectedRequest)).map(request => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>{users[request.id_cliente]}</td>
                                    <td>{services[request.categoria_servicio]}</td>
                                    <td>{request.descripcion_solicitud}</td>
                                    <td>{estados.find(estado => estado.id === request.id_estado)?.nombre_estado}</td>
                                    <td>
                                        {/* Botón para el ecccstado 1 */}
                                        {request.id_estado === 1 && (
                                            <BsArrowRight title={estados.find(estado => estado.id === 2)?.nombre_estado} onClick={() => handleStatusChange(request.id, 2)} size={30} color="yellow" />
                                        )}
                                        {/* Botón para el estado 2 */}
                                        {request.id_estado === 2 && (
                                            <>
                                                <BsCheck title={estados.find(estado => estado.id === 3)?.nombre_estado} onClick={() => handleStatusChange(request.id, 3)} size={30} color="green" />
                                                <BsX title={estados.find(estado => estado.id === 4)?.nombre_estado} onClick={() => handleStatusChange(request.id, 4)} size={30} color="red" />
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </Container>
    );
}

export default SolicitudesAdmin;
