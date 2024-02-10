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
    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validar campos no vacíos
        if (!nombre || !apellido || !correo || !telefono || !contasenia || !fechaNacimiento) {
          alert('Por favor, complete todos los campos.');
          return;
       }


        // Validar formato de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|es|net)$/;
        if (!emailRegex.test(correo)) {
            alert ('Por favor, ingrese un correo electrónico válido (Gmail o Yahoo).');
            return
        }

        // Validar que el teléfono contenga solo números
        const phoneRegex = /^[0-9]+$/;
        if (!phoneRegex.test(telefono)) {
            alert('Por favor, ingrese solo números en el campo de teléfono.');
            return
        }

        // Validar formato de contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(contasenia)) {
            alert('La contraseña debe tener al menos una letra mayúscula y un número, y debe tener al menos 6 caracteres.');
            return
        }

        try {
          const response = await axios.get(`${URI}?correo=${correo}`);
          const usuariosRegistrados = response.data;
          
          // Verificar si algún usuario tiene el mismo correo electrónico
          const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === correo);
          if (usuarioExistente) {
              alert('Este correo electrónico ya está en uso. Por favor, elija otro.');
              return;
          }

    
      } catch (error) {
          console.error('Error al realizar la solicitud HTTP:', error);
          alert('Se produjo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo más tarde.');
      }

       // Si no hay usuarios con el mismo correo, proceder con el registro
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
      window.location.href = '/';  // Redirige al usuario a la página principal

      
      
  }  
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-title"><p>Crea una Cuenta</p></div>
            {/* El campo "rol" estará oculto, pero se enviará con el valor por defecto */}
            <input type="hidden" value={rol} onChange={(e) => setRol(e.target.value)} />
            <div className="form-group">
                <label htmlFor="name-user">Nombre:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresar nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name-user2">Apellido:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ingresar apellido"
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