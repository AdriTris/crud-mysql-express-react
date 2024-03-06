import { useEffect } from "react";
import { Link } from "react-router-dom";
import ClientCard from "../components/ClientCard";
import { useClients } from "../context/UserProvider";

function ClientsPage() {
  const { clients, loadClient } = useClients();

  useEffect(() => {
    //se crea funcion loadUser porque es asyncrono que ejecutara la peticion
    loadClient();
  }, []);

  function renderMain() {
    if (clients.length === 0) return <h1>No clients yet</h1>;
    return clients.map((client) => (
      <ClientCard client={client} key={client.id} />
    ));
  }

  return (
    <div className="mx-6">
      <div className="flex justify-between items-center">
        <h1 className=" text-4xl font-bold text-center">Clients</h1>
        <button className=" px-3 py-1 bg-violet-500 rounded-lg ">
          <Link to="/new">Create Client</Link>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-3 ">{renderMain()}</div>
    </div>
  );
}

export default ClientsPage;
