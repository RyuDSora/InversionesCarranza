
import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Candado from '../imgs/candado-abierto.png';
import { URIUsuarios, URICorreo } from "./Urls.jsx";
import { useNavigate } from 'react-router-dom';

export default function RecuperarLanding() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const generateRandomCode = () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        return code.toString().substring(0, 6); // Devuelve los primeros 6 dígitos del código generado
    };

    const handleSolicitud = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(URIUsuarios + `?correo=${email}`);
            const usuarios = response.data;
            const usuarioExistente = usuarios.find(usuario => usuario.correo === email);

            if (usuarioExistente) {
                const recoveryCode = generateRandomCode(); // Genera el código de recuperación de contraseña
                const correoResponse = await axios.post(URICorreo, {
                    to: email,
                    subject: 'Recuperación de contraseña',
                    text: `Tu código de recuperación de contraseña es: ${recoveryCode}. Por favor, sigue las instrucciones para restablecer tu contraseña.`
                });
                console.log(correoResponse);
                // Redirigir al usuario a la página de cambio de contraseña, pasando el correo y el código de recuperación como parámetros
                navigate(`/CodigoCorreo?correo=${email}&codigo=${recoveryCode}&nombre=${usuarioExistente.nombre}`);
            } else {
                setError('El correo electrónico proporcionado no está registrado');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Hubo un error al procesar la solicitud');
        }
    };

    return (
        <Container>
            <div className='row'>
                <div className='col mt-3 pt-3 mb-3 pb-3'>
                    <img src={Candado} alt='Desbloquear' style={{ width: 200, margin: 0 }} />
                </div>
                <div className='col mt-3 pt-3 mb-3 pb-3'>
                    <div className='mx-auto'>
                        <div style={{ width: 300 }} className='mx-auto'>
                            <p className='h4'>Olvidaste tu Contraseña</p>
                            <form onSubmit={handleSolicitud}>
                                <div className="form-floating mb-3 mt-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Ingrese un correo electrónico"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <label htmlFor="name-email">Correo</label>
                                </div>
                                <p className=''>Ingresa tu correo para hacer un cambio de contraseña</p>
                                <p className='small'>Si no quieres hacer el cambio, <a href='/login' style={{ textDecoration: 'none' }}>Inicia Sesión</a> con tus credenciales actuales</p>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="submit" className="btn btn-primary" value='Mandar Solicitud' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </Container>
    );
}
