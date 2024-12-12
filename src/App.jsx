import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom"; // استيراد useNavigate
import { ThemeProvider, CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./components/theme"; // استدعاء الثيمات
import { AuthProvider } from "./components/Context/AuthContext";
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Profile from "./Pages/UserAccount/Profile";

// صفحات أخرى
import ForTalent from "./Pages/Home/ForTalent";
import About from "./Pages/About/About";
import Courses from "./Pages/Courses/AllCourses/Courses";
import Login from "./Pages/Authentication/Login/Login";
import Blog from "./Pages/Blog/Blog";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Home from "./Pages/Dashboard/Home/Home";
import CourseDetails from "./Pages/Courses/CoursesDetails/CourseDetails";
import CardCourses from "./Pages/Courses/CardCourses/CardCourses";
import PaymentForm from "./Pages/Courses/CoursesDetails/PaymentForm";
import Register from "./Pages/Authentication/Register";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // قراءة القيمة من localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  const [isLoggedIn, setIsLoggedIn] = useState(true); // حالة تسجيل الدخول
  // إضافة useNavigate

  // حفظ الثيم في localStorage عند تغييره
  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // دالة تغيير الثيم
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // دالة تسجيل الخروج
  const handleLogout = () => {
    console.log("User logged out");
    setIsLoggedIn(false);
    navigate("/for-talent"); // إعادة توجيه المستخدم إلى صفحة for-talent
  };
  

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <AuthProvider>
      <Router>
  
    <Nav /> {/* هذا المكون سيظل معروضاً طوال الوقت */}
    <Routes>
      <Route path="/for-talent" element={<ForTalent />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/profile"
        element={
          <Profile
            toggleTheme={toggleTheme}
            isDarkMode={isDarkMode}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        }
      />
      <Route path="/courses" element={<Courses />} />
      <Route path="/" element={<CardCourses />} />
      <Route path="/courses/:documentId" element={<CourseDetails />} />
      <Route path="/payment/:documentId" element={<PaymentForm />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
    <Footer />
</Router>

      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
