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
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { domain } from "../Config";
import Cookies from 'js-cookie';

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

const SubCategoryList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories
    axios
    .get(`${domain}/categories`)
    .then((response) => {
      const categories = response.data;
      const categoriesMap = categories.reduce((acc, category) => {
        acc[category._id] = category.name;
        return acc;
      }, {});
      setCategoriesMap(categoriesMap);
      console.log("Fetched categories:", categories);
      console.log("Categories map:", categoriesMap);
    })
    .catch((error) => {
      console.error(
        "Error fetching categories:",
        error.response ? error.response.data : error.message
      );
    });

    // Fetch subcategories
    axios
      .get(`${domain}/subcategories`)
      .then((response) => {
        setCategoryList(response.data);
        console.log("Fetched subcategories:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error.response ? error.response.data : error.message);
      });
  }, []);

  const handleButtonClick = () => {
    navigate('/newsubcategory');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sub-category?")) {
      const token = localStorage.getItem('authToken');
  
      // Ensure token is present before making the request
      if (!token) {
        console.error("No authentication token found.");
        return;
      }
  
      axios
        .delete(`${domain}/delete/subcategories`, {
          data: { id },
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        })
        .then((response) => {
          setSnackbarMessage("Sub-Category Deleted Successfully");
          setOpenSnackbar(true);
          // Remove deleted category from the list
          setCategoryList(categoryList.filter((category) => category._id !== id));
        })
        .catch((error) => {
          console.error("Error deleting subcategory:", error.response ? error.response.data : error.message);
        });
    }
  };

  const filteredCategories = categoryList.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box
      sx={{ backgroundColor: "#f2f7fb", minHeight: "100vh", padding: "2rem" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              component="main"
              sx={{
                backgroundColor: "white",
                p: 1,
                paddingLeft: 7,
                paddingBottom: 5,
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ mb: 2, mt: 3 }}>
                <b>All Sub-Category</b>
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box sx={{ minWidth: 120, mr: 2 }}>
                  <Typography variant="body1">Showing</Typography>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      value={entriesToShow}
                      onChange={(e) => setEntriesToShow(e.target.value)}
                    >
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
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", pr: 2 }}
                >
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
              <b>Sub-Category List</b>
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Category Name</StyledTableCell>
                    <StyledTableCell>Description</StyledTableCell>
                    <StyledTableCell>Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {filteredCategories.map((category, index) => {
                    console.log(category);

                    // Ensure category is defined and has required properties
                    if (!category || !category.category) {
                      console.error("Invalid category data:", category);
                      return null;
                    }
                    
                    return (
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
                        <StyledTableCell>
                          {categoriesMap[category.category._id] || "Unknown"}
                        </StyledTableCell>
                        <StyledTableCell>{category.description || "No Description"}</StyledTableCell>
                        <StyledTableCell>
                          <Box display="flex" alignItems="center">
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() =>
                                navigate("/Updatesubcategory", {
                                  state: { category },
                                })
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
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SubCategoryList;
