import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
export default function Login({ setPage, setLogin, user }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [/*error,*/ setError] = useState("");

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
		<Container>
      <form className="border rounded-3 bg-light mx-auto mb-3 pb-3" style={{width:'340px'}} onSubmit={handleSubmit}>
        <div className="form-title py-3"><span className="h4">Iniciar Sesión</span></div>
          <div className="px-3">
            <div className="form-floating mb-3 mt-3">
              <input
                  title="Ingrese un correo electrónico"
                  type="email"
                  className="form-control"
                  placeholder="Correo electrónico del usuario"
                  name="correo"
                  onChange={handleChange}
                  id="name-email"
              />
              <label htmlFor="name-email">Correo</label>
            </div>
            <div className="form-floating mb-3 mt-3">
              <input
                  title="Ingrese una contraseña"
                  type="password"
                  className="form-control"
                  placeholder="Contraseña del usuario"
                  name="password"
                  onChange={handleChange}
                  id="name-pass"
              />
              <label htmlFor="name-pass">Contraseña</label>
            </div>
            <div className="form-check">
              <input type="checkbox" className="form-check-input" id="check2" name="Recordarme" value="something"/>
              <label className="form-check-label float-start" htmlFor="check2">Recordarme</label>
            </div>
            <br />
            <br />
            <div className="form-floating mb-3 mt-3">
              <input type="submit" className="btn btn-primary" value='Iniciar Sesiön'/>
            </div>
            <div className="form-floating mb-3 mt-3">
              <a href="/Recuperar" style={{textDecoration:'none'}}><span>¿Olvidaste tu contraseña?</span></a>
            </div>
            <br />
          </div>
      </form>
    </Container>
	);
}
