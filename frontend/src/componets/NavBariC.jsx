import inversionesCarranza from "../imgs/InversionesCarranza.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState, useEffect } from 'react';
import { Dropdown } from "react-bootstrap";
import "../App.css";
import perfil from '../imgs/perfil.png';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { } from 'react-router-dom';

export default function NavBarIC() {
  const [Admin,setAdmin] = useState(false);//verificar si es administrador
  const [user,setUser] = useState(false);//variable para comprobar un login
  const [UserL,setUserL] = useState('');//nombre de usuario
  const [UserId,setUserId] = useState('');//id usuario
  const [services,setServicios] = useState(false);
  const [Login,setLogin]=useState(false); 
  const [home,sethome]=useState(false); 
  const [project,setproject]=useState(false); 
  const [register,setregister]=useState(false);  

  var URLactual = window.location.pathname;
  //desencriptar cookies
  const encryptionKey = 'mysecretkey';
  const decryptValue = (encryptedValue, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  //recuperar datos
  useEffect(()=>{
    if( URLactual === '/Servicios') {setServicios(true)}
    if( URLactual === '/login')     {setLogin(true)}
    if( URLactual === '/')          {sethome(true)}
    if( URLactual === '/Proyectos') {setproject (true)}
    if( URLactual === '/Signup')    {setregister(true)}


    if(Cookies.get('session')){
      setUser(true); 
      setUserL(decryptValue(Cookies.get('User'), encryptionKey));
      setUserId(+decryptValue(Cookies.get('UserId'), encryptionKey)); // Asignamos el ID del usuario
      if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===1){setAdmin(true)};
    }
  },[URLactual])
  
  
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

          <Nav.Link href="/" className={home ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
            ¿Quiénes somos?
          </Nav.Link>
          <Nav.Link href="/Servicios" className={services ? 'text-success text-uppercase not-active mx-3' :"mx-3"} id="servicios">
            Servicios
          </Nav.Link>
          <Nav.Link href="/Proyectos" className={project ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
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
                  <Dropdown.Item onClick={ ()=>{window.location.href = `/AgregarAdministrador`}} >Agregar Admin</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{window.location.href = `/Users`}} >Ver Usuarios</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{window.location.href = `/AgregarServicioAdmin`}} >Editar Servicios</Dropdown.Item>
                  <Dropdown.Item onClick={ ()=>{window.location.href = `/EditPr`}} >Editar Proyectos</Dropdown.Item>
                </>):(<></>)}
                <Dropdown.Item onClick={()=>{ Cookies.remove('session');
                                              Cookies.remove('User');
                                              Cookies.remove('UserId');
                                              Cookies.remove('UserRol');
                                              window.location.href = '/';}}>
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
    </Navbar>
  );
}




