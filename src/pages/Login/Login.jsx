import TextField from "@mui/material/TextField";
import FormTextField from "../../components/FormTextField";
import FormButton from "../../components/FormButton";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostLoginMutation } from "../../app/api/authenticationApiSlice";
import { useDispatch } from "react-redux";
import { setAuthenticationStatus } from "../../features/authenticationSlice.js";
const Login = () => {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usePostLogin] = usePostLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitEventHandler = async (e) => {
    try {
      const response = await usePostLogin({
        userEmail: userEmail,
        userPassword: userPassword,
      });
      console.log(response.data);
      if (response.data.isError) {
        setError(true);
        setErrorMessage(response.data.errorMessage);
      }
      if (response.data.isSuccess) {
        dispatch(
          setAuthenticationStatus({
            isAuthenticated: true,
            userId: response.data.data.userId,
            userName: response.data.data.userName,
          })
        );
        navigate("/");
      }
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
              <h1 className="font-bold text-[35px] mb-3">Welcome Back</h1>
            </div>
            <div className="flex flex-col justify-evenly">
              {isError ? (
                <p className="text-sm text-red-400">*{errorMessage}</p>
              ) : null}
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
              <button
                onClick={(e) => {
                  onSubmitEventHandler(e);
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
                    navigate("/register");
                  }}
                  className="text-sm hover:cursor-pointer"
                >
                  Register new account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
