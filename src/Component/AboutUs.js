import React from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  Paper,
} from "@mui/material";


const FeaturedCollection = () => {
    const Promises = [
        {
          id: 1,
          src: "assets/integrity.png", // Make sure to replace these with your actual image paths
          alt: "Integrity",
          label: "Integrity",
        },
        {
          id: 2,
          src: "assets/quality.png",
          alt: "Quality",
          label: "Quality",
        },
        {
          id: 3,
          src: "assets/relationship.png",
          alt: "Relationship",
          label: "Relationship",
        },
        {
          id: 4,
          src: "assets/excellence.png",
          alt: "Excellence",
          label: "Excellence",
        },
      ];
      
      const Features = [
        {
          id: 1,
          src: "assets/11.png",
          alt: "100% made in India",
        },
        {
          id: 2,
          src: "assets/12.png",
          alt: "Premium Quality",
        },
        {
          id: 3,
          src: "assets/13.png",
          alt: "ISO Certified Company",
        },
        {
          id: 4,
          src: "assets/14.png",
          alt: "Fast Track Delivery",
        },
        {
          id: 5,
          src: "assets/15.png",
          alt: "100% Secure Payment",
        },
        {
          id: 6,
          src: "assets/16.png",
          alt: "Satisfaction Guarantee",
        },
      ];

      const cards = [
        {
          src: "assets/Our_Vision.png",
          description: 'To be Globally Impacting health and wellness enriching food company.',
        },
        {
          src: "assets/Our_mission.png",
          description: 'To Ensure the Continue Sucess of our customer, employee and communities by providing superior healthy food products. Reducing adulteration in Food Industry.',
        },
      ];

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginBottom: "50px",
      }}
    >

      {/* Promises */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 28,
          fontWeight: "bold",
          color: "#175C3B",
        }}
      >
        Who we are
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 3 }}
      >
        {Promises.map((promise) => (
          <Grid item key={promise.id} xs={3} sm={3} md={3} lg={2}>
            <Box sx={{ textAlign: "center", padding: 0 }}>
              <img
                src={promise.src}
                alt={promise.alt}
                style={{ width: "120px", height: "120px", margin: 0 }}
              />
              <Typography
                component="h4"
                sx={{ marginTop: 1, color: "#175C3B",fontSize: "18px" }}
              >
                {promise.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Features */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 22,
          fontWeight: "bold",
          color: "#175C3B",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        Our Key Features
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5, paddingLeft: 3, paddingRight: 3 }}
      >
        {Features.map((Features) => (
          <Grid item key={Features.id} xs={6} sm={4} md={3} lg={1.5}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={Features.src}
                alt={Features.alt}
                style={{ width: "100px", height: "100px", margin: 0 }}
              />
              <Typography
                component="h4"
                sx={{ marginTop: 1, color: "#175C3B", fontSize: "18px" }}
              >
                {Features.alt}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Vision & Mission */}

      <Container maxWidth="lg">
      <Grid container justifyContent="center" alignItems="center" spacing={0} sx={{ marginTop: 10 }}>
        {cards.map((card, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <Paper elevation={1} sx={{ padding: 7, borderRadius: 2, width: '350px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', margin: '0 35px' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                <Box component="img" src={card.src} alt="Icon" sx={{ width: 170, height: 80, marginRight: 0 }} />
              </Box>
              <Typography variant="body1" sx={{ color: '#333', textAlign: 'center' }}>
                {card.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
};

export default FeaturedCollection;
