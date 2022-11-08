import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminDataService from "../Services/administrador.service";
  
const AdminTableRow = (props) => {
  const { rut, primer_nombre, primer_apellido, segundo_apellido, administrator} = props.obj;
  
  const deleteAdmin = () => {
    AdminDataService.remove(rut)
      .then((res) => {
        if (res.status === 200) {
          alert("Admin successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => {
        alert("Something went wrong")
      });
  };
  
  return (
    <tr>
      <td>{rut}</td>
      <td>{primer_nombre}</td>
      <td>{primer_apellido}</td>
      <td>{segundo_apellido}</td>
      <td>{administrator.anios_experiencia}</td>
      
    </tr>
  );
};
  
export default AdminTableRow;