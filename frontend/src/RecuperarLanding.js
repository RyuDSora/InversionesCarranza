import 'bootstrap/dist/css/bootstrap.min.css';
import Button  from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Candado from './candado-abierto.png'

function RecuperarLanding(params) {
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
                            <p className=''>Hola <span style={{textDecoration:'underline',backgroundColor:'gainsboro',paddingLeft:'5px',paddingRight:'5px'}}>{params}</span></p>
                            <p className=''>Quieres hacer una solicitud para el cambio de Contraseña?</p>
                            <p className='small'>Si no quieres hacer el cambio, <a href='#/login'>Inicie Sesión</a> con sus credenciales actuales</p>
                        </div>
                    </div>
                    <div className='mt-3 mb-3 pt-3 pb-3'>
                        <Button>Recuperar Contraseña</Button>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default RecuperarLanding;
