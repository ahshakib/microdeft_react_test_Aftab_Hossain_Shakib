import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function CreateCourse() {
  const [token, setToken] = useState("");
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    badge_text: "",
    badge_color: "",
    instructor_name: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://react-interview.crd4lc.easypanel.host/api/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(courseData),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Course created successfully");
        navigate("/courses");
      } else {
        alert("Course creation failed");
      }
    } catch (error) {
      console.log(error.message);
    }
    setCourseData({
      title: "",
      description: "",
      badge_text: "",
      badge_color: "",
      instructor_name: "",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-5 w-4/5 mt-10">
        <h1 className="text-2xl font-bold text-center">Create Course</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-5">
          <input
            type="text"
            value={courseData.title}
            onChange={(e) =>
              setCourseData({ ...courseData, title: e.target.value })
            }
            placeholder="Title"
            className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
          />
          <textarea
            type="text"
            value={courseData.description}
            onChange={(e) =>
              setCourseData({ ...courseData, description: e.target.value })
            }
            placeholder="Description"
            className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
          />
          <input
            type="text"
            value={courseData.badge_text}
            onChange={(e) =>
              setCourseData({ ...courseData, badge_text: e.target.value })
            }
            placeholder="Badge Text"
            className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
          />
          <select
            name=""
            id=""
            value={courseData.badge_color}
            onChange={(e) =>
              setCourseData({ ...courseData, badge_color: e.target.value })
            }
            className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
          >
            <option value="" disabled>
              Select Badge Color
            </option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="indigo">Indigo</option>
          </select>
          <input
            type="text"
            placeholder="Instructor Name"
            value={courseData.instructor_name}
            onChange={(e) =>
              setCourseData({ ...courseData, instructor_name: e.target.value })
            }
            className="border w-full p-2 rounded-md border-black focus:shadow-lg outline-none"
          />
          <button className="w-full outline-none rounded-md p-2 bg-black hover:shadow-lg text-white">
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
