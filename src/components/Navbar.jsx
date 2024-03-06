import { useSelector } from "react-redux";
import UserIcon from "../assets/UserIcon.svg";
const Navbar = () => {
  const { userName } = useSelector((state) => state.authentication);
  return (
    <>
      <div className="w-full py-4 bg-[#282828] px-12 absolute top-0 ">
        <div className="inline w-full h-full flex justify-end">
          <div className="w-full h-auto flex items-center">
            <h1 className="inline font-bold mr-20">ProPluse</h1>
            <h1>Courses</h1>
          </div>
          <div>
            <div className="flex items-center">
              <span>
                <img src={UserIcon} className="w-12 h-12" />
              </span>
              <h3 className="ml-3">{userName}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
