import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { postLoginRequest } from "../api/userApi";
import "./login.css";
import { useAuth } from "../context-provider/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setIsAuthenticated } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email && !password) {
      setError("Both fields are empty. Please enter your email and password.");
      return;
    }

    // ☼ Validate Email
    if (!email) {
      emailRef.current?.focus();
      setError("Email is required");
      return;
    }

    // // ☼ Validate Password
    if (!password) {
      passwordRef.current?.focus();
      setError("Password is required");
      return;
    }

    // ☼ Attempt login
    try {
      const res = await postLoginRequest(email, password);
      if (res.success) {
        alert(res.message);
        // ☼ Success → navigate
        setIsAuthenticated(true);
        return;
      }
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh md:min-h-screen w-full bg-[#0d1117] text-white overflow-hidden">
      <form
        onSubmit={handleLogin}
        className="login-form flex flex-col items-center gap-[0.8rem] p-2"
      >
        <h2 className="whitespace-nowrap text-xl mb-3">
          Sign in to To-Do Application
        </h2>
        {/* Email Field */}
        <div className="flex flex-col w-full">
          <label htmlFor="user-email">
            Email address<sup>*</sup>
          </label>
          <input
            ref={emailRef}
            id="user-email"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {/* Password Field */}
        <div className="flex flex-col w-full">
          <label htmlFor="user-password">
            Enter Password<sup>*</sup>
          </label>
          <input
            ref={passwordRef}
            id="user-password"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/* Submit Button */}
        <button
          className="w-full rounded-lg bg-[#238636] text-white py-2 whitespace-nowrap"
          type="submit"
        >
          Login
        </button>
        <p
          className={`text-red-600 font-medium ${
            error === "" ? "invisible" : "visible"
          }`}
        >
          Error: {error}
        </p>
        <Link to="/register">No account? Register</Link>
      </form>
    </div>
  );
}
