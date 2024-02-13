import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Candado from '../imgs/candado-abierto.png';

export default function RecuperarLanding() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSolicitud = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://`+window.location.hostname+`:8000/usuarios?correo=${email}`);
            const usuarios = response.data;
            const usuarioExistente = usuarios.find(usuario => usuario.correo === email);

            if (usuarioExistente) {
                // Redirigir al usuario a la página de cambio de contraseña, pasando el correo como parámetro
                window.location.href = `/CambiarContrasenia?correo=${email}&nombre=${usuarioExistente.nombre}`;
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