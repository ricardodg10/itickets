// Import Modules
import React, { useState, useEffect } from "react";
import AdminDataService from "../Services/administrador.service";
import AdminForm from "./AdministradorForm";
  
const CreateAdmin = () => {
  const [formValues, setFormValues] = useState({ userRut: '', anios_experiencia: '', segundo_apellido: '', contrasenia: '', anios_experiencia:''})
  const onSubmit = clientObject => {
    AdminDataService.crearAdmin(clientObject)
      .then(res => {
        if (res.status === 200)
          alert('Admin successfully created')
        else
          Promise.reject()
      })
      .catch(err => alert('Something went wrong'))
  }
    
  // Return client form
  return(
    <AdminForm initialValues={formValues} 
      onSubmit={onSubmit} 
      enableReinitialize>
      Crear administrador
    </AdminForm>
  )
}
  
// Export CreateClient Component
export default CreateAdmin