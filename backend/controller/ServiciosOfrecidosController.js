import ServiciosOfrecidosModel from "../models/ServiciosOfrecidosModels.js";


// Mostrar todos los Servicio realizados
export const getAllServiciosOfrecidos = async (req, res) => {
  try {
      const ServiciosOfrecidos = await ServiciosOfrecidosModel.findAll();
      res.json(ServiciosOfrecidos);
  } catch (error) {
      res.json({ message: error.message });
  }
};

/////////////////////////////////////////////

// Mostrar servicios por id 
export const getServiciosOfrecidos= async (req, res) => {
  try {
      const ServiciosOfrecidos = await ServiciosOfrecidosModel.findByPk(req.params.id);
      if (ServiciosOfrecidos) {
          res.json(ServiciosOfrecidos);
      } else {
          res.status(404).json({ message: 'Servicio no encontrado' });
      }
  } catch (error) {
      res.json({ message: error.message });
  }
};



// Eliminar un Servicio por su ID
export const deleteServiciosOfrecidos = async (req, res) => {
  try {
      const deletedRowCount = await ServiciosOfrecidosModel.destroy({
          where: { id: req.params.id }
      });
      if (deletedRowCount === 0) {
          res.status(404).json({ message: 'No se encontró ningún Servicio  para eliminar' });
      } else {
          res.json({ message: '¡Servicios eliminado correctamente!' });
      }
  } catch (error) {
      res.json({ message: error.message });
  } 
}; 

// Actualizar un servicios ID
export const updateServiciosOfrecidos = async (req, res) => {
  try {
      const [updatedRowsCount] = await ServiciosOfrecidosModel.update(req.body, {
          where: { id: req.params.id }
      });
      if (updatedRowsCount === 0) {
          res.status(404).json({ message: 'No se encontró ningún servido con ID' });
      } else {
          res.json({ message: '¡Servicio Realizado con exito!' });
      }
  } catch (error) {
      res.json({ message: error.message });
  }
};

// Crear un nuevo servicio
export const createServiciosOfrecidos = async (req, res) => {
    try {
        await ServiciosOfrecidosModel.create(req.body);
        res.json({ message: '¡SE CREO UN SERVICIO CORRECTAMENTE !' });
    } catch (error) {
        res.json({ message: error.message });
    }
};