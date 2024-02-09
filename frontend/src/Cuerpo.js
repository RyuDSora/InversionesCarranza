import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./componets/LandingPage";
import Signup from "./componets/Signup.jsx";
import Perfil from "./componets/Perfil.jsx";
import "./styles/Cuerpo.css";
function Cuerpo({ page, setPage, setLogin }) {
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
        <Signup setLogin={setLogin} setPage={setPage} />
      </Container>
    );
  }
	if (page === "perfil") {
		return (
			<Container className="container-main">
				<Perfil setLogin={setLogin} setPage={setPage} />
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

