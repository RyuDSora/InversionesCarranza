// Importa el modelo y las funciones del controlador
import { getAllServiciosOfrecidos, getServiciosOfrecidos, deleteServiciosOfrecidos, updateServiciosOfrecidos } 
from '../controller/ServiciosOfrecidosController.js'

async function test() {
    try {
      // Probar la función para obtener todos los servicios ofrecidos
      const todosLosServicios = await getAllServiciosOfrecidos();
      console.log("Todos los servicios ofrecidos:", todosLosServicios);
  
      // Probar la función para obtener un servicio ofrecido por su ID
      const servicioPorId = await getServiciosOfrecidos({ params: { id: "ID_DEL_SERVICIO" } });
      console.log("Servicio ofrecido por ID:", servicioPorId);
  
      // Probar la función para eliminar un servicio ofrecido por su ID
      const resultadoEliminar = await deleteServiciosOfrecidos({ params: { id: "ID_DEL_SERVICIO" } });
      console.log("Resultado de eliminar servicio:", resultadoEliminar);
  
      // Probar la función para actualizar un servicio ofrecido por su ID
      const resultadoActualizar = await updateServiciosOfrecidos({ params: { id: "ID_DEL_SERVICIO" }, body: { /* datos para actualizar */ } });
      console.log("Resultado de actualizar servicio:", resultadoActualizar);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // Llamar a la función de prueba
  test();
