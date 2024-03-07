import { useState,useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

export default function Login() {
  const navigate = useNavigate();
  useEffect(()=>{if(Cookies.get('session')){navigate('/');}},[])
  const encryptionKey = 'mysecretkey';
  const encryptValue = (value, key) => {
    return CryptoJS.AES.encrypt(value.toString(), key).toString();
  };
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
            Cookies.set('UserId',encryptValue(usuarioExistente.id, encryptionKey),{expires:30});
            Cookies.set('UserRol',encryptValue(usuarioExistente.rol, encryptionKey),{expires:30});
            Cookies.set('User',encryptValue(usuarioExistente.nombre + ' ' + usuarioExistente.apellido, encryptionKey),{expires:30});
            Cookies.set('session',true,{expires:30});
          } else {
            Cookies.set('UserId',encryptValue(usuarioExistente.id, encryptionKey));
            Cookies.set('UserRol',encryptValue(usuarioExistente.rol, encryptionKey));
            Cookies.set('User',encryptValue(usuarioExistente.nombre + ' ' + usuarioExistente.apellido, encryptionKey));
            Cookies.set('session',true);
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
