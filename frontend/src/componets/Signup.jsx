import "../styles/Signup.css";
<<<<<<< HEAD
export default function Signup({ setLogin, setPage, user, setUser }) {
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "nombre" || name === "apellidos") { // solo letras, espacios y acentos, mayúsculas y minúsculas y maximo 40 caracteres
      const regex = /^[a-zA-ZÁáÉéÍíÓóÚúÜüÑñ\s]{1,40}$/;
      if (!regex.test(value)) {
        alert("El nombre solo puede contener letras y espacios, no más de 40 caracteres");
        return;
      }
    }
    if (name === "newPassword" || name === "password" || name === "confirmPass") { // solo letras, números, mayúsculas y minúsculas y maximo 20 caracteres
      const regex = /^[a-zA-Z0-9]{1,20}$/;
      if (!regex.test(value)) {
        alert("La contraseña solo puede contener letras y números, no más de 20 caracteres");
        return;
      }
    }
    if (name === "correo") { // solo letras (minusculas), números, guiones, puntos y arrobas y maximo 40 caracteres
      const regex = /^[a-z0-9-.@]{1,40}$/;
      if (!regex.test(value)) {
        alert("El correo solo puede contener letras, números, guiones, puntos y arrobas, no más de 40 caracteres");
        return;
      }
    }
    if (name === "phone") { // solo números, guiones y espacios, y maximo 15 caracteres
      const regex = /^[0-9-\s]{1,15}$/;
      if (!regex.test(value)) {
        alert("El teléfono solo puede contener números, guiones y espacios, no más de 15 caracteres");
        return;
      }
    }
    if (name === "date" && value > new Date().toISOString().slice(0, 10)) {
      alert("La fecha de nacimiento no puede ser mayor a la fecha actual");
      return;
    }
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }
    setLogin(true);
    // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
    setPage("landing");
  };

=======
export default function Signup({ setLogin, setPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin(true);
    // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
    console.log("Usuario registrado");
    setPage("landing");
  };
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title"><p>Registrarse</p></div>
      <section className="form-group">
        <label htmlFor="name-user">
          Nombres:
        </label>
          <input
            title="Ingrese sus nombres"
            type="text"
            className="form-control"
            placeholder="Nombres del usuario"
<<<<<<< HEAD
            name="nombre"
            onChange={handleChange}
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-user"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-user2">
          Apellidos:
        </label>
          <input
            title="Ingrese sus apellidos"
            type="text"
            className="form-control"
<<<<<<< HEAD
            placeholder="Apellidos del usuario"
            name="apellidos"
            onChange={handleChange}
=======
            placeholder="Nombres del usuario"
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-user2"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-email">
          Correo:
        </label>
          <input
            title="Ingrese un correo electrónico"
            type="email"
            className="form-control"
            placeholder="Correo electrónico del usuario"
<<<<<<< HEAD
            name="correo"
            onChange={handleChange}
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-email"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-phone">
          Número de teléfono:
        </label>
          <input
            title="Ingrese un número de teléfono"
            type="tel"
            className="form-control"
            placeholder="Número de teléfono del usuario"
<<<<<<< HEAD
            name="phone"
            onChange={handleChange}
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-phone"
          />
      </section>
      <section className="form-group">
<<<<<<< HEAD
        <label htmlFor="name-pass">
=======
        <label htmlFor="name-password">
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
          Contraseña:
        </label>
          <input
            title="Ingrese una contraseña"
            type="password"
            className="form-control"
            placeholder="Contraseña del usuario"
<<<<<<< HEAD
            name="password"
            onChange={handleChange}
            id="name-pass"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-password">
          Confirmar contraseña:
        </label>
          <input
            title="Ingrese una contraseña"
            type="password"
            className="form-control"
            placeholder="Confirmar contraseña"
            name="confirmPass"
            onChange={handleChange}
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-password"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-date">
          Fecha de nacimiento:
        </label>
          <input
            title="Ingrese su fecha de nacimiento"
            type="date"
            className="form-control"
            placeholder="Fecha de nacimiento del usuario"
<<<<<<< HEAD
            name="date"
            onChange={handleChange}
=======
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            id="name-date"
          />
      </section>
      <section className="form-group">
        <button type="submit" className="btn-submit">Registrar</button>
      </section>
    </form>
  );
}