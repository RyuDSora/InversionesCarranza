import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
export default function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [check, setCheck] = useState(false);

  const URI = 'http://localhost:8000/usuarios/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password ) {
        setError("Por favor llene todos los campos");
        return;
      }

      // Realiza la petición a la API para verificar las credenciales
      const response = await axios.get(`${URI}?correo=${email}`);
      const usuariosRegistrados = response.data;
      const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === email);
      

      // Verifica si la autenticación fue exitosa
      if (usuarioExistente && usuarioExistente.contasenia === password ) {
        //ir a la pagina principal ya logueado  
        if(check){
          console.log('agregar cookies permanente');
        }
        alert('correcto');
        window.location.href = '/';
      } else {
        setError("Correo o contraseña incorrectos");
        return;
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un error al intentar iniciar sesión");
      return;
    }
  };


  return (
    <Container>
      <form className="border rounded-3 bg-light mx-auto mb-3 pb-3" style={{ width: '340px' }} onSubmit={handleSubmit}>
        <div className="form-title py-3"><span className="h4">Iniciar Sesión</span></div>
        <div className="px-3">
          <div className="form-floating mb-3 mt-3">
            <input
              title="Ingrese un correo electrónico"
              type="email"
              className="form-control"
              placeholder="Correo electrónico del usuario"
              name="correo"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              id="name-pass"
            />
            <label htmlFor="name-pass">Contraseña</label>
          </div>
          <div className="form-check ps-5">
            <input type="checkbox" className="form-check-input" id="check2" name="Recordarme" value="something" onChange={(e) => setCheck(e.target.checked)}/>
            <label className="form-check-label float-start" htmlFor="check2">Recordarme</label>
          </div>
          <br />
          <br />
          <div className="form-floating mb-3 mt-3">
            <input type="submit" className="btn btn-primary" value='Iniciar Sesión' />
          </div>
          <div className="form-floating mb-3 mt-3">
            <a href="/Recuperar" style={{ textDecoration: 'none' }}><span>¿Olvidaste tu contraseña?</span></a>
          </div>
          <br />
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </Container>
  );
}

