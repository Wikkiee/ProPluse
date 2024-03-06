import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMyCoursesQuery } from "../../app/api/courseApiSlice";
import temp from "../../assets/temp.png";
const MyCourses = () => {
  const { isAuthenticated, userId } = useSelector(
    (state) => state.authentication
  );

  const { data, isLoading } = useGetMyCoursesQuery(userId, {
    refetchOnMountOrArgChange: 1,
  });
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
      <div className="w-full h-screen mt-8">
        <div className="w-full h-auto grid grid-cols-3  gap-20 justify-center items-center px-24">
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            data.data.map((item, index) => (
              <div className="bg-[#282828] px-5 py-5 rounded hover:cursor-pointer">
                <div key={index} className="w-full h-auto ">
                  <div className="w-full h-[200px]">
                    <img src={temp} />
                  </div>

                  <div className="flex justify-between mt-3">
                    <h3 className="font-bold text-lg">{item.courseTitle}</h3>
                    <h4 className="font-light text-sm">
                      {item.courseDuration}
                    </h4>
                  </div>
                  <div className="w-full">
                    <p className="text-[13px] mt-2 text-[#ABABAB]">
                      {item.courseDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default MyCourses;
