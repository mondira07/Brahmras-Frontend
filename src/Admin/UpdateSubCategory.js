import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useLocation, useNavigate } from 'react-router-dom';
import { domain } from '../Config';
import Cookies from 'js-cookie';

const UpdateSubCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subcategory = location.state?.category;

  const [Name, setName] = useState(subcategory?.Name || '');
  const [category, setCategory] = useState(subcategory?.category?._id || '');
  const [description, setDescription] = useState(subcategory?.description || '');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(subcategory?.images || []);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Location state:', location.state.category._id);
    if (!subcategory?._id) {
      console.error('Subcategory ID is missing');
    } else {
      console.log('Subcategory ID:', subcategory._id);
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${domain}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, [subcategory, location.state]);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    console.log("----->", subcategory)

    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    if (!subcategory || !subcategory._id) {
      console.error('Subcategory ID is not defined');
      return;
    }

    const formData = new FormData();
    formData.append('id', subcategory._id);
    formData.append('Name', Name);
    formData.append('description', description);
    formData.append('category', category);
    console.log(formData)
    images.forEach((image) => {
      formData.append('images', image);
    });

    // Log formData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    setLoading(true);

    try {
      const response = await axios.put(`${domain}/update/subcategories`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Subcategory updated successfully:', response.data);
      navigate('/subcategorylist');
    } catch (error) {
      console.error('Error updating subcategory:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <Box sx={{ backgroundColor: '#f2f7fb', minHeight: '100vh', padding: '2rem' }}>
      <Box sx={{ p: 3 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link color="inherit" href="#">
            Dashboard
          </Link>
          <Link color="inherit" href="#">
            Ecommerce
          </Link>
          <Typography color="text.primary">Update Subcategory</Typography>
        </Breadcrumbs>

        <Typography variant="h4" gutterBottom>
          Update Subcategory
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <TextField
                fullWidth
                label="Subcategory name"
                variant="outlined"
                margin="normal"
                value={Name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                  }}
                >
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-images"
                    multiple
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="upload-images">
                    <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                    <Typography>
                      Drop your images here or click to browse
                    </Typography>
                  </label>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {imagePreviews.map((src, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 100,
                        height: 100,
                        backgroundImage: `url(${src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 1,
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={loading}>
        <DialogTitle>Updating Subcategory</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UpdateSubCategory;
