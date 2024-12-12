import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Register() {
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let isMounted = true;
    axios
      .get("http://localhost:1337/api/img-logins", { params: { populate: "*" } })
      .then((res) => {
        if (isMounted) setRegisterData(res.data.data);
      })
      .catch((err) => console.error("Error fetching images:", err));
    return () => (isMounted = false);
  }, []);

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username: data.fullName,
          email: data.email,
          password: data.password,
        }
      );

      const token = response.data.jwt;
      localStorage.setItem("authToken", token);

      navigate("/login");
      setNotification({
        open: true,
        message: "Registered successfully! Redirecting to login...",
        severity: "success",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error?.message;
      setNotification({
        open: true,
        message:
          errorMessage === "Email or Username are already taken"
            ? "This email or username is already registered. Please try another."
            : "Failed to register. Please check your details and try again.",
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
                Welcome to Level Up Academy
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Please register to create an account
              </Typography>
            </Box>
            <form
              onSubmit={handleSubmit(handleRegister)}
              style={{
                width: "100%",
                "@media (max-width: 600px)": { padding: "0 10px" },
              }}
            >
              <TextField
                fullWidth
                label="Full Name"
                {...register("fullName", { required: "Full Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                sx={{ mb: 3 }}
              />
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
              >
                {loading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </form>
            <Typography textAlign="center">
              your have an account?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="text" color="secondary">
                  login
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
            {registerData.length > 0 ? (
              registerData.map((el) => (
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

export default Register;
