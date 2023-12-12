// LandingPage.js
import React from 'react';
import { Button, Box, CssBaseline, Typography, AppBar, Toolbar, Container, useTheme, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import logoIcon from 'assets/logo.png';

const LandingPage = () => {
const theme = useTheme();
  return (
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <CssBaseline />
      <AppBar position="absolute" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
            <Avatar alt="" src={logoIcon} style={{ height: '40px', width: '40px', marginRight: '16px' }} />
          <div style={{ marginLeft: 'auto' }}>
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div style={{ marginTop: '64px' }}>
          {/* Adjusted marginTop to account for the height of the transparent AppBar */}
          <Typography sx={{color: theme.palette.secondary[400], fontWeight: "bold", letterSpacing: '.2rem', fontSize: "3rem"}} variant="h2" align="center" gutterBottom>
            Welcome to Dashboard Pro
          </Typography>
          <Typography sx={{color: theme.palette.secondary[200], fontSize: "1rem"}} variant="body1" paragraph>
            Elevate your experience with Dashboard Pro – your ultimate solution for dynamic dashboards and seamless listings.
            Explore powerful features that simplify data management and enhance user experience.
          </Typography>
          <Typography sx={{color: theme.palette.secondary[500], fontSize: "1.1rem"}} variant="h6" gutterBottom>
            Key Features
          </Typography>
          <ul>
            <li>Customizable Dashboards</li>
            <li>Interactive Listings</li>
            <li>Real-time Data Updates</li>
          </ul>
          <Typography sx={{color: theme.palette.secondary[500], fontSize: "1.1rem"}} variant="h6" gutterBottom>
            Get Started
          </Typography>
          <Typography sx={{color: theme.palette.secondary[200], fontSize: "1rem"}} variant="body1" paragraph>
            Sign up or log in to unlock the full potential of Dashboard Pro. Create personalized dashboards and effortlessly
            manage your listings.
          </Typography>
        </div>
      </Container>
    </Box>
  );
};

export default LandingPage;
