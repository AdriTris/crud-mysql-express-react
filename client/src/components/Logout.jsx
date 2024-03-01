import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/UserProvider";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useLogin();

  // Función para realizar el logout
  const handleLogout = () => {
    logout();
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    console.log("logout successful");
    // Redirigir al usuario a la página de inicio de sesión
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
