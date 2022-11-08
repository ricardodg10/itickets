// Import Modules
import React, { useState, useEffect } from "react";
import EventDataService from "../Services/evento.service";
import EventForm from "./EventoForm";
  
const CreateEvent = () => {
  const [formValues, setFormValues] = useState({ nombre_evento: '', tipo_evento: '', direccion_evento: '', ciudad_evento: '', region_evento: '', dia_evento: '', mes_evento: '',
  anio_evento: '', hora_evento: '', precio_evento: '', descripcion_evento: '', administratorUserRut: '', cantidadDeTickets: ''})
  const onSubmit = eventObject => {
    EventDataService.crearEvento(eventObject)
      .then(res => {
        if (res.status === 200)
          alert('Event successfully created')
        else
          Promise.reject()
      })
      .catch(err => alert('Something went wrong'))
  }
    
  // Return client form 
  return(
    <EventForm initialValues={formValues} 
      onSubmit={onSubmit} 
      enableReinitialize>
      Crear evento
    </EventForm>
  )
}
  
// Export CreateEvent Component
export default CreateEvent