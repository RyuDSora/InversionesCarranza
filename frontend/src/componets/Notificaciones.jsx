import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URIgetNotification, URIgetNotificationRead } from './Urls';

const Notificaciones = ({ idUsuario }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const obtenerNotificaciones = async () => {
            try {
                const response = await axios.get(URIgetNotification + `/${idUsuario}`);
                setNotificaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las notificaciones:', error);
            }
        };

        obtenerNotificaciones();
    }, [idUsuario]);

    const marcarComoLeido = async (idNotificacion) => {
        try {
            await axios.post(URIgetNotificationRead + `/${idNotificacion}`);
            setNotificaciones(prevNotificaciones =>
                prevNotificaciones.map(notif =>
                    notif.id === idNotificacion ? { ...notif, leido: true } : notif
                )
            );
        } catch (error) {
            console.error('Error al marcar como leída la notificación:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    return (
        <div>
            <Button onClick={handleShowModal}>Ver Notificaciones</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Notificaciones</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {notificaciones.map((notificacion) => (
                        <div key={notificacion.id} style={{ border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', padding: '10px' }}>
                            <Link to="/solicitudes" style={{ textDecoration: 'none' }}>
                                <div onClick={() => marcarComoLeido(notificacion.id)}>
                                    <p className="mb-0">{notificacion.mensaje}</p>
                                    <p className="mb-0" style={{ color: 'black' }}>Leído: {notificacion.leido ? 'Sí' : 'No'}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Notificaciones;
