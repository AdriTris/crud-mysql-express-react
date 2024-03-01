import axios from "axios";

export const getClientsRequest = async () =>
  await axios.get("http://localhost:4000/clients");

// recibe un objeto usuario
export const createClientRequest = async (client) =>
  await axios.post("http://localhost:4000/clients", client);

export const deleteClientRequest = async (id) => {
  await axios.delete(`http://localhost:4000/clients/${id}`);
};

export const getClientRequest = async (id) => {
  const response = await axios.get(`http://localhost:4000/clients/${id}`);
  return response;
};

export const updateClientRequest = async (id, newFields) => {
  const response = await axios.put(
    `http://localhost:4000/clients/${id}`,
    newFields
  );
  return response;
};
