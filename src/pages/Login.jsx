import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className="mt-32 md:mt-60">
      <form
        className="flex flex-col w-full items-center space-y-6 py-10"
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
