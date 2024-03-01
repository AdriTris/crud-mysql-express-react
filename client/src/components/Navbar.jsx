import { Link } from "react-router-dom";
import Logout from "./Logout";

function Navbar({ isAuthenticated }) {
  return (
    <div className=" bg-gray-700 flex justify-between px-5 py-2 items-center">
      <Link to="/">
        <h1 className="text-xl font-bold">React MySQL</h1>
      </Link>
      <ul className="flex gap-3">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/clients">Clients</Link>
        </li>
        {!isAuthenticated ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <Link to="/">
              <Logout />
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
