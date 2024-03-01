import { useNavigate } from "react-router-dom";
import { useUsers } from "../context/UserProvider";

function UserCard({ user }) {
  const { deleteUser } = useUsers();
  const navigate = useNavigate();

  return (
    <div className=" bg-gray-600 rounded-lg p-4 flex flex-col gap-1">
      <h2 className=" text-2xl font-bold">{user.name}</h2>
      <p className=" font-light">{user.username}</p>
      <p className=" font-light">{user.position}</p>
      <p className=" font-light">{user.age}</p>
      <div className="flex gap-3">
        <button
          className=" bg-red-400 rounded-md cursor-pointer px-3 py-1"
          onClick={() => deleteUser(user.user_id)}
        >
          Delete
        </button>
        <button
          className=" bg-teal-300 rounded-md cursor-pointer px-3 py-1"
          onClick={() => navigate(`/edit/${user.user_id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default UserCard;
