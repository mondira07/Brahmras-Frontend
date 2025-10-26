import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Paper,
  Container,
  Button,
  Card,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { domain } from "../Config";
import axios from "axios";

const images = [
  {
    id: 1,
    src: "assets/poster1.jpg",
    alt: "First Image",
  },
  {
    id: 2,
    src: "assets/poster2.jpg",
    alt: "Second Image",
  },
];

// const Collections = [
//   {
//     id: 1,
//     src: "assets/cowGhee.jpg",
//     alt: "A2 Cow Ghee",
//   },
//   {
//     id: 2,
//     src: "assets/DryFruit.jpg",
//     alt: "Dry Fruit Fun",
//   },
//   {
//     id: 3,
//     src: "assets/KajuKatri.jpg",
//     alt: "Kaju Katri",
//   },
// ];

const Promises = [
  {
    id: 1,
    src: "assets/integrity.png", // Make sure to replace these with your actual image paths
    alt: "Integrity",
    label: "Integrity",
  },
  {
    id: 2,
    src: "assets/quality.png",
    alt: "Quality",
    label: "Quality",
  },
  {
    id: 3,
    src: "assets/relationship.png",
    alt: "Relationship",
    label: "Relationship",
  },
  {
    id: 4,
    src: "assets/excellence.png",
    alt: "Excellence",
    label: "Excellence",
  },
];

// const TopPicks = [
//   {
//     id: 1,
//     src: "assets/ghee1L.jpg",
//     hoverSrc: "assets/ghee_hover.jpg",
//     alt: "A2 Desi Cow Ghee 1 L",
//     name: "A2 Desi Cow Ghee 1 L",
//     originalPrice: "₹2,500.00",
//     discountedPrice: "₹1,800.00",
//     discount: "24% Off",
//   },
//   {
//     id: 2,
//     src: "assets/ghee3L.jpg",
//     hoverSrc: "assets/ghee_hover.jpg",
//     alt: "A2 Desi Cow Ghee 3 L",
//     name: "A2 Desi Cow Ghee 3 L",
//     originalPrice: "₹7,500.00",
//     discountedPrice: "₹5,250.00",
//     discount: "24% Off",
//   },
//   {
//     id: 3,
//     src: "assets/ghee5L.jpg",
//     hoverSrc: "assets/ghee_hover.jpg",
//     alt: "A2 Desi Cow Ghee 5 L",
//     name: "A2 Desi Cow Ghee 5 L",
//     originalPrice: "₹12,500.00",
//     discountedPrice: "₹8500.00",
//     discount: "24% Off",
//   },
//   {
//     id: 4,
//     src: "assets/ghee500ml.jpg",
//     hoverSrc: "assets/ghee_hover.jpg",
//     alt: "A2 Desi Cow Ghee 500 ML",
//     name: "A2 Desi Cow Ghee 500 ML",
//     originalPrice: "₹1250.00",
//     discountedPrice: "₹950.00",
//     discount: "24% Off",
//   },
//   {
//     id: 5,
//     src: "assets/DryFruit.jpg",
//     hoverSrc: "assets/dryfruit_hover.jpg",
//     alt: "DryFruit Fun 1 Kg",
//     name: "DryFruit Fun 1 Kg",
//     originalPrice: "₹1,000.00",
//     discountedPrice: "₹850.00",
//     discount: "10% Off",
//   },
//   {
//     id: 6,
//     src: "assets/dryFruit500gm.jpg",
//     hoverSrc: "assets/dryfruit_hover.jpg",
//     alt: "DryFruit Fun 500 gm",
//     name: "DryFruit Fun 500 gm",
//     originalPrice: "₹500.00",
//     discountedPrice: "₹450.00",
//     discount: "10% Off",
//   },
//   {
//     id: 7,
//     src: "assets/kajukatri.jpg",
//     hoverSrc: "assets/katli_hover.jpg",
//     alt: "Premium Kaju Katli 1Kg",
//     name: "Premium Kaju Katli 1Kg",
//     originalPrice: "₹1,000.00",
//     discountedPrice: "₹850.00",
//     discount: "10% Off",
//   },
//   {
//     id: 8,
//     src: "assets/kk500gm.jpg",
//     hoverSrc: "assets/katli_hover.jpg",
//     alt: "Premium Kaju Katli 500 Gm",
//     name: "Premium Kaju Katli 500 Gm",
//     originalPrice: "₹500.00",
//     discountedPrice: "₹450.00",
//     discount: "10% Off",
//   },
// ];

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

