import { useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const URI = 'http://' + window.location.hostname + ':8000/usuarios/';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setEmailError("");
      setPasswordError("");
      setError("");

      if (!email) {
        setEmailError("Por favor ingrese su correo electrónico");
      }
      if (!password) {
        setPasswordError("Por favor ingrese su contraseña");
      }

      if (email && password) {
        const response = await axios.get(`${URI}?correo=${encodeURIComponent(email)}`);
        const usuariosRegistrados = response.data;
        const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === email);

        if (usuarioExistente && usuarioExistente.contasenia === password) {
          if (rememberMe) {
            localStorage.setItem('UserId', usuarioExistente.id);
            localStorage.setItem('User', usuarioExistente.nombre + ' ' + usuarioExistente.apellido);
          } else {
            sessionStorage.setItem('UserId', usuarioExistente.id);
            sessionStorage.setItem('User', usuarioExistente.nombre + ' ' + usuarioExistente.apellido);
          }
          navigate('/');
          window.location.reload();
        } else {
          setError("Correo o contraseña incorrectos");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Hubo un error al intentar iniciar sesión");
    }
  };

  return (
    <Container className="mt-3">
      <form className="border rounded-3 bg-light shadow mx-auto mb-3 pb-3 was-validate" style={{ width: '340px' }} onSubmit={handleSubmit}>
        <div className="form-title py-3"><span className="h4">Iniciar Sesión</span></div>
        <div className="px-3">
          <div className="form-floating mb-3 mt-3">
            <input
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              placeholder="Correo electrónico del usuario"
              name="correo"
              value={email}
              onChange={handleEmailChange}
            />
            <label>Correo electrónico</label>
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="form-floating mb-3 mt-3">
            <input
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              placeholder="Contraseña del usuario"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label>Contraseña</label>
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div className="form-check ps-5">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMeCheckbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label float-start" htmlFor="rememberMeCheckbox">Recordarme</label>
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
