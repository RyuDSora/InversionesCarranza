import React, { useState } from 'react';
import { Form, Button, ButtonGroup, Container, Row, Col, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

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
    const [error, setError] = useState('');

    // Nueva variable de estado para la lista de administradores
    const [administradores, setAdministradores] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const nombreValido = nombre.trim() !== '' && !/\d/.test(nombre);
        const apellidoValido = apellido.trim() !== '' && !/\d/.test(apellido);
        const telefonoValido = telefono.trim() !== '' && /^\d+$/.test(telefono);
        const fechaNacimientoValido = fechaNacimiento.trim() !== '';
        const emailValido = email.includes('@');
        const passwordValido = password.length >= 8;
    
        setNombreValido(nombreValido);
        setApellidoValido(apellidoValido);
        setTelefonoValido(telefonoValido);
        setFechaNacimientoValido(fechaNacimientoValido);
        setEmailValido(emailValido);
        setPasswordValido(passwordValido);
    
        if (nombreValido && apellidoValido && telefonoValido && fechaNacimientoValido && emailValido && passwordValido) {
            if (administradores.some(admin => admin.email === email)) {
                setError('Correo duplicado, ingresa otro correo.');
            } else {
                // Agregar el nuevo administrador a la lista
                setAdministradores([...administradores, { nombre, apellido, telefono, fechaNacimiento, email, password }]);
                setError('');
            }
        }
    };

    const handleCancel = () => {
        setNombre('');
        setApellido('');
        setTelefono('');
        setFechaNacimiento('');
        setEmail('');
        setPassword('');
        setError('');
    };

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
                                {administradores.map((admin, index) => (
                                    <tr key={index}>
                                        <td>{admin.nombre}</td>
                                        <td>{admin.apellido}</td>
                                        <td>{admin.telefono}</td>
                                        <td>{admin.fechaNacimiento}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.password}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default AgregarAdministrador;
