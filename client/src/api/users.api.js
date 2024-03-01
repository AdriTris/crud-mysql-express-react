import axios from "axios";

export const getUsersRequest = async () =>
  await axios.get("http://localhost:4000/users");

// recibe un objeto usuario
export const createUserRequest = async (user) =>
  await axios.post("http://localhost:4000/users", user);

export const deleteUserRequest = async (id) => {
  await axios.delete(`http://localhost:4000/users/${id}`);
};

export const getUserRequest = async (id) => {
  const response = await axios.get(`http://localhost:4000/users/${id}`);
  return response;
};

export const updateUserRequest = async (id, newFields) => {
  const response = await axios.put(
    `http://localhost:4000/users/${id}`,
    newFields
  );
  return response;
};
