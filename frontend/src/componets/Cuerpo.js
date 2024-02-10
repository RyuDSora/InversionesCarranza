import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./LandingPage";
import Signup from "./Signup.jsx";
import Perfil from "./Perfil.jsx";
import "../styles/Cuerpo.css";

export default function Cuerpo({ page, setPage, setLogin }) {
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