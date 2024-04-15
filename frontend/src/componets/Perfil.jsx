import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner, Container, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { URIUsuarios } from "./Urls.jsx";
import { encryptionKey, decryptValue } from "./hashes.jsx";
import Cookies from 'js-cookie';
import BGImg from '../imgs/bgimg.jpg';
import Iperfil from '../imgs/perfil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Perfil() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [showEditPerfilIcon, setShowEditPerfilIcon] = useState(false);
  const [showEditFondoIcon, setShowEditFondoIcon] = useState(false);
  var IsPerfil = false;

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        const response = await axios.get(URIUsuarios + userId);
        setUsuario(response.data);
        const fotoPerfilLocalStorage = localStorage.getItem(`fotoPerfil_${userId}`);
        const fotoFondoLocalStorage = localStorage.getItem(`fotoFondo_${userId}`);
        if (fotoPerfilLocalStorage) {
          setProfileImage(fotoPerfilLocalStorage);
        }
        if (fotoFondoLocalStorage) {
          setBackgroundImage(fotoFondoLocalStorage);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsuarioData();
  }, [userId]);

  const handleEditarFoto = () => {
    setShowEditPerfilIcon(true);
    setShowEditFondoIcon(true);
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result;
      if (type === 'profile') {
        setProfileImage(imageUrl);
        localStorage.setItem(`fotoPerfil_${userId}`, imageUrl); // Guarda la URL de la imagen de perfil en localStorage
        setShowEditPerfilIcon(false); // Oculta el icono de edición de perfil
      } else if (type === 'background') {
        setBackgroundImage(imageUrl);
        localStorage.setItem(`fotoFondo_${userId}`, imageUrl); // Guarda la URL de la imagen de fondo en localStorage
        setShowEditFondoIcon(false); // Oculta el icono de edición de fondo
      }
    };
    reader.readAsDataURL(file);
  };

  if (!usuario) {
    return (
      <div>
        Cargando información del usuario...
        <br />
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const fechaNacimientoSinHora = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];

  const handleCambiarContrasenia = () => {
    const email = usuario.correo;
    const nombre = usuario.nombre;

    navigate(`/CambiarContrasenia?correo=${email}&nombre=${nombre}`);
  };

  if (Cookies.get('session')) {
    if (+decryptValue(Cookies.get('UserId'), encryptionKey) === usuario.id) {
      IsPerfil = true;
    }
  }

  return (
    <Container className="my-2">
      <div className="border rounded-3 bg-light position-relative">
        <div id="header_perfil">
          <div style={{
            width: '100%',
            backgroundImage: `url(${backgroundImage ? backgroundImage : usuario.fotoFondo ? usuario.fotoFondo : BGImg})`,
            height: '150px',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
            className="rounded-top-3 bg-light">
          </div>

          <div className="bg-light">
            <input type="file" onChange={(e) => handleFileChange(e, 'profile')} style={{ display: 'none' }} />
            <img onClick={() => document.querySelector('input[type="file"]').click()} src={profileImage ? profileImage : usuario.fotoPerfil ? usuario.fotoPerfil : Iperfil} alt="perfil" style={{ width: '150px' }} className="bg-light rounded-circle p-1 m-1" id="img-perf1" />
            {showEditPerfilIcon && (
              <Button variant="link" onClick={() => document.querySelector('input[type="file"]').click()} className="edit-icon"><FontAwesomeIcon icon={faEdit} /></Button>
            )}
          </div>
          <div className="bg-light position-absolute start-0 top-0">
            {showEditFondoIcon && (
              <div>
                <input type="file" onChange={(e) => handleFileChange(e, 'background')} style={{ display: 'none' }} />
                <Button variant="link" onClick={() => document.querySelectorAll('input[type="file"]')[1].click()} className="edit-fondo-icon"><FontAwesomeIcon icon={faEdit} /></Button>
              </div>
            )}
          </div>
          <span className="h2">Mi Perfil</span>
        </div>
        <hr />
        <div id="body_oerfil" className="px-3">
          <form action="" className="mx-auto">
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre:</span>
              <input type="text" className="form-control" disabled value={usuario.nombre} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Apellido:</span>
              <input type="text" className="form-control" disabled value={usuario.apellido} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Teléfono:</span>
              <input type="text" className="form-control" disabled value={usuario.telefono} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha Nacimiento:</span>
              <input type="text" className="form-control" disabled value={fechaNacimientoSinHora} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Correo:</span>
              <input type="text" className="form-control" disabled value={usuario.correo} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña:</span>
              <input type="password" className="form-control" disabled value={usuario.contasenia} />
            </div>
          </form>
        </div>
        <hr />
        <div id="foot_perfil" style={IsPerfil ? { display: 'block'}:{display:'none' }} >
          <Link to={`/EditarPerfil/${userId}`} className="btn btn-primary me-2">Editar Perfil</Link>
          <button onClick={handleCambiarContrasenia} className="btn btn-danger me-2">Cambiar Contraseña</button>
          <button onClick={handleEditarFoto} className="btn btn-primary">Editar Foto</button>
        </div>
      </div>
    </Container>
  );
}
