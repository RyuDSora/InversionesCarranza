import inversionesCarranza from "./InversionesCarranza.png"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Barra() {
    return (
        <Navbar expand="lg" className="bg-ligth">
            <Container >
                <Navbar.Brand href="#home">
                    <img 
                        src={inversionesCarranza} 
                        alt='InversionesCarranza' 
                        className='rounded' 
                        style={{width:200,margin:0}}/>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav.Link href="#link" className="mx-3">¿Quiénes somos?</Nav.Link>
                    <Nav.Link href="#Servicios" className="mx-3">Servicios</Nav.Link>
                    <Nav.Link href="#Proyectos" className="mx-3">Proyectos</Nav.Link>
                    <Nav.Link href="#login" className="mx-3">Inicia Sesión</Nav.Link>
                    <Nav.Link href="#signup" className="mx-3">Registrarse</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Barra;