//import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Candado from '../imgs/candado-abierto.png'

export default function RecuperarLanding() {
    
    return(
        <Container>
            <div className='row'>
                <div className='col mt-3 pt-3 mb-3 pb-3'>
                    <img src={Candado} alt='Desbloquear' style={{width:200,margin:0}}/>
                </div>
                <div className='col mt-3 pt-3 mb-3 pb-3'>
                    <div className='mx-auto'>
                        <div style={{width:300}} className='mx-auto'>
                            <p className='h4'>Olvidastes tu Contraseña</p>
                            <div className="form-floating mb-3 mt-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Ingrese un correo electrónico"
                                    
                                    
                                />
                                <label htmlFor="name-email">Correo</label>
                            </div>
                            <p className=''>Ingresa tu correo para hacer un cambio de contraseña</p>
                            <p className='small'>Si no quieres hacer el cambio, <a href='/login' style={{textDecoration:'none'}}>Inicie Sesión</a> con sus credenciales actuales</p>
                        </div>
                    </div>
                    <div className="form-floating mb-3 mt-3">
                    <input type="submit" className="btn btn-primary" value='Mandar Solicitud'/>
                </div>
                </div>
            </div>
        </Container>
    );
}

