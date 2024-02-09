import React, { useState } from "react";
<<<<<<< HEAD
import "../styles/Perfil.css";

export default function Perfil({ setLogin, setPage, user, setUser }) {
  const [editando, setEditando] = useState(false);
  const [newPass, setNewPass] = useState({});

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "nombre") { // solo letras, espacios y acentos, mayúsculas y minúsculas y maximo 40 caracteres
      const regex = /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]{1,40}$/;
      if (!regex.test(value)) {
        alert("El nombre solo puede contener letras y espacios, no más de 40 caracteres");
        return;
      }
    }
    if (name === "newPassword" || name === "password" || name === "confirmPassword") { // solo letras, números, mayúsculas y minúsculas y maximo 20 caracteres
      const regex = /^[a-zA-Z0-9]{1,20}$/;
      if (!regex.test(value)) {
        alert("La contraseña solo puede contener letras y números, no más de 20 caracteres");
        return;
      }
    }
    setNewPass({
      ...newPass,
      [name]: value,
=======

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
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    if (newPass.password !== user.password) {
      alert("La contraseña actual no coincide");
      return;
    }
    if (newPass.newPassword !== newPass.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if(newPass.nombre !== user.nombre) {
      alert("El nombre de usuario no coincide con el registrado");
      return;
    }
    user.password = newPass.newPassword;
    // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
    setUser(user);
    setEditando(false);
    setPage("landing");
  };

  const logout = () => {
    // Aquí puedes realizar la lógica para cerrar la sesión
    // esto solo es un ejemplo y no es seguro
    setLogin(false);
    setPage("landing");
  };

  return (
    <section className="perfil-user">
      {editando ? (<h1>Cambio de contraseña</h1>):
      (<h1>Perfil del usuario</h1>)}
      
        {editando ? (
          <>
            <section className="form-group user-data">
              <label>Nombre:</label>
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
              />
            </section>
            <section className="form-group user-data">
              <label>Contraseña actual:</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
              />
            </section>
            <section className="form-group user-data">
              <label>Nueva contraseña:</label>
              <input
                type="password"
                name="newPassword"
                onChange={handleChange}
              />
            </section>
            <section className="form-group user-data">
              <label>Confirmar contraseña:</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={handleChange}
              />
            </section>
          </>
        ) : (
          <>
            <section className="form-group user-data">
              <label>Nombre:</label>
              <p>{user.nombre}</p>
            </section>
            <section className="form-group user-data">
              <label>Apellidos:</label>
              <p>{user.apellidos}</p>
            </section>
            <section className="form-group user-data">
              <label>Email:</label>
              <p>{user.correo}</p>
            </section>
            <section className="form-group user-data">
              <label>Teléfono:</label>
              <p>{user.phone}</p>
            </section>
            <section className="form-group user-data">
              <label>Nacimiento:</label>
              <p>{user.date}</p>
            </section>
          </>
        )}
      <section className="form-group user-data">
          {!editando && <button onClick={() => setEditando(!editando)}>Cambiar contraseña</button>}
        
        {editando && <button onClick={handleSubmit}>Guardar cambios</button>}
        <button onClick={logout}>Cerrar sesión</button>
      </section>
=======
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
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
    </section>
  );
}
