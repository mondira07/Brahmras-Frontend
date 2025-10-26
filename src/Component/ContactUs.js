import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  styled
} from '@mui/material';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#A4BE36',
    },
    '&:hover fieldset': {
      borderColor: '#A4BE36',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#A4BE36',
    },
  },
  width: '100%', // Make the text field full width within its container
  maxWidth: '600px',
});

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: 600,
        margin: 'auto',
        p: 2,
        mt: 30,
        mb: 10 // Adjusted for spacing from top
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: '#005C3D',
          fontWeight: 'bold',
          mb: 2
        }}
      >
        Get in touch with us
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: '#005C3D',
          mb: 3
        }}
      >
        If any queries, please let us know here...
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <StyledTextField
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <StyledTextField
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <StyledTextField
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
        <StyledTextField
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            bgcolor: '#005C3D',
            '&:hover': { bgcolor: '#004C32' },
            width: '100px',
            alignSelf: 'center' // Center the button
          }}
        >
          SEND
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
