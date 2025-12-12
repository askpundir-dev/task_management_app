import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EyeOpenLogo from "../assets/eye-open.svg?react";
import EyeCloseLogo from "../assets/eye-off.svg?react";
import { postRegisterRequest } from "../api/userApi";
import { validateRegisterForm} from "../utils/validateRegisterForm"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const errorMsg = validateRegisterForm(email, password, username);

    if (errorMsg) {
      alert(errorMsg);
      return;
    }
    const lowerCaseEmail = email.toLowerCase();

    try {
      const res = await postRegisterRequest(lowerCaseEmail, password, username);

      if (res.success) {
        alert(res.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-dvh md:min-h-screen w-full bg-[#0d1117] text-white overflow-hidden">
      <form
        className="login-form flex flex-col items-center gap-[0.8rem] p-2"
        onSubmit={handleRegister}
      >
        <h2 className="whitespace-nowrap text-xl mb-3">Register</h2>
        <div className="flex flex-col w-full">
          <label htmlFor="user-email">
            Email address<sup>*</sup>
          </label>
          <input
            // autoComplete="off"
            // ref={emailRef}
            id="user-email"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full relative">
          <label htmlFor="user-password">
            Password<sup>*</sup>
          </label>
          <input
            // ref={passwordRef}
            id="user-password"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type={isPasswordVisible ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            disabled={!password}
            title={isPasswordVisible ? "Hide" : "Show"}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          >
            {isPasswordVisible ? (
              <EyeCloseLogo className="absolute text-gray-400 w-5 h-5 top-1/2 right-2" />
            ) : (
              <EyeOpenLogo className="absolute text-gray-400 w-5 h-5 top-1/2 right-2" />
            )}
          </button>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="user-name">
            Username<sup>*</sup>
          </label>
          <input
            id="user-name"
            className="border border-gray-600 rounded-lg py-2 px-2"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            pattern="^[A-Za-z][A-Za-z0-9_ ]{2,24}$"
            title="Username must start with a letter, be 3–25 characters, and contain letters, numbers, underscores, or spaces."
            required
          />
        </div>
        <button
          className="w-full rounded-lg bg-[#238636] text-white py-2 whitespace-nowrap"
          type="submit"
        >
          Create Account
        </button>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}
