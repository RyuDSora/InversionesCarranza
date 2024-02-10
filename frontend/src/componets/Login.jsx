import { useState } from "react";
export default function Login({ setPage, setLogin, user }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
		if (email === "" || password === "") {
			setError("Por favor llene todos los campos");
			alert("Por favor llene todos los campos");
			return;
		}
		if (email !== user.correo || password !== user.password) {
			setError("Correo o contraseña incorrectos");
			alert("Correo o contraseña incorrectos");
			return;
		}
		setError("");
		setLogin(true);
		setPage("perfil");

		// un ejemplo de como se puede hacer el fetch. para guardar y leer datos de la base de datos
    // try {
    //   const response = await fetch("http://localhost:5000/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();
    //   if (data.error) {
    //     setError(data.error);
    //   } else {
    //     setError("");
    //     setLogin(true);
    //     setPage("perfil");
    //   }
    // } catch (err) {
    //   console.error("Error:", error, err);
    // }
  };
	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === "correo") {
			setEmail(value);
		} else {
			setPassword(value);
		}
	}
  return (
		<form onSubmit={handleSubmit}>
      <div className="form-title"><p>Iniciar Sesión</p></div>
      <section className="form-group">
        <label htmlFor="name-email">
          Correo:
        </label>
          <input
            title="Ingrese un correo electrónico"
            type="email"
            className="form-control"
            placeholder="Correo electrónico del usuario"
            name="correo"
            onChange={handleChange}
            id="name-email"
          />
      </section>
      <section className="form-group">
        <label htmlFor="name-pass">
          Contraseña:
        </label>
          <input
            title="Ingrese una contraseña"
            type="password"
            className="form-control"
            placeholder="Contraseña del usuario"
            name="password"
            onChange={handleChange}
            id="name-pass"
          />
      </section>
      <section className="form-group">
        <button type="submit" className="btn-submit">Iniciar</button>
      </section>
    </form>
	);
}
