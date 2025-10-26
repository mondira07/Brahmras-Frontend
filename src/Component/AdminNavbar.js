import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  styled,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  Box,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  DarkMode as DarkModeIcon,
  Notifications as NotificationsIcon,
  Chat as ChatIcon,
  Apps as AppsIcon,
  Dashboard,
  ShoppingCart,
  Category,
  Description,
  ShoppingBasket,
  Person,
  Group,
  PhotoLibrary,
  BarChart,
  LocationOn,
  Settings,
  Pages,
  ViewModule,
  HelpCenter,
  QuestionAnswer,
  PrivacyTip,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { Link } from "react-router-dom";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const AdminNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState({
    main: true,
    ecommerce: false,
    category: false,
    subcategory: false,
    setting: false,
    components: false,
    support: false,
  });

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleClick = (section) => {
    setOpen({ ...open, [section]: !open[section] });
  };

  const ListItemStyle = ({ icon, primary, onClick, open, children }) => (
    <>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {open != null && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {children}
          </List>
        </Collapse>
      )}
    </>
  );

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search here..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <div style={{ flexGrow: 1 }} />
          
          <IconButton color="inherit">
            <DarkModeIcon />
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <ChatIcon />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit">
            <AppsIcon />
          </IconButton>
          
          <Avatar alt="Kristin Watson" src="/path-to-avatar-image.jpg" />
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            Brahmras
          </Typography>
        </Box>
        <List>
          <Typography variant="caption" sx={{ pl: 2, color: 'text.secondary' }}>
            MAIN MENU
          </Typography>
          <Link
                    to="/dashboard"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
          <ListItemStyle
            icon={<Dashboard />}
            primary="Dashboard"
            onClick={() => handleClick('main')}
          
          >
          </ListItemStyle></Link>
          <ListItemStyle
            icon={<ShoppingCart />}
            primary="Ecommerce"
            onClick={() => handleClick('ecommerce')}
            open={open.ecommerce}
          />
          <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/addproduct"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="Add Product" /></Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/productlist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="Product List " /></Link>
            </ListItemButton>
          <ListItemStyle
            icon={<Category />}
            primary="Category"
            onClick={() => handleClick('category')}
            open={open.category}
          >
            <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/categorylist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="Category List" /></Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/newcategory"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="New Category" /></Link>
            </ListItemButton>
          </ListItemStyle>
          <ListItemStyle
            icon={<Category />}
            primary="Sub-Category"
            onClick={() => handleClick('subcategory')}
            open={open.subcategory}
          >
            <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/subcategorylist"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="Sub-Category List" /></Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
            <Link
                    to="/newsubcategory"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
              <ListItemText primary="New Sub-Category" /></Link>
            </ListItemButton>
          </ListItemStyle>
        </List>
      </Drawer>
    </>
  );
};

export default AdminNavbar;