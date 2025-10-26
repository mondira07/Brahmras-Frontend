import React, { useState } from 'react';
import {
  Drawer,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';


const CartPopup = ({ open, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleCheckOut = () => {
    navigate('/checkout');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { bgcolor: '#fdf7ec' } }}>
      <Box sx={{ width: 370, p: 2, bgcolor: '#fdf7ec' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#175c3b' }}>My shopping cart</Typography>
          
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        
        </Box>
        <Divider sx={{ my: 2, bgcolor: "black" }} />
        <Box sx={{ bgcolor: '#f7f0e0', p: 1, my: 2, borderRadius: 1 }}>
          <Typography variant="body2" color="success.main">
            You are eligible for FREE SHIPPING!
          </Typography>
        </Box>

        <List>
          <ListItem>
            <Box
              component="img"
              sx={{ height: 64, width: 64, mr: 2 }}
              src="assets/ghee1L.jpg" // Replace with actual image URL
              alt="A2 Desi Cow Ghee 1 L"
            />
            <ListItemText
              primary="A2 Desi Cow Ghee 1 L"
              secondary="₹ 1,800.00"
            />
            <ListItemSecondaryAction sx={{ display: 'flex', alignItems: 'center', mt:5 }}>
              <IconButton size="small" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography component="span" sx={{ mx: 1 }}>
                {quantity}
              </Typography>
              <IconButton size="small" onClick={() => setQuantity(q => q + 1)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography>Subtotal</Typography>
          <Typography>₹ {1800 * quantity}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button 
      variant="contained" 
      color="success" 
      sx={{ flexGrow: 1, mx: 0.5 }} 
      onClick={handleViewCart}
    >
      VIEW CART
    </Button>
    <Button 
      variant="contained" 
      color="success" 
      sx={{ flexGrow: 1, mx: 0.5 }} 
      onClick={handleCheckOut}
    >
     check out
    </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartPopup;
