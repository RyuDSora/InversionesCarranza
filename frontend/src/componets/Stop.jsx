import { Container } from "react-bootstrap";
import senal from '../imgs/alto.png'

export default function Stop(params) {
    if (params) {
        return (
            <Container>
            <div className="mt-3"><span className="h1 text-danger">Alto</span></div>
            <img src={senal} alt="" style={{width:300}} className="rounded-3 shadow-lg"/>
            <div>
                <p className="h5 text-danger">Para visitar esta página necesitas estar registrado como Administrador, 
                si ya tienes una cuenta Inicia Sesión.
                </p>
                <p className="h5 text-danger"> Si no tienes una cuenta, comunicate con un Administrador para que te asigne una.</p>
            </div>
        </Container>
        )
    }else{
    return (
        <Container>
            <div className="mt-3"><span className="h1 text-danger">Alto</span></div>
            <img src={senal} alt="" style={{width:300}} className="rounded-3 shadow-lg"/>
            <div>
                <p className="h5 text-danger">Para visitar esta página necesitas estar registrado como Administrador, 
                si ya tienes una cuenta <span><a href="/login">Inicia Sesión.</a></span>
                </p>
                <p className="h5 text-danger"> Si no tienes una cuenta, comunicate con un Administrador para que te asigne una.</p>
            </div>
        </Container>
    )}
}