const Certificates = [
  {
    id: 1,
    src: "assets/10.png",
    alt: "ISO",
  },
  {
    id: 2,
    src: "assets/9.png",
    alt: "IP",
  },
  {
    id: 3,
    src: "assets/8.png",
    alt: "IEC",
  },
  {
    id: 4,
    src: "assets/7.png",
    alt: "LACTOSE",
  },
  {
    id: 5,
    src: "assets/6.png",
    alt: "MID",
  },
  {
    id: 6,
    src: "assets/5.png",
    alt: "ISF",
  },
  {
    id: 7,
    src: "assets/4.png",
    alt: "APEDA",
  },
  {
    id: 8,
    src: "assets/3.png",
    alt: "GMO",
  },
  {
    id: 9,
    src: "assets/2.png",
    alt: "MSME",
  },
];

const Features = [
  {
    id: 1,
    src: "assets/11.png",
    alt: "100% made in India",
  },
  {
    id: 2,
    src: "assets/12.png",
    alt: "Premium Quality",
  },
  {
    id: 3,
    src: "assets/13.png",
    alt: "ISO Certified Company",
  },
  {
    id: 4,
    src: "assets/14.png",
    alt: "Fast Track Delivery",
  },
  {
    id: 5,
    src: "assets/15.png",
    alt: "100% Secure Payment",
  },
  {
    id: 6,
    src: "assets/16.png",
    alt: "Satisfaction Guarantee",
  },
];

const brands = [
  {
    id: 1,
    src: "assets/amazon.png",
    alt: "amazon",
  },
  {
    id: 2,
    src: "assets/big_basket.png",
    alt: "big_basket",
  },
  {
    id: 3,
    src: "assets/flipkart.png",
    alt: "flipkart",
  },
  {
    id: 4,
    src: "assets/jio-mart.png",
    alt: "jio",
  },
  {
    id: 5,
    src: "assets/blinkit-logo.png",
    alt: "blinkit",
  },
  {
    id: 6,
    src: "assets/tata-mg.png",
    alt: "tata-mg",
  },
];

const newsData = [
  {
    image: "assets/oil.png",
    title: "Why is refined edible oil bad for your health?",
    author: "By Brahmras Natural",
    date: "Jun 25, 2024",
    link: "#",
  },
  {
    image: "assets/ghee.jpg",
    title: "What are the benefits of ghee?",
    author: "By Brahmras Natural",
    date: "Jun 24, 2024",
    link: "#",
  },
  {
    image: "assets/desiGhee.jpg",
    title: "How to Check the Purity of A2 Desi Ghee?",
    author: "By Brahmras Natural",
    date: "Jun 24, 2024",
    link: "#",
  },
];

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

const stats = [
  {
    id: 1,
    image: "assets/certificate.png",
    value: 8,
    label: "Year of Experience",
  },
  { id: 2, image: "assets/building.png", value: 45, label: "City" },
  {
    id: 3,
    image: "assets/smile.png",
    value: 1.2,
    label: "Happy Families",
    isMillion: true,
  },
  { id: 4, image: "assets/flag2.png", value: 8, label: "Export Country" },
];

