import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Divider,
  Avatar,
  Card,
  CardContent,
  LinearProgress,
  Pagination,
  Stack,
  MenuItem,
  Select,
  TextField,
  FormControl,
  IconButton, 
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StarIcon from "@mui/icons-material/Star";


const reviewSummary = {
  averageRating: 4.67,
  totalReviews: 313,
  ratingBreakdown: [
    { rating: 5, count: 232 },
    { rating: 4, count: 64 },
    { rating: 3, count: 12 },
    { rating: 2, count: 4 },
    { rating: 1, count: 1 },
  ],
};

const reviews = [
    {
      name: "K R G",
      date: "April 18, 2024",
      review: "My daily life oil",
      avatar: "assets/krg.png",
      rating: 5,
    },
    {
      name: "600_ADITYA_SHAH",
      date: "April 17, 2024",
      review: "Best oil",
      avatar: "assets/aditya.png",
      rating: 5,
    },
    {
      name: "KETUL SHAH",
      date: "April 15, 2024",
      review: "Oil is very good for health and pure",
      avatar: "assets/ketul.png",
      rating: 5,
    },
    {
      name: "anil babaria",
      date: "April 13, 2024",
      review: "Goods",
      avatar: "assets/anil.png",
      rating: 5,
    },
    {
      name: "Nitinbhai Gajipara",
      date: "April 12, 2024",
      review: "100%sudhh che",
      avatar: "assets/nitinbhai.png",
      rating: 5,
    },
    {
      name: "Abhay Darji",
      date: "April 12, 2024",
      review: "It has very nice quality and unrefined.",
      avatar: "assets/abhay.png",
      rating: 5,
    },
    {
      name: "adi r",
      date: "April 12, 2024",
      review: "It is good for health",
      avatar: "assets/anil.png",
      rating: 5,
    },
  ];


const message = [
  {
    name: "Niranjan Maharaj",
    date: "07/18/2024",
    rating: 5,
    title: "Well packed and properly couriered. Very good.",
    content: "Well packed and properly couriered. Very good.",
  },
  {
    name: "Indu Tater",
    date: "07/18/2024",
    rating: 4,
    title: "organic ghee",
    content: "organic ghee",
  },
  {
    name: "Sulochna Nayak",
    date: "07/18/2024",
    rating: 5,
    title: "nice quality",
    content: "Nice quality",
  },
  {
    name: "Satyam Negi",
    date: "07/18/2024",
    rating: 5,
    title: "genuine quality good taste..",
    content: "genuine quality good taste..",
  },
  {
    name: "Hanvika tiwari",
    date: "07/18/2024",
    rating: 5,
    title: "genuine quality good taste..",
    content: "genuine quality good taste..",
  },
  {
    name: "sneha mayank merchant",
    date: "07/18/2024",
    rating: 5,
    title: "it is like pure gir cow ghee..",
    content: "it is like pure gir cow ghee..",
  },
  {
    name: "Parag K.",
    date: "07/18/2024",
    rating: 5,
    title: "Really good product. Feels like home made ghee",
    content: "Really good product. Feels like home made ghee",
  },
  {
    name: "Nikhil bhattacharya",
    date: "06/30/2024",
    rating: 2,
    title: "I got dammaged parcel",
    content:
      "quality is good but i got dammaged parcel, half of the bottle is empty and they also give me another product but my time is wasted.",
  },
  {
    name: "Santosh marwadi",
    date: "07/02/2024",
    rating: 2,
    title: "They have to improve delivery time of product.",
    content:
      "Not satisfied. They have to improve delivery time of product. Overall just good quality product.",
  },
  {
    name: "Tanya shah",
    date: "06/30/2024",
    rating: 1,
    title: "hee achha hai....but mujhe wooden spoon nhi mila....",
    content:
      "ghee achha hai....but mujhe wooden spoon nhi mila....i am verry disappointed with this..",
  },
];

