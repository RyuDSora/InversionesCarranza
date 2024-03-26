import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar} from 'react-icons/fa'
import {Carousel, Button, Modal, Form } from 'react-bootstrap';
import { URIPRXIMG, URIResenias } from "./Urls.jsx";
import { fetchImageUrl } from './fetchImageUrl'; // Importa la función fetchImageUrl
import { encryptionKey,decryptValue } from "./hashes.jsx";

import Cookies from 'js-cookie';

import IMGPrueba from '../imgs/Imagen-no-disponible-282x300.png'
export const Project = ({PROYECTTO}) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const handleClose = () => setShow(false);
    const [Admin,setAdmin] = useState(false);
    const [user,setUser] = useState(false);
    const [UserL,setUserL] = useState('');
    const [UserId,setUserId] = useState('');

    const handleShow = () => setShow(true);
    const handleSelect = (selectedIndex) => setIndex(selectedIndex);
    const [listaimgxproyecto, setListaImgxProyecto] = useState([]);
    const [resenias,setResenias] = useState([]);
    const [addresenia, setAddResenia] = useState(false);
    const [NuevaResenia,setNuevaResenia] = useState('');
    const [cresenia,setCresenia]=useState(false);


    
    const handleReseniaTrue = () => setAddResenia(true);
    const handleCancel = () => setAddResenia(false);
    const handleSubmit = () =>{
        const AgregarResenia = () => {
            const reseña = {
                "idProyecto":PROYECTTO.id,
                "idUsuario":UserId,
                "resenia_proyecto":NuevaResenia
            }
            console.log(UserId);
            console.log(PROYECTTO.id);
            console.log(NuevaResenia);
            axios.post(URIResenias,reseña);
        }
        AgregarResenia()
        setAddResenia(false);
        setCresenia(true);
    }
   useEffect(()=>{
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
        if(Cookies.get('session')){
            setUser(true); 
            setUserL(decryptValue(Cookies.get('User'), encryptionKey));
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
                console.log(reseniaProye);
            } catch (error) {
                console.log(error);
            }
        }
        rese();
        setCresenia(false);

    },[cresenia])
    
    return (
        <div style={{ backgroundColor:'rgb(255,255,255,0.7)' }} className='shadow-lg rounded-3 pt-2 pb-3 my-2'>
            <div className='p-2'>
                <span className='h6'>{PROYECTTO.nombreProyecto}</span>
            </div>
            <div className='text-start ps-4 mt-1' style={{position:'absolute'}}>
                <span className='bg-light px-1 rounded-3 d-flex align-items-center'>
                    <FaStar className='me-1 text-primary'/>
                    <span>{PROYECTTO.calificacion}</span>
                </span>
            </div>
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
        </div>
    );
}