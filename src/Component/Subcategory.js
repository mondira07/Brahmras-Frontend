import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Link, Button, Card, CardMedia, CardContent } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { domain } from "../Config";

const Subcategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${domain}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterClick = async (categoryId) => {
    setSelectedFilter(categoryId);
    try {
      if (categoryId === "all") {
        const response = await axios.get(`${domain}/subcategories`);
        setSubcategories(response.data);
      } else {
        const response = await axios.get(`${domain}/categories/${categoryId}`);
        setSubcategories(response.data.category.subCategories || []);
      }
    } catch (error) {
      console.error('Error fetching subcategory data:', error);
      setSubcategories([]);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get("categoryId");
    handleFilterClick(categoryId || "all");
  }, [location.search]);

  const handleSubcategoryClick = (subcategoryId) => {
    navigate(`/product?subcategoryId=${subcategoryId}`);
  };

  const handleShowAllProducts = () => {
    navigate('/product'); // Navigate to the product page without subcategoryId
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "160px",
        marginBottom: "50px",
      }}
    >
      {/* Dynamic Features */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5, paddingLeft: 3, paddingRight: 3 }}
      >
        <Grid item xs={6} sm={3} md={2} lg={1.5}>
          <Box
            sx={{ textAlign: "center", cursor: "pointer" }}
            onClick={() => handleFilterClick("all")}
          >
            <img
              src="assets/all.png"
              alt="All Products"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%", // Circular shape
                objectFit: "cover" // Ensure the image covers the box
              }}
            />
            <Typography
              variant="h6"
              sx={{ marginTop: 1, color: "#175C3B", fontWeight: "bold" }}
            >
              All Products
            </Typography>
          </Box>
        </Grid>
        {categories.map((category) => (
          <Grid item key={category._id} xs={6} sm={3} md={2} lg={1.5}>
            <Box
              sx={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => handleFilterClick(category._id)}
            >
              <img
                src={category.images || "default-category-image.png"}
                alt={category.name}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%", // Circular shape
                  objectFit: "cover" // Ensure the image covers the box
                }}
              />
              <Typography
                variant="h6"
                sx={{ marginTop: 1, color: "#175C3B", fontWeight: "bold" }}
              >
                {category.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {subcategories.length > 0 ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ marginTop: 5 }}
        >
          {subcategories.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  margin: 2, // Add margin around each card
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 3
                  }
                }}
              >
                <Link
                  component={RouterLink}
                  to={`/product?subcategoryId=${item._id}`}
                  sx={{ textDecoration: 'none' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: { xs: "200px", lg: "250px" },
                      objectFit: "cover",
                      padding: 1, // Add padding around the image
                    }}
                    image={item.images && item.images.length > 0 ? item.images[0] : 'default-image-url'}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h4"
                      sx={{
                        color: "#175C3B",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#888",
                        textAlign: "left",
                      }}
                    >
                      {item.description}
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" component="h4" sx={{ marginTop: 5 }}>
          No subcategories found.
        </Typography>
      )}
      <Button
        variant="contained"
        sx={{
          marginTop: 2,
          backgroundColor: "#175C3B",
          color: "#fff",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "#144A30",
          },
        }}
        onClick={handleShowAllProducts}
      >
        Show All Products
      </Button>
    </Box>
  );
};

export default Subcategories;