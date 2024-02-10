import "../styles/Signup.css";
export default function Signup({ setLogin, setPage }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin(true);
    // Aquí puedes realizar la lógica para guardar los cambios en la base de datos
    console.log("Usuario registrado");
    setPage("landing");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-title"><p>Crea una Cuenta</p></div>
      <section className="form-group">
        <label htmlFor="name-user">
          Nombre:
        </label>
          <input
            title="Ingrese sus nombres"
            type="text"
            className="form-control"
            placeholder="Nombres del usuario"
            id="name-user"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-user2">
          Apellido:
        </label>
          <input
            title="Ingrese sus apellidos"
            type="text"
            className="form-control"
            placeholder="Nombres del usuario"
            id="name-user2"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-email">
          Correo
        </label>
          <input
            title="Ingrese un correo electrónico"
            type="email"
            className="form-control"
            placeholder="Correo electrónico del usuario"
            id="name-email"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-phone">
          Teléfono:
        </label>
          <input
            title="Ingrese un número de teléfono"
            type="tel"
            className="form-control"
            placeholder="Número de teléfono del usuario"
            id="name-phone"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-password">
          Contraseña
        </label>
          <input
            title="Ingrese una contraseña"
            type="password"
            className="form-control"
            placeholder="Contraseña del usuario"
            id="name-password"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-date">
          Nacimiento:
        </label>
          <input
            title="Ingrese su fecha de nacimiento"
            type="date"
            className="form-control"
            placeholder="Fecha de nacimiento del usuario"
            id="name-date"
          />
      </section>
      <section className="form-group">
        <button type="submit" className="btn-submit">Registrar</button>
      </section>
    </form>
  );
}
