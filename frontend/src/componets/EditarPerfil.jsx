import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { useParams, Link } from 'react-router-dom';

export default function EditarPerfil() {
  const { userId } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const response = await axios.get(`http://`+window.location.hostname+`:8000/usuarios/${userId}`);
        const usuario = response.data;
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setTelefono(usuario.telefono);
        setFechaNacimiento(usuario.fechaNacimiento);
        setCorreo(usuario.correo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsuarioData();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar campos no vacíos
    if (!nombre || !apellido || !correo || !telefono || !fechaNacimiento) {
      setError('Por favor, complete todos los campos.');
      return;
    }

    // Validar formato de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|es|net)$/;
    if (!emailRegex.test(correo)) {
      setError('Por favor, ingrese un correo electrónico válido (Gmail o Yahoo).');
      return;
    }

    // Validar que el teléfono contenga solo números
    const phoneRegex = /^\d{8}$/;
    if (!phoneRegex.test(telefono)) {
      setError('Por favor, ingrese solo números en el campo de teléfono.');
      return;
    }

    try {
      await axios.put(`http://localhost:8000/usuarios/${userId}`, {
        nombre,
        apellido,
        telefono,
        fechaNacimiento,
        correo
      });
      console.log("Perfil actualizado correctamente");
      // Guardar los nuevos datos del usuario en localStorage
      localStorage.setItem('User', nombre + ' ' + apellido);
      localStorage.setItem('UserId', userId);
      window.location.href = `/Perfil/${userId}`; 
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Container className="my-2">
      <div className="border rounded-3 bg-light">
        <div id="header_perfil">
          <h2 className="text-center">Editar Perfil</h2>
        </div>
        <hr />
        <div id="body_perfil" className="px-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre:</span>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Apellido:</span>
              <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Teléfono:</span>
              <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                type="date"
                className="form-control"
                id="name-date"
                placeholder="Ingrese su fecha de nacimiento"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)} />
              <label htmlFor="name-date">Fecha de Nacimiento:</label>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Correo:</span>
              <input type="text" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} disabled />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
            <Link to={`/Perfil/${userId}`} className="btn btn-secondary ms-2">Cancelar</Link>
          </form>
        </div>
        <hr />
      </div>
    </Container>
  );
}




/*import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { useParams, Link } from 'react-router-dom'; // Importa el hook useParams para obtener los parámetros de la URL

export default function EditarPerfil() {
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [confirmarContrasenia, setConfirmarContrasenia] = useState('');

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        // Realiza una solicitud GET para obtener la información del usuario desde la base de datos utilizando el userId obtenido de la URL
        const response = await axios.get(`http://localhost:8000/usuarios/${userId}`);
        const usuario = response.data;
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setTelefono(usuario.telefono);
        setFechaNacimiento(usuario.fechaNacimiento);
        setCorreo(usuario.correo);
        setContrasenia(usuario.contasenia);
        setConfirmarContrasenia(usuario.confirmarContrasenia);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsuarioData();
  }, [userId]); // Asegúrate de incluir userId en la lista de dependencias para que se vuelva a cargar cuando cambie

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realiza una solicitud PUT para actualizar la información del usuario en la base de datos
      await axios.put(`http://localhost:8000/usuarios/${userId}`, {
        nombre,
        apellido,
        telefono,
        fechaNacimiento,
        correo,
        contrasenia
      });
      console.log("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <Container className="my-2">
      <div className="border rounded-3 bg-light">
        <div id="header_perfil">
          <h2 className="text-center">Editar Perfil</h2>
        </div>
        <hr />
        <div id="body_perfil" className="px-3">
          <form onSubmit={handleSubmit} className="mx-auto">
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre:</span>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Apellido:</span>
              <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Teléfono:</span>
              <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha Nacimiento:</span>
              <input type="text" className="form-control" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Correo:</span>
              <input type="text" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña:</span>
              <input type="password" className="form-control" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Confirmar Contraseña:</span>
                <input type="password" className="form-control" value={confirmarContrasenia} onChange={(e) => setConfirmarContrasenia(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
            <Link to={`/Perfil/${userId}`} className="btn btn-secondary ms-2">Cancelar</Link>
          </form>
        </div>
        <hr />
      </div>
    </Container>
  );
}*/


