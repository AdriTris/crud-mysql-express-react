import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { useUsers } from "../context/UserProvider";

function UsersPage() {
  const { users, loadUser } = useUsers();

  useEffect(() => {
    //se crea funcion loadUser porque es asyncrono que ejecutara la peticion
    loadUser();
  }, []);

  function renderMain() {
    if (users.length === 0) return <h1>No users yet</h1>;
    return users.map((user) => <UserCard user={user} key={user.user_id} />);
  }

  return (
    <div>
      <h1 className=" text-4xl font-bold text-center">Users</h1>
      <div className="grid grid-cols-3 gap-5 mt-3">{renderMain()}</div>
    </div>
  );
}

export default UsersPage;
