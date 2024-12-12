import { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const PurchasedCourses = ({ isDarkMode }) => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      const courseIds = JSON.parse(localStorage.getItem("userCourses")) || [];
      const courseDetails = [];

      for (let id of courseIds) {
        try {
          const response = await axios.get(`http://localhost:1337/api/cards/${id}`, {
            params: { populate: "*" },
          });
          courseDetails.push(response.data.data);
        } catch (error) {
          console.error(`Error fetching course ${id}:`, error);
        }
      }

      setPurchasedCourses(courseDetails);
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Purchased Courses
      </Typography>
      <List
        sx={{
          mt: 2,
          bgcolor: isDarkMode ? "#333" : "#fff",
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {purchasedCourses.length > 0 ? (
          purchasedCourses.map((course, index) => (
            <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemText
                primary={`Course: ${course.attributes.Card_Title}`}
                secondary={`Price: ${course.attributes.Card_prise}$`}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            No purchased courses found.
          </Typography>
        )}
      </List>
    </div>
  );
};

export default PurchasedCourses;
