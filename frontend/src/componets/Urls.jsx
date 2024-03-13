var origin = window.location.origin;
var partes = origin.split(":");
var originSinPuerto = partes[0] + ":" + partes[1];

export const URIServicios    = originSinPuerto + ':8000/ServiciosOfrecidos/';  //url de servicios
export const URIPRXIMG       = originSinPuerto + ':8000/proyehasimage/';       //url de las imagenes complementarias de proyectos
export const URIDeleteImagen = originSinPuerto + ':8000/imagenes/';            //borrar imagenes
export const URIImagenPost   = originSinPuerto + ':8000/images/post';          //url para imagenes 
export const URIImagenGet    = originSinPuerto + ':8000/images/get';           //url para imagenes 
export const URIProyectos    = originSinPuerto + ':8000/proyectosrealizados/'; //url de proyectos  
export const URIViewImagen   = originSinPuerto + ':8000/';                     //url para visualizacion de imagenes
export const URIUsuarios     = originSinPuerto + ':8000/usuarios/'             //url para los usuarios