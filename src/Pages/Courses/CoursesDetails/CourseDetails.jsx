import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faClock, faDollarSign, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Divider,
  Stack,
  Rating,
  CircularProgress, // استيراد CircularProgress للـ Loader
} from "@mui/material";
import PaymentForm from "./PaymentForm";

export default function CourseDetails() {
  const { documentId } = useParams();
  const [cardCourses, setCardCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/cards/${documentId}`, {
        params: { populate: "*" },
      })
      .then((res) => {
        setCardCourses(res.data.data);
        setReviews(res.data.data.reviews || []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching course details:", err);
        setIsLoading(false);
      });
  }, [documentId]);

  const handleReviewSubmit = () => {
    if (!newReview || !userName || rating === 0) {
      alert("Please enter your name, a review, and a rating!");
      return;
    }

    const newComment = { user: userName, text: newReview, rating };
    setReviews((prev) => [newComment, ...prev]);
    setNewReview("");
    setUserName("");
    setRating(0);

    axios
      .post(`http://localhost:1337/api/reviews`, {
        data: { user: userName, text: newReview, rating, course: documentId },
      })
      .then(() => console.log("Review submitted successfully"))
      .catch((err) => console.error("Error submitting review:", err));
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePaymentSuccess = (paymentDetails) => {
    console.log("Payment Successful!", paymentDetails);
    setPaymentSuccess(true); // تم تفعيل النجاح بعد الدفع

    // تحديث بروفايل المستخدم بإضافة الكورس المشتراة

    const currentUserCourses = JSON.parse(localStorage.getItem('userCourses')) || [];

    // إضافة الكورس إلى قائمة الكورسات المشتراة
    const updatedCourses = [...currentUserCourses, documentId];
    localStorage.setItem('userCourses', JSON.stringify(updatedCourses));

    console.log("Course added to profile successfully");
  };

  const handleBuyClick = () => {
    setIsModalOpen(true); // فتح المودال عند الضغط على شراء
  };

  const handleVideoChange = (direction) => {
    if (direction === "next" && currentVideoIndex < cardCourses.Video_block.length - 1) {
      setCurrentVideoIndex((prev) => prev + 1);
    } else if (direction === "prev" && currentVideoIndex > 0) {
      setCurrentVideoIndex((prev) => prev - 1);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    ); // عرض الـ Loader عند تحميل البيانات
  }

  if (!cardCourses) {
    return <p>Course not found!</p>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Course Details Section */}
      <Grid order={1} container spacing={3} sx={{ backgroundColor: "", borderRadius: 3 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {cardCourses.Card_Title}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            {cardCourses.Card_p}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ mt: 3 }}>
            <Typography>
              <b>Price:</b> {cardCourses.Card_prise}
              <FontAwesomeIcon icon={faDollarSign} className="me-2 text-primary" />
            </Typography>
            <Typography>
              <FontAwesomeIcon icon={faLayerGroup} className="me-2 text-primary" />
              <b>Courses:</b> {cardCourses.Courses_num}
            </Typography>
            <Typography>
              <FontAwesomeIcon icon={faClock} className="me-2 text-primary" />
              <b>Duration:</b> {cardCourses.courses_aower} Hours
            </Typography>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            onClick={handleBuyClick} // فتح المودال عند الضغط على الزر
          >
            Buy Now
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ p: 2 }} md={6}>
          <CardMedia
            component="video"
            controls
            src={`http://localhost:1337${cardCourses.Preview_video?.url}`}
            poster={`http://localhost:1337${cardCourses.Card_img.url}`}
            sx={{ borderRadius: 3 }}
          />
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      {/* Reviews Section */}
      <Grid order={3} container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Reviews
          </Typography>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => setRating(newValue)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Write your review"
              variant="outlined"
              multiline
              rows={3}
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <Button variant="contained" color="primary" onClick={handleReviewSubmit}>
              Submit Review
            </Button>
          </Box>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    <FontAwesomeIcon icon={faCircleUser} className="me-2 text-primary" />
                    {review.user} - <Rating value={review.rating} readOnly />
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {review.text}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No reviews yet. Be the first to leave one!</Typography>
          )}
        </Grid>

        {/* Videos Section */}
        {paymentSuccess && (
          <Grid order={2} item xs={12} md={6}>
            <Typography variant="h5">Course Videos</Typography>
            <CardMedia
              component="video"
              controls
              src={`http://localhost:1337${cardCourses.Video_block[currentVideoIndex]?.url}`}
              poster={`http://localhost:1337${cardCourses.Card_img.url}`}
              sx={{ borderRadius: 2 }}
            />
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
              <Button
                variant="outlined"
                disabled={currentVideoIndex === 0}
                onClick={() => handleVideoChange("prev")}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                disabled={currentVideoIndex === cardCourses.Video_block.length - 1}
                onClick={() => handleVideoChange("next")}
              >
                Next
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Payment Modal */}
      <PaymentForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        courseTitle={cardCourses.Card_Title}
        coursePrice={cardCourses.Card_prise}
      />
    </Box>
  );
}
