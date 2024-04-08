import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notificaciones = ({ idUsuario }) => {
    const [notificaciones, setNotificaciones] = useState([]);

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

    return (
        <div>
            <h2>Notificaciones</h2>
            <ul>
                {notificaciones.map(notificacion => (
                    <li key={notificacion.id} style={{ textDecoration: notificacion.leido ? 'line-through' : 'none' }}>
                        {notificacion.mensaje}
                        {!notificacion.leido && (
                            <button onClick={() => marcarComoLeido(notificacion.id)}>Marcar como leída</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notificaciones;
