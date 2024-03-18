import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { encryptionKey,encryptValue,decryptValue } from "./hashes.jsx";
import { URIUsuarios } from "./Urls.jsx";
import Stop from './Stop.jsx'

export default function EditarPerfil() {
  
  const navigate = useNavigate();
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
        const response = await axios.get(URIUsuarios+userId);
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
  
  if(Cookies.get('session')){
    if (+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true,'Administrador')}
    if (decryptValue(Cookies.get('UserId'),encryptionKey)!==userId) {return Stop(true,'Usuario')}}
  else{
    return Stop(false,'Usuario')
      }
  

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
      await axios.put(URIUsuarios+userId, {
        nombre,
        apellido,
        telefono,
        fechaNacimiento,
        correo
      });
      console.log("Perfil actualizado correctamente");
      // Guardar los nuevos datos del usuario en localStorage
      if (Cookies.get('session')) {
        Cookies.set('UserId',encryptValue(userId,encryptionKey));
        Cookies.set('UserRol',Cookies.get('UserRol'));
        Cookies.set('session',Cookies.get('session'));
        Cookies.set('User',encryptValue(nombre + ' ' + apellido, encryptionKey));
      }
      navigate(`/Perfil/${userId}`);
      window.location.reload(); 
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