import http from "./http-common";

const crearEvento = data => {
  return http.post("/eventos", data);
};

const obtenerEventos = () => {
  return http.get("/eventos/all");
};

const EventService = {
  crearEvento,
  obtenerEventos,

};

export default EventService;