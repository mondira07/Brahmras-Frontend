import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Collapse,
  Grid,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Addresses = ({ user = {} }) => {
  const [showAddressForm, setShowAddressForm] = useState(false);

  return (
    <Box sx={{ flexGrow: 1, p: 7, mt: 30, mb: 10 }}>
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
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/account"
        >
          <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          My Account
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <LocationOnIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Addresses
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", color: " #005C3D", fontWeight: "bold" }}
      >
        Addresses
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="subtitle1">
          Your name: {user.name || "N/A"}
        </Typography>
        <Typography variant="subtitle1">
          Company: {user.company || "N/A"}
        </Typography>
        <Typography variant="subtitle1">
          Your addresses: {user.address || "N/A"}
        </Typography>
        <Typography variant="subtitle1">
          Phone: {user.phone || "N/A"}
        </Typography>
      </Paper>

      <Button
        variant="contained"
        onClick={() => setShowAddressForm(!showAddressForm)}
        sx={{
          mb: 2,
          backgroundColor: "#005C3D",
          "&:hover": {
            backgroundColor: "#004d30",
          },
        }}
      >
        {showAddressForm ? "Hide Address Form" : "Add a new address"}
      </Button>

      <Collapse in={showAddressForm}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="First name" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Last name" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Company" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address 1" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address 2" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="City" variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select fullWidth defaultValue="India" variant="outlined">
                  <MenuItem value="India">India</MenuItem>
                  {/* Add more countries as needed */}
                </Select>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Select
                  fullWidth
                  defaultValue="Andaman and Nicobar Islands"
                  variant="outlined"
                >
                  <MenuItem value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </MenuItem>
                  {/* Add more provinces as needed */}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Postal/ZIP code"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Phone" variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Set as default address"
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,
                      backgroundColor: "#005C3D",
                      "&:hover": {
                        backgroundColor: "#004d30",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      mb: 2,
                      backgroundColor: "#005C3D",
                      "&:hover": {
                        backgroundColor: "#004d30",
                      },
                    }}
                  >
                    ADD ADDRESS
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default Addresses;
