import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import '../App.css';

function Courses() {
  const [token, setToken] = useState("");
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
      fetchCourses(currentPage);
    } else {
      navigate("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, navigate, currentPage]);

  const fetchCourses = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://react-interview.crd4lc.easypanel.host/api/course?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCourses(data.data.data);
      setCurrentPage(data.data.meta.current_page);
      setTotalPages(data.data.meta.last_page);
      console.log(data.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mx-auto p-5 bg-gray-100">
        <h1 className="text-2xl font-bold text-center text-sky-800">Courses</h1>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {courses.length === 0 && !loading ? (
          <p className="text-center text-3xl text-red-400">No courses available</p>
        ) : (
          <div className="flex gap-5 flex-wrap justify-center my-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="card-container"
              >
                <div className="card-img">
                  <img src={course.image} alt="image" />
                </div>
                <span
                  className="card-badge"
                  style={{
                    backgroundColor: course.badge_color
                      ? course.badge_color
                      : "black",
                  }}
                >
                  {course.badge_text}
                </span>
                <div className="card-section">
                  <h1 className="card-section-title">{course.title}</h1>
                  <p className="card-section-description">{course.description}</p>
                  <p className="card-section-instructor">
                    Instructor: {course.instructor_name}
                  </p>
                  <p className="card-section-time">{course.created_at}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div>
          <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
