import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Candado from '../imgs/candado-abierto.png';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CodigoCorreo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [codigo, setCodigo] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const correo = new URLSearchParams(location.search).get('correo');
        const codigoGenerado = new URLSearchParams(location.search).get('codigo');
        const nombre = new URLSearchParams(location.search).get('nombre'); // Obtener el nombre del usuario

        if (codigo === codigoGenerado) {
            navigate(`/CambiarContrasenia?correo=${correo}&nombre=${nombre}`); // Redirigir con el nombre del usuario
        } else {
            setError('Código incorrecto, por favor intenta de nuevo');
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
                            <h4>Verificación de Código</h4>
                            <p>Se ha enviado un correo con un código de verificación.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3 mt-3">
                                    <input
                                        type="text"
                                        className="form-control text-center" // Añade la clase text-center para centrar el texto
                                        id="codigo"
                                        placeholder="Ingrese el código de verificación"
                                        value={codigo}
                                        onChange={(e) => setCodigo(e.target.value)}
                                    />
                                    {!codigo && <label htmlFor="codigo" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>- - - - - -</label>}
                                </div>
                                <button type="submit" className="btn btn-primary">Verificar Código</button>
                            </form>
                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
