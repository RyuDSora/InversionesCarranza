import inversionesCarranza from "../imgs/InversionesCarranza.png"
import Container from 'react-bootstrap/Container';
import fblogo from '../imgs/fb-logo.svg';
import Insta from '../imgs/instagram-logo@logotyp.us.svg';
import whats from '../imgs/whatsapp-logo@logotyp.us.svg';

function FooterIC() {
    return(
        <Container className="bg-light py-3">
            <div className='row'>
                <div className="col mt-md-0 mt-3">
                    <img src={inversionesCarranza} alt="InCarranza" style={{width:200,margin:0}}/>
                    <div className="w-50 mx-auto pt-3">
                        <p style={{fontSize:'x-small'}}>
                            Empresa enfocada en el diseño y la construcción, tambien 
                            hacemos un mantenimiento en su hogar u oficina, 
                            con precios competitivos y responsabilidad.
                        </p>
                    </div>
                </div>
                <hr className="clearfix w-100 d-md-none pb-0"/>
                <div className="col mb-md-0 mb-3" style={{fontSize:'small'}}>
                    <span className="text-uppercase h6">contactanos</span>
                    <ul className="list-unstyled">
                        <li><span>+504 31956103</span></li>
                        <li><span>correoempresa@mail.com</span></li>
                        <li><span>Tegucigalpa, Honduras</span></li>
                    </ul>
                    <div className="row mx-auto" style={{width:'45%'}}>
                        <div className="col px-0">
                            <a href="https://www.facebook.com/profile.php?id=100089128535630">
                                <img src={fblogo} alt="fb logo" style={{width:'50px'}}/>
                            </a>
                        </div>
                        <div className="col px-0">
                            <a href="https://www.instagram.com/inversionescarranza/">
                                <img src={Insta} alt="inst logo" style={{width:'50px'}}/>
                            </a>
                        </div>
                        <div className="col px-0">
                            <a href="https://wa.me/31956103">
                                <img src={whats} alt="wh logo" style={{width:'50px'}}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-start py-1 " style={{fontSize:'xx-small',paddingLeft:'195px'}}>© 2024 Copyright:
                <a href="/"> IS802-1900-1-2024</a>
            </div>
        </Container>
    );
}

export default FooterIC;