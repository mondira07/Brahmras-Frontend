import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  Breadcrumbs,
  Link,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../Config'; // Import the domain from the configuration file

const UpdateCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const category = location.state?.category;

  const [name, setName] = useState(category?.name || '');
  const [description, setDescription] = useState(category?.description || '');
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState(category?.images || []);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files); // Store the file objects directly
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData();
    formData.append('id', category._id);
    formData.append('name', name);
    formData.append('description', description);

    // Add new images to the form data
    images.forEach((file) => {
      formData.append('images', file);
    });

    // Add existing images (if needed)
    existingImages.forEach(img => formData.append('existingImages', img));

    try {
      const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.put(`${domain}/update/categories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the request headers
        },
      });
      navigate('/categorylist');
    } catch (error) {
      console.error('Error updating category:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      } else {
        console.error('No response received from the server');
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#f2f7fb',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="#">
            Dashboard
          </Link>
          <Link color="inherit" href="#">
            Ecommerce
          </Link>
          <Typography color="text.primary">Update Category</Typography>
        </Breadcrumbs>

        <Typography variant="h4" gutterBottom>
          Update Category
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <TextField
                fullWidth
                label="Category Name"
                variant="outlined"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Upload images
                </Typography>
                <Box
                  sx={{
                    border: '1px dashed #ccc',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    mb: 2,
                    position: 'relative',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                  <Typography>
                    Drop your images here or click to browse
                  </Typography>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </Box>
                {existingImages.length > 0 && (
                  <Box>
                    <Typography variant="body2">Existing Images:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {existingImages.map((img, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={img}
                          alt={`Existing ${index}`}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                {images.length > 0 && (
                  <Box>
                    <Typography variant="body2">New Images:</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                      {images.map((file, index) => (
                        <Box
                          key={index}
                          component="img"
                          src={URL.createObjectURL(file)}
                          alt={`New ${index}`}
                          sx={{
                            width: 100,
                            height: 100,
                            objectFit: 'cover',
                            borderRadius: '4px',
                            border: '1px solid #ddd',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Update Category
          </Button>
          <Button variant="outlined" onClick={() => navigate('/categorylist')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateCategory;
