import React, { useState } from 'react';
import { Form, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';

function AgregarAdministrador() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nombreValido, setNombreValido] = useState(true);
    const [apellidoValido, setApellidoValido] = useState(true);
    const [telefonoValido, setTelefonoValido] = useState(true);
    const [fechaNacimientoValido, setFechaNacimientoValido] = useState(true);
    const [emailValido, setEmailValido] = useState(true);
    const [passwordValido, setPasswordValido] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        setNombreValido(nombre.trim() !== '' && !/\d/.test(nombre));
        setApellidoValido(apellido.trim() !== '' && !/\d/.test(apellido));
        setTelefonoValido(telefono.trim() !== '' && /^\d+$/.test(telefono));
        setFechaNacimientoValido(fechaNacimiento.trim() !== '');
        setEmailValido(email.includes('@'));
        setPasswordValido(password.length >= 8);

        if (nombreValido && apellidoValido && telefonoValido && fechaNacimientoValido && emailValido && passwordValido) {
            // Aquí puedes implementar la lógica para agregar el nuevo administrador
            console.log(`Nombre ${nombre}, Apellido ${apellido}, Telefono ${telefono}, Fecha de Nacimiento ${fechaNacimiento}, Email: ${email}, Password: ${password}`);
        }
    };

    const handleCancel = () => {
        // Aquí puedes implementar la lógica para manejar la cancelación
        setNombre('');
        setApellido('');
        setTelefono('');
        setFechaNacimiento('');
        setEmail('');
        setPassword('');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <h2 className="text-center mt-5">Agregar Administrador</h2>
                    <Form onSubmit={handleSubmit} className="mt-5">
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" value={nombre} onChange={e => setNombre(e.target.value)} isInvalid={!nombreValido} />
                            <Form.Control.Feedback type="invalid">Por favor, introduce un nombre válido sin números.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formApellido">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control type="text" value={apellido} onChange={e => setApellido(e.target.value)} isInvalid={!apellidoValido} />
                            <Form.Control.Feedback type="invalid">Por favor, introduce un apellido válido sin números.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formTelefono">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="text" value={telefono} onChange={e => setTelefono(e.target.value)} isInvalid={!telefonoValido} />
                            <Form.Control.Feedback type="invalid">Por favor, introduce un número de teléfono válido.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formFechaNacimiento">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <Form.Control type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} isInvalid={!fechaNacimientoValido} />
                            <Form.Control.Feedback type="invalid">Por favor, introduce una fecha de nacimiento válida.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email} onChange={e => setEmail(e.target.value)} isInvalid={!emailValido} />
                            <Form.Control.Feedback type="invalid">Por favor, introduce un email válido.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} isInvalid={!passwordValido} />
                            <Form.Control.Feedback type="invalid">La contraseña debe tener al menos 8 caracteres.</Form.Control.Feedback>
                        </Form.Group> <br />
                        <ButtonGroup className="d-flex"> 
                            <Button variant="primary" type="submit" className="mr-2 flex-grow-1">
                                Agregar Administrador
                            </Button>
                            <Button variant="secondary" onClick={handleCancel} className="flex-grow-1">
                                Cancelar
                            </Button>
                        </ButtonGroup> <br /> <br />
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default AgregarAdministrador;