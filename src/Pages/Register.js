import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Link,
  Grid,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Alert
} from '@mui/material';
import axios from 'axios';
import { domain } from '../Config'; // Import the base URL

const RegistrationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // Using useNavigate for navigation

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${domain}/register`, formData);
      console.log('Registration successful:', response.data);
      setSuccess('Registration successful! Redirecting to the dashboard...');
      setError(null);

      setTimeout(() => {
        console.log('Successful registration');
        navigate('/login');
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setError('Registration failed. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mt: 35, mb: 10 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h4" sx={{ color: "#175C3B", fontWeight: 'bold', mb: 3 }}>
          Create Account
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9FBC00",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={formData.lastName}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9FBC00",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9FBC00",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9FBC00",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&:hover fieldset": {
                      borderColor: "#9FBC00",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#9FBC00",
                    },
                  },
                  marginBottom: { xs: "10px", sm: "0" },
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: "#175C3B",
              "&:hover": {
                backgroundColor: "#124a2f",
              },
              py: isMobile ? 1 : 1.5,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Create
          </Button>
          <Link
            component={RouterLink}
            to="/"
            variant="body2"
            sx={{
              color: "red",
              display: "block",
              textAlign: "center",
              mt: 2,
              fontSize: "0.875rem",
            }}
          >
            Return to store
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationPage;