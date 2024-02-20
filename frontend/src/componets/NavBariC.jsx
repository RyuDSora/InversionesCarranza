import inversionesCarranza from "../imgs/InversionesCarranza.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import perfil from '../imgs/perfil.png';

export default function NavBarIC() {
  var URLactual = window.location.pathname;
  
  var services = false;
  var Login = false;
  var home = false;
  var project = false;
  var register = false;
  var user = false;
  var UserL = '';
  var userId = ''; // Agregamos la variable para almacenar el ID del usuario

  if(localStorage.length===0){
    if(sessionStorage.length===0){
      console.log('no hay usuario');
    }else{
      UserL = sessionStorage.getItem('User');
      userId = sessionStorage.getItem('UserId'); // Asignamos el ID del usuario
      user = true;  
    }
  }
  else
  { 
    UserL = localStorage.getItem('User') || sessionStorage.getItem('User');
    userId = localStorage.getItem('UserId') || sessionStorage.getItem('UserId');
    console.log(UserL);
    user = true;
  }
  console.log(UserL);
  if( URLactual === '/Servicios'){services = true;}
  if( URLactual === '/login'){Login = true;}
  if( URLactual === '/'){home = true;}
  if( URLactual === '/Proyectos'){project = true;}
  if( URLactual === '/Signup'){register = true;}
  
  return (
    <Navbar expand="lg" className="pt-0">
      <Container className="bg-light border rounded-bottom-3 px-3 pb-3 pt-3">
        <Navbar.Brand href='/'>
          <img
            src={inversionesCarranza}
            alt="InversionesCarranza"
            className="rounded"
            style={{ width: 200, margin: 0 }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

          <Nav.Link href="/" className={home ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
            ¿Quiénes somos?
          </Nav.Link>
          <Nav.Link href="/Servicios" className={services ? 'text-success text-uppercase not-active mx-3' :"mx-3"} id="servicios">
            Servicios
          </Nav.Link>
          <Nav.Link href="/Proyectos" className={project ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
            Proyectos
          </Nav.Link>
          <div className={user ? 'd-none' :"d-flex"}>
            <Nav.Link href="/login" className={Login ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
              Inicia Sesión
            </Nav.Link>
            <Nav.Link href="/Signup"  className={register ? 'text-success text-uppercase not-active mx-3' :"mx-3"}>
              Registrarse
            </Nav.Link>
          </div>
          
          
          <div className={user ? 'd-flex' :"d-none"} style={{justifyContent:'center'}}>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="btn-light">
                <img src={perfil} alt="perfil-img" style={{width:'30px', paddingRight:'5px'}}/>
                {UserL}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={ ()=>{window.location.href = `/Perfil/${userId}`}} >Mi Perfil</Dropdown.Item>
                <Dropdown.Item onClick={()=>{sessionStorage.removeItem('User');
                                            localStorage.removeItem('User');
                                            sessionStorage.removeItem('UserId'); // Removemos el ID del usuario
                                            localStorage.removeItem('UserId'); // Removemos el ID del usuario
                                            window.location.href = '/';}}>
                  Cerrar Sesion
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
                
                
          </div>
          
        </Navbar.Collapse>
        
      </Container>
      
    </Navbar>
  );
}



