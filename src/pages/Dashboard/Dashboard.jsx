import Navbar from "../../components/Navbar";
import AddIcon from "../../assets/AddIcon.svg";
import BookmarkIcon from "../../assets/BookmarkIcon.svg";
import { useNavigate } from "react-router-dom";
import { useGetUserAuthenticationStatusQuery } from "../../app/api/authenticationApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const DashBoard = () => {
  const { data } = useGetUserAuthenticationStatusQuery();

  const { isAuthenticated, userId, userName } = useSelector(
    (stata) => stata.authentication
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="w-full h-screen flex justify-evenly items-center">
        <div>
          <div className="flex flex-col justify-center items-center">
            <div
              onClick={() => {
                console.log("Clicked");
                navigate("/create_new_course");
              }}
              className="bg-[#282828] w-[180px] h-[180px] flex justify-center items-center rounded-[5px] hover:cursor-pointer"
            >
              <img className="w-[70px] h-[70px]" src={AddIcon} />
            </div>
            <span className="font-light text-sm mt-3">Create New Course</span>
          </div>
        </div>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div
              onClick={() => {
                console.log("Clicked");
                navigate("/mycourses");
              }}
              className="bg-[#282828] w-[180px] h-[180px] flex justify-center items-center rounded-[5px] hover:cursor-pointer"
            >
              <img className="w-[70px] h-[70px]" src={BookmarkIcon} />
            </div>
            <span className="font-light text-sm mt-3">My Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
