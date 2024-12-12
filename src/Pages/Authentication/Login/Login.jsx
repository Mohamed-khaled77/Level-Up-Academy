import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  CircularProgress,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {  useAuth } from "../../../components/Context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();
  const { login } = useAuth(); // استخدم الكونتكست بشكل صحيح

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let isMounted = true; // تتبع ما إذا كان المكون لا يزال موجودًا
    axios
      .get("http://localhost:1337/api/img-logins", { params: { populate: "*" } })
      .then((res) => {
        if (isMounted) setLoginData(res.data.data);
      })
      .catch((err) => console.error("Error fetching images:", err));
    return () => (isMounted = false); // تنظيف التأثير
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: data.email,
          password: data.password,
        }
      );

      const token = response.data.jwt;
      localStorage.setItem("authToken", token);

      // استخدام كونتكست لتحديد حالة تسجيل الدخول
      login(true);

      setNotification({
        open: true,
        message: "Login successful! Redirecting...",
        severity: "success",
      });

      navigate("/dashboard");
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message;
      setNotification({
        open: true,
        message:
          errorMessage === "Invalid identifier or password"
            ? "Invalid email or password. Please try again."
            : "Failed to login. Please check your details and try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ my: 3 }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Paper
        elevation={6}
        sx={{
          height: "auto",
          p: 4,
          borderRadius: 4,
          "@media (max-width: 600px)": {
            p: 2,
          },
        }}
      >
        <Grid container spacing={4}>
          {/* Left Side: Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              paddingRight: "8px",
              "@media (max-width: 960px)": { paddingRight: 0 },
            }}
          >
            <Box textAlign="center" mb={4}>
              <img
                src="/src/assets/logo.png"
                alt="Logo"
                style={{ width: "8rem", marginBottom: "1rem" }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Please login to access your account
              </Typography>
            </Box>
            <form onSubmit={handleSubmit(handleLogin)} style={{ width: "100%" }}>
              <TextField
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mb: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : "Login"}
              </Button>
            </form>
            <Typography textAlign="center">
              Don't have an account?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Button variant="text" color="secondary">
                  Register
                </Button>
              </Link>
            </Typography>
          </Grid>

          {/* Right Side: Images */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              "@media (max-width: 960px)": { display: "none" },
            }}
          >
            {loginData.length > 0 ? (
              loginData.map((el) => (
                <LazyLoadImage
                  key={el.id}
                  src={`http://localhost:1337${el.Img_Login.url}`}
                  alt="Register"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
              ))
            ) : (
              <Typography>No images available.</Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
