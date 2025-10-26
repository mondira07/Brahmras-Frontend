import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import Link as RouterLink
import { Box, TextField, Button, Typography, Container, Link, Alert, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import axios from 'axios';
import { domain } from '../Config';
import { useAuth } from '../Context/AuthContext';

function Login() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange - name: ${name}, value: ${value}`);
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handleSubmit - formData:', formData);
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting to submit form...');
      const response = await axios.post(`${domain}/login`, formData, {
        withCredentials: true,
      });

      console.log('Login response:', response.data);

      const token = response.data.user.token;
      localStorage.setItem('authToken', token);

      // Update auth state with user information
      login({
        ...response.data.user,  // Assuming the user object includes all necessary info
        role: response.data.user.role
      });

      navigate('/');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 35, mb: 22 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant={isMobile ? 'h5' : 'h4'} sx={{ color: '#175C3B', mb: 3, fontWeight: 'bold' }}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#9FBC00',
                },
                '&:hover fieldset': {
                  borderColor: '#9FBC00',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9FBC00',
                },
              },
              mb: { xs: '10px', sm: '0' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
            value={formData.password}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#9FBC00',
                },
                '&:hover fieldset': {
                  borderColor: '#9FBC00',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#9FBC00',
                },
              },
              mb: { xs: '10px', sm: '0' },
            }}
          />
          <Link
            href="#"
            variant="body2"
            sx={{
              color: '#9FBC00',
              display: 'block',
              textAlign: 'left',
              mt: 1,
              mb: 2,
              fontSize: '0.875rem',
            }}
          >
            Forgot your password?
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 2,
              mb: 2,
              backgroundColor: '#175C3B',
              '&:hover': {
                backgroundColor: '#124a2f',
              },
              py: isMobile ? 1 : 1.5,
              textTransform: 'none',
              fontWeight: 'bold',
            }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
          </Button>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            sx={{
              color: '#9FBC00',
              display: 'block',
              textAlign: 'center',
              mt: 2,
              fontSize: '0.875rem',
            }}
          >
            Create account
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
