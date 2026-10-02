import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);
const BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:4000";
const LS_KEY = "user_details";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize from sessionStorage
    const stored = sessionStorage.getItem(LS_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Skip token validation on app load - trust the token
  useEffect(() => {
    setLoading(false);
    // Check what's in sessionStorage on mount
    const stored = sessionStorage.getItem(LS_KEY);
    console.log("📍 AuthContext mounted, sessionStorage has user:", stored ? "✓" : "✗");
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        console.log("✓ User loaded from sessionStorage:", userData.username);
      } catch (e) {
        console.error("❌ Failed to parse stored user:", e);
      }
    }
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Login failed:", data.message);
        throw new Error(data.message || "Login failed");
      }

      console.log("✅ Login successful, user data:", data);
      setUser(data);
      sessionStorage.setItem(LS_KEY, JSON.stringify(data));
      console.log("💾 Saved to sessionStorage:", sessionStorage.getItem(LS_KEY) ? "✓" : "✗");
      navigate("/");
    } catch (err) {
      console.log("Login error:", err.message);
    }
  }

  async function signup(newUser) {
    try {
      const res = await fetch(`${BASE_URL}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();

      if (!res.ok) {
        console.error("Signup failed:", data.message);
        throw new Error(data.message || "Signup failed");
      }

      console.log(data);
      setUser(data);
      sessionStorage.setItem(LS_KEY, JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log("Signup error:", err.message);
    }
  }

  function logout() {
    sessionStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, BASE_URL, LS_KEY };
