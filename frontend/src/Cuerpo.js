import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./componets/LandingPage";
import Signup from "./componets/Signup.jsx";
import Perfil from "./componets/Perfil.jsx";
import Login from "./componets/Login.jsx";
import "./styles/Cuerpo.css";
function Cuerpo({ page, setPage, setLogin, user, setUser }) {
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
        <Signup setLogin={setLogin} setPage={setPage} user={user} setUser={setUser} />
      </Container>
    );
  }
	if (page === "perfil") {
		return (
			<Container className="container-main">
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
  return (
    <Container className="container-main">
      <LandingPage />
    </Container>
  );
}
export default Cuerpo;
