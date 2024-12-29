import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Microdeft-logo.png";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://react-interview.crd4lc.easypanel.host/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        setError("Login failed");
      } else {
        setError("");
        const data = await response.json();
        console.log(data);
        data.data.token && localStorage.setItem("authToken", data.data.token);
        if(data.data.token) {
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
    setFormData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="bg-white lg:w-3/4 w-[90%] p-5 rounded-md shadow-md">
        <div className="w-36 mx-auto my-4">
          <img src={logo} alt="Microdeft" />
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="lg:w-5/6 w-[90%] mx-auto">
          <h1 className="text-xl font-bold text-center my-2">Login</h1>
          <form onSubmit={handleSubmit} className="">
            <div className="my-3">
              <input
                className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <input
                className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                required
              />
            </div>
            <div className="mb-3">
              <button
                className="w-full outline-none rounded-md p-2 bg-black hover:shadow-lg text-white"
                type="submit"
              >
                Login
              </button>
            </div>
            <div>
              <p className="text-center">
                Don&apos;t have any account?{" "}
                <Link to="/register" className=" underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
