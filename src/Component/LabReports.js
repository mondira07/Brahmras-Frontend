import React from 'react';
import { Box, Typography, Grid } from '@mui/material';


const LabReports = () => {
  const images = [
    "assets/lab1.jpg",
    "assets/lab2.jpg",
    "assets/lab3.jpg",
    "assets/lab4.jpg",
    "assets/lab5.jpg",
    "assets/lab6.jpg",
  ];

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        marginTop: "170px",
        marginBottom: "50px",
        
      }}
    >
    <Box sx={{ textAlign: 'center', padding: 5, background: '#f5f5f5'  }}>
      <Typography variant="h4" component="h2" sx={{ marginBottom: 5, color: '#175C3B', fontWeight: 'bold'}}>
        Lab Reports
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={2}>
        {images.map((src, index) => (
          <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
            <Box
              component="img"
              src={src}
              alt={`Lab Report ${index + 1}`}
              sx={{ width: '100%', height: 'auto' }}
            />
          </Grid>
        ))}
      </Grid>
     
    </Box>
    </Box>
    
  );
};

export default LabReports;
