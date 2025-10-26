import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Link, 
  Button,
  Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import axios from 'axios';
import { useParams } from 'react-router-dom';  // Import useParams hook
import { domain } from '../Config';  // Import domain from Config

const defaultOrderDetails = {
  orderNumber: 'N/A',
  name: 'Customer',
  email: 'example@example.com',
  address: {
    street: 'N/A',
    town: 'N/A',
    county: 'N/A',
    postcode: 'N/A'
  },
  paymentMethod: 'N/A',
  productPrice: 0,
  subtotal: 0,
  shipping: 'N/A',
  total: 0
};

const OrderConfirmation = () => {
  const { orderId } = useParams();  // Retrieve orderId from URL parameters
  const [orderDetails, setOrderDetails] = useState(defaultOrderDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      console.error('No orderId provided');
      setError('No orderId provided');
      setLoading(false);
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${domain}/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
    
        setOrderDetails(response.data.order);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order details:', error);
        setError(error.response?.data?.message || 'Error fetching order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <Typography variant="body2">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body2">{error}</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 20, mb: 10 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <CheckCircleOutlineIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">
                Order #{orderDetails.orderId}
              </Typography>
            </Box>
            <Typography variant="h5" gutterBottom>
              Thank you 
            </Typography>
            
            <Box my={3}>
              <Typography variant="h6" gutterBottom>
                Want some additional tips?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Join our Facebook group to get additional tips and resources from our community:
              </Typography>
              <Link href="#" color="primary">
                Join the Group
              </Link>
            </Box>
            
            <Typography variant="subtitle1" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2"></Typography>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Address
            </Typography>
            <Typography variant="body2">
              <br />
              <br />
              <br />
              
            </Typography>
            
            <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
              Payment
            </Typography>
            <Typography variant="body2">{orderDetails.payments.paymentMethod}</Typography>
            
            <Box mt={3}>
              <Typography variant="body2" color="text.secondary">
                Need Help? <Link href="#" color="primary">Contact Us</Link>
              </Typography>
            </Box>
            
            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box display="flex" alignItems="center" mb={2}>
              <ShoppingBagIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Your Order</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Box display="flex" alignItems="center">
                <Box 
                  width={40} 
                  height={40} 
                  bgcolor="grey.300" 
                  mr={1} 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                >
                  <Typography variant="body2">x1</Typography>
                </Box>
                <Typography variant="body2">Product</Typography>
              </Box>
              <Typography variant="body2">£</Typography>
            </Box>
            
            <Divider />
            
            <Box display="flex" justifyContent="space-between" my={2}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">£</Typography>
            </Box>
            
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2"></Typography>
            </Box>
            
            <Divider />
            
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="subtitle1">Total</Typography>
              <Typography variant="subtitle1">
                <Box component="span" fontSize="0.8em" mr={0.5}>
                  GBP
                </Box>
                £
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

// PropTypes for type checking
OrderConfirmation.propTypes = {
  orderId: PropTypes.string
};

export default OrderConfirmation;
