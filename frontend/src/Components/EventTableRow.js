import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import  EventDataService from "../Services/evento.service";
  
const EventTableRow = (props) => {
  const { nombre_evento, tipo_evento, direccion_evento, ciudad_evento, 
    region_evento,  dia_evento, mes_evento, anio_evento, hora_evento, 
    precio_evento} = props.obj;
  
  const deleteEvent = () => {
    EventDataService.remove(nombre_evento)
      .then((res) => {
        if (res.status === 200) {
          alert("Event successfully deleted");
          window.location.reload();
        } else Promise.reject();
      })
      .catch((err) => {
        alert("Something went wrong")
      });
  };
  
  return (
    <tr>
      <td>{nombre_evento}</td>
      <td>{tipo_evento}</td>
      <td>{direccion_evento}</td>
      <td>{ciudad_evento}</td>
      <td>{region_evento}</td>
      <td>{dia_evento}</td>
      <td>{mes_evento}</td>
      <td>{anio_evento}</td>
      <td>{hora_evento}</td>
      <td>{precio_evento}</td>
    </tr>
  );
};
  
export default EventTableRow;