import { useState } from "react";
import AnimatedBackground from "../components/ui/background";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { backendURL } from "@/lib/utils";
import { BrainCircuit } from "lucide-react"; // Added brain icon for branding

interface AuthResponse {
  token: string;
  message?: string;
}

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [fullname, setFullname] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? `${backendURL}/api/v1/signin`
        : `${backendURL}/api/v1/signup`;

      const response = await axios.post<AuthResponse>(url, {
        username,
        password,
        ...(isLogin ? {} : { fullname }),
      });

      if (response.status === 200) {
        if (isLogin) {
          localStorage.setItem("token", response.data.token);
          toast.success("Login Successful!");
          navigate("/dashboard"); // Redirect to landing page after successful login
        } else {
          toast.success("Signup Successful! Please login.");
          setIsLogin(true);
        }
      } else {
        toast.error("Invalid Credentials!");
      }
    } catch (error: unknown) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      console.error("Error:", err.response?.data?.message || err.message);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden">
      <div className="w-1/3 bg-gray-800 p-8 flex flex-col justify-center bg-gradient-to-r from-gray-900 via-black to-gray-900 relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <BrainCircuit size={36} className="text-blue-400" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Vrain
          </h1>
        </div>

        <h2 className="text-2xl font-semibold mb-6">
          {isLogin ? "Welcome back" : "Create your account"}
        </h2>

        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Enter your full name"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-sm mb-1 font-medium">Email</label>
              <input
                type="email"
                className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="Enter your email"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          {!isLogin && (
            <p className="text-xs text-gray-400">
              Must be at least 8 characters and contain a special character.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center font-medium mt-4"
            disabled={loading}
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isLogin ? (
              "Sign In"
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span
              className="text-blue-400 cursor-pointer hover:underline ml-2 font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </p>
        </div>

        <div className="mt-8 text-xs text-gray-400 text-center">
          <p>© 2025 codextarun.xyz. All rights reserved.</p>
        </div>
      </div>

      <AnimatedBackground />
    </div>
  );
};

export default AuthPage;
