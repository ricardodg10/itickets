import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClientDataService from "../Services/client.service";
  
const ClientTableRow = (props) => {
  const { rut, primer_nombre, primer_apellido, segundo_apellido, client} = props.obj;
  
  const deleteClient = () => {
    ClientDataService.remove(rut)
      .then((res) => {
        if (res.status === 200) {
          alert("Client successfully deleted");
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
      <td>{client.num_contacto}</td>
      <td>{client.mail_contacto}</td>
    </tr>
  );
};
  
export default ClientTableRow;