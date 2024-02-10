
import inversionesCarranza from "./InversionesCarranza.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function Barra({ setPage, login }) {
  
  return (
    <Navbar expand="lg" className="pt-0">
      <Container className="bg-light border rounded-bottom-3 px-3 pb-3 pt-3">
        <Navbar.Brand href="#home">
          <img
            src={inversionesCarranza}
            alt="InversionesCarranza"
            className="rounded"
            style={{ width: 200, margin: 0 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
<<<<<<< HEAD
          <Nav.Link onClick={() => setPage("landing")} className="mx-3">
            ¿Quiénes somos?
          </Nav.Link>
          <Nav.Link onClick={() => setPage("Servicios")} className="mx-3">
            Servicios
          </Nav.Link>
          <Nav.Link onClick={() => setPage("Proyectos")} className="mx-3">
            Proyectos
          </Nav.Link>
          <Nav.Link onClick={() => setPage("login")} className={login ? "d-none" : "mx-3"}>
=======
          <Nav.Link href="#landing" onClick={() => setPage("landing")} className="mx-3">
            ¿Quiénes somos?
          </Nav.Link>
          <Nav.Link href="#Servicios" onClick={() => setPage("Servicios")} className="mx-3">
            Servicios
          </Nav.Link>
          <Nav.Link href="#Proyectos" onClick={() => setPage("Proyectos")} className="mx-3">
            Proyectos
          </Nav.Link>
          <Nav.Link href="#login" onClick={() => setPage("login")} className={login ? "d-none" : "mx-3"}>
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
            Inicia Sesión
          </Nav.Link>
          <Nav.Link onClick={() => setPage("signup")} className={login ? "d-none" : "mx-3"}>
            Registrarse
          </Nav.Link>
          <Nav.Link onClick={() => setPage("perfil")} className={login ? "d-block mx-3" : "d-none"}>
            Perfil
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Barra;
