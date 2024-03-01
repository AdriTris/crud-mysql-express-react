import { useNavigate } from "react-router-dom";
import { useClients } from "../context/UserProvider";
import toast, { Toaster } from "react-hot-toast";
function ClientCard({ client }) {
  const { deleteClient } = useClients();
  const navigate = useNavigate();
  const notify = () => toast.success("Client deleted.");

  return (
    <div className=" bg-gray-600 rounded-lg p-4 flex flex-col gap-1">
      <h2 className=" text-2xl font-bold">
        {client.name} {client.last_name}
      </h2>
      <p className=" font-light">{client.phone}</p>
      <p className=" font-light">{client.address}</p>
      <p className=" font-light text-sm my-2">{client.created_at}</p>
      <div className="flex gap-3">
        <button
          className=" bg-red-400 rounded-md cursor-pointer px-3 py-1"
          onClick={() => {
            deleteClient(client.id);
            notify();
          }}
        >
          Delete
        </button>
        <button
          className=" bg-teal-300 rounded-md cursor-pointer px-3 py-1"
          onClick={() => navigate(`/edit/${client.id}`)}
        >
          Edit
        </button>
        <Toaster />
      </div>
    </div>
  );
}

export default ClientCard;
