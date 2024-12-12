import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../Context/AuthContext";
import {
  Button,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  Container,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./Nav.scss";

export default function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const isLoading = false;
  const location = useLocation(); // لمعرفة الرابط الحالي
  const navigate = useNavigate(); // للتنقل عند تسجيل الخروج
  const theme = useTheme(); // أخذ الثيم الحالي

  const handleLogout = () => {
    logout();
    navigate("/for-talent");
  };

  const [profileImage, setProfileImage] = React.useState(null);

  useEffect(() => {
    // استرجاع الصورة من localStorage
    const storedImage = localStorage.getItem("profileImage");
    setProfileImage(storedImage);
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "nav-link fw-bold text-primary"
      : "nav-link fw-bold";
  };

  // Menu state for mobile
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem("user"));

  return (
    <AppBar
      position="sticky"
      sx={{
        boxShadow: "none",
        marginBottomBottom: "1rem",
        bgcolor: theme.palette.mode === "light" ? "#fff" : "#171717", // تغيير خلفية الأبيك بعد أخذ حالة الثيم
        color: theme.palette.mode === "light" ? "#000" : "#fff", // تغيير لون النص بعد أخذ حالة الثيم
        width: "100%", // جعل الـ AppBar يأخذ كامل الشاشة
      }}
    >
      <Container>
        <Toolbar>
          {/* Logo Section */}
          <Box display="flex" alignItems="center">
            {isLoading ? (
              <Skeleton width={80} />
            ) : (
              <Link to="/">
                <img
                  width={80}
                  src={"/src/assets/logo.png"}
                  alt="logo"
                  style={{
                    filter: theme.palette.mode === "light" ? "none" : "invert(1)", // لتغيير الألوان في الصورة
                  }}
                />
              </Link>
            )}
            <h5
              className="fw-bold text-black p-0 m-0"
              style={{
                color: theme.palette.mode === "light" ? "#000" : "#fff", // تغيير لون النص
              }}
            >
              Level Up
              <FontAwesomeIcon
                className="text-primary fw-bold"
                icon={faArrowTurnUp}
              />
              <br />
              Academy
            </h5>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box display={{ xs: "none", md: "flex" }} gap={3}>
            <Button
              component={Link}
              to={isLoggedIn ? "/home" : "/for-talent"}
              sx={{
                color: theme.palette.mode === "light" ? "#000" : "#fff", // لون النص حسب الثيم
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: theme.palette.mode === "light" ? "#007bff" : "#61dafb", // لون التغيير عند الهور
                },
              }}
              className={getLinkClass(isLoggedIn ? "/home" : "/for-talent")}
            >
              {isLoggedIn ? "Home" : "For Talent"}
            </Button>
            {isLoggedIn && (
              <Button
                component={Link}
                to="/courses"
                sx={{
                  color: theme.palette.mode === "light" ? "#000" : "#fff", // لون النص حسب الثيم
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    color: theme.palette.mode === "light" ? "#007bff" : "#61dafb", // لون التغيير عند الهور
                  },
                }}
                className={getLinkClass("/courses")}
              >
                Courses
              </Button>
            )}
            <Button
              component={Link}
              to="/blog"
              sx={{
                color: theme.palette.mode === "light" ? "#000" : "#fff", // لون النص حسب الثيم
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: theme.palette.mode === "light" ? "#007bff" : "#61dafb", // لون التغيير عند الهور
                },
              }}
              className={getLinkClass("/blog")}
            >
              Blog
            </Button>
            <Button
              component={Link}
              to={isLoggedIn ? "/profile" : "/about"}
              sx={{
                color: theme.palette.mode === "light" ? "#000" : "#fff", // لون النص حسب الثيم
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  color: theme.palette.mode === "light" ? "#007bff" : "#61dafb", // لون التغيير عند الهور
                },
              }}
              className={getLinkClass(isLoggedIn ? "/profile" : "/about")}
            >
              {isLoggedIn ? <img src={profileImage} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} /> : "About"}
            </Button>
            {!isLoggedIn && (
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: theme.palette.mode === "light" ? "#000" : "#fff", // لون النص حسب الثيم
                  fontWeight: "bold",
                  textTransform: "none",
                  "&:hover": {
                    color: theme.palette.mode === "light" ? "#007bff" : "#61dafb", // لون التغيير عند الهور
                  },
                }}
              >
                Login
              </Button>
            )}
            
          </Box>

          {/* Mobile Menu */}
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuOpen}
            sx={{ display: { md: "none" }, color: theme.palette.mode === "light" ? "#000" : "#fff" }} // لون الأيقونة حسب الثيم
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu Items */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            sx={{ display: { md: "none" } }}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to={isLoggedIn ? "/home" : "/for-talent"}
              className={getLinkClass(isLoggedIn ? "/home" : "/for-talent")}
            >
              {isLoggedIn ? "Home" : "For Talent"}
            </MenuItem>
            {isLoggedIn && (
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/courses"
                className={getLinkClass("/courses")}
              >
                Courses
              </MenuItem>
            )}
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="/blog"
              className={getLinkClass("/blog")}
            >
              Blog
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to={isLoggedIn ? "/profile" : "/about"}
              className={getLinkClass(isLoggedIn ? "/profile" : "/about")}
            >
              {isLoggedIn ? <img src={profileImage} alt="Avatar" style={{ width: '24px', height: '24px', borderRadius: '50%' }} /> : "About"}
            </MenuItem>

            {!isLoggedIn && (
              <MenuItem
                onClick={handleMenuClose}
                component={Link}
                to="/login"
                className={getLinkClass("/login")}
              >
                Login
              </MenuItem>
            )}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
