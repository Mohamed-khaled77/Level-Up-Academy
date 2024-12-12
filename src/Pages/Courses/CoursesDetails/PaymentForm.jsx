import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  Stack,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
} from "@mui/material";
import { CreditCard } from "@mui/icons-material";
import VodafoneLogo from "../../../assets/vodafone.png"; // مثال على صورة شعار فودافون كاش
import InstapayLogo from "../../../assets/paypal.png"; // مثال على صورة شعار إنستاباي

export default function PaymentModal({
  open,
  onClose,
  courseTitle,
  coursePrice,
  onPaymentSuccess,
}) {
  const [selectedMethod, setSelectedMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    holderName: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = () => {
    // التأكد من اختيار طريقة الدفع
    if (!selectedMethod) {
      setError("Please select a payment method!");
      return;
    }

    // التحقق من صحة بيانات البطاقة في حالة اختيارها
    if (selectedMethod === "card") {
      if (
        !cardDetails.number ||
        !cardDetails.expiry ||
        !cardDetails.cvv ||
        !cardDetails.holderName
      ) {
        setError("Please fill in all card details.");
        return;
      }
    }

    setIsProcessing(true);
    setError(""); // تفريغ أي رسائل خطأ سابقة

    setTimeout(() => {
      setIsProcessing(false);

      onPaymentSuccess({
        method: selectedMethod,
        ...(selectedMethod === "card" && cardDetails),
      });

      onClose();
    }, 2000);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Complete Your Purchase</DialogTitle>
      <DialogContent>
        <Typography variant="h6">Course: {courseTitle}</Typography>
        <Typography variant="body1">
          Price: <strong>${coursePrice}</strong>
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Select Payment Method:
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
          >
            <Grid container display={"flex"} justifyContent={"space-between"} spacing={1}>
              <Grid item xs={4}>
                <FormControlLabel
                  value="instapay"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" justifyContent="center">
                      <img src={InstapayLogo} alt="Instapay" style={{ width: 40, marginBottom: 5 }} />
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="vodafone"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                      <img src={VodafoneLogo} alt="Vodafone Cash" style={{ width: 40, marginBottom: 5 }} />
                    </Box>
                  }
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label={
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                      <CreditCard sx={{ fontSize: 40, mb: 1 }} />
                    </Box>
                  }
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>

        {selectedMethod === "card" && (
          <Box>
            <Typography variant="subtitle1">Card Details:</Typography>
            <TextField
              fullWidth
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
              sx={{ my: 1 }}
            />
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Expiry Date"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="CVV"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                }
              />
            </Stack>
            <TextField
              fullWidth
              label="Card Holder Name"
              placeholder="Full name on card"
              value={cardDetails.holderName}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, holderName: e.target.value })
              }
              sx={{ mt: 2 }}
            />
          </Box>
        )}

        {selectedMethod === "instapay" && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Use Instapay to complete your payment (dummy process).
          </Typography>
        )}
        {selectedMethod === "vodafone" && (
          <Typography variant="body2" sx={{ mt: 2 }}>
            Please send the payment via Vodafone Cash to{" "}
            <strong>+201234567890</strong>.
          </Typography>
        )}

        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Confirm Payment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
