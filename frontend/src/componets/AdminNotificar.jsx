import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { URIUsuarios, URIAdminNotificar } from './Urls';

function AdminNotificar ({userId}) {
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado || !mensaje) {
      setShowErrorMessage(true);
      return;
    }

    try {
      const solicitudData = {
        id_usuario: usuarioSeleccionado,
        mensaje: mensaje,
        leido: false
      };

      await axios.post(URIAdminNotificar, solicitudData);

      alert('La Notificación se ha realizado con éxito.');

      window.location.href = `/Perfil`;

    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  };

  const handleCancelar = () => {
    setMensaje('');
    setUsuarioSeleccionado('');
    setShowErrorMessage(false);
  };

  return (
    <div className="container">
      <h2 className="mt-5 mb-4">Notificación de usuario</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="usuarios" className="form-label">Seleccionar usuario:</label>
              <select id="usuarios" className="form-select" onChange={(e) => setUsuarioSeleccionado(e.target.value)} value={usuarioSeleccionado}>
                <option value="">Seleccionar usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>{usuario.nombre} {usuario.apellido}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="mensaje" className="form-label">Mensaje:</label>
              <textarea id="mensaje" className="form-control" value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
            </div>
            {showErrorMessage && (
              <div className="mb-3" style={{ color: 'red' }}>Por favor, complete todos los campos.</div>
            )}
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={handleCancelar}>Cancelar</button>
              <Button type="submit" className="btn btn-primary">
                Enviar notificación
              </Button>
            </div><br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificar;
