import { useState, useEffect } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import {Container,Modal,Button,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { URIUsuarios,URIImagenPost } from "./Urls.jsx";
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import BGImg from '../imgs/bgimg.jpg';
import Iperfil from '../imgs/perfil.png';
import { FaEdit } from 'react-icons/fa';

export default function Foto() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [Usuario,setUsuario]=useState([]);
    const [showModal,setShowModal]=useState(false)
    const [Cfondo,setCfondo]=useState(false)
    const [IMG,setIMG]=useState(null)
    const [previewURL,setPreviewURL]=useState(null)
    const [errorIMG,setErrorIMG]=useState(false)
    useEffect(()=>{
        if (!Cookies.get('session')) {
            navigate('/')
        }
        const perfil = async ()=> {
            try {
                const response = await axios.get(URIUsuarios+userId);
                const UserFotos = response.data;
                if (UserFotos.perrfil) {
                    const UserWithPerfil = await fetchImageUrl(UserFotos.perrfil);
                    UserFotos.urlPerfil= UserWithPerfil    
                }
                if (UserFotos.fondo) {
                    const UserWithFondo = await fetchImageUrl(UserFotos.fondo);
                    UserFotos.urlFondo= UserWithFondo    
                }
                setUsuario(UserFotos);
            } catch (error) {
                console.log(error);
            }
        }
        perfil()
    },[userId])
    const changeFondo = ()=>{
        setCfondo(true)
        setShowModal(true)
    }
    const changePerfil = ()=>{
        setCfondo(false)
        setShowModal(true)
    }
    const handleCloseModal = ()=>{
        setShowModal(false)
        setPreviewURL(null)
        setIMG(null)
    }
    const handleSubmit = () => {
        if (Cfondo) {
            if (IMG) {
                //guardaremos la img
                const GuardarImg = async ()=>{
                    try {
                        var id;
                        const formdata = new FormData()
                        formdata.append('image', IMG)
                        await fetch(URIImagenPost, {method: 'POST',body: formdata})
                        .then(res => res.json()).then(data => {
                         id = data.id;
                        })
                        await axios.put(URIUsuarios+userId,{fondo:id})
                        .catch(err => {console.error(err)})
                    } catch (error) {
                        console.log(error);
                    }
                }
                GuardarImg()
            }else{
                alert('Cargue una nueva imagen o presione el botón Cancelar')   
            }
        }
        else{
            if (IMG) {
                const GuardarImg = async ()=>{
                    try {
                        var id;
                        const formdata = new FormData()
                        formdata.append('image', IMG)
                        await fetch(URIImagenPost, {method: 'POST',body: formdata})
                        .then(res => res.json()).then(data => {
                         id = data.id;
                        })
                        await axios.put(URIUsuarios+userId,{perrfil:id})
                        .catch(err => {console.error(err)})
                    } catch (error) {
                        console.log(error);
                    }
                }
                GuardarImg()
                
            }else{
                alert('Cargue una nueva imagen o presione el botón Cancelar')
                setErrorIMG(true)      
            }
        }
        handleCloseModal()
        window.location.reload()
    }
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setIMG(selectedFile);
        const reader = new FileReader();
        reader.onload = (e) => {
            if (!Cfondo) {
                const img = new Image();
                img.src = e.target.result;
            
                img.onload = () => {
                if (img.width === img.height) {
                    setErrorIMG(false);
                    console.log('img cuadrada');
                  
                } else {
                    setErrorIMG(true)
                    alert('La imagen de perfil debe ser cuadrada, ejemplo 400x400,200x200,50x50');
                }
              };
            
            }
        setPreviewURL(reader.result);
        };
        reader.readAsDataURL(selectedFile);

        //const file = event.target.files[0];
        const readers = new FileReader();

        
            //readers.readAsDataURL(file);
    };
    
    return(
        <Container>
            <div id="header_perfil" className="bg-light pb-3 rounded-bottom-3 my-2">
                <div>
                    <div style={{position:'absolute',color:'white'}} title='Editar Imagen de Fondo'>
                        <div className='d-flex justify-content-end' >
                            <button className='btn px-2 py-1'  style={{color:'white'}} onClick={changeFondo}>
                                <FaEdit/>
                            </button>
                        </div>
                    </div>
                    {Usuario.fondo ?  
                    (
                        <div style={{
                            width: '100%',
                            backgroundImage: 'url(' + Usuario.urlFondo + ')',
                            height: '150px', backgroundSize: 'cover',
                            backgroundPosition: 'center'
                            }}
                            className="rounded-top-3 bg-light">
                        </div>
                    ):
                    (
                        <div style={{
                            width: '100%',
                            backgroundImage: 'url(' + BGImg + ')',
                            height: '150px', backgroundSize: 'cover',
                            backgroundPosition: 'center'
                            }}
                            className="rounded-top-3 bg-light">
                        </div>
                    )}
                    
                </div>
                <div>
                    {Usuario.perrfil ? 
                    (
                        <div className="bg-light">
                            <img ref={(node) => { node && node.style.setProperty('margin-top', '-50px', 'important') }} src={Usuario.urlPerfil} alt="perfil" style={{ width: '150px' }} className="bg-light rounded-circle p-1 m-1" id="img-perf1" />
                        </div>
                    ):
                    (
                        <div className="bg-light">
                            <img ref={(node) => { node && node.style.setProperty('margin-top', '-50px', 'important') }} src={Iperfil} alt="perfil" style={{ width: '150px' }} className="bg-light rounded-circle p-1 m-1" id="img-perf1" />
                        </div>
                    )}
                    <div title='Editar Imagen de Perfil' style={{marginTop:'-45px',marginLeft:'150px'}}>
                        <div className='d-flex justify-content-center' >
                            <button className='btn px-2 py-1'  onClick={changePerfil}>
                                <FaEdit/>
                            </button>
                        </div>
                    </div>
                </div>
                <span className="h2">{Usuario.nombre+' '+Usuario.apellido}</span>
                <div className='mt-3'>
                    <Link to={`/Perfil/${userId}`} className="btn btn-danger ms-2">Cancelar</Link>
                </div>
            </div>
            <Modal show={showModal} onHide={handleCloseModal} backdrop="static" keyboard={false}>
                <Modal.Header className='justify-content-center'>
                    Cambiar la imagen de {Cfondo ? (<>Fondo</>):(<>Perfil</>)}
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <span>Imagen Actual</span>
                        {Cfondo ? 
                        (
                            <div className='mb-2 d-flex justify-content-center'>
                                {Usuario.fondo ? 
                                (<img src={Usuario.urlFondo} style={{width:'-webkit-fill-available'}}/>):
                                (<img src={BGImg} style={{width:'-webkit-fill-available'}}/>)}
                            </div>
                        ):
                        (
                            <div className='mb-2 d-flex justify-content-center'>
                                {Usuario.perrfil ? 
                                (<img src={Usuario.urlPerfil} style={{width:'-webkit-fill-available'}}/>):
                                (<img src={Iperfil} style={{width:'-webkit-fill-available'}}/>)}
                            </div>
                        )}
                        
                        <Form.Group className="mb-3" controlId="formBasicFile">
                                <Form.Label>Cambiar imagen de {Cfondo ? (<>fondo</>):(<>perfil</>)}</Form.Label>
                                <Form.Control type="file"  accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        </Form.Group>
                        {previewURL ? (<>
                            <span>Nueva Imagen</span>
                            <div className='mb-2 d-flex justify-content-center'>
                                <img src={previewURL} thumbnail style={{width:'-webkit-fill-available'}}/>
                        </div>    
                        </>):(<></>)}
                    </Form>
                </Modal.Body>
                <Modal.Footer className='justify-content-center'>
                    <Button onClick={
                        ()=>{ 
                            if(errorIMG){alert('cargue una imagen nueva')}
                            else{handleSubmit()}}
                        }>Guardar</Button>
                    <Button onClick={handleCloseModal}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}