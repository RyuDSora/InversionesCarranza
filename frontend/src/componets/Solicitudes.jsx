import React, { useState } from 'react';
import { Modal,Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const services = [
    { id: 1, nombre_servicio:'Servicio1',detalle_servicio:'SIN DETALLES',servicio_padre:null,img_principal:1 },
    { id: 2, nombre_servicio:'Servicio2',detalle_servicio:'SIN DETALLES',servicio_padre:null,img_principal:1 }
];

function Solicitud() {
    const navigate = useNavigate();
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [descripcionSolicitud, setDescripcionSolicitud] = useState('');
    
    const handleSubmit = (service) => {
        //setSelectedService(service);
        navigate('/EditServiciosCliente')
    };
    


    

    return (
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicSelect">
                        <Form.Label>Servicio</Form.Label>
                        <Form.Select onChange={(e) => {setServicioSeleccionado(e.target.value)}} value={servicioSeleccionado}>
                        <option value="">Seleccione un servicio</option>
                        {services.map((serv,index) => (
                        <option key={'S/'+serv.nombre_servicio+'/'+index}>{serv.nombre_servicio}</option>
                        ))}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Detalles</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        placeholder="Ingrese la descripcion del proyecto" value={descripcionSolicitud} 
                        onChange={(e) => setDescripcionSolicitud(e.target.value)} />
                    </Form.Group>
                    <div className='w-50 m-auto d-flex justify-content-around mt-2'>
                        <Button variant="success" type="submit">
                          Guardar
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
    );
}

export default Solicitud;