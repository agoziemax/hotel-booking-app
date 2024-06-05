import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

function SignIn() {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(api.signIn, {
    onSuccess: () => {
      showToast({ message: "Registeration Successful", type: "SUCCESS" });
      navigate("/loggedIn");
    },

    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <p className=" font-bold text-3xl">Sign In</p>
      <div className="flex flex-col gap-5">
        <label htmlFor="" className="flex-1 text-sm text-gray-700 font-bold">
          Email
          <input
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal mt-1"
            {...register("email", { required: "This field is required" })}
          ></input>
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label htmlFor="" className="flex-1 text-sm text-gray-700 font-bold">
          Password
          <input
            className="border border-gray-300 rounded w-full py-1 px-2 font-normal mt-1"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password must be 6 or more characters",
              },
            })}
          ></input>
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <span>
          <button type="submit" className="bg-blue-700 font-bold p-2 text-white rounded hover:bg-blue-500">
            Sign In
          </button>
        </span>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </form>
  );
}

export default SignIn;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import api from "../api";
// import { useMutation } from "react-query";
// import { useAppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// export type SignInFormData = {
//   email: string;
//   password: string;
// };

// function SignIn() {
//   const navigate = useNavigate();
//   const { showToast } = useAppContext();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignInFormData>();

//   const mutation = useMutation(api.signIn, {
//     onSuccess: () => {
//       showToast({ message: "Sign In Successful", type: "SUCCESS" });
//       navigate("/");
//     },

//     onError: (error: Error) => {
//       showToast({ message: error.message, type: "ERROR" });
//     },
//   });

//   const onSubmit = handleSubmit((data) => {
//     mutation.mutate(data);
//   });

//   return (
//     <form className="flex flex-col gap-5" onSubmit={onSubmit}>
//       <h2 className="text-3xl font-bold">Sign In</h2>
//       <label className="text-sm text-gray-700 font-bold flex-1">
//         Email
//         <input
//           type="email"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("email", { required: "Email is required" })}
//         ></input>
//         {errors.email && <span className="text-red-500">{errors.email.message}</span>}
//       </label>

//       <label className="text-sm text-gray-700 font-bold flex-1">
//         Password
//         <input
//           type="password"
//           className="border rounded w-full py-1 px-2 font-normal"
//           {...register("password", {
//             required: "Password is required",
//             minLength: {
//               value: 6,
//               message: "Password must be 6 or more characters",
//             },
//           })}
//         ></input>
//         {errors.password && <span className="text-red-500">{errors.password.message}</span>}
//       </label>

//       <span>
//         <button type="submit" className="bg-blue-700 font-bold p-2 text-white hover:bg-green-500">
//           Sign In
//         </button>
//       </span>
//       <p>
//         Don't have an account? <Link to="/register">Sign Up</Link>
//       </p>
//     </form>
//   );
// }

// export default SignIn;
