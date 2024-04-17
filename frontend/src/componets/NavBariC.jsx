import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Dropdown, Modal, Badge } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { encryptionKey, decryptValue } from "./hashes.jsx";
import inversionesCarranza from "../imgs/InversionesCarranza.png";
import perfil from '../imgs/perfil.png';
import Solicitudes from './Solicitudes'; // Importa el componente de Solicitudes
import Notificaciones from './Notificaciones'; // Importa el componente de Notificaciones
import { BiBell } from "react-icons/bi"; // Importa el icono de la campanilla
import { URIgetNotification } from './Urls';
import axios from 'axios';

export  function Circle(){

  return (
    <div id="circle">

    </div>
  )
}
export default function NavBarIC() {
  const navigate = useNavigate();
  const [Admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [UserL, setUserL] = useState('');
  const [UserId, setUserId] = useState('');
  const [services, setServicios] = useState(false);
  const [Login, setLogin] = useState(false);
  const [home, setHome] = useState(false);
  const [project, setProject] = useState(false);
  const [register, setRegister] = useState(false);
  const [requestService, setRequestService] = useState(false);
  const [modalShow, setModalShow] = useState(false); // Nuevo estado para controlar la visualización del modal
  const [showNotifications, setShowNotifications] = useState(false); // Estado para controlar la visualización de las notificaciones
  const [notification,setNofitication]=useState([]);
  var URLactual = window.location.pathname;

  //Ver
 

  
  const obtenerNotificaciones = async (UserId) => {
    try {
      const response = await axios.get(URIgetNotification + `/${UserId}`);
   
      setNofitication(response.data);
    } catch (error) {
      console.error('Error al obtener las notificaciones:', error);
    }
  };
  useEffect(() => {
    
    
    const fetchData = async () => {
      setServicios(URLactual === '/Servicios');
      setLogin(URLactual === '/login');
      setHome(URLactual === '/');
      setProject(URLactual === '/Proyectos');
      setRegister(URLactual === '/Signup');
      setRequestService(URLactual === '/Solicitudes');
  
      if (Cookies.get('session')) {
        setUser(true);
        setUserL(decryptValue(Cookies.get('User'), encryptionKey));
        setUserId(+decryptValue(Cookies.get('UserId'), encryptionKey));
        console.log(+decryptValue(Cookies.get('UserId'), encryptionKey)); // Asignamos el ID del usuario
        await obtenerNotificaciones(+decryptValue(Cookies.get('UserId'), encryptionKey));
         
        
        if (+decryptValue(Cookies.get('UserRol'), encryptionKey) === 1) {
          setAdmin(true);
        }
      }
    };
    
    fetchData(); // Llama a la función asíncrona fetchData
    
  }, [URLactual]);

  //funcion que 
  const updateNotification= async (UserId)=>{
    if(UserId!==undefined)
    {await obtenerNotificaciones(UserId)}
  }

  //funcio que verifica si hay notificaciones cada 100 milisegundos
  setTimeout(() => {

   

    try{
      const usuario= +decryptValue(Cookies.get('UserId'), encryptionKey);
      updateNotification(usuario);
    }catch(e){}
    
  }, 1000); 
  
  

  const handleLogout = () => {
    Cookies.remove('session');
    Cookies.remove('User');
    Cookies.remove('UserId');
    Cookies.remove('UserRol');
    navigate('/');
    window.location.reload();
  };

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);



  

  return (
    <Navbar expand="lg" className="pt-0 bg-light ">
      <Container className="px-3 pb-3 pt-3 d-flex align-items-center">
        <Navbar.Brand href='/'>
          <img
            src={inversionesCarranza}
            alt="InversionesCarranza"
            className="rounded"
            style={{ width: 200, margin: 0 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Nav.Link href="/" className={home && !requestService ? 'text-success text-uppercase not-active mx-3' : "mx-3"}>
              ¿Quiénes somos?
            </Nav.Link>
            <Nav.Link href="/Servicios" className={services && !requestService ? 'text-success text-uppercase not-active mx-3' : "mx-3"} id="servicios">
              Servicios
            </Nav.Link>
            <Nav.Link href="/Proyectos" className={project && !requestService ? 'text-success text-uppercase not-active mx-3' : "mx-3"}>
              Proyectos
            </Nav.Link>
            {user && !Admin && <Nav.Link onClick={handleShow} className={requestService ? 'text-success text-uppercase not-active mx-3' : "mx-3"}>
              Solicitar Servicio
            </Nav.Link>}
            {user && !Admin && (
              <button className="btn btn-light mx-3" onClick={() => setShowNotifications(true)}>
                
                {
  (() => {
    for (let n of notification) {
      if (!n.leido) {
        return <Circle key={n.id}></Circle>;
      }
    }
    return null; // En caso de que no haya notificaciones no leídas
  })()
}

                <BiBell />
                
                <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                </Badge>
              </button>
            )}
          </div>
          {user ?
            (<>
               <Dropdown>
  <Dropdown.Toggle id="dropdown-basic" className="btn-light">
    <img src={perfil} alt="perfil-img" style={{ width: '30px', paddingRight: '5px' }} />
    {UserL}
  </Dropdown.Toggle>
  <Dropdown.Menu>
    <div style={{ marginLeft: '-10px' }}>
      <Dropdown.Item onClick={() => navigate(`/Perfil/${UserId}`)} className="mx-3">Mi Perfil</Dropdown.Item>
      {Admin ? (
        <>
          <Dropdown.Item onClick={() => navigate(`/AgregarAdministrador`)} className="mx-3">Agregar Admin</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/solicitudesAdmin`)} className="mx-3">Administrador de Solicitudes</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/Users`)} className="mx-3">Ver Usuarios</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/ServiciosAdmin`)} className="mx-3">Editar Servicios</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/EditPr`)} className="mx-3">Editar Proyectos</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate(`/AdminNotificar`)} className="mx-3">Notificar</Dropdown.Item>
          <div className="d-flex justify-content-between align-items-center mx-3">
          </div>
        </>
      ) : (
        <Dropdown.Item onClick={() => navigate(`/EditServiciosCliente`)} className="mx-3">Mis Solicitudes</Dropdown.Item>
      )}
      <Dropdown.Item onClick={handleLogout} className="mx-3">Cerrar Sesión</Dropdown.Item>
    </div>
  </Dropdown.Menu>
</Dropdown>



            </>) :
            (<>
              <Nav.Link href="/login" className={Login ? 'text-success text-uppercase not-active mx-3 order-1' : "mx-3"}>
                Inicia Sesión
              </Nav.Link>
              <Nav.Link href="/Signup" className={register ? 'text-success text-uppercase not-active mx-3 order-2' : "mx-3"}>
                Registrarse
              </Nav.Link>
            </>)
          }
        </Navbar.Collapse>
      </Container>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Solicitudes userId={UserId} />
        </Modal.Body>
      </Modal>
      <Modal show={showNotifications} onHide={() => setShowNotifications(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Notificaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Notificaciones idUsuario={UserId} />
        </Modal.Body>
      </Modal>
    </Navbar>
  );
} 
