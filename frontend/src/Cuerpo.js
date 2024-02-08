import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import LandingPage from "./componets/LandingPage";
import Signup from "./componets/Signup.jsx";
import "./styles/Cuerpo.css"
function Cuerpo({ page }) { // si no se envia ningun parametro, no es necesario poner (params)
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
				<Signup />
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
