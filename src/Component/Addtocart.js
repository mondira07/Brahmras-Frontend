import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';


const Addtocart = ({ open, onClose, item, totalItems, totalAmount }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  const handleViewCartClick = () => {
    navigate('/cart');
  };

  const handleContinueShoppingClick = () => {
    navigate('/product');
  };

  useEffect(() => {
    if (!open) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (timeLeft === 0) {
      onClose();
    }
  }, [timeLeft, onClose]);

  // Check if item exists before rendering its details
  const renderItemDetails = () => {
    if (!item) return null;

    return (
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" sx={{backgroundColor: "#f7f0e0"}}>
          <img src={item.image} alt={item.name} width="80" height="80" style={{ marginRight: 16 }} />
          <Box>
            <Typography variant="body1">{item.name}</Typography>
            <Typography variant="body2">Size: {item.size}</Typography>
            <Typography variant="body2">Qty: {item.quantity}</Typography>
          </Box>
        </Box>
        <Typography variant="body1">₹ {item.price.toFixed(2)}</Typography>
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#175C3B', color: '#fff' }}>
        ADDED TO YOUR CART
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#fff',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: '#F3F3E1', padding: 4 }}>
        {renderItemDetails()}
        <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1">
            THERE {totalItems === 1 ? 'IS' : 'ARE'} {totalItems} ITEM{totalItems !== 1 ? 'S' : ''} IN YOUR CART.
          </Typography>
          <Typography variant="h6">₹ {totalAmount.toFixed(2)}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: '#F3F3E1', padding: 4, justifyContent: 'center' }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#175C3B',
          marginRight: 2,
          width: '200px',
        }}
        onClick={() => {
          onClose();
          handleViewCartClick();
        }}
      >
        View cart
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#175C3B',
          width: '200px',
        }}
        onClick={() => {
          onClose();
          handleContinueShoppingClick();
        }}
      >
        Continue shopping
      </Button>
      </DialogActions>
      <Typography variant="caption" align="center" sx={{ pb: 1 }}>
        This popup will auto close after {timeLeft} seconds
      </Typography>
    </Dialog>
  );
};

export default Addtocart;
