import axios from "axios";

export const getLogin = async (email, password) => {
  const response = await axios.post(`http://localhost:4000/login`, {
    email: email,
    password: password,
  });
  return response;
};
