import { useMutation, useQueryClient } from "react-query";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useContext } from "react";

function SignOutButton() {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(api.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out Successfully", type: "SUCCESS" });
      navigate("/login");
    }, 
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    console.log("SO test");

    mutation.mutate();
  };
  const navigate = useNavigate();

  return (
    <button onClick={handleClick} className="text-blue-600 px-3 bg-white hover:bg-gray-100 font-bold">
      Sign out
    </button>
  );
}

export default SignOutButton;
