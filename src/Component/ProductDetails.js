import React, { useRef, useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Rating,
  Divider,
  Avatar,
  Card,
  CardMedia,
  LinearProgress,
  Pagination,
  Stack,
  MenuItem,
  Select,
  Container,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate, useLocation,} from 'react-router-dom';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Addtocart from "./Addtocart";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "@mui/material";
import { domain } from "../Config";
import axios from "axios";

// const product = {
//   name: "A2 Desi Cow Ghee 1L",
//   oldPrice: "₹2,000.00",
//   price: "₹1,800.00",
//   rating: 4.5,
//   reviews: 313,
//   sizes: ["1L", "500 ML", "6L", "3L"],
//   stockStatus: "Available",
//   discountCode: "WELCOME5",
//   images: [
//     "assets/cowGhee.jpg",
//     "assets/ghee_hover.jpg",
//     "assets/ghee2.jpg",
//     "assets/ghee3.jpg",
//     "assets/ghee500ml.jpg",
//     "assets/ghee5l.jpg",
//     "assets/ghee3l.jpg",
//   ],
//   DETAILS: "",
// };
const video = [
  {
    title: "The Calf is Fed",
    description:
      "A2 cow milk is only procured from desi Gir cows which are 100% grass-fed.",
    videoSrc: "assets/Cow.gif",
  },
  {
    title: "Traditional Bilona Method",
    description:
      "To get the proper makkhan (butter) we do hand churning of curd which was formed overnight. Curd is hand churned with SHEESHAM wood churner at low RPM which ensures all the nutrients are retaken.",
    videoSrc: "assets/Bilona_1.gif",
  },
  {
    title: "Low Flame Boiling in an earthen pot",
    description:
      "As cream is not separated at entire milk is set for curd Ghee contain the benefit of SNF.",
    videoSrc: "assets/Fire_1.gif",
  },
  {
    title: "Glass packaging",
    description:
      "Finally, with the help of a strainer, this golden liquid is filtered then the ghee is filled in glass jars as we have our commitment to being eco-friendly.",
    videoSrc: "assets/Glass_packing.gif",
  },
];

const faqItems = [
  {
    question: "From Where Do You Collect Milk To Make Ghee?",
    answer:
      "In order to make A2 Cow Ghee, we collect milk from Desi Cows at our native farm. The milk of these cows is rich in A2 protein.",
  },
  {
    question: "What Is Bilona Method?",
    answer:
      "Bilona Method is a traditional process of making ghee from curd instead of cream. It involves churning curd to extract butter and then heating the butter to make ghee.",
  },
  {
    question: "Does A2 Desi Cow Ghee Have Any Effects On Heart Health?",
    answer:
      "A2 Desi Cow Ghee is known to be rich in Omega-3 fatty acids which are beneficial for heart health. However, it is recommended to consume in moderation.",
  },
  {
    question:
      "Why Is Brahmras A2 Desi Cow Ghee Expensive As Compared To Other Ghee Brands?",
    answer:
      "Brahmras A2 Desi Cow Ghee is expensive because it is made using traditional methods and from the milk of Desi Cows, which are rare and provide milk in limited quantities.",
  },
  {
    question: "Do You Accept International Orders?",
    answer:
      "Yes, we accept international orders. Please contact our support team for more information on international shipping.",
  },
];

