const PuertoBackend = ':8000'; //en caso de no usar puerto dejar esta constante vacia 
//const PuertoBackend = ''; 
var origin = window.location.origin;
var partes = origin.split(":");
var originS = partes[0] + ":" + partes[1];


export const URIServicios    = originS + PuertoBackend + '/ServiciosOfrecidos/';  //url de servicios
export const URIPRXIMG       = originS + PuertoBackend + '/proyehasimage/';       //url de las imagenes complementarias de proyectos
export const URIDeleteImagen = originS + PuertoBackend + '/imagenes/';            //borrar imagenes
export const URIImagenPost   = originS + PuertoBackend + '/images/post';          //url para imagenes 
export const URIImagenGet    = originS + PuertoBackend + '/images/get';           //url para imagenes 
export const URIProyectos    = originS + PuertoBackend + '/proyectosrealizados/'; //url de proyectos  
export const URIViewImagen   = originS + PuertoBackend + '/';                     //url para visualizacion de imagenes
export const URIUsuarios     = originS + PuertoBackend + '/usuarios/'             //url para los usuarios
export const URICalificacion = originS + PuertoBackend + '/calificaciones/'       //url para las calificaciones
export const URIEstados      = originS + PuertoBackend + '/estados/'              //url para los Estados de las solicitudes
export const URIResenias     = originS + PuertoBackend + '/resenias/'             //url para las resenias de los proyectos
export const URISolicitudes  = originS + PuertoBackend + '/solicitudes/'          //url para las solicitudes