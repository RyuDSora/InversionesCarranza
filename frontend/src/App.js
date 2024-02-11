import React, { useState } from "react";
import "./App.css";
import FooterIC from "./componets/FooterIC.jsx";
import CompRegistro from "./componets/Signup.jsx";
import Login from './componets/Login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from "./componets/LandingPage.jsx";
import NavBarIC from "./componets/NavBariC.jsx";
import RecuperarLanding from './componets/RecuperarLanding.jsx'


// aqui es mejor utilizar etiquetas de react para llamar a los componentes
function App() {
  const [/*page,*/ setPage1] = useState("landing"); // [estado, funcion que modifica el estado]
  const [login, /*setLogin1*/] = useState(false); // [estado, funcion que modifica el estado]
  //const [/*user,*/ setUser1] = useState({}); // estos datos son de prueba, deberían ser obtenidos de la base de datos

  const setPage = (page) => {
    setPage1(page);
  };
  /*const setLogin = (login) => {

    setLogin1(login);
  };
  const setUser = (user) => {
    setUser1(user);
  };*/

  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <NavBarIC setPage={setPage} login={login} />
        </header>
        <div>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path="/Signup" element={<CompRegistro />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/Recuperar" element={<RecuperarLanding />} />
          </Routes>
        </div>
        {FooterIC()}
      </BrowserRouter>
    </div>
  );
}

export default App;
