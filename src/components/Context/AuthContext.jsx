import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // إضافة state جديد لتخزين بيانات المستخدم

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") || sessionStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
      fetchUserData(); // جلب بيانات المستخدم عند تسجيل الدخول
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("authToken"); // أو من sessionStorage حسب التفضيل
      const response = await axios.get("http://localhost:1337/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = (rememberMe) => {
    setIsLoggedIn(true);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem("isLoggedIn", "true");
    fetchUserData(); // جلب بيانات المستخدم بعد تسجيل الدخول
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("isLoggedIn");
    setUser(null); // مسح بيانات المستخدم عند تسجيل الخروج
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
