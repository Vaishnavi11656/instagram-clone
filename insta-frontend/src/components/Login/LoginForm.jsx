import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center text-xs bg-gradient-to-br from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 flex flex-col gap-6 items-center">
        <h1
          className="text-5xl font-bold pb-2 bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
          style={{ fontFamily: "cursive" }}
        >
          Instagram
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-96 bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-gray-800 rounded-2xl p-8 backdrop-blur-sm space-y-1">
          <div className="relative">
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500"
              placeholder="Phone number, username or email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500 pr-12"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="flex items-center gap-4 w-96">
          <span className="flex-1 border border-gray-700" />
          <span className="text-gray-600 font-semibold text-xs">OR</span>
          <span className="flex-1 border border-gray-700" />
        </div>

        <Link className="text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer">
          Login with facebook
        </Link>

        <Link className="font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer">
          Forgot password?
        </Link>

        <div className="border border-gray-800 rounded-2xl px-6 py-4 bg-gradient-to-b from-[#111] to-[#0a0a0a] w-96 text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
