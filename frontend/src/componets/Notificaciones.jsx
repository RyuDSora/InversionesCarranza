import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa el componente Link

const Notificaciones = ({ idUsuario }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const obtenerNotificaciones = async () => {
            try {
                const response = await axios.get(`/api/notificaciones/${idUsuario}`);
                setNotificaciones(response.data);
            } catch (error) {
                console.error('Error al obtener las notificaciones:', error);
            }
        };

        obtenerNotificaciones();
    }, [idUsuario]);

    const marcarComoLeido = async (idNotificacion) => {
        try {
            await axios.put(`/api/notificaciones/${idNotificacion}`);
            setNotificaciones(prevNotificaciones => prevNotificaciones.map(notif =>
                notif.id === idNotificacion ? { ...notif, leido: true } : notif
            ));
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
                        <Link key={notificacion.id} to="/solicitudes">
                            <div onClick={() => marcarComoLeido(notificacion.id)}>
                                <p>{notificacion.mensaje}</p>
                                <p>Leído: {notificacion.leido ? 'Sí' : 'No'}</p>
                                <hr />
                            </div>
                        </Link>
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
