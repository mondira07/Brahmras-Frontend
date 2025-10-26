import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  Box,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  styled,
  tableCellClasses,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { domain } from '../Config';
import Cookies from "js-cookie";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    fontWeight: theme.typography.fontWeightBold,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.common.white,
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CategoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(null); // Added state for authentication error
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ensure token is stored correctly

        if (!token) {
          setAuthError("Authentication token is missing. Categories may not be available.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${domain}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setCategoryList(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setAuthError("You are not authorized to view these categories. Please log in.");
        } else {
          setError(error.response ? error.response.data.message : error.message);
        }
        setCategoryList([]); // Reset category list on error
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageError = (e) => {
    e.target.src = "/path/to/default/image.jpg"; // Set path to fallback image
  };

  const handleButtonClick = () => {
    navigate('/newcategory');
  };

  const handleDelete = async (categoryId) => {
    try {
      // Ensure 'categoryId' is sent correctly in the request
      await axios.delete(`${domain}/delete/categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('authToken')}`
        },
        withCredentials: true,
      });
  
      // Remove the deleted category from the state
      setCategoryList(prevList => prevList.filter(category => category._id !== categoryId));
      
      // Show success message
      setSnackbarMessage("Category Deleted Successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting category:', error.response?.data || error.message);
      setSnackbarMessage("Error deleting category");
      setSnackbarOpen(true);
    }
  };
  

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (authError) return <Typography>{authError}</Typography>; // Show auth error message
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ backgroundColor: '#f2f7fb', minHeight: '100vh', padding: '2rem' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box component="main" sx={{ backgroundColor: "white", p: 1, paddingLeft: 7, paddingBottom: 5 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 3 }}>
                <b>All Category</b>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Box sx={{ minWidth: 120, mr: 2 }}>
                  <Typography variant="body1">Showing</Typography>
                  <FormControl variant="outlined" fullWidth>
                    <Select value={entriesToShow} onChange={(e) => setEntriesToShow(e.target.value)}>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ flex: 1, mr: 2 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search here..."
                    fullWidth
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& fieldset": {
                          borderColor: "black",
                        },
                      },
                      marginBottom: { xs: "10px", sm: "0" },
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{
                      borderColor: "#1876d2",
                      color: "#1876d2",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "#1876d2",
                        color: "white",
                      },
                    }}
                    onClick={handleButtonClick}
                  >
                    Add new
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid>
          <Box component="main" sx={{ backgroundColor: "white", p: 5 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
              <b>Category List</b>
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {categoryList.length > 0 ? (
                    categoryList
                      .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .slice(0, entriesToShow)
                      .map((category, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell>
                          {category.images && category.images.length > 0 ? (
                            <img
                              src={category.images[0]}
                              alt={category.name}
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
                        </StyledTableCell>
                          <StyledTableCell>{category.name || "No Name"}</StyledTableCell>
                          <StyledTableCell>{category.description}</StyledTableCell>
                          <StyledTableCell>
                          <Box display="flex" alignItems="center">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                navigate("/updatecategory", { state: { category } })
                              }
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDelete(category._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                            </Box>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                  ) : (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        <Typography>No categories available</Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Container>
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
};

export default CategoryList;
