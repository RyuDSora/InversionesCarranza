import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import FooterIC from "./componets/FooterIC.jsx";
import CompRegistro from "./componets/Signup.jsx";
import Login from './componets/Login.jsx'
import LandingPage from "./componets/LandingPage.jsx";
import NavBarIC from "./componets/NavBariC.jsx";
import RecuperarLanding from './componets/RecuperarLanding.jsx'
import CambiarContrasenia from "./componets/CambiarContrasenia.jsx";
import Construccion from './componets/Construccion.jsx';
import Remodelaciones from './componets/Remodelaciones.jsx';
import Servicios from './componets/Servicios.jsx'; 
import Perfil from './componets/Perfil.jsx';
import EditPerfil from './componets/EditarPerfil.jsx';
import Projects from './componets/projects.jsx';



function App() {

  return (
    <div className="App">
      <div >
        <BrowserRouter>
          <header>
            <NavBarIC />
          </header>
          <div>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path="/Signup" element={<CompRegistro />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/Recuperar" element={<RecuperarLanding />} />
              <Route path="/CambiarContrasenia" element={<CambiarContrasenia/>} />
              <Route path="/Servicios" element={ <Servicios /> } />
              <Route path="/Construccion" element={<Construccion />} />
              <Route path="/Remodelaciones" element={<Remodelaciones />} />
              <Route path="/perfil/:userId" element={<Perfil />} />
              <Route path="/EditarPerfil/:userId" element = {<EditPerfil/>}/>
              <Route path="/Proyectos" element={ <Projects/> } />
            </Routes>
          </div>
          {FooterIC()}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
