import "../styles/Signup.css";
import axios from "axios";
import { useState } from "react";


//npm install axios react-router-dom, instalar esa dependecia
import { useNavigate } from "react-router-dom";

const URI = 'http://localhost:8000/usuarios/';

const CompRegistro = () => {
    const [rol, setRol] = useState(2); // Valor por defecto
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contasenia, setContasenia] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const navigate = useNavigate();

    // Procedimiento guardar
    const store = async (e) => {
        e.preventDefault();

        try {
          await axios.post(URI, {
              rol: rol,
              nombre: nombre,
              apellido: apellido,
              correo: correo,
              telefono: telefono,
              contasenia: contasenia,
              fechaNacimiento: fechaNacimiento
          });
          console.log("Usuario registrado exitosamente.");
  
          // Redirigir al usuario a la página principal después del registro
          console.log("Redirigiendo...");
          navigate('/');
      } catch (error) {
          console.error('Error al guardar el usuario:', error);
      }
  }  
    

    return (
        <form onSubmit={store}>
            <div className="form-title"><p>Crea una Cuenta</p></div>
            {/* El campo "rol" estará oculto, pero se enviará con el valor por defecto */}
            <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)} />
            <div className="form-group">
                <label htmlFor="name-user">Nombre:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese sus nombres"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-user2">Apellido:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingrese sus apellidos"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-email">Correo:</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Ingrese un correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-phone">Teléfono:</label>
                <input
                    type="tel"
                    className="form-control"
                    placeholder="Ingrese un número de teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-password">Contraseña:</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Ingrese una contraseña"
                    value={contasenia}
                    onChange={(e) => setContasenia(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-date">Fecha de Nacimiento:</label>
                <input
                    type="date"
                    className="form-control"
                    placeholder="Ingrese su fecha de nacimiento"
                    value={fechaNacimiento}
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn-submit">Registrar</button>
            </div>
        </form>
    );
}

export default CompRegistro;