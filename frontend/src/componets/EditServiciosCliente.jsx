import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditServiciosCliente = () => {
    const initialFormState = { id: null, categoria_servicio: '', descripcion_solicitud: '', id_estado: '' };

    const [solicitudes, setSolicitudes] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        const loadSolicitudes = async () => {
            try {
                const response = await fetch('http://' + window.location.hostname + ':8000/solicitudes/');
                const data = await response.json();
                setSolicitudes(data);
            } catch (error) {
                console.error('Error:', error);
                alert('Ocurrió un error al cargar las solicitudes. Por favor, revisa la consola para más detalles.');
            }
        };

        loadSolicitudes();
    }, []);

    const handleEditClick = (id, estado) => {
        const solicitudToEdit = solicitudes.find((solicitud) => solicitud.id === id);
        if (solicitudToEdit) {
            setFormData(solicitudToEdit);
            setEditingId(id);
        }
    };

    const handleDeleteClick = async (id, estado) => {
        try {
            await fetch('http://' + window.location.hostname + ':8000/solicitudes/' + id, {
                method: 'DELETE',
            });

            setSolicitudes(solicitudes.filter((solicitud) => solicitud.id !== id));
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al borrar la solicitud. Por favor, revisa la consola para más detalles.');
        }
    };

    const handleSaveClick = async (id) => {
        try {
            const response = await fetch('http://' + window.location.hostname + ':8000/solicitudes/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const updatedData = await response.json();
    
            // Actualizar la lista de solicitudes en el estado
            setSolicitudes(prevSolicitudes => prevSolicitudes.map((solicitud) => (solicitud.id === id ? { ...solicitud, ...updatedData } : solicitud)));
    
            // Restablecer el ID de edición y los datos del formulario
            setEditingId(null);
            setFormData(initialFormState);
    
            // Recargar las solicitudes para obtener la lista actualizada
            const reloadResponse = await fetch('http://' + window.location.hostname + ':8000/solicitudes/');
            const newData = await reloadResponse.json();
            setSolicitudes(newData);
        } catch (error) {
            console.error('Error:', error);
            alert('Ocurrió un error al guardar los cambios. Por favor, revisa la consola para más detalles.');
        }
    };
    
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Solicitudes de Servicio</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Categoria Servicio</th>
                        <th>Descripcion Solicitud</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes.map((solicitud) => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.id}</td>
                            <td>
                                {editingId === solicitud.id ? (
                                    <input
                                        type="text"
                                        value={formData.categoria_servicio}
                                        onChange={(e) => setFormData({ ...formData, categoria_servicio: e.target.value })}
                                    />
                                ) : (
                                    solicitud.categoria_servicio
                                )}
                            </td>
                            <td>
                                {editingId === solicitud.id ? (
                                    <input
                                        type="text"
                                        value={formData.descripcion_solicitud}
                                        onChange={(e) => setFormData({ ...formData, descripcion_solicitud: e.target.value })}
                                    />
                                ) : (
                                    solicitud.descripcion_solicitud
                                )}
                            </td>
                            <td>{solicitud.id_estado}</td> {/* Aquí se muestra el estado sin posibilidad de edición */}
                            <td>
                                {editingId === solicitud.id ? (
                                    <button className="btn btn-success" onClick={() => handleSaveClick(solicitud.id)}>
                                        Guardar
                                    </button>
                                ) : (
                                    <>
                                        <button className="btn btn-primary mr-2" onClick={() => handleEditClick(solicitud.id, solicitud.id_estado)} disabled={solicitud.id_estado !== 1}>
                                            Editar
                                        </button>
                                        <button className="btn btn-danger mx-2" onClick={() => handleDeleteClick(solicitud.id, solicitud.id_estado)} disabled={solicitud.id_estado !== 1}>
                                            Borrar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditServiciosCliente; 
