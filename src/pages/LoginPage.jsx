import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAuth, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginAuth({ email, password });
  };
  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-17 animate-spin" />
      </div>
    );
  }
  
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
          <h1
            className="text-3xl font-bold text-center mb-6"
            style={{ color: "#699451" }}
          >
            Green Karma Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#699451]"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#699451]"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#699451] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#587b3f] transition duration-200"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              className="font-semibold"
              style={{ color: "#699451" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
