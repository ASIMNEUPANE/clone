import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginByEmail } from "../slices/authSlice";
import { redirect } from "react-router-dom";
export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        loginByEmail({ email: login.email, password: login.password })
      );
      console.log(data.payload.msg)
      if (data.payload.msg === "success") {
        return redirect("/admin/dashboard");
      } else {
        setError(data.payload.msg.split("Error:"));
      }
    } catch (e) {
      return e;
    } finally {
      setTimeout(() => {
        setError("");
      }, 2000);}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              email
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="email"
              id="username"
              value={login?.email}
              onChange={(e) => {
                setLogin((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
            {error}
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 p-2 w-full"
              type="password"
              id="password"
              value={login?.password}
              onChange={(e) => {
                setLogin((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
            onClick={(e) => {
              handleLogin(e);
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
