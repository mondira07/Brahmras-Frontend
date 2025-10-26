import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { domain } from '../Config';

function ProductList() {
  const [entriesCount, setEntriesCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subcategoryMap, setSubcategoryMap] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${domain}/products`);
        setProducts(response.data);
        console.log("Products API Response:", response.data); // Debugging line
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Fetch subcategories and map them
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`${domain}/subcategories`, {
          headers: {
            'Authorization': `Bearer ${Cookies.get('authToken')}`
          },
          withCredentials: true,
        });
        const subcategoryList = response.data;
        setSubcategories(subcategoryList);
        console.log("Subcategories API Response:", subcategoryList); // Debugging line
        const subcategoryMap = subcategoryList.reduce((acc, subcategory) => {
          acc[subcategory._id] = subcategory.name;
          return acc;
        }, {});
        setSubcategoryMap(subcategoryMap);
        console.log("Subcategory Map:", subcategoryMap); // Debugging line
      } catch (error) {
        console.error('Error fetching subcategories:', error.response?.data || error.message);
      }
    };

    fetchProducts();
    fetchSubcategories();
  }, []);

  // Get subcategory name from ID
  const getSubcategoryName = (id) => {
    console.log("Looking for subcategory with ID:", id); // Debugging line
    console.log("Subcategory Map:", subcategoryMap); // Debugging line
    return subcategoryMap[id] || 'Unknown';
  };

  const handleButtonClick = () => {
    navigate('/addproduct');
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`${domain}/admin/delete-product`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        },
        data: { productId },
        withCredentials: true,
      });
      // Remove the product from the state
      setProducts(products.filter(product => product._id !== productId));
      // Show success message
      setSnackbarMessage("Product Deleted Successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      setSnackbarMessage("Error deleting product");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f2f7fb",
        minHeight: "100vh",
        padding: "2rem",
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
          <Typography color="text.primary">Product List</Typography>
        </Breadcrumbs>

        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <InfoOutlinedIcon sx={{ mr: 1, color: "primary.main" }} />
            <Typography variant="body2">
              Tip search by Product ID: Each product is provided with a unique
              ID, which you can rely on to find the exact product you need.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Showing
              </Typography>
              <Select
                value={entriesCount}
                onChange={(e) => setEntriesCount(e.target.value)}
                size="small"
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
              <Typography variant="body2" sx={{ ml: 1 }}>
                entries
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TextField
                placeholder="Search here..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  borderColor: '#1876d2',
                  color: '#1876d2',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: '#1876d2',
                    color: 'white',
                  },
                }}
                onClick={handleButtonClick}
              >
                Add new
              </Button>
            </Box>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>Image</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>SubCategory</TableCell>
                  <TableCell>Discount Amount</TableCell>
                  <TableCell>Discount Percentage</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  console.log("Product Object:", product); // Debugging line
                  const subcategoryName = getSubcategoryName(product.subcategory);
                  console.log("Subcategory Name for ID", product.subcategory, "is:", subcategoryName); // Debugging line
                  return (
                    <TableRow key={product._id}>
                      {/* <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: 50, height: 50, marginRight: 10 }}
                          />
                         
                        </Box>
                      </TableCell> */}
                      <TableCell>
                          {product.images && product.images.length > 0 ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              width={50}
                              height={50}
                            />
                          ) : (
                            <img
                              src="default-image-url" // Provide a default image URL
                              alt="Default"
                              width={50}
                              height={50}
                            />
                          )}
                        </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{subcategoryName}</TableCell>
                      <TableCell>{product.priceAfterDiscount}</TableCell>
                      <TableCell>{product.discountPercentage}</TableCell>
                      <TableCell>
                        {product.stock === "Out of stock" ? (
                          <Chip label="Out of Stock" color="error" size="small" />
                        ) : (
                          <Chip
                            label={product.stock}
                            color="primary"
                            size="small"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() =>
                              navigate("/updateproduct", { state: { product } })
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(product._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ProductList;
