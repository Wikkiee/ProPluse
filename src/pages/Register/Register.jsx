import FormButton from "../../components/FormButton";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { useState } from "react";

import { usePostRegisterationMutation } from "../../app/api/authenticationApiSlice";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userConfirmPassword, setConfirmPassword] = useState("");
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [usePostRegisteration, { data }] = usePostRegisterationMutation();

  const navigate = useNavigate();

  const onSubmitEventHandler = async (e) => {
    try {
      const response = await usePostRegisteration({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword,
      });
      console.log(response.data);
      if (response.data.isError) {
        setError(true);
        setErrorMessage(response.data.errorMessage);
      }
      if (response.data.isSuccess) {
        // navigate("/");
      }
      // Updated state with response data
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="w-full h-auto">
        <div className="w-full h-screen flex justify-center items-center">
          <div className=" bg-[#282828] p-2 px-14 py-10 flex flex-col">
            <div className="w-full flex justify-center">
              <h1 className="font-bold text-[35px] mb-3">Hi, Lets Sign Up</h1>
            </div>
            <div className="flex flex-col justify-evenly">
              {isError ? (
                <p className="text-sm text-red-400">*{errorMessage}</p>
              ) : null}
              <input
                className={
                  "bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-auto"
                }
                placeholder="Enter the User Name"
                type={"text"}
                onChange={(e) => {
                  setError(false);
                  setUserName(e.target.value);
                }}
              ></input>
              <input
                className={
                  "bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-auto"
                }
                placeholder="Enter the Email Address"
                type={"text"}
                onChange={(e) => {
                  setError(false);
                  setEmail(e.target.value);
                }}
              ></input>
              <input
                className={
                  "bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-auto"
                }
                placeholder="Enter the Password"
                type={"password"}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
              ></input>
              <input
                className={
                  "bg-[#353535] text-[#ababab] px-3 py-4 pl-5  rounded-[5px] w-[300px] my-2 font-light w-auto"
                }
                placeholder="Confirm Password"
                type={"password"}
                onChange={(e) => {
                  setError(false);
                  setConfirmPassword(e.target.value);
                }}
              ></input>
              <button
                onClick={(e) => {
                  onSubmitEventHandler(e, userName);
                }}
                className={
                  "bg-[#000000] w-full py-4 font-bold text-[14px] rounded-[5px] my-2 text-[#C7C7C7]"
                }
              >
                Submit
              </button>
              <FormButton
                Text={
                  <span>
                    <img className="w-5 inline mr-2" src={GoogleIcon} />{" "}
                    Continue with Google{" "}
                  </span>
                }
              />
              <div className="text-center">
                <p
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="text-sm hover:cursor-pointer"
                >
                  Already have account ?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
