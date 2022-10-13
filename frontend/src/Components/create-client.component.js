// Import Modules
import React, { useState, useEffect } from "react";
import ClientDataService from "../Services/client.service";
import ClientForm from "./ClientForm";
  
const CreateClient = () => {
  const [formValues, setFormValues] = useState({ userRut: '', primer_nombre: '', primer_apellido: '', segundo_apellido: '', contrasenia: '', num_contacto: '', mail_contacto:''})
  const onSubmit = clientObject => {
    ClientDataService.crearCliente(clientObject)
      .then(res => {
        if (res.status === 200)
          alert('Client successfully created')
        else
          Promise.reject()
      })
      .catch(err => alert('Something went wrong'))
  }
    
  // Return client form
  return(
    <ClientForm initialValues={formValues} 
      onSubmit={onSubmit} 
      enableReinitialize>
      Crear cliente
    </ClientForm>
  )
}
  
// Export CreateClient Component
export default CreateClient