import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import UsersPage from "./pages/UsersPage";
import UsersForm from "./pages/UsersForm";
import Welcome from "./pages/UnLogin";
import ClientsPage from "./pages/ClientsPage";
import ClientsForm from "./pages/ClientsForm";
import Login from "./pages/Login";
//import CountdownTimer from "./components/CountdownTime";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "./context/UserProvider";

import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirige a la página de inicio de sesión
      navigate("/login");
      setIsAuthenticated(false);
    } else {
      try {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        setIsAuthenticated(true);
        console.log(isAuthenticated, "2");
        if (Date.now() >= exp * 1000) {
          // Si el token ha expirado, redirige a la página de inicio de sesión
          navigate("/login");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        // Si hay un error al decodificar el token, redirige a la página de inicio de sesión por precaución
        //navigate("/login");
      }
    }
  }, [navigate]);

  const login = () => {
    setIsAuthenticated(true);
    navigate("/clients");
  };

  return (
    <div className=" bg-gray-900 h-screen text-white">
      <Navbar isAuthenticated={isAuthenticated} />
      <div className="container mx-auto py-4">
        <UserContextProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/new" element={<ClientsForm />} />
            <Route path="/edit/:id" element={<ClientsForm />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </UserContextProvider>
      </div>
    </div>
  );
}

export default App;
