import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/Microdeft-logo.png";

function Navbar() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [token]);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <nav className="flex justify-between items-center py-5 lg:px-12 px-5 bg-white text-black shadow-lg">
      <div className="text-2xl font-bold">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={100} />
        </Link>
      </div>
      <div className="flex gap-5">
        {token ? (
          <>
            <NavLink
              to={"/courses"}
              className={({ isActive }) =>
                isActive
                  ? " bg-black text-white px-3 py-2 rounded-md mx-2 border-none"
                  : "px-3 py-2 border rounded-md mx-2 hover:bg-black hover:text-white shadow-md"
              }
            >
              Courses
            </NavLink>
            <NavLink
              to={"/create-course"}
              className={({ isActive }) =>
                isActive
                  ? " bg-black text-white px-3 py-2 rounded-md mx-2 border-none"
                  : "px-3 py-2 border rounded-md mx-2 hover:bg-black hover:text-white shadow-md"
              }
            >
              Create Course
            </NavLink>
            <button
              onClick={handleLogout}
              className="hover:bg-black hover:text-white px-3 py-2 rounded-md mx-2 border shadow-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? " bg-black text-white px-3 py-2 rounded-md mx-2 border-none"
                  : "px-3 py-2 border rounded-md mx-2 hover:bg-black hover:text-white shadow-md"
              }
            >
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
