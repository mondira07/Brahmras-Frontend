import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  Snackbar,
  Container,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
import { domain } from "../Config";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [stock, setStock] = useState("");
  const [rating, setRating] = useState("");
  const [numReviews, setNumReviews] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openDialog, setOpenDialog] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [stockError, setStockError] = useState(false);
  const [discountPercentageError, setDiscountPercentageError] = useState(false);
  const [imagesError, setImagesError] = useState(false);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${domain}/subcategories`);
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, []);

  const handleImageChange = (e) => {
    const files = e.target.files;
    setSelectedImages(files);

    if (files.length > 0) {
      setImagesError(false);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
    }
  };

  const isNumeric = (value) => !isNaN(value) && value.trim() !== "";

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let hasError = false;

    if (!productName) {
      setProductNameError(true);
      hasError = true;
    } else {
      setProductNameError(false);
    }

    if (!description) {
      setDescriptionError(true);
      hasError = true;
    } else {
      setDescriptionError(false);
    }

    if (!isNumeric(price)) {
      setPriceError(true);
      hasError = true;
    } else {
      setPriceError(false);
    }

    if (!isNumeric(stock)) {
      setStockError(true);
      hasError = true;
    } else {
      setStockError(false);
    }

    if (!isNumeric(discountPercentage)) {
      setDiscountPercentageError(true);
      hasError = true;
    } else {
      setDiscountPercentageError(false);
    }

    if (selectedImages.length === 0) {
      setImagesError(true);
      hasError = true;
    } else {
      setImagesError(false);
    }

    if (hasError) {
      setSnackbarMessage("Please fill out all required fields correctly.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("subcategory", subcategory);
    formData.append("stock", stock);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("discountPercentage", discountPercentage);
    Array.from(selectedImages).forEach((file) => {
      formData.append("images", file);
    });

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("Authentication token not found.");
        setSnackbarMessage("Authentication token not found.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
        return;
      }

      const response = await axios.post(
        `${domain}/admin/add-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Response from server:", response);

      setSnackbarMessage("Product added successfully!");
      setSnackbarSeverity("success");
      setOpenDialog(true);
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
        setSnackbarMessage(
          error.response?.data?.message || "Something went wrong!"
        );
      } else {
        console.error("Error message:", error.message);
        setSnackbarMessage("Something went wrong!");
      }
      setSnackbarSeverity("error");
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
    backgroundColor: "#f2f7fb",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Container maxWidth="lg">
    <Typography
      variant="h5"
      sx={{ marginBottom: "1rem", fontWeight: "bold" }}
    >
      Add Product
    </Typography>

    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
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
                Product Name *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Product name"
                variant="outlined"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                error={productNameError}
                helperText={productNameError && "Product Name is required"}
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
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                error={descriptionError}
                helperText={descriptionError && "Description is required"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Price *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  if (isNumeric(e.target.value)) {
                    setPriceError(false);
                  }
                }}
                error={priceError}
                helperText={priceError && "Price must be a numeric value"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Sub-Category *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Sub-Category</InputLabel>
                <Select
                  label="Sub-Category"
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                >
                  <MenuItem value="">Choose Subcategory</MenuItem>
                  {subcategories.map((subcat) => (
                    <MenuItem key={subcat._id} value={subcat._id}>
                      {subcat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Stock *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Stock"
                variant="outlined"
                value={stock}
                onChange={(e) => {
                  setStock(e.target.value);
                  if (isNumeric(e.target.value)) {
                    setStockError(false);
                  }
                }}
                error={stockError}
                helperText={stockError && "Stock must be a numeric value"}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={3}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Discount Percentage *
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Discount Percentage"
                variant="outlined"
                value={discountPercentage}
                onChange={(e) => {
                  setDiscountPercentage(e.target.value);
                  if (isNumeric(e.target.value)) {
                    setDiscountPercentageError(false);
                  }
                }}
                error={discountPercentageError}
                helperText={
                  discountPercentageError &&
                  "Discount Percentage must be a numeric value"
                }
              />
            </Grid>
          </Grid>

          <div>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Upload Images *
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              border: "1px dashed #ccc",
              borderRadius: 1,
              p: 2,
              textAlign: "center",
              color: "primary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              cursor: "pointer",
              borderColor: imagesError ? "error.main" : "inherit",
            }}
          >
            <input
              type="file"
              id="raised-button-file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
              style={{ display: "none" }}
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

      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 2 }}>
        {imagePreviews.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt={`Preview ${index + 1}`}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginRight: "8px",
              marginBottom: "8px",
            }}
          />
        ))}
      </Box>
    </div>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Add Product
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Container>

  <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={handleCloseSnackbar}
  >
    <Alert
      onClose={handleCloseSnackbar}
      severity={snackbarSeverity}
      sx={{ width: "100%" }}
    >
      {snackbarMessage}
    </Alert>
  </Snackbar>

  <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Success"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Product added successfully!
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseDialog} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
</Box>

  );
}

export default AddProduct;
