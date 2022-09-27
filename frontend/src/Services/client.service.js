import http from "./http-common";

const getAll = () => {
  return http.get("/clients");
};

const get = id => {
  return http.get(`/clients/${id}`);
};

const create = data => {
  return http.post("/clients", data);
};

const update = (id, data) => {
  return http.put(`/clients/${id}`, data);
};

const remove = id => {
  return http.delete(`/clients/${id}`);
};

const removeAll = () => {
  return http.delete(`/clients`);
};


const ClientService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll
};

export default ClientService;