const TopPicks = [
  {
    id: 1,
    src: "assets/ghee1L.jpg",
    hoverSrc: "assets/ghee_hover.jpg",
    alt: "A2 Desi Cow Ghee 1 L",
    name: "A2 Desi Cow Ghee 1 L",
    originalPrice: "₹2,500.00",
    discountedPrice: "₹1,800.00",
    discount: "24% Off",
  },
  {
    id: 2,
    src: "assets/ghee3L.jpg",
    hoverSrc: "assets/ghee_hover.jpg",
    alt: "A2 Desi Cow Ghee 3 L",
    name: "A2 Desi Cow Ghee 3 L",
    originalPrice: "₹7,500.00",
    discountedPrice: "₹5,250.00",
    discount: "24% Off",
  },
  {
    id: 3,
    src: "assets/ghee5L.jpg",
    hoverSrc: "assets/ghee_hover.jpg",
    alt: "A2 Desi Cow Ghee 5 L",
    name: "A2 Desi Cow Ghee 5 L",
    originalPrice: "₹12,500.00",
    discountedPrice: "₹8500.00",
    discount: "24% Off",
  },
  {
    id: 4,
    src: "assets/ghee500ml.jpg",
    hoverSrc: "assets/ghee_hover.jpg",
    alt: "A2 Desi Cow Ghee 500 ML",
    name: "A2 Desi Cow Ghee 500 ML",
    originalPrice: "₹1250.00",
    discountedPrice: "₹950.00",
    discount: "24% Off",
  },
  {
    id: 5,
    src: "assets/DryFruit.jpg",
    hoverSrc: "assets/dryfruit_hover.jpg",
    alt: "DryFruit Fun 1 Kg",
    name: "DryFruit Fun 1 Kg",
    originalPrice: "₹1,000.00",
    discountedPrice: "₹850.00",
    discount: "10% Off",
  },
  {
    id: 6,
    src: "assets/dryFruit500gm.jpg",
    hoverSrc: "assets/dryfruit_hover.jpg",
    alt: "DryFruit Fun 500 gm",
    name: "DryFruit Fun 500 gm",
    originalPrice: "₹500.00",
    discountedPrice: "₹450.00",
    discount: "10% Off",
  },
  {
    id: 7,
    src: "assets/kajukatri.jpg",
    hoverSrc: "assets/katli_hover.jpg",
    alt: "Premium Kaju Katli 1Kg",
    name: "Premium Kaju Katli 1Kg",
    originalPrice: "₹1,000.00",
    discountedPrice: "₹850.00",
    discount: "10% Off",
  },
  {
    id: 8,
    src: "assets/kk500gm.jpg",
    hoverSrc: "assets/katli_hover.jpg",
    alt: "Premium Kaju Katli 500 Gm",
    name: "Premium Kaju Katli 500 Gm",
    originalPrice: "₹500.00",
    discountedPrice: "₹450.00",
    discount: "10% Off",
  },
];

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

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [ratingrev, setRatingrev] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract productId from location state or URL search params
  const { state } = location;
  const productId = state?.productId || new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${domain}/product/${productId}`);
        setProduct(response.data);
        console.log("Product data from server:", response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleWriteReviewClick = () => {
    setShowReviewForm(!showReviewForm);
  };

  const handleBuyItNowClick = () => {
    if (productId) {
      navigate(`/checkout?productId=${productId}&quantity=${quantity}`);
    } else {
      console.error("Product ID is missing.");
    }
  };

  const handleImageClick = () => {
    navigate("/product-details");
  };

  const handleQuantityChange = (operation) => {
    if (operation === "increase") {
      setQuantity(quantity + 1);
    } else if (operation === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSizeClick = (size) => setSelectedSize(size);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const loadImages = async () => {
      if (product && product.images) {
        const imagePromises = product.images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = reject;
          });
        });

        try {
          await Promise.all(imagePromises);
          setImagesLoaded(true);
          console.log("All images loaded successfully");
        } catch (error) {
          console.error("Error loading images:", error);
        }
      }
    };

    loadImages();
  }, [product]);

  const scrollLargeImage = (direction) => {
    if (direction === 'left' && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    } else if (direction === 'right' && selectedImageIndex < (product.images.length - 1)) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Review

  const reviewsPerPage = 5;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Function to filter reviews based on the selected option
  const filterReviews = (reviews, option) => {
    switch (option) {
      case "Highest Rating":
        return [...reviews].sort((a, b) => b.rating - a.rating);
      case "Lowest Rating":
        return [...reviews].sort((a, b) => a.rating - b.rating);
      case "Most Recent":
        return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
      case "Most Helpful":
        // Custom logic for "Most Helpful" can be added here
        return reviews; // Adjust based on your criteria
      default:
        return reviews;
    }
  };

  const filteredReviews = filterReviews(reviews, selectedOption);
  const paginatedReviews = filteredReviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
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

  // also like

  const handleNextImage = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handlePrevImage = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };
  // popup

  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({
    name: "A2 Desi Cow Ghee 1 L",
    size: "1 L",
    quantity: 1,
    price: 1800.0,
    image: "assets/ghee1L.jpg",
  });
  const [totalItems, setTotalItems] = useState(1);
  const [totalAmount, setTotalAmount] = useState(item.price);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "160px",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          padding: { xs: "10px", sm: "20px", md: "20", lg: "60px" },
          margin: { xs: "0", md: "0 0px", lg: "0 150px" },
        }}
      >
        {/* Image Gallery */}

        <Grid item xs={12} md={6} lg={4}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        {imagesLoaded ? (
          <Box
            ref={containerRef}
            id="large-image-container"
            sx={{
              display: "flex",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              width: "100%",
              position: "relative",
            }}
          >
            {product.images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Image ${index}`}
                style={{
                  width: "100%",
                  flexShrink: 0,
                  borderRadius: 8,
                  display: selectedImageIndex === index ? "block" : "none",
                }}
              />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              height: 400,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Loading...</Typography>
          </Box>
        )}
        <IconButton
          onClick={() => scrollLargeImage("left")}
          sx={{
            position: "absolute",
            top: "50%",
            left: 20,
            transform: "translateY(-50%)",
            backgroundColor: "#005C3D",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <KeyboardArrowLeft style={{ color: "white" }} />
        </IconButton>
        <IconButton
          onClick={() => scrollLargeImage("right")}
          sx={{
            position: "absolute",
            top: "50%",
            right: 20,
            transform: "translateY(-50%)",
            backgroundColor: "#005C3D",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <KeyboardArrowRight style={{ color: "white" }} />
        </IconButton>
      </Box>
      {imagesLoaded && product && product.images && product.images.length > 0 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}
        >
          {product.images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index}`}
              onClick={() => handleThumbnailClick(index)}
              style={{
                width: 60,
                height: 60,
                objectFit: "cover",
                marginRight: 8,
                borderRadius: 4,
                border: `2px solid ${
                  selectedImageIndex === index ? "#175C3B" : "#ddd"
                }`,
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
      )}
    </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
      <Box sx={{ padding: 2 }}>
        {product ? (
          <>
            <Typography
              variant="h5"
              component="h1"
              sx={{ fontWeight: 'bold', color: '#005C3D', marginBottom: 2 }}
            >
              {product.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h6"
                component="span"
                sx={{ color: '#005C3D', marginRight: 2 }}
              >
                ${product.price}
              </Typography>
              {product.priceAfterDiscount && (
                <Typography
                  variant="body1"
                  component="span"
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${product.priceAfterDiscount}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <Rating
                name="product-rating"
                value={product.rating || 0}
                precision={0.5}
                sx={{ color: '#175C3B' }}
                readOnly
              />
              <Typography
                variant="body2"
                component="span"
                sx={{ marginLeft: 1 }}
              >
                {product.numReviews || 0} reviews
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="h6"
                component="p"
                sx={{ fontWeight: 'bold', marginBottom: 1 }}
              >
                Size: {selectedSize || 'Select a size'}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 2,
                }}
              >
                {product.sizes &&
                  product.sizes.map((size, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      onClick={() => handleSizeClick(size)}
                      sx={{
                        backgroundColor:
                          selectedSize === size ? '#005C3D' : '#A4BE36',
                        marginRight: 2,
                        borderRadius: '20px',
                        '&:hover': {
                          backgroundColor: '#005C3D',
                        },
                      }}
                    >
                      {size}
                    </Button>
                  ))}
              </Box>
            </Box>

            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.23)',
                borderRadius: 2,
                marginRight: 34,
                display: 'flex',
                alignItems: 'center',
                marginBottom: 1,
                padding: '4px 4px',
              }}
            >
              <IconButton onClick={() => handleQuantityChange('decrease')}>
                <RemoveIcon />
              </IconButton>
              <Typography
                variant="body1"
                component="span"
                sx={{ margin: '0 8px' }}
              >
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange('increase')}>
                <AddIcon />
              </IconButton>
            </Box>

            {product.discountCode && (
              <Typography
                variant="body2"
                component="p"
                sx={{ marginBottom: 2 }}
              >
                Get {product.discountPercentage}% Discount! FIRST ORDER Use Code:{' '}
                <strong>{product.discountCode}</strong>
              </Typography>
            )}

            <Box sx={{ marginBottom: 1 }}>
              <Box display="flex" flexDirection="row" alignItems="center">
                <Button
                  variant="contained"
                  sx={{
                    marginRight: 2,
                    backgroundColor: '#175C3B',
                    borderRadius: '20px',
                  }}
                  onClick={handleOpen}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    marginRight: 2,
                    backgroundColor: '#A4BE36',
                    borderRadius: '20px',
                  }}
                  onClick={handleBuyItNowClick}
                >
                  Buy It Now
                </Button>
              </Box>
              <Addtocart
                open={open}
                onClose={handleClose}
                item={item}
                totalItems={totalItems}
                totalAmount={totalAmount}
              />
            </Box>

            <Box sx={{ marginBottom: 2, color: '#005C3D' }}>
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
              >
                DETAILS
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ marginBottom: 0 }}
              >
                <strong>Brand:</strong> {product.brand || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ marginBottom: 0 }}
              >
                <strong>Availability:</strong>{' '}
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Box>

            <Box sx={{ marginTop: 0, color: '#005C3D', fontSize: '1rem' }}>
              <Typography
                variant="body1"
                component="p"
                sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
              >
                DESCRIPTION
              </Typography>
              <Typography
                variant="body2"
                component="p"
                sx={{ marginBottom: 1 }}
              >
                {product.description || 'No description available.'}
              </Typography>

              {(product.usageInstructions || product.storageInstructions) && (
                <>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
                  >
                    Technical Information
                  </Typography>
                  {product.usageInstructions && (
                    <>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
                      >
                        Usage Instructions:
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ marginBottom: 1 }}
                      >
                        {product.usageInstructions}
                      </Typography>
                    </>
                  )}
                  {product.storageInstructions && (
                    <>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ fontWeight: 'bold', marginBottom: 0.5 }}
                      >
                        Storage Instructions:
                      </Typography>
                      <Typography
                        variant="body2"
                        component="p"
                        sx={{ marginBottom: 1 }}
                      >
                        {product.storageInstructions}
                      </Typography>
                    </>
                  )}
                </>
              )}
            </Box>
          </>
        ) : (
          <Typography>Loading product details...</Typography>
        )}
      </Box>
    </Grid>
      </Grid>
      {/* video */}

      <Grid
        container
        spacing={0}
        justifyContent="center"
        marginTop={5}
        textAlign="center"
      >
        {video.map((item, index) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
            <Card>
              <Box position="relative">
                <CardMedia
                  component="img"
                  image={item.videoSrc}
                  alt={item.title}
                  style={{ height: 400 }}
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  bgcolor="rgba(0, 0, 0, 0.5)"
                />
                <Box
                  position="absolute"
                  bottom={150}
                  left={0}
                  width="100%"
                  color="white"
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    sx={{ fontWeight: "bold" }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ */}
      <Grid
        container
        justifyContent="center"
        sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: 4 }}
      >
        <Grid item xs={12} sm={10} md={8} lg={8}>
          <Box sx={{ marginBottom: "20px" }}>
            <Typography
              variant="h4"
              component="h2"
              textAlign="center"
              sx={{
                marginTop: 8,
                marginBottom: 5,
                fontWeight: "bold",
                color: "#175C3B",
                paddingLeft: 5,
                paddingRight: 5,
              }}
            >
              FAQS
            </Typography>
            <div>
              {faqItems.map((item, index) => (
                <Accordion key={index} sx={{ marginBottom: 2 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{
                      backgroundColor: "#f5f5f5",
                    }}
                  >
                    <Typography sx={{ color: " #005C3D" }}>
                      {item.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Typography sx={{ color: " #005C3D" }}>
                      {item.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Box>
        </Grid>
      </Grid>

      {/* You May Also Like */}

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
        You May Also Like
      </Typography>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          overflow: "hidden", // Ensure no overflow outside the container
          padding: "0 20px", // Padding to prevent hiding content
        }}
      >
        <IconButton
          onClick={handleNextImage}
          sx={{
            position: "absolute",
            top: "50%",
            left: 0, // Positioned on the left side
            transform: "translateY(-50%)",
            zIndex: 1,
            display: { xs: "block", lg: "block" },
            backgroundColor: "#175c3b",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#175c3b",
            },
          }}
        >
          <ArrowBack />
        </IconButton>

        <Grid
          container
          spacing={2}
          sx={{
            flexWrap: "nowrap",
            overflowX: "auto",
            padding: "0 60px", // Increased padding to accommodate for arrow buttons
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          ref={containerRef}
        >
          {TopPicks.map((item) => (
            <Grid
              item
              key={item.id}
              xs={12}
              sm={6}
              md={4}
              lg={3} // Adjust lg to fit 4 items in view
              sx={{ flex: "0 0 auto" }}
            >
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: "auto",
                  paddingTop: "100%",
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "background-image 0.3s ease-in-out",
                  "&:hover": {
                    backgroundImage: `url(${item.hoverSrc})`,
                  },
                  position: "relative",
                  cursor: "pointer", // Add cursor pointer to indicate clickable
                }}
                onClick={handleImageClick}
              />
              <Typography
                component="h4"
                sx={{
                  marginTop: 2,
                  color: "#175C3B",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textAlign: "left",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "#888",
                  textAlign: "left",
                }}
              >
                {item.originalPrice}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#175C3B", fontWeight: "bold", textAlign: "left" }}
              >
                {item.discountedPrice}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#175C3B",
                  color: "#fff",
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#144A30",
                  },
                }}
              >
                Add to cart
              </Button>
            </Grid>
          ))}
        </Grid>

        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: "absolute",
            top: "50%",
            right: 0, // Positioned on the right side
            transform: "translateY(-50%)",
            zIndex: 1,
            display: { xs: "block", lg: "block" },
            backgroundColor: "#175c3b",
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: "#175c3b",
            },
          }}
        >
          <ArrowForward />
        </IconButton>
      </Container>

      {/* Review */}
      <Grid
        container
        justifyContent="center"
        sx={{ paddingLeft: 2, paddingRight: 2, marginBottom: 1 }}
      >
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
          <Box sx={{ maxWidth: 400, margin: "auto", textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>
              Write a review
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend">Rating</Typography>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRatingrev(newValue);
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" align="left">
                Review Title
              </Typography>
              <TextField
                fullWidth
                placeholder="Give your review a title"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" align="left">
                Review
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Write your comments here"
                variant="outlined"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" align="left">
                Picture/Video (optional)
              </Typography>
              <IconButton
                component="label"
                sx={{
                  border: "1px dashed grey",
                  width: "100%",
                  height: "100px",
                }}
              >
                <CloudUploadIcon />
                <input type="file" hidden />
              </IconButton>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" align="left">
                Name (displayed publicly like John Smith)
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your name (public)"
                variant="outlined"
                size="small"
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component="legend" align="left">
                Email
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email (private)"
                variant="outlined"
                size="small"
              />
            </Box>
            <Typography
              variant="caption"
              align="left"
              display="block"
              sx={{ mb: 2 }}
            >
              How we use your data: We'll only contact you about the review you
              left, and only if necessary. By submitting your review, you agree
              to Judgeme's terms of service and content policies.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outlined" sx={{ color: "#005c3d" }}>
                Cancel review
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ bgcolor: "#005c3d" }}
              >
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

        {paginatedReviews.map((review, index) => (
          <Box key={index} sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar sx={{ mr: 2 }}>{review.name.charAt(0)}</Avatar>
              <Box>
                <Typography variant="body1">{review.name}</Typography>
                <Typography variant="caption">{review.date}</Typography>
              </Box>
            </Box>
            <Rating value={review.rating} readOnly sx={{ color: "#175C3B" }} />
            <Typography variant="h6" component="h4">
              {review.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {review.content}
            </Typography>
            <Divider />
          </Box>
        ))}

        <Stack spacing={2} sx={{ mt: 2, alignItems: "center" }}>
          <Pagination
            count={Math.ceil(reviews.length / reviewsPerPage)}
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

export default ProductDetails;