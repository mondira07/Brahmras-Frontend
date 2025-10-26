import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import CartPopup from "./CartPopup";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { domain } from "../Config";
import Cookies from "js-cookie";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../Context/AuthContext";

const TopBar = styled(Box)({
  backgroundColor: "#005C3D",
  color: "#fff",
  padding: "5px 0",
  textAlign: "center",
});

const BottomBar = styled(Box)({
  backgroundColor: "#ebe2d1",
  color: "#004529",
  padding: "12px 0",
});

const DropdownIcon = styled(ArrowDropDownIcon)({
  marginLeft: 8,
});

const FlagImage = styled("img")({
  width: "24px",
  height: "16px",
  marginRight: "8px",
});

const CurrencyButton = styled(IconButton)(({ theme }) => ({
  border: "1px solid green",
  borderRadius: "4px",
  padding: "4px 8px",
  backgroundColor: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100px",
  fontSize: "14px",
  [theme.breakpoints.down("sm")]: {
    width: "auto",
    padding: "4px",
    "& .currency-code": {
      display: "none",
    },
  },
}));

const DrawerHeader = (props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px",
    }}
  >
    {props.children}
  </Box>
);

const currencies = [
  { code: "INR", flag: "assets/indiaflag.png" },
  { code: "USD", flag: "assets/usdflag.png" },
];

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryAnchorEl, setCategoryAnchorEl] = React.useState(null);
  const [currencyAnchorEl, setCurrencyAnchorEl] = useState(null);
  const [blogAnchorEl, setBlogAnchorEl] = useState(null);
  const [connectAnchorEl, setConnectAnchorEl] = useState(null);
  const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [drawerOpencart, setDrawerOpencart] = useState(false);
  const [categories, setCategories] = useState([]);
  const { authState, logout } = useAuth();
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [drawerCategoryOpen, setDrawerCategoryOpen] = useState(false);

  // menuDrawerOpen

  const toggleMenuDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMenuDrawerOpen(open);
  };

  // CartDrawer

  const toggleCartDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartDrawerOpen(open);
  };

  useEffect(() => {
    axios
      .get(`${domain}/categories`)
      .then((response) => {
        setCategories(response.data);
        console.log("Fetched categories:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
        if (error.response) {
          console.error("Error details:", error.response.data);
        }
      });
  }, []);

  const handleAccountMenuOpen = (event) => {
    setAccountMenuAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchorEl(null);
  };

  const accountMenuOpen = Boolean(accountMenuAnchorEl);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleMenuOpen = (setter) => (event) => {
    setter(event.currentTarget);
  };
  const handleMenuClose = (setter) => () => {
    setter(null);
  };
  const handleMenuItemClick = (categoryId) => {
    console.log(`Navigating to subcategories for categoryId: ${categoryId}`);
    if (categoryId === "all") {
      navigate(`/subcategory`);
    } else {
      navigate(`/subcategory?categoryId=${categoryId}`);
    }
    setCategoryAnchorEl(null);
    setMenuDrawerOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleAccountMenuClose();
  };

  const renderMenuItems = (categories) => {
    return [
      <MenuItem
        key="all"
        onClick={(e) => {
          e.stopPropagation();
          handleMenuItemClick("all");
        }}
      >
        All Categories
      </MenuItem>,
      ...categories.map((category) => (
        <MenuItem
          key={category._id}
          onClick={(e) => {
            e.stopPropagation();
            handleMenuItemClick(category._id);
          }}
        >
          {category.name}
        </MenuItem>
      )),
    ];
  };

  const handleConnctClose = (setter) => () => {
    setter(null);
  };

  const handleConnectItemClick = (code) => {
    let path = "";
    switch (code) {
      case "Track Order":
        path = "/track-order";
        break;
      case "B2B Buyer":
        path = "/b2b"; // Define a route for B2B Buyer if needed
        break;
      case "Store Locator":
        path = "/storeLocator"; // Define a route for Store Locator if needed
        break;
      case "Contact Us":
        path = "/contact-us";
        break;
      default:
        path = "/"; // Default path or handle other cases
        break;
    }
    navigate(path);
    handleConnctClose(setConnectAnchorEl)();
  };

  const handleBlogClose = (setter) => () => {
    setter(null);
  };

  const renderBlogMenuItems = (items) => {
    return items.map((item, index) => (
      <MenuItem key={index} onClick={() => handleBlogItemClick(item.code)}>
        {item.code}
      </MenuItem>
    ));
  };

  const handleBlogItemClick = (code) => {
    let path = "";
    switch (code) {
      case "Brahmras Blog":
        path = "/brahmras-blog";
        break;
      case "Food & Health":
        path = "/food-and-health";
        break;
      case "Brahmras Social Responsibility":
        path = "/social-responsibility";
        break;
      default:
        path = "/";
        break;
    }
    navigate(path);
    handleBlogClose(setBlogAnchorEl)();
  };

  // login/logout

  // useEffect(() => {
  //   console.log("useEffect triggered");
  //   checkAuthStatus();
  // }, []);

  // const [authState, setAuthState] = useState({
  //   isLoggedIn: false,
  //   userRole: null,
  //   loading: true,
  // });

  // const checkAuthStatus = async () => {
  //   try {
  //     console.log("Checking auth status...");
  //     const token = localStorage.getItem("authToken");
  //     console.log("Token from localStorage:", token);
  //     if (!token) {
  //       console.log("No token found");
  //       setAuthState({ isLoggedIn: false, userRole: null, loading: false });
  //       return;
  //     }

  //     const response = await axios.get(`${domain}/user`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     console.log("Response from server:", response);

  //     setAuthState({
  //       isLoggedIn: true,
  //       userRole: response.data.accountType,
  //       loading: false,
  //     });
  //     console.log("authstate", authState)
  //     console.log("Auth state updated to logged in");
  //   } catch (error) {
  //     console.error("Error checking auth status:", error);
  //     setAuthState({ isLoggedIn: false, userRole: null, loading: false });
  //     localStorage.removeItem("authToken");
  //     console.log("Auth state updated to logged out");
  //   }
  // };

  // const connectItemClick = (items, closeHandler) => {
  //   return items.map((item, index) => (
  //     <MenuItem key={index} onClick={() => handleConnectItemClick(item.code)}>
  //       {item.code}
  //     </MenuItem>
  //   ));
  // };
  const renderConnectItems = (items, closeHandler) => {
    return items.map((item, index) => (
      <MenuItem key={index} onClick={() => handleConnectItemClick(item.code)}>
        {item.code}
      </MenuItem>
    ));
  };

  const RotatingIconButton = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      transform: "rotate(120deg)",
      transition: "transform 0.5s ease-in-out",
    },
  }));

  const drawerList = (
    <Box
      sx={{
        width: 280,
        backgroundColor: "#f4f0e3",
        height: "150vh",
        color: " #175C3B",
      }}
      role="presentation"
      onKeyDown={toggleMenuDrawer(false)}
    >
      <DrawerHeader>
        <Typography sx={{ fontWeight: "bold" }}>Menu</Typography>
        <RotatingIconButton
          onClick={(e) => {
            e.stopPropagation();
            setMenuDrawerOpen(false);
            setDrawerCategoryOpen(false);
          }}
        >
          <CloseIcon />
        </RotatingIconButton>
      </DrawerHeader>
      <List>
        <ListItem
          button
          onClick={() => setDrawerCategoryOpen(!drawerCategoryOpen)}
        >
          <ListItemText
            primary="Shop By Category"
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
          />
          <DropdownIcon />
        </ListItem>
        {drawerCategoryOpen && (
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleMenuItemClick("all")}
            >
              <ListItemText primary="All Categories" />
            </ListItem>
            {categories.map((category) => (
              <ListItem
                button
                sx={{ pl: 4 }}
                key={category._id}
                onClick={() => handleMenuItemClick(category._id)}
              >
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        )}

        <ListItem button>
          <Link
            to="/review"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText
              primary="Reviews"
              primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            />
          </Link>
        </ListItem>
        <ListItem button>
          <ListItemText
            primary="Rewards"
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
          />
        </ListItem>
        <ListItem button>
          <Link
            to="/lab-reports"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText
              primary="Lab Reports"
              primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            />
          </Link>
        </ListItem>
        <ListItem button>
          <Link
            to="/about-us"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText
              primary="About Us"
              primaryTypographyProps={{ style: { fontWeight: "bold" } }}
            />
          </Link>
        </ListItem>
        <ListItem button onClick={() => setBlogOpen(!blogOpen)}>
          <ListItemText
            primary="Blogs"
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
          />
          <DropdownIcon />
        </ListItem>
        {blogOpen && (
          <Box sx={{ pl: 4 }}>
            <ListItem button>
              <ListItemText primary="Brahmras Blog" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Food & Health" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Brahmras Social Responsibility" />
            </ListItem>
          </Box>
        )}
        <ListItem button onClick={() => setConnectOpen(!connectOpen)}>
          <ListItemText
            primary="Connect"
            primaryTypographyProps={{ style: { fontWeight: "bold" } }}
          />
          <DropdownIcon />
        </ListItem>
        {connectOpen && (
          <Box sx={{ pl: 4 }}>
            <ListItem button>
              <Link
                to="/track-order"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="Track Order" />
              </Link>
            </ListItem>
            <ListItem button>
              <Link
                to="/b2b"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="B2B Buyer" />
              </Link>
            </ListItem>
            <ListItem button>
              <ListItemText primary="Store Locator" />
            </ListItem>
            <ListItem button>
              <Link
                to="/contact-us"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary="Contact Us" />
              </Link>
            </ListItem>
          </Box>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" elevation={0}>
      <TopBar>
        <Typography variant="body1">
          Get 5% Discount First Order Use Code: WELCOME5
        </Typography>
      </TopBar>
      <BottomBar>
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item>
              <Box display="flex" alignItems="center">
                {!isLargeScreen && (
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={toggleMenuDrawer(true)}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                )}
                {isLargeScreen && (
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Box
                      component="img"
                      src="assets/logo.png"
                      alt="logo"
                      style={{
                        width: "200px",
                        height: "70px",
                        marginRight: "5px",
                      }}
                    />
                  </Link>
                )}
                {(isMediumScreen || isSmallScreen) && (
                  <CurrencyButton
                    color="inherit"
                    onClick={handleMenuOpen(setCurrencyAnchorEl)}
                  >
                    <FlagImage src="assets/indiaflag.png" alt="INR" />
                    <span className="currency-code">INR</span> <DropdownIcon />
                  </CurrencyButton>
                )}
              </Box>
            </Grid>
            {isLargeScreen && (
              <Grid item>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography
                    variant="body1"
                    style={{
                      marginRight: "20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={handleMenuOpen(setCategoryAnchorEl)}
                  >
                    Shop By Category <DropdownIcon />
                  </Typography>
                  <Menu
                    anchorEl={categoryAnchorEl}
                    open={Boolean(categoryAnchorEl)}
                    onClose={handleMenuClose(setCategoryAnchorEl)}
                  >
                    {renderMenuItems(categories)}
                  </Menu>

                  <Link
                    to="/review"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="body1"
                      style={{ marginRight: "20px", fontWeight: "bold" }}
                    >
                      Reviews
                    </Typography>
                  </Link>
                  <Typography
                    variant="body1"
                    style={{ marginRight: "20px", fontWeight: "bold" }}
                  >
                    Rewards
                  </Typography>
                  <Link
                    to="/lab-reports"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="body1"
                      style={{ marginRight: "20px", fontWeight: "bold" }}
                    >
                      Lab Reports
                    </Typography>
                  </Link>
                  <Link
                    to="/about-us"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Typography
                      variant="body1"
                      style={{ marginRight: "20px", fontWeight: "bold" }}
                    >
                      About Us
                    </Typography>
                  </Link>
                  <Typography
                    variant="body1"
                    style={{
                      marginRight: "20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={handleMenuOpen(setBlogAnchorEl)}
                  >
                    Blogs <DropdownIcon />
                  </Typography>
                  <Menu
                    anchorEl={blogAnchorEl}
                    open={Boolean(blogAnchorEl)}
                    onClose={handleMenuClose(setBlogAnchorEl)}
                  >
                    {renderBlogMenuItems([
                      { code: "Brahmras Blog" },
                      { code: "Food & Health" },
                      { code: "Brahmras Social Responsibility" },
                    ])}
                  </Menu>
                  <Typography
                    variant="body1"
                    style={{
                      marginRight: "20px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={handleMenuOpen(setConnectAnchorEl)}
                  >
                    Connect <DropdownIcon />
                  </Typography>
                  <Menu
                    anchorEl={connectAnchorEl}
                    open={Boolean(connectAnchorEl)}
                    onClose={handleConnctClose(setConnectAnchorEl)}
                  >
                    {renderConnectItems(
                      [
                        { code: "Track Order" },
                        { code: "B2B Buyer" },
                        { code: "Store Locator" },
                        { code: "Contact Us" },
                      ],
                      handleConnctClose(setConnectAnchorEl)
                    )}
                  </Menu>
                </Box>
              </Grid>
            )}
            {(isMediumScreen || isSmallScreen) && (
              <Grid item>
                <Link to="/">
                  <Box
                    component="img"
                    src="assets/logo.png"
                    alt="logo"
                    style={{
                      width: "200px",
                      height: "70px",
                      marginRight: "5px",
                    }}
                  />
                </Link>{" "}
              </Grid>
            )}
            <Grid item>
              <Box display="flex" alignItems="center">
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <div>
                  <IconButton
                    color="inherit"
                    sx={{ ml: 2 }}
                    aria-label="CartPopup"
                    onClick={toggleCartDrawer(true)}
                  >
                    <ShoppingCartOutlinedIcon />
                  </IconButton>

                  <CartPopup
                    open={cartDrawerOpen}
                    onClose={toggleCartDrawer(false)}
                  />
                </div>

                {/* auth and login logout */}

                <CartPopup
                  open={cartDrawerOpen}
                  onClose={toggleCartDrawer(false)}
                />
                <IconButton color="inherit" onClick={handleAccountMenuOpen}>
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <Menu
                  anchorEl={accountMenuAnchorEl}
                  open={Boolean(accountMenuAnchorEl)}
                  onClose={handleAccountMenuClose}
                >
                  {authState.loading ? (
                    <CircularProgress size={24} />
                  ) : authState.isLoggedIn ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/account"
                        onClick={handleAccountMenuClose}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                      {authState.userRole === "Admin" && (
                        <MenuItem
                          component={Link}
                          to="/dashboard"
                          onClick={handleAccountMenuClose}
                        >
                          Admin
                        </MenuItem>
                      )}
                    </>
                  ) : (
                    <>
                      <MenuItem
                        component={Link}
                        to="/login"
                        onClick={handleAccountMenuClose}
                      >
                        Log In
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/register"
                        onClick={handleAccountMenuClose}
                      >
                        Register
                      </MenuItem>
                    </>
                  )}
                </Menu>
                {isLargeScreen && (
                  <CurrencyButton
                    color="inherit"
                    onClick={handleMenuOpen(setCurrencyAnchorEl)}
                  >
                    <FlagImage src="assets/indiaflag.png" alt="INR" />
                    <span className="currency-code">INR</span> <DropdownIcon />
                  </CurrencyButton>
                )}
                <Menu
                  anchorEl={currencyAnchorEl}
                  open={Boolean(currencyAnchorEl)}
                  onClose={handleMenuClose(setCurrencyAnchorEl)}
                >
                  {renderMenuItems(
                    currencies,
                    handleMenuClose(setCurrencyAnchorEl)
                  )}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </BottomBar>
      <Drawer
        anchor="left"
        open={menuDrawerOpen}
        onClose={() => setMenuDrawerOpen(false)}
      >
        {drawerList}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
