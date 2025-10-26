import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Breadcrumbs,
  Link,
} from "@mui/material";

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    // Implement tracking logic here
    console.log("Tracking number:", trackingNumber);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 30 }}>
      <Box my={4} display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          gutterBottom
          color="#175c3b"
          sx={{ fontWeight: "bold" }}
        >
          Track Order
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Track Order</Typography>
        </Breadcrumbs>

        <Box sx={{ width: "100%", mb: 3 }}>
          <Typography variant="body1" paragraph>
            Looking to track your order? When your Order ships out, you will
            receive a Shipping Confirmation email from{" "}
            <Link
              sx={{ color: "#005c3d" }}
              href="mailto:info@brahmasnatural.com"
            >
              info@brahmasnatural.com
            </Link>{" "}
            with your tracking number included in it. Depending on the product
            ordered, the email could take up to 7 business days to be sent. Once
            you receive the email, enter your tracking number below to easily
            check on your delivery status.
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              sx={{ mr: 2, flexGrow: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleTrack}
              sx={{ backgroundColor: "#005c3d" }}
            >
              TRACK
            </Button>
          </Box>
        </Box>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" gutterBottom color="#005c3d">
            Things to Keep in Mind:
          </Typography>
          <Typography variant="body2" paragraph>
            Order Numbers don't instantly update with available Delivery Status.
            If your tracking number entered shows that it is currently
            unavailable, do not be alarmed - Your order has been shipped out and
            is in transit to the local post office. Tracking should be updating
            within a few business days. Depending on the destination, the order
            may take 10 to 15 business days to be delivered.
          </Typography>
          <Typography variant="body2" paragraph>
            If you see any irrelevant ads on the tracking popup, we are
            sincerely sorry. We use a third-party order tracking service to
            ensure the best tracking result so we have no way of controlling the
            ads shown on it. Thank you for your understanding.
          </Typography>
          <Typography variant="body2">Happy shopping!</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default TrackOrder;
