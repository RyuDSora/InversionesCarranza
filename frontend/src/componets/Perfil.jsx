import React, { useState } from "react";

export default function Perfil({ setLogin, setPage }) {
  const [usuario, setUsuario] = useState({
    nombre: "John Doe",
    email: "johndoe@example.com",
    contraseña: "********",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
    console.log("Usuario actualizado:", usuario);
  };

	const logout = () => {
		setLogin(false);
	}

  return (
    <section className="perfil-user">
      <h1>Perfil de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="contraseña"
            value={usuario.contraseña}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
				<button onClick={() => { 
						logout();
						setPage("landing"); 
				}} type="button">Cerrar Sesión</button>
      </form>
    </section>
  );
}
