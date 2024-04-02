import { useForm } from "react-hook-form";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function Register() {
  const { register, watch, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data)=>{
console.log(data);

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
        </label>
        <label htmlFor="" className="text-sm text-gray-700 font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "Last name is required" })}
          ></input>
        </label>
      </div>
      <label className="text-sm text-gray-700 font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "Email is required" })}
        ></input>
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
