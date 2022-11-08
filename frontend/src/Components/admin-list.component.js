import React, { useState, useEffect } from "react";
import AdminDataService from "../Services/administrador.service";
import { Table } from "react-bootstrap";
import AdminTableRow from "./AdminTableRow";
  
const AdminList = () => {
  const [administrator, setAdmin] = useState([]);
  
  useEffect(() => {
    AdminDataService.mostrarAdmins()
      .then(({ data }) => {
        console.log(data);
        setAdmin(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  
  const DataTable = () => {
    return administrator.map((res, i) => {
      return <AdminTableRow obj={res} key={i} />;
    });
  };
  
  return (
    <div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Rut</th>
            <th>Nombre</th>
            <th>Primer apellido</th>
            <th>Segundo apellido</th>
            <th>Años de experiencia</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};
  
export default AdminList;