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
import Cookies from 'js-cookie'; // Import js-cookie
import { domain } from '../Config';

const UpdateProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [productName, setProductName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [subCategory, setSubCategory] = useState(product?.subcategory || '');
  const [description, setDescription] = useState(product?.description || '');
  const [stock, setStock] = useState(product?.stock || '');
  const [discountAmount, setDiscountAmount] = useState(product?.priceAfterDiscount || '');
  const [discountPercentage, setDiscountPercentage] = useState(product?.discountPercentage || '');
  const [quantity, setQuantity] = useState(product?.quantity?.toString() || '');
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false); // State to manage loading popup

  useEffect(() => {
    // Fetch subcategories
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(`${domain}/subcategories`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error.response?.data || error.message);
      }
    };

    fetchSubCategories();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    if (!token) {
      console.error('Token not found in localStorage');
      return; // Stop execution if token is not found
    }

    const formData = new FormData();
    formData.append('productId', product._id);
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('subcategory', subCategory);
    formData.append('stock', stock);
    formData.append('discountPercentage', discountPercentage);
    images.forEach((image) => {
      formData.append('images', image);
    });

    setLoading(true); // Show loading popup

    try {
      const response = await axios.put(`${domain}/admin/update-product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log('Product updated successfully:', response.data);
      navigate('/productlist');
    } catch (error) {
      console.error('Error updating product:', error.response?.data || error.message);
    } finally {
      setLoading(false); // Hide loading popup
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
          <Typography color="text.primary">Update Product</Typography>
        </Breadcrumbs>

        <Typography variant="h4" gutterBottom>
          Update Product
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <TextField
                fullWidth
                label="Product name"
                variant="outlined"
                margin="normal"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="subcategory-label">SubCategory</InputLabel>
                <Select
                  labelId="subcategory-label"
                  value={subCategory}
                  label="SubCategory"
                  onChange={(e) => setSubCategory(e.target.value)}
                >
                  {subCategories.map((subcategory) => (
                    <MenuItem key={subcategory._id} value={subcategory.name}>
                      {subcategory.name}
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
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                margin="normal"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                fullWidth
                label="Discount Amount"
                variant="outlined"
                margin="normal"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
              />
              <TextField
                fullWidth
                label="Discount Percentage"
                variant="outlined"
                margin="normal"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
              <TextField
                fullWidth
                label="Quantity"
                variant="outlined"
                margin="normal"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              
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
        <DialogTitle>Updating Product</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UpdateProduct;
