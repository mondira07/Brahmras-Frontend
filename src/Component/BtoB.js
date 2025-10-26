import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  styled,
  TextField,
  Button,
  Container,
} from "@mui/material";

const Product = [
  {
    id: 1,
    src: "assets/Product1.jpg",
    alt: "Premium Kaju Katli",
    name: "Premium Kaju Katli",
  },
  {
    id: 2,
    src: "assets/Product2.jpg",
    alt: "Dryfruit Fun",
    name: "Dryfruit Fun",
  },
  {
    id: 3,
    src: "assets/ghee5L.jpg",
    alt: "A2 Desi Cow Ghee",
    name: "A2 Desi Cow Ghee",
  },
];

const video = [
  {
    videoSrc: "assets/Cow.gif",
    title: "The Calf is Fed",
  },
  {
    videoSrc: "assets/Bilona_1.gif",
    title: "Traditional Bilona Method",
  },
  {
    videoSrc: "assets/Fire_1.gif",
    title: "Low Flame Boiling in an Earthen Pot",
  },
  {
    videoSrc: "assets/Glass_packing.gif",
    title: "Glass Packaging",
  },
];

const Certificates = [
  {
    id: 1,
    src: "assets/10.png",
    alt: "ISO",
  },
  {
    id: 2,
    src: "assets/9.png",
    alt: "IP",
  },
  {
    id: 3,
    src: "assets/8.png",
    alt: "IEC",
  },
  {
    id: 4,
    src: "assets/7.png",
    alt: "LACTOSE",
  },
  {
    id: 5,
    src: "assets/6.png",
    alt: "MID",
  },
  {
    id: 6,
    src: "assets/5.png",
    alt: "ISF",
  },
  {
    id: 7,
    src: "assets/4.png",
    alt: "APEDA",
  },
  {
    id: 8,
    src: "assets/3.png",
    alt: "GMO",
  },
  {
    id: 9,
    src: "assets/2.png",
    alt: "MSME",
  },
];

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#C8D9BF",
    },
    "&:hover fieldset": {
      borderColor: "#C8D9BF",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#C8D9BF",
    },
  },
});

const SendButton = styled(Button)({
  backgroundColor: "#2E6142",
  color: "white",
  "&:hover": {
    backgroundColor: "#224731",
  },
});

function BtoB() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Here you would typically send the data to your backend
  };

  return (
    <Box
      sx={{
        textAlign: "left",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "200px",
        marginBottom: "50px",
        paddingX: { xs: 2, md: 4 }, // Add padding to the sides
      }}
    >
      <Typography variant="h4" gutterBottom>
        Wholesale and Exports
      </Typography>

      <Typography variant="h6" gutterBottom>
        Partner With Us.
      </Typography>

      <Typography variant="body1" paragraph>
        Delight your customers with Brahmras Natural cooking ingredients.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Products
      </Typography>

      {/* Product */}
      <Grid container spacing={2} sx={{ marginTop: 15 }}>
        {Product.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Box
              sx={{
                marginX: { xs: 1, lg: 2 },
                padding: 1,
                boxSizing: "border-box",
              }}
            >
              <Box
                sx={{
                  display: "block",
                  width: "100%",
                  height: { xs: "250px", lg: "350px" },
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  position: "relative",
                }}
              />
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  marginTop: 2,
                  color: "#175C3B",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Video */}
      <Grid container spacing={2} marginTop={5}>
        {video.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 200, // Fixed height for video
                overflow: "hidden",
                borderRadius: 1, // Optional: Add rounded corners
              }}
            >
              <img
                src={item.videoSrc}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover", // Ensure the image covers the area without distortion
                }}
              />
              <Typography
                variant="subtitle1" // Adjust the text size
                component="div"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  padding: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Semi-transparent background
                  color: "#fff", // White text color
                }}
              >
                {item.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Certificates */}

      <Typography
        variant="h4"
        component="h4"
        sx={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#175C3B",
        }}
      >
        Certifications
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5 }}
      >
        {Certificates.map((certificate) => (
          <Grid item key={certificate.id} xs={6} sm={2} md={2} lg={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <img
                src={certificate.src}
                alt={certificate.alt}
                style={{ width: 100, height: 100 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: "100%", marginTop: "50px" }}>
        <Typography variant="h6" gutterBottom color="#005c3d">
          What Brahmras Natural Does Differently
        </Typography>
        <Typography variant="body2" paragraph>
          Mass-produced food ingredients are highly processed. They contain
          unhealthy components and harmful additives. But, minimally processed
          foods have unscalable and unregulated facilities. They run risks of
          hygiene and adulteration. So, what’s a hygienic yet healthy choice?
          Gramiyaa.
        </Typography>
        <Typography variant="body2" paragraph>
          Brahmras Natural products are minimally processed in standardized &
          hygienic facilities. They contain zero preservatives and chemical
          additives.
        </Typography>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom color="#005c3d">
          About Brahmras Natural
        </Typography>
        <Typography variant="body2" paragraph>
          With roots in the ox-driven oil mills, Brahmras Natural's founders are
          2nd generation, traditional oil makers. They introduced time-honored
          oil-making practices to modern production facilities in 2016.
          Established in Trichy, the wood and stone mill facility is designed to
          minimally process food while retaining maximum nutrients.
        </Typography>
      </Box>

      {/* Form */}

      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom color="#2E6142">
            Get In Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Let us know if you're looking for bulk orders or wholesale
            distribution. Give us a call at +91-8856846482
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              margin="normal"
              name="name"
              label="Name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
            />
            <StyledTextField
              fullWidth
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
            />
            <StyledTextField
              fullWidth
              margin="normal"
              name="companyName"
              label="Company Name"
              variant="outlined"
              value={formData.companyName}
              onChange={handleChange}
            />
            <StyledTextField
              fullWidth
              margin="normal"
              name="phoneNumber"
              label="Phone number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <StyledTextField
              fullWidth
              margin="normal"
              name="message"
              label="Your message"
              variant="outlined"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
            <SendButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              SEND
            </SendButton>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default BtoB;
