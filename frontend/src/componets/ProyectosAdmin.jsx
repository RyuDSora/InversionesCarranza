import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import { Button, Modal, Form } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';

function ProyectosAdmin(params) {
    let [Servicios,setServicios] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    handleClose();
    };

    useEffect(() => {
        const service = async () => {
            try {
                const response = await axios.get(URIServicios);
                const serviciosData = response.data.filter(
                    servicio => servicio.servicio_padre === null);
                setServicios(serviciosData);
                
            } catch (err) {
                console.log(err);
            }
        }
        service();
    }, []); 

    return (
        <Container>
            <div>Aqui se veran los proyectos</div>
            <Button
                className='rounded-5'
                variant="success"
                style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                onClick={handleShow}>
                    <BsPlus size={24} />
            </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal con Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingrese su nombre" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ingrese su email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
        </Container>
    );
}
export default ProyectosAdmin;