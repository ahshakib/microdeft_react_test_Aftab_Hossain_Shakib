import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from "./Pagination";

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
          <p>No courses available</p>
        ) : (
          <div className="flex gap-5 flex-wrap justify-center my-3">
            {courses.map((course) => (
              <div
                key={course.id}
                className="w-60 h-96 bg-white rounded-md shadow-md overflow-hidden"
              >
                <div className="rounded-t-md overflow-hidden">
                  <img src={course.image} alt="image" className="" />
                </div>
                <span
                  className="p-2 text-white mt-2 border-2 border-white border-l-0"
                  style={{
                    backgroundColor: course.badge_color
                      ? course.badge_color
                      : "black",
                  }}
                >
                  {course.badge_text}
                </span>
                <div className="p-2 text-clip overflow-hidden">
                  <h1 className="text-lg font-bold">{course.title}</h1>
                  <p className="text-gray-700 text-sm overflow-hidden line-clamp-4">{course.description}</p>
                  <p className="text-base font-bold text-cyan-700">
                    Instructor: {course.instructor_name}
                  </p>
                  <p className="text-sm text-gray-500">{course.created_at}</p>
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
