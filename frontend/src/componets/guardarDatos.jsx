import React, {useState,useEffect} from 'react';
import axios from 'axios';

const URIServicios = 'http://'+window.location.hostname+':8000/ServiciosOfrecidos/';
const URIProyectos = 'http://'+window.location.hostname+':8000/proyectosrealizados/';
//const URIImages = 'http://'+window.location.hostname+':8000/imagenes/';
const Name = () => {
  const [file, setFile] = useState(null)
  const [imagesList,setImagesList]=useState([])
  const [lsUp, setLsUp] = useState(false)
  
  useEffect(()=>{
    fetch('http://'+window.location.hostname+':8000/images/get')
    .then(res => res.json())
    .then(res => setImagesList(res))
    .catch(err => {
      console.error(err)
    })
    setLsUp(false) 
  },[lsUp])
  const selectedHandler = e => {
    setFile(e.target.files[0])
  }
  
  const sendHandler = () => {
    if(!file){
      alert('you must upload file')
      return
    }

    const formdata = new FormData()
    formdata.append('image', file)

    fetch('http://'+window.location.hostname+':8000/images/post', {
      method: 'POST',
      body: formdata
    })
    .then(res => res.json())
    .then(data => {
      console.log('ID de la imagen subida:', data.id);
      setLsUp(true)
    })
    .catch(err => {
      console.error(err)
    })

    document.getElementById('fileinput').value = null

    setFile(null)
  }

  
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
        <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <a href="#!" className="navbar-brand">Image App</a>
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
              <img src={'http://'+window.location.hostname+':8000/'+img} alt="..." className='card-img-top' style={{height:200,width:300}}></img>
            </div> 
          ))}
      </div>

        
        </>
    )
}
export default Name;