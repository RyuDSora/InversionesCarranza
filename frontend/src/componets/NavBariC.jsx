import inversionesCarranza from "../imgs/InversionesCarranza.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, Button } from "react-bootstrap";
import "../App.css";
import perfil from '../imgs/perfil.png';
import Cookies from 'js-cookie';
import { encryptionKey,decryptValue } from "./hashes.jsx";
import { useNavigate } from 'react-router-dom';
import Solicitudes from './Solicitudes.jsx'; // Importa el formulario de solicitudes

export default function NavBarIC() {
  const navigate = useNavigate();
  const [Admin,setAdmin] = useState(false);
  const [user,setUser] = useState(false);
  const [UserL,setUserL] = useState('');
  const [UserId,setUserId] = useState('');
  const [services,setServicios] = useState(false);
  const [Login,setLogin]=useState(false); 
  const [home,sethome]=useState(false); 
  const [project,setproject]=useState(false); 
  const [register,setregister]=useState(false);  
  const [requestService, setRequestService] = useState(false);
  const [modalShow, setModalShow] = useState(false); // Nuevo estado para controlar la visualización del modal

  var URLactual = window.location.pathname;

  //recuperar datos
  useEffect(()=>{
    if( URLactual === '/Servicios') {setServicios(true)}
    if( URLactual === '/login')     {setLogin(true)}
    if( URLactual === '/')          {sethome(true)}
    if( URLactual === '/Proyectos') {setproject (true)}
    if( URLactual === '/Signup')    {setregister(true)}
    if( URLactual === '/Solicitudes') {setRequestService(true)} // Verificar si estamos en la página de "Solicitar Servicio"

    if(Cookies.get('session')){
      setUser(true); 
      setUserL(decryptValue(Cookies.get('User'), encryptionKey));
      setUserId(+decryptValue(Cookies.get('UserId'), encryptionKey)); // Asignamos el ID del usuario
      if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===1){setAdmin(true)};
    }
  },[URLactual])

  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);
  
  
  return (
    <Navbar expand="lg" className="pt-0 bg-light ">
      <Container className="px-3 pb-3 pt-3">
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

  <Nav.Link href="/" className={home && !requestService ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
    ¿Quiénes somos?
  </Nav.Link>
  <Nav.Link href="/Servicios" className={services && !requestService ? 'text-success text-uppercase not-active mx-3' :"mx-3"} id="servicios">
    Servicios
  </Nav.Link>
  {user && !Admin && <Nav.Link onClick={handleShow} className={requestService ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
            Solicitar Servicio
          </Nav.Link>}
  <Nav.Link href="/Proyectos" className={project && !requestService ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
    Proyectos
  </Nav.Link>
  {user ? 
  (<>
  <Dropdown>
      <Dropdown.Toggle id="dropdown-basic" className="btn-light">
        <img src={perfil} alt="perfil-img" style={{width:'30px', paddingRight:'5px'}}/>
        {UserL}
      </Dropdown.Toggle>
      <Dropdown.Menu >
        <Dropdown.Item onClick={ ()=>{window.location.href = `/Perfil/${UserId}`}} >Mi Perfil</Dropdown.Item>
                {Admin ? /*comprobamo si es administrador: si lo es mostrara la siguiente lista*/  (<>
                  <Dropdown.Item onClick={ ()=>{navigate(`/AgregarAdministrador`)}} >Agregar Admin</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{navigate(`/solicitudes`)}} >Solicitudes</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{navigate(`/Users`)}} >Ver Usuarios</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{navigate(`/ServiciosAdmin`)}} >Editar Servicios</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{navigate(`/EditPr`)}} >Editar Proyectos</Dropdown.Item>
                </>):(<>
                {/**opciones cuando ingresa como cliente*/}
                <Dropdown.Item onClick={ ()=>{navigate(`/mysolicitud`)}} >Mis Solicitudes</Dropdown.Item>
                </>)}
                <Dropdown.Item onClick={()=>{ Cookies.remove('session');
                                              Cookies.remove('User');
                                              Cookies.remove('UserId');
                                              Cookies.remove('UserRol');
                                              navigate('/');window.location.reload();}}>
                  Cerrar Sesion
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </>):
          (<>
            <Nav.Link href="/login" className={Login ? 'text-success text-uppercase not-active mx-3 order-1' :"mx-3"}>
            Inicia Sesión
            </Nav.Link>
            <Nav.Link href="/Signup"  className={register ? 'text-success text-uppercase not-active mx-3 order-2' :"mx-3"}>
            Registrarse
          </Nav.Link></>
          )}
        </Navbar.Collapse>
      </Container>
      <Modal show={modalShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Solicitudes /> {/* Aquí se muestra el formulario de solicitudes */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>


    </Navbar>
  );
}
