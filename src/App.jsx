import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse";

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if(savedToken) {
      setToken(savedToken);
    }
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/create-course" element={<CreateCourse />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