const customers = [
  {
    name: "Devangi Rana",
    heading: "Very delicious kajukatli",
    review: "Very delicious kajukatli. Decent place to buy sweets and ghee.",
    rating: 5,
    image: "assets/r1.jpeg",
  },
  {
    name: "Neha Sharma",
    heading: "this best for indian dishes especially for Dhosa.",
    review:
      "this best for indian dishes especially for Dhosa. This is the best a2 ghee. I like it...recommended.👍",
    rating: 5,
    image: "assets/r2.jpeg",
  },
  {
    name: "Ranbin Singh",
    heading: "just like my mother used to prepare ghee at home.",
    review:
      " I am from new Delhi and My dietician recommended me with Brahmras natural farm A2 Ghee. I contacted them and within 5 days I had it. Loved the taste, just like my mother used to prepare at home. It was very pure.",
    rating: 5,
    image: "assets/r3.jpeg",
  },
  {
    name: "Meghna Tiwari",
    heading: "environmental friendly glass jars, very nice initiative.",
    review:
      "Very good product. Yellow cow ghee. Loved the freshness and taste. I am using it first thing in the morning and it is showing good results. They give in environmental friendly glass jars, very nice initiative.",
    rating: 5,
    image: "assets/r4.jpeg",
  },
  {
    name: "Shubham Malhotra",
    heading: "The ghee is really rich in taste and flavourful.",
    review:
      "The ghee is really rich in taste and flavourful. brahmras ghee is made from A2 milk and hence is really light and texture is great👍🏻",
    rating: 5,
    image: "assets/r5.jpeg",
  },
  {
    name: "Suman Parikh",
    heading: "i strongly recommend Brahmras ghee",
    review:
      " I bought one small jar of brahmras Ghee to experiment and now Ghee is good in taste i ordered your ghee first time from jiomart, and now i ordered from your website, ghee is good in taste ",
    rating: 5,
    image: "assets/r6.jpeg",
  },
  {
    name: "Dr.Suman Malhotra",
    heading: "Best Aroma with adorable taste.",
    review:
      "I have tried many brands of ghee in search of Purity but none of them offered what i was looking for. Then i ordered brahmras ghee and i was very surprised to see the purity and rich aroma of this ghee. I even showed it to my elders and they were",
    rating: 5,
    image: "assets/r7.jpeg",
  },
  {
    name: "Dhara Singh",
    heading: "Ghee is good in taste",
    review:
      " i ordered your ghee first time from jiomart, and now i ordered from your website, ghee is good in taste.",
    rating: 5,
    image: "assets/r8.jpeg",
  },
  {
    name: "Ketan Shah",
    heading: "we use Brahmras ghee for Havan-vidhi..",
    review:
      "I have been purchasing Brahmras A2 Ghee for nearly 7 years now, living in Rajkot, Gujarat. The quality of all Brahmras products is exceptional, which is why we trust their ghee we...",
    rating: 5,
    image: "assets/r9.jpeg",
  },
];

