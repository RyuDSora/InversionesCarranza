import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import { FaSearch } from 'react-icons/fa'
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import Stop from './Stop.jsx'

function Usuarios() {
  const encryptionKey = 'mysecretkey';
  const decryptValue = (encryptedValue, key) => {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
      return bytes.toString(CryptoJS.enc.Utf8);
  };

  const [personas, setPersonas] = useState([]);
  const [roleFilter, setRoleFilter] = useState('Todos');
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // Extraído la URL de la API a una constante para evitar la repetición
  const API_URL = `http://${window.location.hostname}:8000/usuarios/`;

  useEffect(() => {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => setPersonas(data))
        .catch(error => console.error('Error:', error));
  }, );

  const [sortedField, setSortedField] = useState(null);
  const [isAscending, setIsAscending] = useState(true);

  const sortByField = (field) => {
    if (sortedField === field) {
      setIsAscending(!isAscending);
    } else {
      setSortedField(field);
      setIsAscending(true);
    }
  };

  // Mejorado la lógica de clasificación y filtrado para que sea más legible
  const sortedData = [...personas].sort((a, b) => {
    if (a[sortedField] < b[sortedField]) return isAscending ? -1 : 1;
    if (a[sortedField] > b[sortedField]) return isAscending ? 1 : -1;
    return 0;
  });

  const filteredData = sortedData.filter(persona => {
    if (roleFilter === 'Todos') return true;
    if (roleFilter === 'Administradores' && persona.rol === 1) return true;
    if (roleFilter === 'Clientes' && persona.rol !== 1) return true;
    return false;
  }).filter(persona => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return persona.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
      persona.apellido.toLowerCase().includes(lowerCaseSearchTerm) ||
      persona.telefono.toLowerCase().includes(lowerCaseSearchTerm) ||
      persona.correo.toLowerCase().includes(lowerCaseSearchTerm) ||
      persona.fechaNacimiento.toLowerCase().includes(lowerCaseSearchTerm) ||
      (persona.rol === 1 ? 'administrador' : 'cliente').includes(lowerCaseSearchTerm);
  });

  if(!Cookies.get('session')){return Stop(false)}else{
    if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true)}
  }

  const handleRoleFilterChange = (event) => {
    setRoleFilter(event.target.value);
  };

  const handleEditClick = (user) => {
    setEditingUser(user.id);
    setEditedUser(user);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditChange = (event, field) => {
    setEditedUser({ ...editedUser, [field]: event.target.value });
  };

  const handleUpdateClick = () => {
    fetch(API_URL + editedUser.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
    .then(response => response.json())
    .then(data => {
      setPersonas(personas.map(persona => persona.id === data.id ? data : persona));
      setEditingUser(null);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <Container>
      <div className='my-3'>
        <div className='d-flex justify-content-center align-items-end'>
          <div className=''>
            <span className='h2'>Usuarios: </span>
          </div>
          <div className='ms-2'>
            <select name="" id="" className='form-select w-auto border border-0 pb-0 mb-0' style={{fontWeight:500,fontSize:'x-large'}} onChange={handleRoleFilterChange}>
              <option value="Todos" className='p-0 '>Todos</option>
              <option value="Administradores" className='p-0 '>Administradores</option>
              <option value="Clientes" className='p-0 '>Clientes</option>
            </select>
          </div>
        </div>
      </div>
      <div className='mb-3'>
        <div className="input-group mb-3 w-75 mx-auto">
          <input type="text" className="form-control" placeholder="Buscar" onChange={handleSearchChange}/>
          <button className="btn btn-success" type="submit"><FaSearch /></button>
        </div>
      </div>
      <div className="container">
        <div className="" style={{overflowX:'auto',maxWidth:'100%'}}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <Button variant="link" onClick={() => sortByField('Id')}>
                    ID {sortedField === 'Id' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('nombre')}>
                    Nombre {sortedField === 'nombre' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('apellido')}>
                    Apellido {sortedField === 'apellido' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('telefono')}>
                    Teléfono {sortedField === 'telefono' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('correo')}>
                    Correo {sortedField === 'correo' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('fechaNacimiento')}>
                    Fecha de Nacimiento {sortedField === 'fechaNacimiento' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>
                  <Button variant="link" onClick={() => sortByField('Rol')}>
                    Rol {sortedField === 'Rol' && (isAscending ? '↑' : '↓')}
                  </Button>
                </th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
  {filteredData.map((persona, index) => (
    <tr key={index}>
      <td>{persona.id}</td>
      <td>
        {editingUser === persona.id ? (
          <input
            type="text"
            value={editedUser.nombre}
            onChange={(event) => handleEditChange(event, 'nombre')}
          />
        ) : (
          persona.nombre
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <input
            type="text"
            value={editedUser.apellido}
            onChange={(event) => handleEditChange(event, 'apellido')}
          />
        ) : (
          persona.apellido
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <input
            type="text"
            value={editedUser.telefono}
            onChange={(event) => handleEditChange(event, 'telefono')}
          />
        ) : (
          persona.telefono
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <input
            type="text"
            value={editedUser.correo}
            onChange={(event) => handleEditChange(event, 'correo')}
          />
        ) : (
          persona.correo
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <input
            type="date"
            value={editedUser.fechaNacimiento}
            onChange={(event) => handleEditChange(event, 'fechaNacimiento')}
          />
        ) : (
          persona.fechaNacimiento
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <select
            value={editedUser.rol}
            onChange={(event) => handleEditChange(event, 'rol')}
          >
            <option value={1}>Administrador</option>
            <option value={2}>Cliente</option>
          </select>
        ) : (
          persona.rol===1 ? 'Administrador':'Cliente'
        )}
      </td>
      <td>
        {editingUser === persona.id ? (
          <Button variant="success" onClick={handleUpdateClick}>
            Actualizar
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handleEditClick(persona)}>
            Editar
          </Button>
        )}
      </td>
    </tr>
  ))}
</tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
}

export default Usuarios;
