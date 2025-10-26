import React, { useState } from 'react';
import { Box, Typography, Link, Grid, TextField, IconButton, Collapse, useMediaQuery, useTheme, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, ExpandMore } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PhoneIcon from '@mui/icons-material/Phone';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

const Footer = () => {
  const theme = useTheme();
  const isSmallOrMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [sections, setSections] = useState({
    info: false,
    connect: false,
    quickLinks: false,
    contactUs: false,
  });

  const toggleSection = (section) => {
    setSections((prevSections) => ({
      ...prevSections,
      [section]: !prevSections[section],
    }));
  };

  const footerData = [
    {
      heading: 'Info',
      items: [
        { label: 'Shop', href: '#' },
        { label: 'About Us', href: '#' },
        { label: 'Brahmras Rewards', href: '#' },
        { label: 'Brahmras Blog', href: '#' },
        { label: 'Food & Health', href: '#' },
        { label: 'Brahmras Social Responsibility', href: '#' },
      ],
    },
    {
      heading: 'Connect',
      items: [
        { label: 'Track Order', href: '#' },
        { label: 'Store Locator', href: '#' },
        { label: 'B2B Buyer', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      heading: 'Quick Links',
      items: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Shipping Policy', href: '#' },
        { label: 'Refund & Cancellations', href: '#' },
      ],
    },
    {
      heading: 'Contact Us',
      items: [
        { label: 'Brahmras natural farm', icon: <FmdGoodIcon style={{ color: 'rgb(0,92,61)', marginRight: '5px' }} />, text: 'Surat' },
        { label: '1800 891 4010', icon: <PhoneIcon style={{ color: 'rgb(0,92,61)', marginRight: '5px' }} />, text: '1800 891 4010' },
        { label: 'Info@brahmrasnatural.com', text: 'Info@brahmrasnatural.com' },
      ],
    },
  ];

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#F2EBDF',
        color: '#2C778B',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: isSmallOrMediumScreen ? '0 16px' : '0',
      }}
    >
      <Box sx={{ margin: isSmallOrMediumScreen ? 2 : 7, height: isSmallOrMediumScreen ? 'auto' : '270px', width: '100%', maxWidth: '1200px' }}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3} textAlign="center">
            <Box display="flex" flexDirection="column" alignItems="center">
            <Link to="/"><img src="assets/logo.png" alt="Logo" style={{ width: isSmallOrMediumScreen ? '40%' : '80%', marginBottom: '16px' }} /></Link>
              <Box display="flex" mb={2}>
                <Link href="#" color="inherit" underline="none" sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', bgcolor: '#005C3D', borderRadius: '50%' }}>
                  <Facebook sx={{ color: '#FFFFFF' }} />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', bgcolor: '#005C3D', borderRadius: '50%' }}>
                  <Twitter sx={{ color: '#FFFFFF' }} />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', bgcolor: '#005C3D', borderRadius: '50%' }}>
                  <Instagram sx={{ color: '#FFFFFF' }} />
                </Link>
                <Link href="#" color="inherit" underline="none" sx={{ mx: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', bgcolor: '#005C3D', borderRadius: '50%' }}>
                  <LinkedIn sx={{ color: '#FFFFFF' }} />
                </Link>
              </Box>
              <Box display='flex' flexDirection="row" alignItems="center">
                <TextField
                  label="Your email"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: '#2C778B',
                      bgcolor: 'white',
                    },
                  }}
                />
                <ArrowForwardIcon style={{ backgroundColor: "#175C3B", color: "white", width: "30px", height: "39px" }} />
              </Box>
            </Box>
          </Grid>

          {footerData.map((section, index) => (
            <Grid key={index} item xs={12} md={2} sx={{ textAlign: 'left', padding: isSmallOrMediumScreen ? '0 16px' : '0' }}>
              <Box display="flex" flexDirection="column" alignItems="flex-start">
                <Typography variant="h6" sx={{ color: '#005C3D', fontWeight: 'bold', position: 'relative', mb: 3 }} gutterBottom>
                  {section.heading}
                  <Divider sx={{ position: 'absolute', bottom: '-5px', left: '0', width: '30px', height: '2px', bgcolor: '#9FBC00' }} />
                </Typography>
                {isSmallOrMediumScreen && (
                  <IconButton onClick={() => toggleSection(section.heading.toLowerCase())} sx={{ color: '#005C3D', alignSelf: 'flex-end', position: 'absolute', right: '10px', }}>
                    <ExpandMore />
                  </IconButton>
                )}
                <Collapse in={sections[section.heading.toLowerCase()] || !isSmallOrMediumScreen} timeout="auto" unmountOnExit>
                  <div>
                    {section.items.map((item, idx) => (
                      <div key={idx} style={{ marginBottom: idx === section.items.length - 1 ? 0 : '12px' }}>
                        {item.icon ? (
                          <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
                            {item.icon}
                            <Typography variant="body2" color="inherit" sx={{ '&:hover, &:focus': { color: '#9FBC00' } }}>
                              {item.label}, {item.text}
                            </Typography>
                          </Box>
                        ) : (
                          <Link href={item.href} color="inherit" underline="none" sx={{ '&:hover, &:focus': { color: '#9FBC00' }, mb: 1 }}>
                            {item.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </Collapse>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box mt={4} textAlign="center">
        <Typography variant="body2" sx={{ color: "#175C3B", fontSize: "16px", p: 2, backgroundColor: "#EBE2D1" }}>
          &copy; {new Date().getFullYear()} <b>BRAHMRAS NATURAL FARM</b>. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
