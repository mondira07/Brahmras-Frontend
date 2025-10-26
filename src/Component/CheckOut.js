import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import axios from "axios";
import { domain } from "../Config";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("West Bengal");
  const [homeNumber, setHomeNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressId, setAddressId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [userAddress, setUserAddress] = useState(null);
  const [product, setProduct] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const idFromQuery = queryParams.get("productId");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    if (idFromQuery) {
      setProductId(idFromQuery);
      fetchProductDetails(idFromQuery, token);
    } else {
      setError("No product ID provided in the URL");
    }

    fetchUserAddress(token);
  }, [idFromQuery, navigate]);

  const fetchProductDetails = useCallback(async (id, token) => {
    setLoadingProduct(true);
    try {
      const response = await axios.get(`${domain}/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data);
      setLoadingProduct(false);
    } catch (error) {
      setLoadingProduct(false);
      setError("Error fetching product details. Please try again later.");
      console.error(
        "Error fetching product details:",
        error.response?.data || error.message
      );
    }
  }, []);

  const fetchUserAddress = useCallback(async (token) => {
    setLoadingAddress(true);
    try {
      const response = await axios.get(`${domain}/user`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      const addresses = response.data.addresses;
      if (addresses && addresses.length > 0) {
        const primaryAddress = addresses[0];
        setUserAddress(primaryAddress);
        setAddressId(primaryAddress._id);
        setCity(primaryAddress.city);
        setState(primaryAddress.state);
        setHomeNumber(primaryAddress.homeNumber);
        setPinCode(primaryAddress.pincode);
        setLandmark(primaryAddress.landmark);
      }
      setLoadingAddress(false);
    } catch (error) {
      setLoadingAddress(false);
      setError("Error fetching user address. Please try again later.");
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
  }, []);

  const handleSubmitAddress = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("authToken");

    if (!city || !state || !homeNumber || !pinCode) {
      alert("Please fill out all required fields.");
      return;
    }

    const addressData = {
      city,
      state,
      homeNumber,
      pincode: pinCode,
      landmark,
    };

    try {
      let response;
      if (addressId) {
        response = await axios.put(
          `${domain}/update-address`,
          {
            addressId,
            ...addressData,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
      } else {
        response = await axios.post(`${domain}/add-address`, addressData, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setAddressId(response.data._id);
      }

      setUserAddress(response.data);
      alert("Address saved successfully");
    } catch (error) {
      alert("Failed to save address. Please try again.");
      console.error(
        "Error submitting address:",
        error.response?.data || error.message
      );
    }
  };

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("authToken");
    if (!productId || !quantity) {
      alert("Product ID or quantity is missing.");
      return;
    }

    if (!addressId) {
      alert("Please provide a delivery address before placing the order.");
      return;
    }

    try {
      const orderResponse = await axios.post(
        `${domain}/place-order/${productId}`,
        {
          quantity,
          couponCode,
          paymentMethod,
          amount: (product.priceAfterDiscount || product.price) * quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      console.log("orderResponse", orderResponse.data.order._id);
      let newOrderId = orderResponse.data.order._id;
      alert("Order placed successfully!");
      navigate(`/orderconfirmation/${newOrderId}`);
    } catch (error) {
      alert("Failed to place order. Please try again.");
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box sx={{ backgroundColor: "#ebe2d1", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg" sx={{ px: 2 }}>
        <Grid container spacing={4} sx={{ minHeight: "calc(100vh - 120px)" }}>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
              <img
                src="assets/logo.png"
                alt="Brahmras"
                style={{ width: "30%", marginBottom: "16px", height: 70 }}
              />
              <ShoppingBagIcon sx={{ color: "#4a7c59", fontSize: 40 }} />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ borderColor: "#d3c7b1" }} />
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            </Grid>
          )}

          <Grid container spacing={4}>
            <Grid item xs={12} md={7}>
              <Paper elevation={2} sx={{ p: 3, backgroundColor: "white", mb: { xs: 4, md: 0 } }}>
                <Typography variant="h5" gutterBottom>
                  Address
                </Typography>
                {loadingAddress ? (
                  <CircularProgress />
                ) : userAddress ? (
                  <>
                    <Typography variant="body1" gutterBottom>
                      Using existing address: {userAddress.city},{" "}
                      {userAddress.state}, {userAddress.homeNumber},{" "}
                      {userAddress.pincode}, {userAddress.landmark}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => setUserAddress(null)}
                    >
                      Update Address
                    </Button>
                  </>
                ) : (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="City"
                          sx={{ backgroundColor: "white" }}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="State"
                          sx={{ backgroundColor: "white" }}
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="Home Number"
                          sx={{ backgroundColor: "white" }}
                          value={homeNumber}
                          onChange={(e) => setHomeNumber(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          placeholder="PIN Code"
                          sx={{ backgroundColor: "white" }}
                          value={pinCode}
                          onChange={(e) => setPinCode(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          placeholder="Landmark (optional)"
                          sx={{ backgroundColor: "white" }}
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                        />
                      </Grid>
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handleSubmitAddress}
                    >
                      Save Address
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper elevation={2} sx={{ p: 3, backgroundColor: "white" }}>
                {loadingProduct ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <CircularProgress />
                  </Box>
                ) : product ? (
                  <>
                    <Typography variant="h5" gutterBottom>
                      {product.name}
                    </Typography>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <Typography variant="h6" gutterBottom>
                      Price: ₹{product.priceAfterDiscount || product.price}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Quantity:
                      <TextField
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        sx={{ width: "60px", ml: 1 }}
                        InputProps={{ inputProps: { min: 1 } }}
                      />
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Total Price: ₹
                      {(product.priceAfterDiscount || product.price) * quantity}
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Coupon Code (optional)"
                      sx={{ backgroundColor: "white" }}
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <RadioGroup
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      >
                        <FormControlLabel
                          value="COD"
                          control={<Radio />}
                          label="Cash on Delivery"
                        />
                        <FormControlLabel
                          value="Online"
                          control={<Radio />}
                          label="Online Payment"
                        />
                      </RadioGroup>
                    </FormControl>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </Button>
                  </>
                ) : (
                  <Typography variant="body1" color="error">
                    Product not found.
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CheckoutPage;