const FeaturedCollection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const cardWidth = 320;
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${domain}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const response = await axios.get(`${domain}/products`);
        setTopPicks(response.data);
      } catch (error) {
        console.error("Error fetching top picks:", error);
      }
    };

    fetchTopPicks();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/subcategory?categoryId=${categoryId}`);
  };
  const handleImage = (productId) => {
    navigate(`/product-details?id=${productId}`);
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else {
      setCurrentIndex(topPicks.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < topPicks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevImage = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const handleNextImage = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handlePaginationClick = (index) => {
    setCurrentIndex(index);
  };

  const handleImageClick = (productId) => {
    navigate(`/product-details?id=${productId}`);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

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

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollLeft -= cardWidth;
      } else {
        scrollRef.current.scrollLeft += cardWidth;
      }
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        marginTop: "132px",
      }}
    >
      <Grid container justifyContent="center" alignItems="center">
        {images.map((image, index) => (
          <Box
            key={image.id}
            ref={index === currentIndex ? containerRef : null}
            sx={{
              display: index === currentIndex ? "block" : "none",
              width: "100%",
              position: "relative",
            }}
          >
            <Link to="/product">
              <img
                src={image.src}
                alt={image.alt}
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 20,
                transform: "translateY(-70%)",
                backgroundColor: "#005C3D",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <KeyboardArrowLeft style={{ color: "white" }} />
            </IconButton>
            <IconButton
              onClick={handleNext}
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
            <Box
              className="index-slideshow-pagination swiper-pagination-clickable index-slideshow-pagination-bullets"
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "absolute",
                bottom: 25,
                left: 0,
                right: 0,
              }}
            >
              {images.map((_, dotIndex) => (
                <span
                  key={dotIndex}
                  className={`index-slideshow-pagination-bullet ${
                    currentIndex === dotIndex
                      ? "index-slideshow-pagination-bullet-active"
                      : ""
                  }`}
                  tabIndex="0"
                  role="button"
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  onClick={() => handlePaginationClick(dotIndex)}
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor:
                      currentIndex === dotIndex ? "#A4BE36" : "#ffffff",
                    borderRadius: "50%",
                    margin: "0 5px",
                    cursor: "pointer",
                  }}
                />
              ))}
            </Box>
          </Box>
        ))}
      </Grid>

      {/* Collections */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 5,
          marginBottom: 5,
          fontWeight: "bold",
          color: "#175C3B",
        }}
      >
        Healthy Featured Collections
      </Typography>
      <Grid item xs={12}>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 2 }}
        >
          {categories.map((category) => (
            <Grid item key={category._id} xs={9} sm={6} md={9} lg={2.5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <Link
                  component={RouterLink}
                  to={`/subcategory?categoryId=${category._id}`}
                  sx={{ width: "100%", textDecoration: "none" }}
                >
                  <Box
                    component="img"
                    src={category.images[0]}
                    alt={category.name}
                    sx={{
                      height: 250, // Fixed height
                      width: 250, // Fixed width
                      objectFit: "cover", // Ensure the image covers the box
                      borderRadius: "12px", // Rounded corners
                    }}
                  />
                </Link>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    mt: 2,
                    color: "#015c3d", // Force color change
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                    textAlign: "center",
                  }}
                >
                  <Link
                    component={RouterLink}
                    to={`/subcategory?categoryId=${category._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category.name}
                  </Link>
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Promises */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 12,
          fontWeight: "bold",
          color: "#175C3B",
        }}
      >
        Our Promise
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ marginTop: 5 }}
      >
        {Promises.map((promise) => (
          <Grid item key={promise.id} xs={3} sm={2} md={2} lg={2}>
            <Box sx={{ textAlign: "center", padding: 0 }}>
              <img
                src={promise.src}
                alt={promise.alt}
                style={{ width: "100px", height: "100px", margin: 0 }}
              />
              <Typography
                variant="h7"
                component="h4"
                sx={{ marginTop: 1, color: "#175C3B", fontWeight: "bold" }}
              >
                {promise.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* TopPicks */}

      <div>
        <Typography
          variant="h4"
          component="h2"
          sx={{ marginTop: 12, fontWeight: "bold", color: "#175C3B", mb: 5 }}
        >
          Brahmras Top Picks
        </Typography>

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            overflow: "hidden",
            padding: "0 20px",
          }}
        >
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "#175c3b",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#125a3a",
              },
              color: "white", // Ensure the icon color is visible
              fontSize: "2rem", // Adjust size as needed
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
              padding: "0 60px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
            ref={containerRef}
          >
            {topPicks.map((product) => (
              <Grid
                item
                key={product._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ flex: "0 0 auto" }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    backgroundColor: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => handleImage(product._id)}
                >
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      height: "0",
                      paddingTop: "100%",
                      backgroundImage:
                        product.images && product.images.length > 0
                          ? `url(${product.images[0]})`
                          : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "background-image 0.3s ease-in-out",
                      "&:hover": {
                        backgroundImage:
                          product.images && product.images.length > 1
                            ? `url(${product.images[1]})`
                            : "none",
                      },
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* Optional: Add overlay or additional content here */}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: 2, color: "#175C3B", fontWeight: "bold" }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "#888" }}
                  >
                    ₹{product.price}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#175C3B", fontWeight: "bold" }}
                  >
                    ₹{product.priceAfterDiscount}
                  </Typography>
                  <Typography variant="body1">
                    Discount: ₹{product.discount || 0}
                  </Typography>
                  <Typography variant="body1">
                    Stock: {product.stock}
                  </Typography>
                  <Typography variant="body2">{product.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              zIndex: 1,
              backgroundColor: "#175c3b",
              borderRadius: "50%",
              "&:hover": {
                backgroundColor: "#125a3a",
              },
              color: "white", // Ensure the icon color is visible
              fontSize: "2rem", // Adjust size as needed
            }}
          >
            <ArrowForward />
          </IconButton>
        </Container>
      </div>
      {/* video */}

      <Grid container spacing={0} justifyContent="center" marginTop={5}>
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

      {/* Certificates */}

      <Typography
        variant="h4"
        component="h4"
        sx={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#175C3B",
        }}
      >
        Certifications
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5 }}
      >
        {Certificates.map((certificate) => (
          <Grid item key={certificate.id} xs={6} sm={2} md={2} lg={1}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <img
                src={certificate.src}
                alt={certificate.alt}
                style={{ width: 100, height: 100 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Features */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 12,
          fontWeight: "bold",
          color: "#175C3B",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        Our Key Features
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5, paddingLeft: 3, paddingRight: 3 }}
      >
        {Features.map((Features) => (
          <Grid item key={Features.id} xs={6} sm={4} md={3} lg={1.5}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={Features.src}
                alt={Features.alt}
                style={{ width: 100, height: 100, margin: 0 }}
              />
              <Typography
                variant="h7"
                component="h4"
                sx={{ marginTop: 1, color: "#175C3B", fontWeight: "bold" }}
              >
                {Features.alt}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Our Store Locations */}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2, // Add padding from both sides
          textAlign: "center", // Center text inside the box
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginTop: 12,
            fontWeight: "bold",
            color: "#175C3B",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          Our Store Locations
        </Typography>

        <Box
          sx={{
            backgroundColor: "#A4BE36",
            color: "#ffffff",
            fontSize: "20px",
            padding: "15px 25px",
            borderRadius: "16px",
            margin: "16px 20px",
            width: "fit-content",
          }}
        >
          We will coming soon physically but now we are trustfully everywhere in
          the world digitally
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: "#005C3D",
            color: "white",
            borderRadius: "25px",
            border: "2px solid #005C3D",
            padding: "10px 20px",
            fontSize: "16px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "white",
              color: "#005C3D",
              border: "2px solid #005C3D",
            },
          }}
        >
          View Our Stores
        </Button>
      </Box>

      {/* statistics */}

      <Box className="stats-container" sx={{ marginTop: 10 }} ref={ref}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {stats.map((stat) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={2}
              key={stat.id}
              textAlign="center"
            >
              <Box mb={2}>
                <img
                  src={stat.image}
                  alt={stat.label}
                  style={{ width: "70px", height: "70px" }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#005C3D", fontSize: "70px" }}
              >
                {inView && (
                  <CountUp
                    start={stat.isMillion ? 0 : undefined}
                    end={stat.isMillion ? stat.value : stat.value}
                    duration={2}
                    separator=","
                    decimals={stat.isMillion ? 1 : 0}
                    suffix={stat.isMillion ? "M" : ""}
                  />
                )}
                {(stat.id === 1 || stat.id === 2 || stat.id === 4) && "+"}
              </Typography>
              <Typography variant="subtitle1">{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* newsData */}

      <Box sx={{ padding: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            marginTop: 8,
            fontWeight: "bold",
            color: "#175C3B",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          Brahmras News
        </Typography>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ marginTop: 5, paddingLeft: 3, paddingRight: 3 }}
        >
          {newsData.map((news, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  alt={news.title}
                  width="auto"
                  height="350"
                  image={news.image}
                />
                <CardContent sx={{ backgroundColor: "#ebe2d1" }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ color: "#175C3B", fontWeight: "bold" }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ color: "#175C3B" }}
                  >
                    {news.author} &nbsp; <br /> {news.date}
                  </Typography>
                  <Link
                    href={news.link}
                    underline="none"
                    sx={{ color: "#175C3B", borderBottom: "1px solid #175C3B" }}
                  >
                    Read more
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Brands */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#175C3B",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        Also Available Soon at
      </Typography>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: 5 }}
      >
        {brands.map((brands) => (
          <Grid item key={brands.id} xs={6} sm={4} md={4} lg={1.6}>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={brands.src}
                alt={brands.alt}
                style={{ width: "180px", height: "70px", margin: 0 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Get in Touch */}

      <Box
        sx={{
          backgroundColor: "#175c3b",
          marginTop: 8,
          color: "white",
          padding: { xs: "40px 20px", lg: "40px 80px" }, // Responsive padding: smaller on extra-small/small screens, larger on large screens
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", lg: "flex-start" }, // Center on small screens, left-align on large screens
          textAlign: { xs: "center", lg: "left" }, // Center text on small screens, left-align on large screens
          justifyContent: "center",
        }}
      >
        <Grid
          container
          direction={{ xs: "column", lg: "row" }} // Stack items vertically on small screens, horizontally on large screens
          alignItems="center"
          justifyContent={{ xs: "center", lg: "space-between" }} // Center items on small screens, space them out on large screens
          spacing={2}
        >
          <Grid item>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              fontWeight="bold"
            >
              Looking to buy in bulk?
            </Typography>
            <Typography variant="h6" gutterBottom>
              Our wholesale team is available and will assist you during the
              process.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                backgroundColor: "white",
                color: "#175c3b",
                "&:hover": {
                  backgroundColor: "#ffffff",
                },
                borderRadius: "20px",
              }}
            >
              Get in Touch
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Reviews */}

      <Box
        sx={{
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
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

      {/* Let customers speak for us */}

      <Typography
        variant="h4"
        component="h2"
        sx={{
          marginTop: 8,
          fontWeight: "bold",
          color: "#175C3B",
          paddingLeft: 2,
          paddingRight: 2,
        }}
      >
        Let customers speak for us
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
            <StarIcon key={index} style={{ color: "#175c3b" }} />
          ))}
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mt={1}>
          <Typography variant="body1" component="span">
            from 323 reviews
          </Typography>
        </Box>
      </Box>

      {/* Let customers speak for us */}

      <Box
        sx={{
          padding: "20px 0px",
          textAlign: "center",
          overflowX: "auto",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          container
          spacing={1}
          ref={scrollRef}
          sx={{
            flexWrap: "nowrap",
            overflowX: "hidden",
            padding: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {customers.map((customer, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              sx={{ flex: "0 0 auto", margin: "0 10px" }}
            >
              <Card
                sx={{
                  boxShadow: "none",
                  backgroundColor: "transparent",
                }}
              >
                <CardContent
                  sx={{
                    padding: 2,
                    backgroundColor: "transparent",
                  }}
                >
                  <img
                    src={customer.image}
                    alt={customer.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "4px",
                    }}
                  />
                  <Box display="flex" justifyContent="center" mt={2} mb={1}>
                    {Array.from({ length: customer.rating }, (_, i) => (
                      <StarIcon key={i} style={{ color: "#175c3b" }} />
                    ))}
                  </Box>
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      textAlign: "left",
                      color: "#175c3b",
                    }}
                  >
                    {customer.heading}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    gutterBottom
                    sx={{ fontSize: "0.900rem", textAlign: "left" }}
                  >
                    {customer.review}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{
                      fontSize: "0.890rem",
                      fontWeight: 700,
                      textAlign: "left",
                      color: "#175c3b",
                    }}
                  >
                    {customer.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" mt={1}>
          <ArrowBackIosIcon
            style={{ cursor: "pointer", color: "#000" }}
            onClick={() => handleScroll("left")}
          />
          <ArrowForwardIosIcon
            style={{ cursor: "pointer", color: "#000", marginLeft: 10 }}
            onClick={() => handleScroll("right")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedCollection;
