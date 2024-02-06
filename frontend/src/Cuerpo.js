import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import imagenX from "./imagenX.png"
function Cuerpo(params) {
    return(
        <Container>
            <div>
                <div className='row' >
                    <div className='col mt-5 pt-5'>
                        <p className='h3'>¿Quiénes somos?</p>
                        <p className='text-center'>
                        Somos una empresa que desempeña un papel fundamental en el 
                        sector de la construcción en Honduras, brindando servicios de 
                        diseño, construcción y mantenimiento de su hogar u oficina. 
                        <br/><br/>
                        Centramos nuestra atención en la excelencia y la innovación,
                        buscando proporcionar un servicio excepcional con el objetivo 
                        de lograr la plena satisfacción del cliente. 
                        </p>
                    </div>
                    <div className='col mt-5 pt-5'>
                        <img src={imagenX} alt='Casa' style={{width:350,margin:0}}/>
                    </div>
                </div>
            </div>
        </Container>
    );
}
export default Cuerpo;