import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, ButtonGroup, Table } from 'react-bootstrap';
import axios from 'axios';
import Container from "react-bootstrap/Container"; // Importar correctamente Container
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';/////////encriptar y desencriptar datos
import Stop from './Stop.jsx'/////////////modulo de aviso -->Alto

const URI = 'http://'+window.location.hostname+':8000/usuarios/';

const AgregarAdministrador = () => {

        
        //importante para desencripatar el rol de usuario de las cookie
        const encryptionKey = 'mysecretkey';
        const decryptValue = (encryptedValue, key) => {
          const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
          return bytes.toString(CryptoJS.enc.Utf8);
        };

    const navigate = useNavigate();
    useEffect(() => {
        try {
            if (Cookies.get('session')) {
                navigate('/AgregarAdministrador');
            }
        } catch (error) {
            console.error('Error en useEffect:', error);
        }
    }, []);
    const [rol, setRol] = useState(1);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contasenia, setContasenia] = useState('');
    const [Ccontasenia, setCcontasenia] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos no vacíos
        if (!nombre || !apellido || !correo || !telefono || !contasenia || !fechaNacimiento) {
            setError('Por favor, complete todos los campos.');
            return;
        }

        // Validar formato de correo electrónico
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.(com|es|net)$/;
        if (!emailRegex.test(correo)) {
            setError('Por favor, ingrese un correo electrónico válido (Gmail o Yahoo).');
            return;
        }

        // Validar que el teléfono contenga solo números
        const phoneRegex = /^\d{8}$/;
        if (!phoneRegex.test(telefono)) {
            setError('Por favor, ingrese solo números en el campo de teléfono.');
            return;
        }

        // Validar formato de contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;
        if (!passwordRegex.test(contasenia)) {
            setError('La contraseña debe tener al menos una letra mayúscula y un número, y debe tener al menos 6 caracteres.');
            return;
        }

        // Validar que las contraseñas coincidan
        if (Ccontasenia !== contasenia) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        try {
            const response = await axios.get(`${URI}?correo=${correo}`);
            const usuariosRegistrados = response.data;

            // Verificar si algún usuario tiene el mismo correo electrónico
            const usuarioExistente = usuariosRegistrados.find(usuario => usuario.correo === correo);
            if (usuarioExistente) {
                setError('Este correo electrónico ya está en uso. Por favor, elija otro.');
                return;
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

            // Mostrar mensaje de éxito con alert
            alert('Usuario registrado exitosamente, ya puede iniciar sesión');

            // Redirigir al usuario a la página principal
            // sessionStorage.setItem('User', nombre+' '+apellido);
            window.location.href = '/login';  // Redirige al usuario a la página principal
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
            setError('Se produjo un error al intentar registrar al usuario. Por favor, inténtelo de nuevo más tarde.');
        }
    };

    // Función para limpiar los campos del formulario
    const handleCancel = () => {
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setContasenia('');
        setCcontasenia('');
        setFechaNacimiento('');
    };

       ///comprobacion de ruta
       if(!Cookies.get('session')){return Stop(false)}else{
        if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true)}
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <h2 className="text-center mt-5">Agregar Administrador</h2>
                    <Card className="mt-5">
                        <Card.Body>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <Form onSubmit={handleSubmit} className="mt-5">
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" value={nombre} onChange={e => setNombre(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control type="text" value={apellido} onChange={e => setApellido(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formTelefono">
                                    <Form.Label>Teléfono</Form.Label>
                                    <Form.Control type="text" value={telefono} onChange={e => setTelefono(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formFechaNacimiento">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" value={correo} onChange={e => setCorreo(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" value={contasenia} onChange={e => setContasenia(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="formConfirmPassword">
                                    <Form.Label>Confirmar Contraseña</Form.Label>
                                    <Form.Control type="password" value={Ccontasenia} onChange={e => setCcontasenia(e.target.value)} />
                                </Form.Group>
                                <br />
                                <ButtonGroup className="d-flex justify-content-between">
                                    <Button variant="primary" type="submit" className="mr-2" style={{ padding: '5px 10px', borderRadius: '8px', marginRight: '10px' }}>
                                        Agregar Administrador
                                    </Button>
                                    <Button variant="secondary" onClick={handleCancel} style={{ padding: '10px 20px', borderRadius: '8px' }}>
                                        Limpiar
                                    </Button>
                                </ButtonGroup>
                                <br /> <br />
                            </Form>
                        </Card.Body>
                    </Card>
                    <h2 className="text-center mt-5">Lista de nuevos Administradores</h2>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Table striped bordered hover className="mt-5">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Teléfono</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Email</th>
                                    <th>Contraseña</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Aquí debes iterar sobre la lista de administradores */}
                                {/* {administradores.map((admin, index) => (
                                    <tr key={index}>
                                        <td>{admin.nombre}</td>
                                        <td>{admin.apellido}</td>
                                        <td>{admin.telefono}</td>
                                        <td>{admin.fechaNacimiento}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.password}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AgregarAdministrador;
