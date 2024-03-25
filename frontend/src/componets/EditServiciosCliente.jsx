import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditServiciosCliente = ({ solicitudes }) => {
    const [editingId, setEditingId] = useState(null);

    const handleEditClick = (id, estado) => {
        // Validaciones
        if (estado === 'enviado') {
            setEditingId(id);
        } else {
            alert("No puedes editar esta solicitud cuando el estado no es 'enviado'.");
        }
    };

    const handleDeleteClick = (id, estado) => {
        // Aquí puedes implementar la lógica para borrar una solicitud
        console.log(`Borrando solicitud con ID ${id}`);
    };

    const handleSaveClick = (id) => {
        // Aquí puedes implementar la lógica para guardar los cambios en la solicitud
        console.log(`Guardando cambios para solicitud con ID ${id}`);
        setEditingId(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Solicitudes de Servicio</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre cliente</th>
                        <th>Teléfono</th>
                        <th>Detalles</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {solicitudes && solicitudes.map((solicitud) => (
                        <tr key={solicitud.id}>
                            <td>{solicitud.id}</td>
                            <td>{solicitud.nombre}</td>
                            <td>{solicitud.categoria_servicio}</td>
                            <td>{solicitud.nombre_estado}</td>
                            <td>
                                {editingId === solicitud.id ? (
                                    <button className="btn btn-success" onClick={() => handleSaveClick(solicitud.id)}>Guardar</button>
                                ) : (
                                    <>
                                        <button className="btn btn-primary mr-2" onClick={() => handleEditClick(solicitud.id, solicitud.nombre_estado)}>Editar</button>
                                        <button className="btn btn-danger" onClick={() => handleDeleteClick(solicitud.id, solicitud.nombre_estado)}>Borrar</button>
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