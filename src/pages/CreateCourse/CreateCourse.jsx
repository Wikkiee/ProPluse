import FormTextField from "../../components/FormTextField";
import Navbar from "../../components/Navbar";
import AddImageIcon from "../../assets/AddImageIcon.svg";
import { FormTextAreaField } from "../../components/FormTextField";
import FormButton from "../../components/FormButton";
import { useRef, useState, useEffect } from "react";
import { usePostCreateCourseMutation } from "../../app/api/courseApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateCourse = () => {
  const titleRef = useRef();
  const categoryRef = useRef();
  const durationRef = useRef();
  const descriptionRef = useRef();

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState(null);
  const [usePostCreateCourse] = usePostCreateCourseMutation();
  const { isAuthenticated, userId } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    console.log("Not block");
    if (!e.target.files || e.target.files.length === 0) {
      console.log("Not block");
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  const handleImageChange = (selectedFile) => {
    const selectedImage = selectedFile;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageData = reader.result;
      setImage(imageData);
    };
    reader.readAsDataURL(selectedImage);
  };

  const onSubmitEventHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", selectedFile);
    formData.append("userId", userId);
    formData.append("courseTitle", titleRef.current.value);
    formData.append("courseCategory", categoryRef.current.value);
    formData.append("courseDuration", durationRef.current.value);
    formData.append("courseDescription", descriptionRef.current.value);
    try {
      const response = await usePostCreateCourse(formData);
      console.log(response);
      if (response.data.isSuccess) {
        navigate("/mycourses");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  });

  return (
    <div>
      <Navbar />
      <div className="w-full h-auto pb-10 mt-10 flex justify-center">
        <div className="w-[80%] bg-[#282828] py-12 px-12">
          <h1 className="mb-9">Create New Course / Course Information</h1>
          <form>
            <div className="flex flex-row">
              <div className="w-[60%]">
                <div className="mb-5">
                  <label className="">Title</label> <br></br>
                  <input
                    className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-[80%]`}
                    placeholder="Enter the Title"
                    type="text"
                    ref={titleRef}
                    onChange={() => {
                      console.log();
                    }}
                  ></input>
                </div>
                <div className="mb-5">
                  <label className="">Category</label> <br></br>
                  <input
                    className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-[80%]`}
                    placeholder="Enter the Category"
                    type="text"
                    ref={categoryRef}
                    onChange={() => {
                      console.log();
                    }}
                  ></input>
                </div>
                <div className="mb-5">
                  <label className="">Duration</label> <br></br>
                  <input
                    className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-[80%]`}
                    placeholder="Enter the Duration"
                    type="text"
                    ref={durationRef}
                    onChange={() => {
                      console.log();
                    }}
                  ></input>
                </div>
              </div>
              <div className="w-[40%] h-auto">
                <h2>Cover Image</h2>
                <div className=" w-full rounded h-[300px] mt-3 border-[#353535] border-dashed border-2 flex justify-center items-center hover:cursor-pointer overflow-hidden ">
                  {selectedFile ? (
                    <img
                      onClick={() => {
                        setSelectedFile(undefined);
                      }}
                      className="w-full h-auto block"
                      src={preview}
                    />
                  ) : (
                    <div className="w-full flex justify-center">
                      <input
                        onChange={(e) => {
                          onSelectFile(e);
                        }}
                        type="file"
                      ></input>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <label>Description</label>
              <br></br>
              <textarea
                className={`bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] my-2 font-light `}
                placeholder="Descriptions..."
                cols={100}
                ref={descriptionRef}
                rows={4}
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={(e) => {
                  onSubmitEventHandler(e);
                }}
                className={`bg-[#000000] w-[200px] py-4 font-bold text-[14px] rounded-[5px] my-2 text-[#C7C7C7]`}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateCourse;
