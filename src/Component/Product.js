import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { domain } from "../Config";

// const Features = [
//   {
//     id: 1,
//     src: "assets/all.png",
//     alt: "All Products",
//     filter: "all",
//   },
//   {
//     id: 2,
//     src: "assets/gheeIcon.png",
//     alt: "A2 Cow Ghee",
//     filter: "ghee",
//   },
//   {
//     id: 3,
//     src: "assets/dryIcon.png",
//     alt: "Dry Fruits Fun",
//     filter: "dryfruit",
//   },
//   {
//     id: 4,
//     src: "assets/kajuIcon.png",
//     alt: "Kaju Katli",
//     filter: "kaju",
//   },
// ];

const Product = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams(location.search);
      const subcategoryId = queryParams.get("subcategoryId");
      const filter = subcategoryId || "all";

      setSelectedFilter(filter);

      try {
        const url = filter === "all"
          ? `${domain}/products`
          : `${domain}/${filter}/products`; // Updated route for subcategory filter

        const response = await axios.get(url);
        setProducts(response.data || []); // Assuming your response is an array of products
      } catch (error) {
        console.error('Error fetching data:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [location.search]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    navigate(`/product?subcategoryId=${filter}`);
  };

  const handleAddToCartClick = async (productId) => {
    try {
      await axios.post(`${domain}/add-to-cart`, { id: productId });
      navigate(`/add-to-cart`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleBuyNowClick = (productId) => {
    navigate(`/checkout?productId=${productId}`);
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "50px",
        marginBottom: "50px",
        padding: "20px",
      }}
    >
      {/* Features */}
      {/* <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5, paddingLeft: 3, paddingRight: 3 }}
      >
        {Features.map((feature) => (
          <Grid item key={feature.id} xs={6} sm={4} md={2} lg={1.5}>
            <Box
              sx={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => handleFilterClick(feature.filter)}
            >
              <img
                src={feature.src}
                alt={feature.alt}
                style={{ width: "100px", height: "100px" }}
              />
              <Typography
                variant="h6"
                sx={{ marginTop: 1, color: "#175C3B", fontWeight: "bold" }}
              >
                {feature.alt}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid> */}

      {/* Products */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 15, paddingLeft: 3, paddingRight: 3 }}
      >
        {products.length > 0 ? (
          products.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
              <Paper
                elevation={3}
                sx={{
                  padding: 2,
                  margin: 2,
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow: 6,
                  },
                }}
              >
                <RouterLink
                  to={`/product-details?id=${item._id}`}
                  style={{
                    display: "block",
                    textDecoration: "none",
                    position: "relative",
                  }}
                >
                  <img
                    src={item.images[0] || 'default-image-url'}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: 2,
                      boxShadow: 2,
                    }}
                  />
                </RouterLink>
                <Typography
                  variant="h6"
                  sx={{
                    marginTop: 2,
                    color: "#175C3B",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#888", textAlign: "left" }}
                >
                  {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "line-through", color: "#888", textAlign: "left" }}
                >
                  ₹{item.price}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#175C3B", fontWeight: "bold", textAlign: "left" }}
                >
                  ₹{item.priceAfterDiscount}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    marginRight: 1,
                    backgroundColor: "#175C3B",
                    color: "#fff",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#144A30",
                    },
                  }}
                  onClick={() => handleAddToCartClick(item._id)}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#A4BE36",
                    color: "#fff",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#8c8c3b",
                    },
                  }}
                  onClick={() => handleBuyNowClick(item._id)}
                >
                  Buy Now
                </Button>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" sx={{ marginTop: 5 }}>
            No products found for this filter.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Product;