import http from "./http-common";

const crearAdmin = data => {
  return http.post("/administradores", data);
};

const mostrarAdmins = () => {
  return http.get("/administradores/all");
};




const ClientService = {
  crearAdmin,
  mostrarAdmins
};

export default ClientService;