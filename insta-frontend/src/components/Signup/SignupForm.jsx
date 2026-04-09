import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

export const SignupForm = () => {
  const { signup } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    name: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSignup(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-black relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-10 left-20 w-72 h-72 bg-blue-600/5 rounded-full blur-3xl opacity-50"></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col gap-6">
          {/* Main card */}
          <div className="border border-gray-800 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] p-10 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 mb-6">
              <span className="text-5xl font-bold bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent" style={{ fontFamily: "cursive" }}>
                Instagram
              </span>
              <span className="text-gray-400 font-medium text-sm text-center">
                Sign up to see photos and videos from your friends.
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 mb-4 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.603-3.369-1.343-3.369-1.343-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.546 2.914 1.194.092-.927.35-1.546.636-1.903-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.284.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.817c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.363.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.194 20 14.44 20 10.017 20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              Sign up with GitHub
            </button>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 mb-4 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 10.077C20 4.513 15.522 0 10 0S0 4.513 0 10.077c0 5.03 3.656 9.193 8.437 9.923v-7.02H5.898V10.08h2.539V7.86c0-2.507 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.628.771-1.628 1.563v1.88h2.773l-.443 2.901h-2.33v7.02C16.344 19.27 20 15.107 20 10.077Z" />
              </svg>
              Sign up with Facebook
            </button>

            <div className="flex items-center gap-4 mb-6">
              <span className="flex-1 border border-gray-700" />
              <span className="text-gray-600 font-semibold text-xs">OR</span>
              <span className="flex-1 border border-gray-700" />
            </div>

            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <input
                className="w-full px-4 py-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="Mobile number or email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="relative">
                <input
                  className="w-full px-4 py-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500 pr-12"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

              <input
                className="w-full px-4 py-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="Full name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                className="w-full px-4 py-3 text-sm bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all duration-300 text-white placeholder-gray-500"
                placeholder="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <p className="text-xs text-gray-500 mt-2">
                <span>People who use our services may have uploaded your contact information to Instagram. </span>
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Learn more</span>
              </p>

              <p className="text-xs text-gray-500">
                <span>By signing up you agree to our </span>
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Terms </span>
                <span>, </span>
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Privacy Policy </span>
                <span>and </span>
                <span className="text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Cookies</span>
                <span>.</span>
              </p>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </form>
          </div>

          {/* Login link card */}
          <div className="border border-gray-800 rounded-2xl bg-gradient-to-b from-[#111] to-[#0a0a0a] px-6 py-4 text-center">
            <span className="text-gray-400">Have an account? </span>
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
