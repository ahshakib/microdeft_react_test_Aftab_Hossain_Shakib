import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    token && navigate("/courses");
  }, [navigate]);
  return (
    <div>
      <Navbar />
      <div>
        <h1 className="text-2xl font-bold text-center mt-10">
          Welcome to Microdeft
        </h1>
        <p className="text-center mt-5">
          Microdeft is a platform to learn and share knowledge.
        </p>
      </div>
    </div>
  );
}

export default Home;
