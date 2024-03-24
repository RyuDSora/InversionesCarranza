import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image1 from '../imgs/diseno_planos.jpg'; 
import Image2 from '../imgs/pintura.jpg'; 

const services = [
    { id: 1, name: 'Diseño de Planos', description: '', image: Image1 },
    { id: 2, name: 'Pintura', description: '', image: Image2 },
];

function App() {
    const [selectedService, setSelectedService] = useState(null);

    const handleServiceClick = (service) => {
        setSelectedService(service);
    };

    if (selectedService) {
        return (
            <div className="container">
                <h1>Solicitud para {selectedService.name}</h1>
                <form className="d-flex justify-content-center flex-column">
                    <div className="mb-1 col-md-6 mx-auto">
                        <label htmlFor="phone" className="form-label">Teléfono de Contacto</label>
                        <input type="tel" className="form-control form-control-sm" id="phone" required />
                    </div>
                    <div className="mb-1 col-md-6 mx-auto">
                        <label htmlFor="description" className="form-label">Descripción Detallada de la Solicitud</label>
                        <textarea className="form-control form-control-sm" id="description" rows="3" required></textarea> <br /><br />
                    </div>
                    <button type="submit" className="btn btn-primary mx-auto">Enviar solicitud</button>
                </form>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Selecciona un servicio</h1>
            <div className="row">
                {services.map((service) => (
                    <div key={service.id} className="col-4 d-flex align-items-stretch">
                        <div className="card h-100 d-flex flex-column" onClick={() => handleServiceClick(service)}>
                            <img src={service.image} className="card-img-top" alt={service.name} />
                            <div className="card-body">
                                <h5 className="card-title">{service.name}</h5>
                                <p className="card-text">{service.description}</p>
                                <button className="btn btn-primary mt-auto">Seleccionar</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;