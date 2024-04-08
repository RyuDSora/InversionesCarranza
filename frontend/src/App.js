import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "./App.css";
import {Polices, Term, WeAre} from './componets/Extras.jsx'
import FooterIC           from "./componets/FooterIC.jsx";
import CompRegistro       from "./componets/Signup.jsx";
import Login              from './componets/Login.jsx'
import LandingPage        from "./componets/LandingPage.jsx";
import NavBarIC           from "./componets/NavBariC.jsx";
import RecuperarLanding   from './componets/RecuperarLanding.jsx'
import CambiarContrasenia from "./componets/CambiarContrasenia.jsx";
import Servicios          from './componets/Servicios.jsx'; 
import Perfil             from './componets/Perfil.jsx';
import EditFoto from "./componets/EditarFoto.jsx";
import EditPerfil         from './componets/EditarPerfil.jsx';
import Projects           from './componets/projects.jsx';
import MasProyectos       from "./componets/MasProjectos.jsx";
import ProyectosAdmin     from "./componets/ProyectosAdmin.jsx";
import AgregarAdministrador from './componets/AgregarAdministrador.jsx';
import Usuarios             from "./componets/Usuarios.jsx";
import MasServicios      from "./componets/MasServicios.jsx";
import ServiciosAdmin      from  "./componets/ServiciosAdmin.jsx";
import SolicitudesAdmin      from  "./componets/SolicitudesAdmin.jsx";
import EditServiciosCliente from './componets/EditServiciosCliente.jsx';
import Notificaciones from './componets/Notificaciones.jsx';

function App() {
  

  return (
    <div className="fondo-difuminado">
    <div className="relativo">
      <div className="App ">
        <div className="App">
          <BrowserRouter>
            <header>
              <NavBarIC />
            </header>
            <div >
              <Routes>
                {/**landing */}
                <Route path='/' element={<LandingPage />} />

                {/**usuarios */}
                <Route path="/Signup" element={<CompRegistro />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/Recuperar" element={<RecuperarLanding />} />
                <Route path="/CambiarContrasenia" element={<CambiarContrasenia/>} />
                <Route path="/Users" element={ <Usuarios/>} />
                <Route path="/perfil/:userId" element={<Perfil />} />
                <Route path="/EditarPerfil/:userId" element = {<EditPerfil/>}/>
                <Route path="/EditarFoto/:userId" element = {<EditFoto/>}/>
                <Route path="/AgregarAdministrador" element={ <AgregarAdministrador/>} />

                {/**notificaciones */}
                <Route path="/Notificaciones" element={ <Notificaciones/>} />

                {/**Servicios */}
                <Route path="/Servicios" element={ <Servicios /> } />
                <Route path="/Mas-Servicios/:idServicioPadre" element={<MasServicios />} />
                <Route path="/ServiciosAdmin" element={ <ServiciosAdmin/>} />
                

                {/**Proyectos */}
                <Route path="/Proyectos" element={ <Projects/> } />
                <Route path="/Proyectos/:Id" element={ <MasProyectos/>} />
                <Route path="/EditPr" element={ <ProyectosAdmin/>} />

                {/**otros */}
                
                <Route path="/Polices" element={ <Polices/>} />
                <Route path="/Term" element={ <Term/>} />
                <Route path="/WeAre" element={ <WeAre/>} />
                <Route path="/SolicitudesAdmin" element={ <SolicitudesAdmin/>} />

                {/**Aquí se muestra la tabla de las solicitudes que ha hecho el cliente*/}
                <Route path="/EditServiciosCliente/" element={ <EditServiciosCliente />} />

              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </div>
      <footer style={{textAlign:'center'}} className="bg-light ">{<FooterIC/>}</footer>
    </div>
    </div>
  );
}

export default App;
