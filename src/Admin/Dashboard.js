import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PeopleIcon from "@mui/icons-material/People";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Cookies from "js-cookie";
import { domain } from "../Config";

const earningsData = [
  { month: "Jan", revenue: 20000, profit: 15000 },
  { month: "Feb", revenue: 25000, profit: 18000 },
  { month: "Mar", revenue: 15000, profit: 10000 },
  { month: "Apr", revenue: 18000, profit: 12000 },
  { month: "May", revenue: 30000, profit: 22000 },
  { month: "Jun", revenue: 28000, profit: 20000 },
  { month: "Jul", revenue: 10000, profit: 7000 },
  { month: "Aug", revenue: 15000, profit: 10000 },
  { month: "Sep", revenue: 15000, profit: 10000 },
  { month: "Oct", revenue: 15000, profit: 10000 },
  { month: "Nov", revenue: 15000, profit: 10000 },
  { month: "Dec", revenue: 15000, profit: 10000 },
];

const topProducts = [
  {
    name: "Patimax Fragrance Long...",
    items: 100,
    flag: "es",
    productImg: "patimax.jpg",
    coupon: "Sflat",
    discount: "-15%",
    price: "$27.00",
  },
  {
    name: "Nulo MedalSeries Adult Cat...",
    items: 100,
    flag: "in",
    productImg: "nulo.jpg",
    coupon: "Sflat",
    discount: "-15%",
    price: "$27.00",
  },
  {
    name: "Pedigree Puppy Dry Dog...",
    items: 100,
    flag: "gb",
    productImg: "pedigree_puppy.jpg",
    coupon: "Sflat",
    discount: "-15%",
    price: "$27.00",
  },
  {
    name: "Biscoito Premier Cookie...",
    items: 100,
    flag: "br",
    productImg: "biscoito.jpg",
    coupon: "Sflat",
    discount: "-15%",
    price: "$27.00",
  },
  {
    name: "Pedigree Adult Dry Dog...",
    items: 100,
    flag: "fr",
    productImg: "pedigree_adult.jpg",
    coupon: "Sflat",
    discount: "-15%",
    price: "$27.00",
  },
];

const topStates = [
  { name: "Maharashtra", code: "in", sales: 6972, trend: "up" },
  { name: "Karnataka", code: "in", sales: 6972, trend: "up" },
  { name: "Tamil Nadu", code: "in", sales: 6972, trend: "down" },
  { name: "Uttar Pradesh", code: "in", sales: 6972, trend: "up" },
  { name: "West Bengal", code: "in", sales: 6972, trend: "down" },
  { name: "Gujarat", code: "in", sales: 6972, trend: "down" },
];

const DashboardCard = ({
  icon: Icon,
  title,
  value,
  percentage,
  trend,
  color,
}) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 4, boxShadow: 3 }}>
    <Box display="flex" alignItems="center" mb={2}>
      <Avatar sx={{ bgcolor: color, mr: 2 }}>
        <Icon sx={{ fontSize: 40 }} />
      </Avatar>
      <Box>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="h6">{value}</Typography>
      </Box>
    </Box>
    <Typography
      variant="caption"
      color={trend === "up" ? "success.main" : "error.main"}
      sx={{ display: "flex", alignItems: "center" }}
    >
      {trend === "up" ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      )}
      {percentage}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [cardData, setCardData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        console.log("Token from cookies:", token); // Debugging line

        if (!token) {
          throw new Error("No token found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          revenueResponse,
          ordersResponse,
          activeUsersResponse,
          todayOrdersResponse,
        ] = await Promise.all([
          axios.get(`${domain}/revenue`, { headers, withCredentials: true }),
          axios.get(`${domain}/total-orders`, { headers, withCredentials: true }),
          axios.get(`${domain}/active-users`, { headers, withCredentials: true }),
          axios.get(`${domain}/today-orders`, { headers, withCredentials: true }),
        ]);

        console.log("Revenue response:", revenueResponse.data); // Debugging line
        console.log("Orders response:", ordersResponse.data); // Debugging line
        console.log("Active users response:", activeUsersResponse.data); // Debugging line
        console.log("Today orders response:", todayOrdersResponse.data); // Debugging line

        const totalRevenue = revenueResponse.data.totalRevenue;
        const totalOrders = ordersResponse.data.totalOrders;
        const activeUsers = activeUsersResponse.data.length;
        const todayOrders = todayOrdersResponse.data.length;

        setCardData([
          {
            icon: AttachMoneyIcon,
            title: "Total Revenue",
            value: totalRevenue.toLocaleString(),
            percentage: "1.56%",
            trend: "up",
            color: "success.main",
          },
          {
            icon: ShoppingBasketIcon,
            title: "Total Orders",
            value: totalOrders.toLocaleString(),
            percentage: "1.56%",
            trend: "down",
            color: "warning.main",
          },
          {
            icon: PeopleIcon,
            title: "Active Users",
            value: activeUsers.toLocaleString(),
            percentage: "0.00%",
            trend: "up",
            color: "info.main",
          },
          {
            icon: ReceiptIcon,
            title: "Today Order",
            value: todayOrders.toLocaleString(),
            percentage: "1.56%",
            trend: "up",
            color: "primary.main",
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error); // Debugging line
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
        
        <Grid item xs={12} md={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Earnings</Typography>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <Box display="flex" mb={2}>
              <Box mr={4}>
                <Typography variant="subtitle2">Revenue</Typography>
                <Typography variant="h6">$37,802</Typography>
                <Typography
                  variant="caption"
                  color="success.main"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ArrowUpwardIcon fontSize="small" /> 0.56%
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Net Profit</Typography>
                <Typography variant="h6">$15,273</Typography>
                <Typography
                  variant="caption"
                  color="success.main"
                  sx={{ display: "flex", alignItems:"center" }}
                >
                  <ArrowUpwardIcon fontSize="small" /> 0.56%
                </Typography>
              </Box>
            </Box>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
                <Bar dataKey="profit" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Top Products</Typography>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <List>
              {topProducts.map((product, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar alt={product.name} src={`images/${product.productImg}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          {product.price} {product.discount}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          Coupon: {product.coupon}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">Top States</Typography>
              <IconButton>
                <MoreHorizIcon />
              </IconButton>
            </Box>
            <List>
              {topStates.map((state, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={state.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Sales: {state.sales}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textSecondary"
                        >
                          Trend: {state.trend}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
