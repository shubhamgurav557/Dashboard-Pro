import { Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Link, Grid, Box, useTheme } from '@mui/material';
import { LockClockOutlined, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { setCookie } from 'state/functions';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      const userData = await response.json();

      if (userData.success) {
        setCookie('token', userData.token, 7);
        navigate('/dashboard');
      } else {
        toast.error(`${userData.message}`, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error(`${error}`, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Link display="flex" alignItems="center" gap=".5rem" variant="body2" onClick={handleBackToLanding} sx={{ alignSelf: 'flex-start', cursor: "pointer", color: theme.palette.secondary.main, opacity: '.5' }}>
            <ArrowBack sx={{ width: ".8em", height: ".8em" }} /> Back to Landing Page
          </Link>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockClockOutlined />
          </Avatar>
          <Typography component="h3" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={
                {
                  color: theme.palette.secondary.main,
                  "& .Mui-focused": {
                    color: theme.palette.secondary.main, // Customize the focused color
                  },
                }
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={
                {
                  color: theme.palette.secondary.main,
                  "& .Mui-focused": {
                    color: theme.palette.secondary.main, // Customize the focused color
                  },
                }
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{color: theme.palette.secondary.main, opacity: '.5'}}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" sx={{ cursor: "pointer", color: theme.palette.secondary.main, opacity: '.5' }} onClick={handleSignUp}>
                  Don't have an account?
                  <strong> Sign Up</strong>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} />
      </Container>
  );
};

export default Login;