import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Microdeft-logo.png";

function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://react-interview.crd4lc.easypanel.host/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        setError("Registration failed");
      } else {
        setError("");
        alert("Registration successful");
        const data = await response.json();
        data.data.token && localStorage.setItem("authToken", data.data.token);
        if(data.data.token) {
          navigate("/");
        }
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Something went wrong! Please try again.");
    }
    setFormData({
      name: "",
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
          <h1 className="text-xl font-bold text-center my-2">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <input
                className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Name"
                required
              />
            </div>
            <div className="mb-3">
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
                Register
              </button>
            </div>
            <div>
              <p className="text-center">
                Already have an account?{" "}
                <Link to="/login" className=" underline">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
