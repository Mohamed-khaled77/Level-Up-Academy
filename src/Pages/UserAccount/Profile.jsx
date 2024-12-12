import { useState, useEffect } from "react";
import { Box, Typography, Avatar, Switch, TextField, Button, List, ListItem, ListItemText, Container, OutlinedInput } from "@mui/material";
import { useAuth } from "../../components/Context/AuthContext";
import "./Profile.scss";

const Profile = ({ toggleTheme, isDarkMode }) => {
  const { isLoggedIn, user, logout } = useAuth(); // استخدم البيانات الجديدة من كونتيكست

  const [language, setLanguage] = useState(user ? user.language : localStorage.getItem("language") || "English");
  const [profileImage, setProfileImage] = useState(user ? user.profileImage : localStorage.getItem("profileImage") || "/assets/Hero.1.png");
  const [name, setName] = useState(user ? user.username : localStorage.getItem("name") || "John Doe"); // استخدم اسم المستخدم من التوكين
  const [about, setAbout] = useState(user ? user.about : localStorage.getItem("about") || "I’m a passionate developer...");
  const [purchasedCourses, setPurchasedCourses] = useState(
    user ? user.courses : JSON.parse(localStorage.getItem("userCourses")) || []
  );

  useEffect(() => {
    // تحديث localStorage إذا كانت البيانات من التوكين
    localStorage.setItem("language", language);
    localStorage.setItem("profileImage", profileImage);
    localStorage.setItem("name", name);
    localStorage.setItem("about", about);
  }, [language, profileImage, name, about]);

  const handleLanguageChange = (e) => setLanguage(e.target.value);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container>
      <Box
        className={`profile-container ${isDarkMode ? "dark-mode" : "light-mode"}`}
        sx={{
          p: 3,
          bgcolor: isDarkMode ? "#121212" : "#f9f9f9",
          color: isDarkMode ? "#fff" : "#000",
        }}
      >
        {/* Header Section */}
        <Box className="header" display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Avatar alt="User Avatar" src={profileImage} sx={{ width: { xs: 60, sm: 100 }, height: { xs: 60, sm: 100 } }} />
          <Box>
            <Typography  variant="h5" fontWeight="bold">
              <OutlinedInput 
              
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                fullWidth
                sx={{ color : "#000", outlineColor :"#000"}}
              />
            </Typography>
            <Typography sx={{color : "#000"}} variant="body1">Front-End Developer | React Enthusiast</Typography>
            <input className="btn btn-primary text-decoration-none" type="file" accept="image/*" style={{ marginTop: "10px" }} onChange={handleImageUpload} />
          </Box>
        </Box>

        {/* About Section */}
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">
            About Me
          </Typography>
          <TextField
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            sx={{
              mt: 2,
              bgcolor: isDarkMode ? "#333" : "#fff",
              color: isDarkMode ? "#fff" : "#000",
            }}
          />
        </Box>

        {/* Purchased Courses Section */}
        {/* {purchasedCourses.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" fontWeight="bold">
              Purchased Courses
            </Typography>
            <List sx={{ mt: 2, bgcolor: isDarkMode ? "#333" : "#fff", borderRadius: 2, width: '100%' }}>
              {purchasedCourses.map((course, index) => (
                <ListItem key={index} sx={{ padding: 1 }}>
                  <ListItemText primary={`Course ID: ${course}`} />
                </ListItem>
              ))}
            </List>
          </Box>
        )} */}

        {/* Settings Section */}
        <Box mt={5}>
          <Typography variant="h6" fontWeight="bold">
            Settings
          </Typography>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body1">Dark Mode</Typography>
              <Switch checked={isDarkMode} onChange={toggleTheme} />
            </Box>

            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="body1">Language</Typography>
              <TextField
                select
                SelectProps={{ native: true }}
                value={language}
                onChange={handleLanguageChange}
                sx={{ maxWidth: 150 }}
              >
                <option value="English">English</option>
                <option value="Arabic">العربية</option>
              </TextField>
            </Box>
          </Box>
        </Box>

        {/* Logout Button */}
        <Box mt={5}>
          {isLoggedIn && (
            <Button
              onClick={logout}
              variant="outlined"
              color="secondary"
              sx={{ borderRadius: "20px", px: 3, py: 1, fontWeight: "bold" }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;
