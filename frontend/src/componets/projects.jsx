import Container from 'react-bootstrap/esm/Container';
import PR from '../imgs/proyectIMG.jpg';
export default function projects(params) {
    
    return(
        <Container>
            <div className='bg-light border rounded-3'>
                <div className='p-2 shadow'><span className='h2'>Nuestros Proyectos</span></div>
                
                {Cont('Construccion','/Proyectos/Construccion')}
                <hr />
                {Cont('Remodelacion','/Proyectos/Remodelacion')}
                <hr />
                {Cont('Planos','/Proyectos/Planos')}
                
            </div>
        </Container>
    );
}
function proyect(n,i,url) {
    return(
        <div style={{width:'300px'}} className='bg-light border rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'><span className='h6'>{n}</span></div>
            <div className='px-3'>
                <img src={i} alt="img" className='w-100 border rounded-3'/>
            </div>
            <div className='btn btn-info mt-2'>
                <a href={url}>
                    mas detalle
                </a>
            </div>
        </div>       
    );
}
function More(url) {
    return(
        <div style={{width:'300px',height:'500px'}} className='bg-light border rounded-3 py-2 my-2 d-flex align-items-center'>
            <a href={url} className='mx-auto'>
                <div className='border rounded-4' style={{width:'100px',height:'100px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                    </svg>
                </div>
            </a>
        </div>       
    );
}
function Cont(servicio,url) {
    return(
        <div className='my-2 py-3'>
                    <div className='text-start h5 ps-4 ms-2'><span>{servicio}</span></div>
                    <div className='d-flex flex-wrap px-3 justify-content-around'>
                        <div className=''>{proyect('Proyecto 1',PR,'url')}</div>
                        <div className=''>{proyect('Proyecto 2',PR,'url')}</div>
                        <div className=''>{proyect('Proyecto 3',PR,'url')}</div>
                        <div className=''>{More(url)}</div>
                    </div>
                </div>
    );
}