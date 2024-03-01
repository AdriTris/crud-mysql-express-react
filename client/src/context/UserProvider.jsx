import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  getUserRequest,
  updateUserRequest,
} from "../api/users.api";
import {
  getClientsRequest,
  getClientRequest,
  createClientRequest,
  deleteClientRequest,
  updateClientRequest,
} from "../api/clients.api";

import { getLogin } from "../api/login.api";

//creando hook useUsers
export const useUsers = () => {
  const context = useContext(UserContext);

  //si el contexto no existe, no esta dentro del componente provider
  if (!context) {
    throw new Error("useUsers must be used within a UserContextProvider");
  }
  return context;
};
export const useClients = () => {
  const context = useContext(UserContext);

  //si el contexto no existe, no esta dentro del componente provider
  if (!context) {
    throw new Error("useClients must be used within a UserContextProvider");
  }
  return context;
};

export const useLogin = () => {
  const context = useContext(UserContext);

  //si el contexto no existe, no esta dentro del componente provider
  if (!context) {
    throw new Error("useLogin must be used within a UserContextProvider");
  }
  return context;
};

//agrupa todos los componentes
export const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [loginAuth, setLoginAuth] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //Users
  async function loadUser() {
    //llenar la variable users con el array de usuarios
    const response = await getUsersRequest();
    setUsers(response.data); //guarda todo e array dentro de users
  }

  const createUser = async (user) => {
    try {
      const response = await createUserRequest(user);
      //setUsers([...users, response.data]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const response = await getUserRequest(id);

      if (response && response.data) {
        return response.data;
      } else {
        console.log("No data returned from getUserRequest");
        return null; // O manejar el caso en que no se devuelvan datos
      }
      // console.log(response.data);
      // return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateUser = async (id, newFields) => {
    try {
      const response = await updateUserRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await deleteUserRequest(id);
      setUsers(users.filter((user) => user.user_id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //Clients
  async function loadClient() {
    //llenar la variable users con el array de usuarios
    const response = await getClientsRequest();
    setClients(response.data); //guarda todo e array dentro de users
  }

  const createClient = async (client) => {
    try {
      const response = await createClientRequest(client);
      //setUsers([...users, response.data]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getClient = async (id) => {
    try {
      const response = await getClientRequest(id);

      if (response && response.data) {
        return response.data;
      } else {
        console.log("No data returned from getUserRequest");
        return null; // O manejar el caso en que no se devuelvan datos
      }
      // console.log(response.data);
      // return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateClient = async (id, newFields) => {
    try {
      const response = await updateClientRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteClient = async (id) => {
    try {
      const response = await deleteClientRequest(id);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  async function loadLogin() {
    const response = await getLogin();
    setLoginAuth(response.data);
  }

  const login = () => {
    setIsAuthenticated(true);
    console.log(isAuthenticated);
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log(isAuthenticated);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loadUser,
        createUser,
        deleteUser,
        getUser,
        updateUser,
        clients,
        loadClient,
        createClient,
        getClient,
        updateClient,
        deleteClient,
        loginAuth,
        loadLogin,
        isAuthenticated,
        setIsAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
