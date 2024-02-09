import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./componets/LandingPage";
import Signup from "./componets/Signup.jsx";
import Perfil from "./componets/Perfil.jsx";
<<<<<<< HEAD
import Login from "./componets/Login.jsx";
import "./styles/Cuerpo.css";
function Cuerpo({ page, setPage, setLogin, user, setUser }) {
=======
import "./styles/Cuerpo.css";
function Cuerpo({ page, setPage, setLogin }) {
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
  if (page === "landing") {
    return (
      <Container className="container-main">
        <LandingPage />
      </Container>
    );
  }
  if (page === "signup") {
    return (
      <Container className="container-main">
<<<<<<< HEAD
        <Signup setLogin={setLogin} setPage={setPage} user={user} setUser={setUser} />
=======
        <Signup setLogin={setLogin} setPage={setPage} />
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
      </Container>
    );
  }
	if (page === "perfil") {
		return (
			<Container className="container-main">
<<<<<<< HEAD
				<Perfil setLogin={setLogin} setPage={setPage} user={user} setUser={setUser} />
			</Container>
		);
	}
  if (page === "login") {
    return (
      <Container className="container-main">
        <Login setPage={setPage} setLogin={setLogin} user={user} />
      </Container>
    );
  }
=======
				<Perfil setLogin={setLogin} setPage={setPage} />
			</Container>
		);
	}
>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
  return (
    <Container className="container-main">
      <LandingPage />
    </Container>
  );
}
export default Cuerpo;
<<<<<<< HEAD
=======

>>>>>>> 17c4e1bd129df1cc40c7d363f6ecdbb640b5a7f3
