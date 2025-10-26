import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Breadcrumbs,
  Link,
  Chip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { domain } from "../Config"; // Adjust this path as needed

// Default user object
const defaultUser = {
  name: "Not Available",
  email: "Not Available",
  address: "Not Available",
  phone: "Not Available",
  accountType: "user",
};

const Account = () => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${domain}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        setError("Error fetching user data");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login page
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, p: 7, mt: 20 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ mb: 2, justifyContent: "center", display: "flex" }}
      >
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <AccountCircleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Account
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "#005C3D", fontWeight: "bold", textAlign: "center" }}
      >
        My Account
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom textAlign="center">
              Account Details
            </Typography>
            <List>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemText
                  primary="Name"
                  secondary={
                    <Typography variant="body1" align="center">
                      {user.firstName} {user.lastName}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemText
                  primary="E-mail"
                  secondary={
                    <Typography variant="body1" align="center">
                      {user.email}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemText
                  primary="Address"
                  secondary={
                    <Typography variant="body1" align="center">
                      {user.address}
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ justifyContent: "center" }}>
                <ListItemText
                  primary="Phone"
                  secondary={
                    <Typography variant="body1" align="center">
                      {user.phoneNumber}
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Chip
                label={user.accountType === "Admin" ? "Admin" : "User"}
                color={user.accountType === "Admin" ? "secondary" : "primary"}
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Account;
