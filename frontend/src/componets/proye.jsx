import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar} from 'react-icons/fa'
import {Carousel, Button, Modal, Form } from 'react-bootstrap';
import { URICalificacion, URIPRXIMG, URIResenias } from "./Urls.jsx";
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import { encryptionKey,decryptValue } from "./hashes.jsx";

import Cookies from 'js-cookie';

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'
export const Project = ({PROYECTTO}) => {
    const [show, setShow] = useState(false);
    const [showCalifica, setShowCalifica] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const [Admin,setAdmin] = useState(false);
    const [user,setUser] = useState(false);
    const [UserId,setUserId] = useState('');
    const [value, setValue] = useState(0);
    const [calificacion,setcalificacion]=useState('');
    const [ccalif,setccalif]=useState(false);

    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const [listaimgxproyecto, setListaImgxProyecto] = useState([]);
    const [resenias,setResenias] = useState([]);
    const [addresenia, setAddResenia] = useState(false);
    const [NuevaResenia,setNuevaResenia] = useState('');
    const [cresenia,setCresenia]=useState(false);


    const OpenCalifica = () => setShowCalifica(true)
    const handleCloseCalifica = () => setShowCalifica(false)
    const handleReseniaTrue = () => setAddResenia(true);
    const handleCancel = () => setAddResenia(false);
    const enviarCalification = (id) => {
        const verifica = async(pid)=>{
            try {
                const response = await axios.get(URICalificacion)
                const IfCalifica = response.data.filter(C => C.idProyecto ===pid && C.idUsuario===UserId)
                const Nueva = {
                    "idProyecto":pid,
                    "idUsuario": UserId,
                    "calificacion":value
                }
                if (IfCalifica.length===0) {
                    axios.post(URICalificacion,Nueva)
                }
                else{
                    axios.put(URICalificacion+IfCalifica[0].id,Nueva)
                }
                setccalif(true);
            } catch (error) {
                console.log(error);
            }
        }
        verifica(id);
        handleCloseCalifica();
    }
    const handleSubmit = () =>{
        const AgregarResenia = () => {
            const reseña = {
                "idProyecto":PROYECTTO.id,
                "idUsuario":UserId,
                "resenia_proyecto":NuevaResenia
            }
            axios.post(URIResenias,reseña);
        }
        AgregarResenia();
        setNuevaResenia('');
        setAddResenia(false);
        setCresenia(true);
    }  
    
    
    const lista = async () => {
                    try {
                        const response = await axios.get(URIPRXIMG);
                        const imgsss = response.data.filter(I => I.idproyecto === PROYECTTO.id);
                        
                        const proyectoWithImages = 
                              await Promise.all(imgsss.map(
                                async (p) =>{
                                    const imageUrl = 
                                        await fetchImageUrl(p.idimagen);
                              return {...p, imageUrl};
                        }));
                        setListaImgxProyecto(proyectoWithImages);
                    } catch (err) {
                        console.log(err);
                    }
                }
   useEffect(()=>{
        
        if(Cookies.get('session')){
            setUser(true); 
            setUserId(+decryptValue(Cookies.get('UserId'), encryptionKey)); // Asignamos el ID del usuario
            if(+decryptValue(Cookies.get('UserRol'), encryptionKey)===1){setAdmin(true)};
          }
        lista();
        
    },[PROYECTTO])
    useEffect(()=>{
        const rese = async () =>{
            try {
                const response = await axios.get(URIResenias);
                const reseniaProye=response.data.filter(I => I.idProyecto === PROYECTTO.id);
                setResenias(reseniaProye);
            } catch (error) {
                console.log(error);
            }
        }
        rese();
        setCresenia(false);

    },[cresenia])
    useEffect(()=>{
        const Calificacion = async() =>{
            try {
                const response = await axios.get(URICalificacion+PROYECTTO.id);
                const Promedio = response.data;
                var X = Promedio.promedio_calificacion;
                if (!X) {X='0.00'}else{
                    let ca = X.substring(0, 4);
                    X = ca;
                }
                setcalificacion(X);
            } catch (error) {
                console.log(error);
            }
        };
        Calificacion();
        setccalif(false);
    },[ccalif])
    
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'>
                <span className='h6'>{PROYECTTO.nombreProyecto}</span>
            </div>
            {user ? 
            (Admin ? 
            (<div className='text-start ps-4 mt-1' style={{position:'absolute'}}>
                <span className='bg-light px-1 rounded-3 d-flex align-items-center'>
                    <FaStar className='me-1 text-primary'/>
                    <span>{calificacion}</span>
                </span>
            </div>):
            (<div className='text-start ps-4 mt-1' style={{position:'absolute'}} onClick={OpenCalifica}>
            <span className='bg-light px-1 rounded-3 d-flex align-items-center'>
                <FaStar className='me-1 text-primary'/>
                <span>{calificacion}</span>
            </span>
            </div>)):
            (
            <div className='text-start ps-4 mt-1' style={{position:'absolute'}}>
                <span className='bg-light px-1 rounded-3 d-flex align-items-center'>
                    <FaStar className='me-1 text-primary'/>
                    <span>{calificacion}</span>
                </span>
            </div>)}
            <div className='px-3'>
                <img src={PROYECTTO.imageUrl ? PROYECTTO.imageUrl:IMGPrueba} alt="img" className='w-100 border rounded-3' style={{height:'385px'}}/>
            </div>
            <Button variant="primary" onClick={handleShow} className='mt-2 pt-2'>
                Detalles
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{PROYECTTO.nombreProyecto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {listaimgxproyecto.length>0 ? 
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        {listaimgxproyecto.map((Q , index)=>(
                            <Carousel.Item key={'P'+Q.idproyecto+'I'+Q.idimagen+'index'+index}>
                                <img alt='img' src={Q.imageUrl} style={{ height: '300px', width: '100%' }}/>
                            </Carousel.Item>
                        ))}
                    </Carousel>):
                    (<Carousel activeIndex={index} onSelect={handleSelect}>
                        <Carousel.Item >
                            <img alt='img' src={IMGPrueba} style={{ height: '300px', width: '100%' }}/>
                        </Carousel.Item>
                    </Carousel>)}
                    <div><p>{PROYECTTO.descripcion_proyecto}</p></div>
                    <hr className='mx-0 my-1'/>
                    <div className='d-flex justify-content-between px-1'>
                        <span>Reseñas del proyecto</span>
                        {user ? (Admin ? (<></>):(<div onClick={handleReseniaTrue}>Agregar reseña</div>)):(<></>)}
                        
                    </div>
                    
                    <div className='border border-1'>
                        <div className='px-2'>
                            {resenias.length>0 ? (<>{
                                resenias.map((R,index)=>(
                                    <div key={index} className='border border-1 px-1 my-1'>{R.resenia_proyecto}</div>
                                ))
                            }</>):(<div className=''>No has reseñas de este proyecto</div>)}
                        </div>
                    </div>
                    <div className='mt-1'>
                        {addresenia ? (<><div>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control as="textarea" rows={3} 
                                    placeholder="Ingrese su reseña" value={NuevaResenia} 
                                    onChange={(e) => setNuevaResenia(e.target.value)} />
                                </Form.Group>
                                <div className='w-50 m-auto d-flex justify-content-around mt-2'>
                                    <Button variant="success" type="submit">
                                      Guardar
                                    </Button>
                                    <Button variant="danger" type="button" onClick={handleCancel}>
                                        Cancelar
                                    </Button>  
                                </div>
                            </Form>
                            </div></>):(<></>)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleClose} >
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                show={showCalifica}
                onHide={handleCloseCalifica}
                backdrop="static"
                keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>{PROYECTTO.nombreProyecto}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Calificar este proyecto</div>
                    <div>
                    <div className='d-flex justify-content-between align-items-center'>
                        <span>0<FaStar/></span><span>5<FaStar/></span><span>10<FaStar/></span>
                    </div>
                    <input
                        type="range"
                        className="form-range"
                        min="0"
                        max="10"
                        step="0.05"
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                    </div>
                    <div className="col text-center">
                    <p>Calificación: {value}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={()=>{enviarCalification(PROYECTTO.id)}}>
                        Calificar
                    </Button>
                    <Button variant="danger" onClick={handleCloseCalifica} >
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}