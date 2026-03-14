import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);
const BASE_URL = "http://127.0.0.1:4000";
const LS_KEY = "user_details";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) || null
  );
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
      localStorage.setItem(LS_KEY, JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }

  async function signup(newUser) {
    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      console.log(data);
      setUser(data);
      localStorage.setItem(LS_KEY, JSON.stringify(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }

  function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, BASE_URL, LS_KEY };
