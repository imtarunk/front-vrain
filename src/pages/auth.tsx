import { useState } from "react";
import AnimatedBackground from "../components/ui/background";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // For redirection

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false); // Loader state
  const navigate = useNavigate(); // Initialize navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    setLoading(true); // Start loader

    try {
      const url = isLogin
        ? "http://localhost:3001/api/v1/signin"
        : "http://localhost:3001/api/v1/signup";

      const response = await axios.post(url, { username, password });

      if (response.status === 200) {
        if (isLogin) {
          localStorage.setItem("token", response.data?.token);
          toast.success("Login Successful!");
          navigate("/dashboard"); // Redirect to home
        } else {
          toast.success("Signup Successful! Please login.");
          setIsLogin(true); // Switch to login form
        }
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error: any) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white pl-10 ">
      <div className="w-1/3 bg-gray-800 p-8 flex flex-col justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 overflow-hidden">
        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "Login" : "Create an account"}
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Enter your email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <p className="text-xs text-gray-400">
              Must be at least 8 characters and contain a special character.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 p-2 rounded-xl hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isLogin ? (
              "Login"
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Log in"}
          </span>
        </p>
      </div>
      <AnimatedBackground />
    </div>
  );
};

export default AuthPage;
