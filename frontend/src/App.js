import React, { useState } from "react";
import "./App.css";
import Barra from "./Barra";
import Cuerpo from "./Cuerpo";
import PiePag from "./PiePag";
// aqui es mejor utilizar etiquetas de react para llamar a los componentes
function App() {
  const [page, setPage1] = useState("landing"); // [estado, funcion que modifica el estado]
  const [login, setLogin1] = useState(false); // [estado, funcion que modifica el estado]
<<<<<<< HEAD
  const [user, setUser1] = useState({}); // estos datos son de prueba, deberían ser obtenidos de la base de datos
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
  const setPage = (page) => {
    setPage1(page);
  };
  const setLogin = (login) => {
<<<<<<< HEAD
    setLogin1(login);
  };
  const setUser = (user) => {
    setUser1(user);
  };
  return (
    <div className="App">
      <header>
        <Barra setPage={setPage} login={login} user={user} setUser={setUser} />
      </header>
      <div>
        <Cuerpo page={page} setPage={setPage} setLogin={setLogin} user={user} setUser={setUser} />
=======
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
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
      </div>
      {PiePag()}
    </div>
  );
}

export default App;
