import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import BGImg from '../imgs/bgimg.jpg';
import Iperfil from '../imgs/perfil.png';
import { useParams } from 'react-router-dom'; // Importa el hook useParams para obtener los parámetros de la URL
import { Link } from 'react-router-dom';


export default function Perfil() {
  const { userId } = useParams(); // Obtiene el userId de los parámetros de la URL
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuarioData = async () => {
      try {
        // Realiza una solicitud GET para obtener la información del usuario desde la base de datos utilizando el userId obtenido de la URL
        const response = await axios.get(`http://`+window.location.hostname+`:8000/usuarios/${userId}`);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsuarioData();
  }, [userId]); // Asegúrate de incluir userId en la lista de dependencias para que se vuelva a cargar cuando cambie

  if (!usuario) {
    return <p>Cargando información del usuario...</p>;
  }

   // Formatear la fecha de nacimiento para eliminar la parte de la hora
   const fechaNacimientoSinHora = new Date(usuario.fechaNacimiento).toISOString().split('T')[0];


  const handleCambiarContrasenia = () => {
    // Aquí puedes obtener el email y el nombre del usuario
    const email = usuario.correo;
    const nombre = usuario.nombre;
  
    // Redirigir a la página CambiarContrasenia con los parámetros en la URL
    window.location.href = `/CambiarContrasenia?correo=${email}&nombre=${nombre}`;
  };

  return (
    <Container className="my-2">
      <div className="border rounded-3 bg-light">
        <div id="header_perfil">
          <div style={{
            width: '100%',
            backgroundImage: 'url(' + BGImg + ')',
            height: '150px', backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
            className="rounded-top-3 bg-light">
          </div>

          <div className="bg-light">
            <img ref={(node) => { node && node.style.setProperty('margin-top', '-50px', 'important') }} src={Iperfil} alt="perfil" style={{ width: '150px' }} className="bg-light rounded-circle p-1 m-1" id="img-perf1" />
          </div>
          <span className="h2">Mi Perfil</span>
          <div></div>
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
        <div id="foot_perfil">
          <Link to={`/EditarPerfil/${userId}`} className="btn btn-primary me-2">Editar Perfil</Link>

          <button onClick={handleCambiarContrasenia} className="btn btn-primary me-2">Cambiar Contraseña</button>
        </div>

        <br />
      </div>
      <br />
    </Container>
  );
}

//al momento de dar click al boton editar perfil, se activan todos los inputs, excepto correo.
//ademas el input de fecha de nacimiento cambia de text->date, 
//el de genero deberia de cambiar o bien a un select o au check/radio con las opciones M,F,N/A
//se agrega un nuevo input bajo el de password para la confirmacion de contraseña
//se agrega un input file al lado de la img de fondo, y al lado de img de perfil
//y por ultimo el boton editar perfil cambiaria por un guardar y otro cancelar
