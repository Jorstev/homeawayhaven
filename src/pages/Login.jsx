import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminValidation } from "../features/booking/bookingSlice";

function Login() {
  // const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(setAdminValidation(true));
    // setValidated(true);
    // let data = { userInfo: formData, validated };
    // localStorage.setItem("AdminUser", JSON.stringify(data));
    navigate("/login/console");
  };
  return (
    <div className="mt-14 md:mt-36 mx-auto w-[22rem] md:w-[28rem] md:mx-auto flex flex-col items-center justify-around h-[28rem] md:h-[27rem] shadow-lg">
      <div>
        <h1 className="font-semibold text-lg md:text-xl text-gray-600">
          Administration Console
        </h1>
      </div>
      <form
        className="flex flex-col w-full items-center space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          fieldName="Username"
          registerName="username"
          type="text"
          register={register}
          value={"Admin123"}
        />
        <InputField
          fieldName="Password"
          registerName="password"
          type="password"
          register={register}
          value={"123456"}
        />
        <input
          className="px-24 py-2 bg-cyan-300 rounded-lg text-white cursor-pointer md:mt-20 w-72  md:w-96"
          type="submit"
          value={"Login"}
        />
      </form>
    </div>
  );
}

export default Login;
