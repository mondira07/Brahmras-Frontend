import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import { domain } from '../Config';

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  const [categoryNameError, setCategoryNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imagesError, setImagesError] = useState(false);

  const handleImageUpload = (event) => {
    setImages(event.target.files);
    if (event.target.files.length > 0) {
      setImagesError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hasError = false;

    if (!categoryName) {
      setCategoryNameError(true);
      hasError = true;
    } else {
      setCategoryNameError(false);
    }

    if (!description) {
      setDescriptionError(true);
      hasError = true;
    } else {
      setDescriptionError(false);
    }

    if (images.length === 0) {
      setImagesError(true);
      hasError = true;
    } else {
      setImagesError(false);
    }

    if (hasError) {
      setSnackbarMessage('Please fill out all required fields.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    formData.append('description', description);
    formData.append('subCategories', subCategory);

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }

    try {
      const token = Cookies.get('authToken'); // Get token from cookies

      const response = await axios.post(`${domain}/add/categories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include token in header
        },
        withCredentials: true, // Ensure credentials (cookies) are sent with the request
      });

      setSnackbarMessage('Category added successfully!');
      setSnackbarSeverity('success');
      setOpenDialog(true);
    } catch (error) {
      setSnackbarMessage(error.response?.data?.message || 'Something went wrong!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f2f7fb',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Category Information
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            mt: 5,
            backgroundColor: 'white',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Category Name *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                variant="outlined"
                fullWidth
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                error={categoryNameError}
                helperText={categoryNameError && 'Category Name is required'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Description *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={descriptionError}
                helperText={descriptionError && 'Description is required'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Upload Images *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  border: '1px dashed #ccc',
                  borderRadius: 1,
                  p: 2,
                  textAlign: 'center',
                  color: 'primary.main',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px',
                  cursor: 'pointer',
                  borderColor: imagesError ? 'error.main' : 'inherit',
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  multiple
                  type="file"
                  onChange={handleImageUpload}
                />
                <label htmlFor="raised-button-file">
                  <CloudUploadIcon fontSize="large" />
                  <Typography variant="body1">
                    Drop your images here or click to browse
                  </Typography>
                </label>
              </Box>
              {imagesError && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                  Please upload at least one image.
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Save
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Category added successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewCategory;
