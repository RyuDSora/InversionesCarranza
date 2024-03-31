import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { encryptionKey, decryptValue } from "./hashes.jsx";
import { FaEdit, FaTrash} from 'react-icons/fa'
import { URISolicitudes, URIEstados, URIServicios } from './Urls';
import { useNavigate } from 'react-router-dom';

function EditServiciosCliente() {
    const navigate = useNavigate();
    const [solicitudes, setSolicitudes] = useState([]);
    const [estados, setEstados] = useState({});
    const [servicios, setServicios] = useState({});
    const [userId, setUserId] = useState(null); // ID del usuario actual
    const [editandoSolicitud, setEditandoSolicitud] = useState(null); // Solicitud que se está editando

    useEffect(() => {
        // Obtener el ID del usuario actual al cargar el componente
        const usuarioId = obtenerUsuarioId();
        if (usuarioId===0) {
            navigate('/')
        }
        setUserId(usuarioId);
    }, [navigate]);

    useEffect(() => {
        if (userId) {
            fetchSolicitudesPorUsuario(userId);
        }
        fetchEstados();
        fetchServicios();
    }, [userId]);

    const obtenerUsuarioId = () => {
        if (Cookies.get('session')) {
            return +decryptValue(Cookies.get('UserId'), encryptionKey);//retornamos el usuario logueado
          }else{
            return 0; //sino retornamos 0
          }
    };

    const fetchSolicitudesPorUsuario = async (userId) => {
        try {
            const response = await axios.get(URISolicitudes);
            const SolicitudesXusuarios = response.data.filter(
                solicitud => solicitud.id_cliente===userId
            )
            console.log(SolicitudesXusuarios);
            setSolicitudes(SolicitudesXusuarios);
        } catch (error) { 
            console.error('Error fetching requests:', error);
        }
    };

    const fetchEstados = async () => {
        try {
            const response = await axios.get(URIEstados);
            const estadosData = {};
            response.data.forEach(estado => {
                estadosData[estado.id] = estado.nombre_estado;
            });
            setEstados(estadosData);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchServicios = async () => {
        try {
            const response = await axios.get(URIServicios);
            const serviciosData = {};
            response.data.forEach(servicio => {
                serviciosData[servicio.id] = servicio.nombre_servicio;
            });
            setServicios(serviciosData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleEditClick = (solicitudId, estadoId) => {
        const solicitud = solicitudes.find(solicitud => solicitud.id === solicitudId);
        setEditandoSolicitud(solicitud);
    };

    const handleUpdateClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URISolicitudes}/${editandoSolicitud.id}`, editandoSolicitud);
            fetchSolicitudesPorUsuario(userId); // Refrescar las solicitudes
            setEditandoSolicitud(null); // Salir del modo de edición
        } catch (error) {
            console.error('Error al actualizar la solicitud:', error);
        }
    };

    const handleDeleteClick = async (solicitudId) => {
        try {
            await axios.delete(`${URISolicitudes}/${solicitudId}`);
            fetchSolicitudesPorUsuario(userId); // Refrescar las solicitudes
        } catch (error) {
            console.error('Error al eliminar la solicitud:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Solicitudes de Servicio</h2>
            {editandoSolicitud && (
                <form onSubmit={handleUpdateClick}>
                    <label>
                        Servicio:
                        <select value={editandoSolicitud.categoria_servicio} onChange={e => setEditandoSolicitud({...editandoSolicitud, categoria_servicio: e.target.value})}>
                            {Object.entries(servicios).map(([id, nombre]) => (
                                <option value={id} key={id}>{nombre}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Descripción de solicitud:
                        <input type="text" value={editandoSolicitud.descripcion_solicitud} onChange={e => setEditandoSolicitud({...editandoSolicitud, descripcion_solicitud: e.target.value})} />
                    </label>
                    <button type="submit">Actualizar</button>
                </form>
            )}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Servicio</th>
                        <th>Descripcion de la solicitud</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map(solicitud => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.id}</td>
                            <td>{servicios[solicitud.categoria_servicio]}</td>
                            <td>{solicitud.descripcion_solicitud}</td>
                            <td>{estados[solicitud.id_estado]}</td>
                            <td>
                                {solicitud.id_estado !== 1 ? (<></>):(
                                <div className='d-flex'>
                                    <button title='Editar' className="btn btn-primary mr-2" onClick={() => handleEditClick(solicitud.id, solicitud.id_estado)}>
                                    <FaEdit size={12}/>
                                </button>
                                <button title='Borrar' className="btn btn-danger mx-2" onClick={() => handleDeleteClick(solicitud.id, solicitud.id_estado)} >
                                    <FaTrash size={12}/>
                                </button>
                                </div>)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}

export default EditServiciosCliente;