import Container from "react-bootstrap/esm/Container";
import BGImg from '../imgs/bgimg.jpg';
import Iperfil from '../imgs/perfil.png';

export default function Perfil() {
  //importar desde BD toda la info del perfil y guardarla en una variable
  let usuario = {
    imag_bg:BGImg,
    img_perfil:Iperfil,
    rol: 2,
    genero:'N/A',
    nombre: 'UserName',
    apellido: 'UserLast',
    correo: 'Email',
    telefono: '88888888',
    contasenia: 'password',
    fechaNacimiento: '01 Jan 2024'} ;
    if(usuario.rol===1){usuario.rol='Administrador'}else{usuario.rol='Cliente'}
   
    
  return(
    <Container className="my-2">
      <div className="border rounded-3 bg-light">
        <div id="header_perfil">
          <div style={{
                width:'100%',
                backgroundImage:'url('+usuario.imag_bg+')',
                height:'150px',backgroundSize:'cover',
                backgroundPosition:'center'}} 
                className="rounded-top-3 bg-light">
                </div>
                
          <div className="bg-light">
            <img ref={(node)=>{node.style.setProperty('margin-top','-50px','important')}} src={usuario.img_perfil} alt="perfil" style={{width:'150px'}} className="bg-light rounded-circle p-1 m-1"  id="img-perf1"/>
          </div>
          <span className="h2">Mi Perfil</span>
          <div></div>
        </div>
        <hr />
        <div id="body_oerfil" className="px-3">
          <form action="" className="mx-auto">
            <div className="input-group mb-3">
              <span className="input-group-text">Rol:</span>
              <input type="text" className="form-control" disabled value={usuario.rol}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Nombre:</span>
              <input type="text" className="form-control" disabled value={usuario.nombre}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Apellido:</span>
              <input type="text" className="form-control" disabled value={usuario.apellido}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Género:</span>
              <input type="text" className="form-control" disabled value={usuario.genero}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Teléfono:</span>
              <input type="text" className="form-control" disabled value={usuario.telefono}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Fecha Nacimiento:</span>
              <input type="text" className="form-control" disabled value={usuario.fechaNacimiento}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Correo:</span>
              <input type="text" className="form-control" disabled value={usuario.correo}/>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Contraseña:</span>
              <input type="password" className="form-control" disabled value={usuario.contasenia}/>
            </div>
          </form>
        </div>
        <hr />
        <div id="foot_perfil">aqui van los botones de editar perfil y guardar </div>
        <br />
      </div>
      <br />
    </Container>
  );
}
//al momento de dar click al boton editar perfil, se activan todos los inputs, excepto correo.
//ademas el input de fecha de nacimiento cambia de text->date, 
//el de genero deberia de cambiar o bien a un select o au check/radio con las opciones M,F,N/A
//se agrega un nuevo input bajo el de password para la confirmacion de contraseña
//se agrega un input file al lado de la img de fondo, y al lado de img de perfil
//y por ultimo el boton editar perfil cambiaria por un guardar y otro cancelar
