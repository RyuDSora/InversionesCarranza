
import React, { useState } from 'react';
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
    
  const personas = [
    {rol:1, id:1 ,nombre: "Juan", apellido: "García", telefono: "123456789", correo: "juan@example.com", fechaNacimiento: "1990-05-15" },
    {rol:1, id:2 ,nombre: "María", apellido: "Martínez", telefono: "987654321", correo: "maria@example.com", fechaNacimiento: "1985-08-20" },
    {rol:1, id:3 ,nombre: "Pedro", apellido: "López", telefono: "555666777", correo: "pedro@example.com", fechaNacimiento: "1988-12-10" },
    {rol:2, id:4 ,nombre: "Ana", apellido: "Pérez", telefono: "333444555", correo: "ana@example.com", fechaNacimiento: "1992-03-25" },
    {rol:2, id:5 ,nombre: "Luis", apellido: "González", telefono: "111222333", correo: "luis@example.com", fechaNacimiento: "1987-07-12" },
    {rol:2, id:6 ,nombre: "Laura", apellido: "Hernández", telefono: "777888999", correo: "laura@example.com", fechaNacimiento: "1995-01-30" },
    {rol:2, id:7 ,nombre: "Carlos", apellido: "Díaz", telefono: "444555666", correo: "carlos@example.com", fechaNacimiento: "1993-11-05" },
    {rol:2, id:8 ,nombre: "Sofía", apellido: "Rodríguez", telefono: "666777888", correo: "sofia@example.com", fechaNacimiento: "1991-09-18" },
    {rol:2, id:9 ,nombre: "Diego", apellido: "Sánchez", telefono: "222333444", correo: "diego@example.com", fechaNacimiento: "1989-04-03" },
    {rol:2, id:10 ,nombre: "Elena", apellido: "Romero", telefono: "888999000", correo: "elena@example.com", fechaNacimiento: "1986-06-27" },
    {rol:2, id:11 ,nombre: "José", apellido: "Martín", telefono: "999000111", correo: "jose@example.com", fechaNacimiento: "1994-02-10" },
    {rol:2, id:12 ,nombre: "Carmen", apellido: "Jiménez", telefono: "111222333", correo: "carmen@example.com", fechaNacimiento: "1997-07-22" },
    {rol:2, id:13 ,nombre: "Manuel", apellido: "Ruiz", telefono: "222333444", correo: "manuel@example.com", fechaNacimiento: "1984-10-08" },
    {rol:2, id:14 ,nombre: "Lucía", apellido: "Álvarez", telefono: "555666777", correo: "lucia@example.com", fechaNacimiento: "1983-12-14" },
    {rol:2, id:15 ,nombre: "Miguel", apellido: "Fernández", telefono: "333444555", correo: "miguel@example.com", fechaNacimiento: "1996-06-01" },
    {rol:2, id:16 ,nombre: "Paula", apellido: "Torres", telefono: "777888999", correo: "paula@example.com", fechaNacimiento: "1998-03-28" },
    {rol:2, id:17 ,nombre: "Javier", apellido: "Gómez", telefono: "888999000", correo: "javier@example.com", fechaNacimiento: "1982-09-05" },
    {rol:2, id:18 ,nombre: "Andrea", apellido: "Vázquez", telefono: "444555666", correo: "andrea@example.com", fechaNacimiento: "1981-11-19" },
    {rol:2, id:19 ,nombre: "Raúl", apellido: "Serrano", telefono: "111222333", correo: "raul@example.com", fechaNacimiento: "1999-04-16" },
    {rol:2, id:20 ,nombre: "Isabel", apellido: "Flores", telefono: "222333444", correo: "isabel@example.com", fechaNacimiento: "2000-08-03" }
  ];
  
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

  const sortedData = sortedField
    ? [...personas].sort((a, b) => {
        const aValue = a[sortedField];
        const bValue = b[sortedField];
        if (aValue < bValue) return isAscending ? -1 : 1;
        if (aValue > bValue) return isAscending ? 1 : -1;
        return 0;
      })
    : personas;
    if(!Cookies.get('session')){return Stop(false)}else{
      if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===2){return Stop(true)}
  }
    return (
      <Container>
        <div className='my-3'>
          <div className='d-flex justify-content-center align-items-end'>
            <div className=''>
              <span className='h2'>Usuarios: </span>
            </div>
            <div className='ms-2'>
            <select name="" id="" className='form-select w-auto border border-0 pb-0 mb-0' style={{fontWeight:500,fontSize:'x-large'}}>
                <option value="" className='p-0 '>Todos</option>
                <option value="" className='p-0 '>Administradores</option>
                <option value="" className='p-0 '>Clientes</option>
            </select>
            </div>
          </div>
        </div>
        <div className='mb-3'>
          <div className="input-group mb-3 w-75 mx-auto">
            <input type="text" className="form-control" placeholder="Buscar"/>
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
            </tr>
          </thead>
          <tbody>
            {sortedData.map((persona, index) => (
              <tr key={index}>
                <td>{persona.id}</td>
                <td>{persona.nombre}</td>
                <td>{persona.apellido}</td>
                <td>{persona.telefono}</td>
                <td>{persona.correo}</td>
                <td>{persona.fechaNacimiento}</td>
                <td>{persona.rol===1 ? 'Administrador':'Cliente'}</td>
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
