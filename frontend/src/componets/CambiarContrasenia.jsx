import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Candado from '../imgs/candado-abierto.png';

export default function CambiarContrasenia(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        // Leer el correo electrónico y nombre de los parámetros de la URL
        const searchParams = new URLSearchParams(window.location.search);
        const correo = searchParams.get('correo');
        const nombre = searchParams.get('nombre');
        setEmail(correo);
        setName(nombre);
    }, []);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        
        // Validar que los campos no estén vacíos
        if (!password || !confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }
        
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validar que la contraseña cumpla con los requisitos
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError('La contraseña debe tener al menos una letra mayúscula y un número, y debe tener al menos 6 caracteres.');
            return;
        }

        try {
            // Realizar una solicitud GET a la API para obtener al usuario por su correo electrónico
            const response = await axios.get(`http://`+window.location.hostname+`:8000/usuarios?correo=${email}`);
            const usuarios = response.data;
            const usuarioExistente = usuarios.find(usuario => usuario.correo === email);
    
            // Verificar si se encontró un usuario con el correo proporcionado
            if (usuarioExistente) {
                // Realizar una solicitud PUT para actualizar la contraseña del usuario
                const updateResponse = await axios.put(`http://`+window.location.hostname+`:8000/usuarios/${usuarioExistente.id}`, {
                    ...usuarioExistente,  // Mantener los datos del usuario excepto la contraseña
                    contasenia: password,  // Actualizar la contraseña
                });
    
                // Verificar si la contraseña se actualizó correctamente
                if (updateResponse.status === 200) {
                    // Mostrar mensaje de éxito
                    alert('Contraseña cambiada exitosamente.');
                    // Redirigir al usuario a la página principal
                    window.location.href = '/';
                }
            } else {
                setError('');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('');
        }
    };

    return (
        <Container>
            <div className="row">
                <div className="col mt-3 pt-3 mb-3 pb-3">
                    <img src={Candado} alt="Desbloquear" style={{ width: 200, margin: 0 }} />
                </div>
                <div className="col mt-3 pt-3 mb-3 pb-3">
                    <div className="mx-auto">
                        <div style={{ width: 300 }} className="mx-auto">
                            <p className="h4">Cambiar Contraseña</p>
                            <p>Hola {name}</p> {/* Mostrar el nombre aquí */}
                            <form onSubmit={handlePasswordChange}>
                                <div className="form-floating mb-3 mt-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Ingrese su nueva contraseña"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <label htmlFor="password">Nueva Contraseña</label>
                                </div>
                                <div className="form-floating mb-3 mt-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirme su nueva contraseña"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                </div>
                                <div className="form-floating mb-3 mt-3">
                                    <input type="submit" className="btn btn-primary" value="Cambiar Contraseña" />
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
