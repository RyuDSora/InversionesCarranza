import React, {useState,useEffect} from 'react';
import axios from 'axios';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
const URIImages = 'http://'+window.location.hostname+':8000/imagenes/';
const Name = () => {
  const [file, setFile] = useState(null)
  const [imagesList,setImagesList]=useState([])
  const [lsUp, setLsUp] = useState(false)
  const [LSIMAGEN,setLSIMAGEN] = useState([])
  const selectedHandler = e => {
    setFile(e.target.files[0])
  }

  useEffect(() => {
    const imageness = async () => {
        try {
            const response = await axios.get(URIImages);
            const imagessData = response.data
            setLSIMAGEN(imagessData);
        } catch (err) {
            console.log(err);
        }
    }

    imageness();
  }, []); 

  const sendHandler = () => {
    // Verifica si hay un archivo seleccionado
    if (!file) {
        alert('Debes subir un archivo');
        return;
    }

    // Crea un nuevo FormData y agrega el archivo seleccionado
    const formData = new FormData();
    formData.append('image', file);

    // Envía la solicitud POST al servidor utilizando Axios
    axios.post(URIImages, formData)
        .then(res => res.text()) // Convierte la respuesta a texto
        .then(res => {
            console.log(res); // Registra la respuesta en la consola
            setLsUp(true); // Actualiza el estado para indicar que la imagen se ha subido con éxito
        })
        .catch(err => {
            console.error(err); // Maneja cualquier error capturado durante el proceso de envío
        });

    // Limpia el campo de entrada de archivos y reinicia la variable de archivo
    document.getElementById('fileinput').value = null;
    setFile(null);
};
    const servicios = {
        "1": { 
            nombre_servicio: 'Construcción', 
            detalle_servicio: 'Nos especializamos en la construcción de casas y oficinas de primera calidad.'
             
          },
        "2":{ 
            nombre_servicio: 'Remodelaciones', 
            detalle_servicio: 'Nos especializamos en la construcción de casas y oficinas de trabajo de primera calidad.' 
            
      
          },
          "3":{ 
            nombre_servicio: 'Diseño de Planos', 
            detalle_servicio: 'Diseñamos los planos de construcción con los estilos más modernos.' 
            
          }  

    };
    const Proyectos = [];
    
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 1,
                    nombreProyecto: 'Proyecto CR'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!'
                    }
            );}
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 2,
                    nombreProyecto: 'Proyecto RM'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!'
                   }
            );}
        for (let index = 0; index < 15; index++) {
            let numero = index+1;
            Proyectos.push({
                    categoria_servicio: 3,
                    nombreProyecto: 'Proyecto DP'+ numero,
                    descripcion_proyecto: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo hic minus magnam earum repudiandae aut ipsam sunt voluptatum laboriosam autem. Dicta voluptate mollitia itaque consectetur incidunt labore excepturi in neque!'
                    }
            );}
    
    //console.log(Proyectos);




    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post(URIServicios,servicios[1]);
            await axios.post(URIServicios,servicios[2]);
            await axios.post(URIServicios,servicios[3]);
            for (let index = 0; index < Proyectos.length; index++) {
                await axios.post(URIProyectos,Proyectos[index]);
            }
        } catch (error) {
            console.error('Error al realizar la solicitud HTTP:', error);
        }
    }
    
    return(
        <>
        <nav className='navbar navbar-dark bg-dark'>
            <div className='container'>
                <a href="#!" className='navbar-brand'>Agregar Servicios y Proyectos</a>
            </div>
            <form onSubmit={handleSubmit} className='m-3'>
            <input type="submit" className='btn btn-primary shadow-lg' value='Guardar'/>
            
        </form>
        </nav>
        <br />
        <nav className='navbar navbar-dark bg-dark'>
            <div className='container'>
                <a href="#!" className='navbar-brand'>Guardar Imagen</a>
            </div>
        </nav>
        <div className="container mt-5">
        <div className="card p-3">
          <div className="row">
            <div className="col-10">
              <input id="fileinput" onChange={selectedHandler} className="form-control" type="file"/>
            </div>
            <div className="col-2">
              <button onClick={sendHandler} type="button" className="btn btn-primary col-12">Upload</button>
            </div>
          </div>
        </div>
      </div>
      <div className='container mt-3' style={{display:'flex',flexWrap:'wrap'}}>
          {imagesList.map(img => (
            <div key={img} className='card p-2'>
              <img src={'http://localhost:9000/'+img} alt="..." className='card-img-top' style={{height:200,width:300}}></img>
            </div> 
          ))}
      </div>
      { LSIMAGEN.map(lmagen => (
          <div key={lmagen}>
            <span>{lmagen.id}</span>
            <span>{lmagen.nombre}</span>
            <span>{lmagen.tipo}</span>
          </div>
        ))}
        </>
    )
}
export default Name;