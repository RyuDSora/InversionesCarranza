import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Image, Container } from 'react-bootstrap';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';

import { encryptionKey,decryptValue } from "./hashes.jsx";
import Cookies from 'js-cookie';//////////leer cookies
import Stop from './Stop.jsx'/////////////modulo de aviso -->Alto

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png';

import { URIServicios,URIImagenGet,URIImagenPost,URIViewImagen } from "./Urls.jsx";

function ServiciosAdmin() {

    const [servicios, setServicios] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null); 
    const [servicioId,setServicioID] = useState(null)
    const [servicioName, setServicioName] = useState('');
    const [servicioPadre,setServicioPadre] = useState(null) 
    const [servicioDescripcion, setServicioDescripcion] = useState(''); 
    const [servicioIMG, setServicioIMG] = useState(null); 
    const [previewURL, setPreviewURL] = useState(''); 
    const [editMode, setEditMode] = useState(false); 
    const [subService, setSubService] = useState(false); 

    const handleEditService = (servicio) => {
        
        setSubService(false)
        setServicioSeleccionado(servicio);
        
        setServicioID(servicio.id);
        setShowModal(true);
        setEditMode(true);
        setServicioName(servicio.nombre_servicio);
        setServicioPadre(servicio.servicio_padre);
        setServicioDescripcion(servicio.detalle_servicio);
        setPreviewURL(''); // Se restablece la vista previa de la imagen
        //setSubService(servicio.servicio_padre !== null); // Verifica si el servicio tiene un servicio padre
    };
    

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setServicioIMG(selectedFile);
        setPreviewURL(URL.createObjectURL(selectedFile));
    };

    const handleCloseModal = () => {
        setShowModal(false);
        resetForm();
    };

    const resetForm = () => {
        setServicioName('');
        setServicioDescripcion('');
        setServicioIMG(null);
        setPreviewURL('');
        setEditMode(false);
        setServicioSeleccionado(null);
        setSubService(false);
    };

    const handleAddService = () => {
        setShowModal(true);
        setEditMode(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!servicioIMG) {
                alert('Cargue una imagen principal');
                return;
            }

            const formDataImagen = new FormData();
            formDataImagen.append('image', servicioIMG);
            const responseImagen = await axios.post(URIImagenPost, formDataImagen);
            const idIMGPrincipal = responseImagen.data.id;

            const formDataServicio = {
                nombre_servicio: servicioName,
                detalle_servicio: servicioDescripcion,
                img_principal: idIMGPrincipal,
                servicio_padre: subService ? servicioSeleccionado.id : null
            };

            if (editMode) {
                if (!subService) {
                    delete formDataServicio.servicio_padre;
                }
                await axios.put(URIServicios + servicioId + '/', formDataServicio);
            } else {
                await axios.post(URIServicios, formDataServicio);
            }

            fetchServicios(); 
            handleCloseModal(); 
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };

    useEffect(() => {
        fetchServicios();
    }, []);

    const fetchServicios = async () => {
        try {
            await fetch(URIImagenGet);
            const response = await axios.get(URIServicios);
            setServicios(response.data);
        } catch (error) {
            console.error('Error al cargar los servicios:', error);
        }
    };
    /* eslint-disable no-restricted-globals */
    const handleDeleteService = async (servicioId) => {
        const confirmacion = confirm("¿Estás seguro que deseas borrar este Servicio?");
        if (confirmacion) {
            try {
                await axios.delete(URIServicios + servicioId);
                fetchServicios();
            } catch (error) {
                console.error('Error al eliminar el servicio:', error);
            }    
        }
    };
    /* eslint-enable no-restricted-globals */

       ///comprobacion de ruta
       if(!Cookies.get('session')){return Stop(false,'Administrador')}else{
        if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true,'Administrador')}
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <Container className='bg-inCa my-3'>
            {/* Encabezado */}
            <div className='d-flex flex-column mb-3'>
                <span className='h2'>Servicios</span>
                {/* Botón para abrir el modal de agregar servicio */}
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={handleAddService} >
                        <BsPlus /> Agregar Servicio
                    </Button>
                </div>
            </div>

            {/* Modal para agregar o editar servicio */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Editar Servicio' : 'Agregar Nuevo Servicio'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNombre">
                            <Form.Label>Nombre del Servicio</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre del servicio"
                                value={servicioName}
                                onChange={(e) => setServicioName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescripcion">
                            <Form.Label>Descripción del Servicio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Ingrese la descripción del servicio"
                                value={servicioDescripcion}
                                onChange={(e) => setServicioDescripcion(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImagen">
                            <Form.Label>Imagen Principal</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formSubservicio">
                            <Form.Check
                                type="checkbox"
                                label="Subservicio"
                                checked={subService}
                                onChange={(e) => setSubService(e.target.checked)}
                            />
                        </Form.Group>
                        {subService && (
                            <Form.Group controlId="formSubServicio">
                                <Form.Label>Servicio Principal</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={servicioSeleccionado ? servicioSeleccionado.id : ""}
                                    onChange={(e) => setServicioSeleccionado(servicios.find(servicio => servicio.id === parseInt(e.target.value)))}
                                >
                                    <option value="">Selecciona un servicio principal</option>
                                    {servicios.map((servicio,index) => (
                                        !servicio.servicio_padre && (
                                            <option key={servicio.id} value={servicio.id}>
                                                {servicio.nombre_servicio}
                                            </option>
                                        )
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        )}
                        {/* Vista previa de la imagen */}
                        {previewURL && (
                            <Image src={previewURL} alt="Preview" fluid />
                        )}
                        {/* Botón para enviar el formulario */}
                        <Button variant="primary" type="submit" className="mt-3">
                            {editMode ? 'Guardar Cambios' : 'Guardar Servicio'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Lista de servicios */}
            <div >
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Servicio Principal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio,index) => (
                            <tr key={servicio.id+'/'+index}>
                                <td>{servicio.id}</td>
                                <td>
                                    <Image
                                        src={servicio.img_principal ? URIViewImagen + servicio.img_principal + 'inca.jpg' : IMGPrueba}
                                        alt="Servicio"
                                        thumbnail
                                        style={{ width: 100, height: 'auto' }}
                                    />
                                </td>
                                <td>{servicio.nombre_servicio}</td>
                                <td>{servicio.detalle_servicio}</td>
                                <td>{servicio.servicio_padre ? servicio.servicio_padre : 'N/A'}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleEditService(servicio)}>
                                        <BsPencil />
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteService(servicio.id)}>
                                        <BsTrash />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}

export default ServiciosAdmin;
