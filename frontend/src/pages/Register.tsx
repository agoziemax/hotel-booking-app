import { useForm } from "react-hook-form";
import api from "../api";
import { useMutation } from "react-query";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(api.register, {
    onSuccess: () => console.log("success"),

    onError: (error: Error) => console.log(error.message),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="flex-1 text-sm text-gray-700 font-bold">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
        </label>
        <label htmlFor="" className="text-sm text-gray-700 font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Last name is required" })}
          ></input>
          {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
        </label>
      </div>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        ></input>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </label>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be 6 or more characters",
            },
          })}
        ></input>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </label>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Passwords do not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
      </label>
      <span>
        <button type="submit" className="bg-green-700 font-bold p-2 text-white hover:bg-green-500">
          Create account
        </button>
      </span>
    </form>
  );
}

export default Register;
