import React, { useState } from "react";
import "./App.css";
import Barra from "./Barra";
import Cuerpo from "./Cuerpo";
import PiePag from "./PiePag";
// aqui es mejor utilizar etiquetas de react para llamar a los componentes
function App() {
  const [page, setPage1] = useState("landing"); // [estado, funcion que modifica el estado]
  const [login, setLogin1] = useState(false); // [estado, funcion que modifica el estado]
  const setPage = (page) => {
    setPage1(page);
  };
  const setLogin = (login) => {
    console.log("login", login);
    setLogin1(login);
  };
  return (
    <div className="App">
      <header>
        <Barra setPage={setPage} login={login} />
      </header>
      <div>
        <Cuerpo page={page} setPage={setPage} setLogin={setLogin} />
      </div>
      {PiePag()}
    </div>
  );
}

export default App;
