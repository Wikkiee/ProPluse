import Login from "./pages/Login/Login.jsx";
import DashBoard from "./pages/Dashboard/Dashboard.jsx";
import Register from "./pages/Register/Register.jsx";
import { Routes, Route } from "react-router-dom";
import CreateCourse from "./pages/CreateCourse/CreateCourse.jsx";
import MyCourses from "./pages/MyCourse/MyCourses.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create_new_course" element={<CreateCourse />} />
        <Route path="/mycourses" element={<MyCourses />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
