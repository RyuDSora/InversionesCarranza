import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { URIUsuarios, URISolicitudes } from './Urls';

const AdminNotificar = () => {
  const [mensaje, setMensaje] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await axios.get(URIUsuarios);
        const usuariosFiltrados = response.data.filter(usuario => usuario.rol === 2);
        setUsuarios(usuariosFiltrados);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
    obtenerUsuarios();
  }, []);

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      try {
        const response = await axios.get(URISolicitudes);
        setSolicitudes(response.data);
      } catch (error) {
        console.error('Error al obtener las solicitudes:', error);
      }
    };
    obtenerSolicitudes();
  }, []);

  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };  

  const handleChange = (event) => {
    setMensaje(event.target.value);
  };

  const handleCancelar = () => {
    console.log('Notificación cancelada');
  };

  const handleEnviar = () => {
    if (!selectedUser) {
      alert('Favor selecciona un usuario.');
      return;
    }
    if (!mensaje.trim()) {
      alert('Favor escribe un mensaje.');
      return;
    }

    alert('Notificación enviada exitosamente.');

    setMensaje('');
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center">Notificar usuario</h1>
          <div className="form-group">
            <label htmlFor="usuarios">Seleccionar usuario:</label>
            <select id="usuarios" className="form-control" onChange={handleUserSelect} value={selectedUser}>
              <option value="">Seleccionar usuario...</option>
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellido}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="solicitudes">Seleccionar solicitud:</label>
            <select id="solicitudes" className="form-control">
              <option value="">Seleccionar solicitud...</option>
              {solicitudes.map((solicitud) => (
                <option key={solicitud.id} value={solicitud.id} style={{ color: 'black' }}>{solicitud.nombre}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje:</label>
            <div className="col">
              <textarea
                id="mensaje"
                className="form-control"
                rows="5"
                value={mensaje}
                onChange={handleChange}
                placeholder="Ingrese su mensaje..."
              ></textarea>
            </div>
          </div><br />
          <div className="d-flex justify-content-center mb-3">
            <ButtonGroup>
              <Button variant="secondary" onClick={handleCancelar} style={{ padding: '5px 20px', borderRadius: '8px' }}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleEnviar} style={{ padding: '3px 30px', borderRadius: '8px', marginLeft: '10px' }}>
                Enviar
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificar;
