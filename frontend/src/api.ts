import { SignInFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const register = async (formData: RegisterFormData) => {
  console.log("calling");
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  console.log("calling");

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

const signIn = async (formData: SignInFormData) => {
  console.log("login call");
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

const logout = async () => {
const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
  method: "POST",
  credentials: "include",
});
 const body = await response.json();
 
 if (!response.ok) {
   throw new Error(body.message);
 }
 return body;
}

const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return response.json();
};

export default {
  register,
  validateToken,
  signIn,
  logout
};
