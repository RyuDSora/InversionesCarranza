import Container from 'react-bootstrap/esm/Container';
import PR from '../imgs/CasaAthems.jpg';
export default function Servicios(params) {
    
    return(
        <Container>
            <div className='bg-light border rounded-3'>
                <div className='p-2 shadow'><span className='h2'>Nuestros Servicios</span></div><br />

                <p> A continuación se muestran los servicios que ofrece nuestra empresa</p>
                
                {Serv('Diseño','/Servicios/Diseño')}
                <hr />
                {Serv('Construcción','/Servicios/Construcción')}
                <hr />
                {Serv('Mantenimiento','/Servicios/Mantenimiento')}
                <hr />
                {Serv('Remodelación','/Servicios/Remodelación')}

            </div>
        </Container>
    );
}
function services(n,i,url) {
    return(
        <div style={{width:'300px'}} className='bg-light border rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{n}</span></div>
            <div className='px-3'>
                <img src={i} alt="img" className='w-100 border rounded-3'/>
            </div><br />
            <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem suscipit, esse qui, ab sunt libero hic sint provident ipsam voluptates molestiae eligendi placeat cumque dolore sit rerum id sed consequuntur! </p>
        </div>       
    );
}

function Serv(servicio,url) {
    return(
        <div className='my-2 py-3'>
                    <div className='text-start h5 ps-4 ms-2'><span>{servicio}</span></div>
                    <div className='d-flex flex-wrap px-3 justify-content-around'>
                        <div className=''>{services('Diseño casa Athens',PR,'url')}</div>
                        <div className=''>{services('Diseño casa Boyacá',PR,'url')}</div>
                        <div className=''>{services('Diseño casa Patio',PR,'url')}</div>
                    </div>
                </div>
    );
}