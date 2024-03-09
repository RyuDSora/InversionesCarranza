import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Image } from 'react-bootstrap';
import { BsPlus, BsPencil, BsTrash } from 'react-icons/bs';

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png';

const URIServicios = 'http://' + window.location.hostname + ':8000/ServiciosOfrecidos/';

function ServiciosAdmin() {
    const [servicios, setServicios] = useState([]); // Variable para los servicios principales
    const [showModal, setShowModal] = useState(false); // Variable para mostrar o esconder la modal de agregar/editar servicio
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null); // Variable para el servicio seleccionado
    const [servicioName, setServicioName] = useState(''); // Variable para el nombre del servicio
    const [servicioDescripcion, setServicioDescripcion] = useState(''); // Variable para la descripción del servicio
    const [servicioIMG, setServicioIMG] = useState(null); // Variable para la imagen principal del servicio
    const [previewURL, setPreviewURL] = useState(''); // Variable para la vista previa de la imagen
    const [editMode, setEditMode] = useState(false); // Variable para indicar si se está editando un servicio
    const [SubService, setSubService] = useState(false); // Variable para indicar si el servicio es un subservicio


    // Función para manejar el cambio de archivo de imagen principal
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setServicioIMG(selectedFile);
        setPreviewURL(URL.createObjectURL(selectedFile));
    };

    // Función para cerrar el modal de agregar/editar servicio
    const handleCloseModal = () => {
        setShowModal(false);
        setServicioName('');
        setServicioDescripcion('');
        setServicioIMG(null);
        setPreviewURL('');
        setEditMode(false);
        setServicioSeleccionado(null);
    };

    // Función para abrir el modal de agregar servicio
    const handleAddService = () => {
        setShowModal(true);
        setEditMode(false);
    };

    const handleEditService = (servicio) => {
        setServicioSeleccionado(servicio);
        setShowModal(true);
        setEditMode(true);
        setServicioName(servicio.nombre_servicio);
        setServicioDescripcion(servicio.detalle_servicio);
        // Verifica si el servicio tiene un servicio padre
        if (servicio.servicio_padre) {
            setSubService(true); // Si tiene un servicio padre, establece SubService en true
        } else {
            setSubService(false); // Si no tiene un servicio padre, establece SubService en false
        }
    };

    // Función para enviar el formulario de agregar/editar servicio
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!servicioIMG) {
                alert('Cargue una imagen principal');
                return;
            }

            // Sube la imagen principal
            const formDataImagen = new FormData();
            formDataImagen.append('image', servicioIMG);
            const responseImagen = await fetch('http://' + window.location.hostname + ':8000/images/post', {
                method: 'POST',
                body: formDataImagen
            });
            const dataImagen = await responseImagen.json();
            const idIMGPrincipal = dataImagen.id;

            let formDataServicio = new FormData();
            formDataServicio.append('nombre_servicio', servicioName);
            formDataServicio.append('detalle_servicio', servicioDescripcion);
            formDataServicio.append('img_principal', idIMGPrincipal);
            formDataServicio.append('sevicio_padre', SubService);

            if (editMode) {
                // Modo de edición
                await axios.put(URIServicios + servicioSeleccionado.id + '/', formDataServicio);
                // Actualiza el estado de los servicios
                const updatedServices = servicios.map(servicio => {
                    if (servicio.id === servicioSeleccionado.id) {
                        return { ...servicio, nombre_servicio: servicioName, detalle_servicio: servicioDescripcion, sevicio_padre: SubService };
                    }
                    return servicio;
                });
                setServicios(updatedServices);
            } else {
                // Modo de creación
                const responseServicio = await axios.post(URIServicios, formDataServicio);
                const nuevoServicio = responseServicio.data;
                setServicios([...servicios, nuevoServicio]);
            }

            handleCloseModal(); // Cierra el modal después de enviar el formulario
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    };



    useEffect(() => {
        // Cargar la lista de servicios desde el servidor al iniciar
        const fetchServicios = async () => {
            try {
                const response = await axios.get(URIServicios);
                setServicios(response.data);
            } catch (error) {
                console.error('Error al cargar los servicios:', error);
            }
        };
        fetchServicios();
    }, []);

    // Función para eliminar un servicio
    const handleDeleteService = async (servicioId) => {
        try {
            await axios.delete(URIServicios + servicioId);
            // Actualizar el estado de los servicios eliminando el servicio con el ID correspondiente
            const updatedServices = servicios.filter(servicio => servicio.id !== servicioId);
            setServicios(updatedServices);
        } catch (error) {
            console.error('Error al eliminar el servicio:', error);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            {/* Encabezado */}
            <h2>{editMode ? `Editar Servicio - ${servicioName}` : 'Servicios'}</h2>

            {servicios && (
                <p>Servicio : {servicios.nombre_servicio}</p>
            )}

            {/* Botón para abrir el modal de agregar servicio */}
            <Button variant="primary" onClick={handleAddService}>
                <BsPlus /> Agregar Servicio
            </Button>

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
                                checked={SubService}
                                onChange={(e) => setSubService(e.target.checked)}
                            />
                        </Form.Group>
                        {SubService && (
                            <Form.Group controlId="formSubServicio">
                                <Form.Label>Servicio Principal</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={SubService}  // Cambiado a SubService en lugar de servicioSeleccionado.servicio_padre.id
                                    onChange={(e) => setSubService(e.target.value)}
                                >
                                    <option value="">Selecciona un servicio principal</option>
                                    {servicios.map(servicio => (
                                        <option key={servicio.id} value={servicio.id}>
                                            {servicio.nombre_servicio}
                                        </option>
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
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Servicio Principal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map(servicio => (
                            <tr key={servicio.id}>
                                <td>
                                    <Image
                                        src={servicio.img_principal ? 'http://' + window.location.hostname + ':8000/' + servicio.img_principal + 'inca.jpg' : IMGPrueba}
                                        alt="Servicio"
                                        thumbnail
                                        style={{ width: 100, height: 'auto' }}
                                    />
                                </td>
                                <td>{servicio.nombre_servicio}</td>
                                <td>{servicio.detalle_servicio}</td>
                                <td>{servicio.servicio_padre ? servicio.servicio_padre.nombre_servicio : 'N/A'}</td>
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
        </div>
    );
}

export default ServiciosAdmin;



