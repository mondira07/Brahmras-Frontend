import React, { useState, useEffect } from 'react';
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
import Cookies from 'js-cookie';
import { domain } from '../Config';

const NewSubCategory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openDialog, setOpenDialog] = useState(false);

  const [subCategoryNameError, setSubCategoryNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imagesError, setImagesError] = useState(false);

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${domain}/categories`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`
          },
          withCredentials: true,
        });
        console.log('API Response:', response.data); // Log API response
        setCategoryList(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    console.log('Category List State:', categoryList); // Log category list state
  }, [categoryList]);

  const handleImageUpload = (event) => {
    setImages(event.target.files);
    if (event.target.files.length > 0) {
      setImagesError(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    let hasError = false;
  
    if (!subCategoryName) {
      setSubCategoryNameError(true);
      hasError = true;
    } else {
      setSubCategoryNameError(false);
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
    formData.append('name', subCategoryName);
    formData.append('description', description);
    formData.append('category', selectedCategory);
  
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
  
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from cookies
      console.log('Retrieved Token:', token); // Log the token
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.post(`${domain}/add/subcategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      console.log("Response Data:", response.data);
  
      setSnackbarMessage('Sub-category added successfully!');
      setSnackbarSeverity('success');
      setOpenDialog(true);
    } catch (error) {
      console.error("Error Details:", error.response?.data || error.message);
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
          Sub-Category Information
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
                Sub-Category Name *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                required
                variant="outlined"
                fullWidth
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                error={subCategoryNameError}
                helperText={subCategoryNameError && 'Sub-Category Name is required'}
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

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Category *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth variant="outlined">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {categoryList.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
            Sub-category added successfully!
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

export default NewSubCategory;