const photos = [
  "assets/r2.jpeg",
  "assets/r3.jpeg",
  "assets/r4.jpeg",
  "assets/r5.jpeg",
  "assets/r6.jpeg",
  "assets/r7.jpeg",
  "assets/r8.jpeg",
  "assets/r9.jpeg",
];

const options = [
  "Most Recent",
  "Highest Rating",
  "Lowest Rating",
  "Most Helpful",
];

const Review = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);

  const handleWriteReviewClick = () => {
    setShowReviewForm(!showReviewForm);
  };

  const messagePerPage = 5;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const filterMessage = (message, option) => {
    switch (option) {
      case "Highest Rating":
        return [...message].sort((a, b) => b.rating - a.rating);
      case "Lowest Rating":
        return [...message].sort((a, b) => a.rating - b.rating);
      case "Most Recent":
        return [...message].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Most Helpful":
        return message; // Adjust based on your criteria
      default:
        return message;
    }
  };

  const filteredMessage = filterMessage(message, selectedOption);
  const paginatedmessage = filteredMessage.slice(
    (page - 1) * messagePerPage,
    page * messagePerPage
  );

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setPage(1); // Reset page to 1 when changing filters
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        if (
          scrollContainerRef.current.scrollLeft +
            scrollContainerRef.current.clientWidth >=
          scrollContainerRef.current.scrollWidth
        ) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: "smooth",
          });
        } else {
          scrollContainerRef.current.scrollBy({
            left: scrollContainerRef.current.clientWidth,
            behavior: "smooth",
          });
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "160px",
        mb: "50px"

      }}
    >
      {/* Excellent */}

      <Box
        sx={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Excellent
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mb={2}
        >
          <Box display="flex" justifyContent="center" alignItems="center">
            {Array.from({ length: 5 }, (_, index) => (
              <StarIcon key={index} style={{ color: "#FFA41B" }} />
            ))}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={1}
          >
            <Typography variant="body1" component="span">
              Based on
            </Typography>
            <Typography
              variant="body1"
              component="span"
              ml={1}
              sx={{ fontWeight: "bold" }}
            >
              305 Reviews
            </Typography>
          </Box>
        </Box>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/512px-Google_2015_logo.svg.png"
          alt="Google Logo"
          style={{ height: 20, marginBottom: 20 }}
        />
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: { xs: "center", md: "right" } }}
        >
          <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
            Write a Review
          </Button>
        </Grid>
        <Box
          ref={scrollContainerRef}
          sx={{
            overflowX: "auto",
            paddingBottom: "20px",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexWrap: "nowrap" }}
          >
            {reviews.map((review, index) => (
              <Grid item key={index} xs={12} sm={6} md={9} lg={4}>
                <Card
                  sx={{
                    minWidth: 300,
                    margin: "0 10px",
                    display: "inline-block",
                    backgroundColor: "#efefef",
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar src={review.avatar} />
                      <Box ml={2}>
                        <Typography variant="subtitle1" textAlign="start">
                          {review.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          textAlign="start"
                        >
                          {review.date}
                        </Typography>
                      </Box>
                      <img
                        src="assets/Glogo.png"
                        alt="Google Logo"
                        style={{ height: 40, marginLeft: "auto" }}
                      />
                    </Box>
                    <Box display="flex" mb={1}>
                      {Array.from({ length: review.rating }, (_, index) => (
                        <StarIcon key={index} style={{ color: "#FFA41B" }} />
                      ))}
                    </Box>
                    <Typography variant="body2" textAlign="start">
                      {review.review}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ textAlign: { xs: "center", md: "right" } }}
        >
          <Button variant="text" color="primary">
            <img
              src="assets/Glogo.png"
              alt="Google Logo"
              style={{ height: 40, marginLeft: "auto" }}
            />
            Show all Reviews
          </Button>
        </Grid>
      </Box>

      {/* Review */}
      <Grid container justifyContent="center" sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: 1 }}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            color: "#175C3B",
            fontWeight: "bold",
            marginBottom: 6,
            textAlign: "center",
          }}
        >
          Customer Reviews
        </Typography>
      </Grid>
      <Grid container spacing={2} sx={{ mb: 4 }} alignItems="center">
        <Grid item xs={12} sm={3} sx={{ textAlign: "center" }}>
          <Rating
            value={reviewSummary.averageRating}
            readOnly
            precision={0.1}
            sx={{ color: "#175C3B" }}
          />
          <Typography variant="body1">
            {reviewSummary.averageRating} out of 5
          </Typography>
          <Typography variant="body2">
            Based on {reviewSummary.totalReviews} reviews
          </Typography>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, display: { xs: "none", md: "block" } }}
        />

        <Grid item xs={12} sm={5}>
          {reviewSummary.ratingBreakdown.map((item, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <Rating
                value={item.rating}
                readOnly
                sx={{ color: "#175C3B" }}
              />

              <LinearProgress
                variant="determinate"
                value={(item.count / reviewSummary.totalReviews) * 100}
                sx={{
                  flexGrow: 1,
                  ml: 2,
                  height: 10,
                  backgroundColor: "#E0E0E0",
                  "& .MuiLinearProgress-bar": { backgroundColor: "#175C3B" },
                }}
              />
              <Typography variant="body1" sx={{ ml: 1, width: 30 }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: 2, display: { xs: "none", md: "block" } }}
        />

        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#175C3B",
              padding: "10px 20px",
              "&:hover": {
                backgroundColor: "#175C3B", // Ensure hover background color is the same
              },
            }}
            onClick={handleWriteReviewClick}
          >
            Write a review
          </Button>
        </Grid>
      </Grid>

      {showReviewForm && (
        <Box sx={{ maxWidth: 400, margin: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Write a review
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" align="left">Review Title</Typography>
            <TextField
              fullWidth
              placeholder="Give your review a title"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" align="left">Review</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Write your comments here"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" align="left">Picture/Video (optional)</Typography>
            <IconButton component="label" sx={{ border: '1px dashed grey', width: '100%', height: '100px' }}>
              <CloudUploadIcon />
              <input type="file" hidden />
            </IconButton>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" align="left">Name (displayed publicly like John Smith)</Typography>
            <TextField
              fullWidth
              placeholder="Enter your name (public)"
              variant="outlined"
              size="small"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend" align="left">Email</Typography>
            <TextField
              fullWidth
              placeholder="Enter your email (private)"
              variant="outlined"
              size="small"
            />
          </Box>
          <Typography variant="caption" align="left" display="block" sx={{ mb: 2 }}>
            How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judgeme's terms of service and content policies.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" color="primary">
              Cancel review
            </Button>
            <Button variant="contained" color="primary" sx={{ bgcolor: '#005c3d' }}>
              Submit Review
            </Button>
          </Box>
        </Box>
      )}
    </Grid>
      <Divider sx={{ marginBottom: 2 }} />
      {/* Photos */}
      <Box sx={{ mb: 4, px: 10 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          Customer photos & videos
        </Typography>
        <Grid container spacing={2}>
          {photos.map((photo, index) => (
            <Grid item key={index}>
              <Avatar
                variant="square"
                src={photo}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
          ))}
          <Grid item>
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center" }}
            >
              See more
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Box sx={{ px: 10 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControl variant="standard" size="small" sx={{ minWidth: 200 }}>
            <Select
              value={selectedOption}
              onChange={handleOptionChange}
              label="Filter"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        {paginatedmessage.map((message, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ mr: 2 }}>{message.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="body1">{message.name}</Typography>
                <Typography variant="caption">{message.date}</Typography>
              </Box>
            </Box>
            <Rating value={message.rating} readOnly sx={{ color: "#175C3B" }} />
            <Typography variant="h6" component="h4">
              {message.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {message.content}
            </Typography>
            <Divider />
          </Box>
        ))}

        <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Pagination
            count={Math.ceil(message.length / messagePerPage)}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </Box>

    </Box>
  );
};

export default Review;
