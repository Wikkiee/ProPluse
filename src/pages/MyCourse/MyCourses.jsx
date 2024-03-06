import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMyCoursesQuery } from "../../app/api/courseApiSlice";
const MyCourses = () => {
  const { isAuthenticated, userId } = useSelector(
    (state) => state.authentication
  );

  const { data } = useGetMyCoursesQuery(1);
  console.log(data);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen">
        <div className="w-[100px] h-[100px] bg-red-500"></div>
      </div>
    </div>
  );
};
export default MyCourses;
