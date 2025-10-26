import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";

const CartPage = () => {
  const navigate = useNavigate();

  const handleContinueShoppingClick = () => {
    navigate('/product');
  };
  const handleCheckoutClick = () => {
    navigate('/product');
  };
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'A2 Desi Cow Ghee 1 L',
      size: '1L',
      price: 1800.00,
      quantity: 5,
      image: "assets/cowGhee.jpg",
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: '1px solid #e0e0e0',
    color: '#175c3b',
    fontWeight: "bold",
    padding: '16px 8px',
  }));
  
  const StyledTableRow = styled(TableRow)({
    '&:last-child td, &:last-child th': {
      borderBottom: 'none',
    },
  });

  const GreenButton = styled(Button)({
    backgroundColor: '#005c3d',
    color: 'white',
    '&:hover': {
      backgroundColor: '#004c32',
    },
    textTransform: 'uppercase',
    padding: '10px 20px',
  });

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: 'auto', padding: 2, marginTop: "180px" }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#175C3B", fontWeight: "bold", textAlign: "center", mb: 4 }}>
        Cart
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>PRODUCT</StyledTableCell>
              <StyledTableCell align="right">PRICE</StyledTableCell>
              <StyledTableCell align="center">QUANTITY</StyledTableCell>
              <StyledTableCell align="right">TOTAL</StyledTableCell>
              <StyledTableCell align="right">REMOVE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(item => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>
                  <Box display="flex" alignItems="center">
                    <img src={item.image} alt={item.name} style={{ width: 80, marginRight: 20 }} />
                    <Box>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body2">Size: {item.size}</Typography>
                    </Box>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">₹ {item.price.toFixed(2)}</StyledTableCell>
                <StyledTableCell align="center">{item.quantity}</StyledTableCell>
                <StyledTableCell align="right">₹ {(item.price * item.quantity).toFixed(2)}</StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => removeItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e0e0e0', pt: 2 }}>
        <Typography variant="h6">SUBTOTAL</Typography>
        <Typography variant="h6">₹ {calculateSubtotal().toFixed(2)}</Typography>
      </Box>
      <Typography variant="body2" sx={{ mt: 1, textAlign: 'right', color: 'blue' }}>
        Tax included. Shipping calculated at checkout.
      </Typography>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
      <Button
          variant="contained"
          onClick={handleContinueShoppingClick}
          sx={{
            backgroundColor: "#175C3B",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#175C3B",
            },
          }}
        >
          CONTINUE SHOPPING
        </Button>
        <GreenButton variant="contained" onClick={() => setCartItems([])}>
          CLEAR ALL
        </GreenButton>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#175C3B' }}>
            Get shipping estimates
          </Typography>
          <Select fullWidth defaultValue="US" sx={{ mb: 2 }}>
            <MenuItem value="US">United States</MenuItem>
          </Select>
          <Select fullWidth defaultValue="AL" sx={{ mb: 2 }}>
            <MenuItem value="AL">Alabama</MenuItem>
          </Select>
          <TextField fullWidth label="Zip/Postal Code" sx={{ mb: 2 }} />
          <GreenButton variant="contained">
            CALCULATE SHIPPING
          </GreenButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ color: '#175C3B' }}>
            Add special instructions for your order
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter text here..."
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
      <Button
          variant="contained"
          onClick={handleCheckoutClick}
          sx={{
            backgroundColor: "#175C3B",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: "#175C3B",
            },
          }}
        >
          check out
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;