import React, { useState, useEffect } from "react";
import EventDataService from "../Services/evento.service";
import { Table } from "react-bootstrap";
import EventTableRow from "./EventTableRow";
  
const EventList = () => {
  const [event, setEvent] = useState([]);
  
  useEffect(() => {
    EventDataService.obtenerEventos()
      .then(({ data }) => {
        console.log(data);
        setEvent(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const DataTable = () => {
    return event.map((res, i) => {
      return <EventTableRow obj={res} key={i} />;
    });
  };
  
  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>Región</th>
            <th>Día</th>
            <th>Mes</th>
            <th>Año</th>
            <th>Hora</th>
            <th>Precio entrada</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};
  
export default EventList;