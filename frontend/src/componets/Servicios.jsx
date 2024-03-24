import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png';
import { URIServicios} from './Urls.jsx';

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(URIServicios);
        const serviciosData = response.data.filter(servicio => servicio.servicio_padre === null);
        // Obtener las URLs de las imágenes para cada servicio
        const serviciosWithImages = 
              await Promise.all(serviciosData.map(
                  async (servicio) => {
                    const imageUrl = 
                        await fetchImageUrl(servicio.img_principal); // Obtener la URL de la imagen
              return { ...servicio, imageUrl }; // Agregar la URL de la imagen al servicio
        }));
        setServicios(serviciosWithImages);
      } catch (err) {
        console.log(err);
      }
    };

    fetchServicios();
  }, []);

  const handleMoreInfoClick = servicio => {
    navigate(`/mas-servicios/${servicio.id}`); // Pasar el ID del servicio padre en la URL
  };


  const handleRequestServiceClick = () => {
    navigate(`/solicitudes`); // Navegar a la ruta de solicitudes
  };
  
  return (
    <Container>
      <Container className="py-3 text-center">
        <h1>Nuestros Servicios</h1>
      </Container>
      <Row className="d-flex justify-content-center">
        {servicios.map((servicio, index) => (
          <Col xs={12} sm={6} md={4} lg={3} key={index} className="d-flex justify-content-center">
            <Card className="mb-4">
              <Card.Img variant="top" src={servicio.imageUrl ? servicio.imageUrl : IMGPrueba} />
              <Card.Body>
                <Card.Title>{servicio.nombre_servicio}</Card.Title>
                <Card.Text>{servicio.detalle_servicio}</Card.Text>
                <Button variant="secondary" onClick={() => handleMoreInfoClick(servicio)}>Más información</Button> <br /><br />
                <Button variant="primary" onClick={handleRequestServiceClick}>Solicitar Servicio</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Servicios;