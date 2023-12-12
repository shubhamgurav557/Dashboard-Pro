import { Container, CssBaseline, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, Link, Grid, Box, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { setCookie } from 'state/functions';
import { getCountries, getStatesByShort, getCities } from 'countrycitystatejson';
import { HowToRegOutlined, ArrowBack } from '@mui/icons-material';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    setCountries(getCountries());
  }, []);

  useEffect(() => {
    setStates(getStatesByShort(selectedCountry));
    setSelectedState('');
    setSelectedCity('');
  }, [selectedCountry]);

  useEffect(() => {
    setCities(getCities(selectedCountry, selectedState));
    setSelectedCity('');
  }, [selectedState]);

  const handleCountryChange = (e) => {
    const countryValue = e.target.value;
    setSelectedCountry(countryValue);
  };

  const handleStateChange = (e) => {
    const stateValue = e.target.value;
    setSelectedState(stateValue);
  };

  const handleCityChange = (e) => {
    const cityValue = e.target.value;
    setSelectedCity(cityValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/general/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          occupation,
          phoneNumber,
          country: selectedCountry,
          state: selectedState,
          city: selectedCity,
        }),
      });

      const data = await response.json();
  
      if (data.success) {
        setCookie('token', data.token, 7);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        toast.error(`${data.message}`, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      console.error('Data Error', error);
      toast.error('An error occurred. Please try again later.', { position: toast.POSITION.TOP_RIGHT });
    }
  };
  

  const handleBackToLanding = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login');
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
        <Link display="flex" alignItems="center" gap=".5rem" variant="body2" onClick={handleBackToLanding} sx={{ alignSelf: 'flex-start', cursor: "pointer" }}>
            <ArrowBack sx={{ width: ".8em", height: ".8em" }} /> Back to Landing Page
          </Link>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HowToRegOutlined />
          </Avatar>
        <Typography component="h3" variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: '1em' }}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: '1em' }}
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: '1em' }}
          />
          <TextField
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            sx={{ mb: '1em' }}
          />
          <TextField
            required
            fullWidth
            id="occupation"
            label="Occupation"
            name="occupation"
            autoComplete="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            sx={{ mb: '1em' }}
          />
          <FormControl sx={{ mb: '1em' }} fullWidth>
            <InputLabel>Country</InputLabel>
            <Select value={selectedCountry} onChange={handleCountryChange} label="Country">
              <MenuItem value="">Select Country</MenuItem>
              {countries && countries.map((country, index) => (
                <MenuItem key={index} value={country.shortName}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: '1em' }} fullWidth disabled={!selectedCountry}>
            <InputLabel>State</InputLabel>
            <Select value={selectedState} onChange={handleStateChange} label="State">
              <MenuItem value="">Select State</MenuItem>
              {states && states.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ mb: '1em' }} fullWidth disabled={!selectedState}>
            <InputLabel>City</InputLabel>
            <Select value={selectedCity} onChange={handleCityChange} label="City">
              <MenuItem value="">Select City</MenuItem>
              {cities && cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
              <Grid item>
                <Link variant="body2" sx={{ cursor: "pointer" }} onClick={handleSignIn}>
                  Already Registered ?
                  <strong> Sign In</strong>
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={false} pauseOnHover={false} />
    </Container>
  );
};

export default Register;