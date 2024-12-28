// package.json additions:
{
     {
      "@emotion/react",
      "@emotion/styled",
      "@mui/material",
      "@mui/icons-material",
      "react-router-dom",
      "react-hot-toast"
    }
  }
  
  // InfoForm.jsx
  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import toast from 'react-hot-toast';
  import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Grid,
    MenuItem,
    Box,
    InputAdornment,
    ThemeProvider,
    createTheme,
    useMediaQuery
  } from '@mui/material';
  import {
    Person,
    School,
    Phone,
    Badge,
    CalendarToday,
    AccountCircle,
    Lock,
    Home
  } from '@mui/icons-material';
  import Logo from '../assets/Logo.png';
  
  
  // Create custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(222, 82, 43)', //the info box highlight
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
    },
    components: {
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: 'rgb(222, 82, 43)',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: '12px',
          },
        },
      },
    },
  });
  
  const InfoForm = () => {
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    /*const [showLogo, setShowLogo] = useState(true);*/
  
    const [formData, setFormData] = useState({
      name: '',
      collegeName: '',
      phone: '',
      collegeId: '',
      yearOfStudy: '',
      username: '',
      password: '',
      confirmPassword: '',
      address: ''
    });
  
    const [errors, setErrors] = useState({});
  
    /*useEffect(() => {
      const timer = setTimeout(() => setShowLogo(false), 3000);
      return () => clearTimeout(timer);
    }, []);*/
  
    const validatePhone = (phone) => {
      const pattern = /^\d{10}$/;
      return pattern.test(phone);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
      
      // Required fields
      const requiredFields = ['name', 'collegeName', 'phone', 'collegeId', 'yearOfStudy', 'username', 'password', 'confirmPassword'];
      requiredFields.forEach(field => {
        if (!formData[field]) {
          newErrors[field] = 'This field is required';
        }
      });
  
      // Phone validation
      if (formData.phone && !validatePhone(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
  
      // Password match validation
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        toast.success('Information submitted successfully!');
        // Navigate or handle success
        navigate('/success');
      }
    };
  
    const yearOptions = [
      { value: '1', label: '1st Year' },
      { value: '2', label: '2nd Year' },
      { value: '3', label: '3rd Year' },
      { value: '4', label: '4th Year' },
      { value: '5', label: '5th Year' }
    ];
  
    return (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              minHeight: '100vh',
              minWidth:'100vw',
              display: 'flex',
              alignItems: 'center',
              background: 'rgb(13, 32, 48)',//background
              py: 4,
            }}
          >
            <Container maxWidth="lg">
              <Grid container spacing={4}>
                {/* Logo and Welcome Section */}
                {!isSmallScreen && (
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        color: 'white',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                      }}
                    >
                      <Box sx={{ mb: 6 }}>
                        <img 
                            src={Logo} 
                            alt="Logo" 
                            style={{ height: 110, width: 'auto' }} 
                        />
                        <Typography variant="h5" sx={{ mt: 2 }}>Network Alarm</Typography>
                      </Box>
                      
                      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                        Welcome
                      </Typography>
                      <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        Please fill in your information to continue
                      </Typography>
                      
                      <Typography sx={{ mt: 'auto', opacity: 0.7 }}>
                        www.yoursite.com
                      </Typography>
                    </Box>
                  </Grid>
                )}
  
              {/* Form Section */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 2, sm: 4 },
                    borderRadius: 2,
                    background: ' #F9F9F1',//info card
                  }}
                >
                  <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
                    Information Form
                  </Typography>
  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Name Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="name"
                          label="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!errors.name}
                          helperText={errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* College Name Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="collegeName"
                          label="College Name"
                          value={formData.collegeName}
                          onChange={handleChange}
                          error={!!errors.collegeName}
                          helperText={errors.collegeName}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <School color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* Phone Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="phone"
                          label="Phone Number"
                          value={formData.phone}
                          onChange={handleChange}
                          error={!!errors.phone}
                          helperText={errors.phone}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* College ID Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="collegeId"
                          label="College ID"
                          value={formData.collegeId}
                          onChange={handleChange}
                          error={!!errors.collegeId}
                          helperText={errors.collegeId}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Badge color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* Year of Study Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="yearOfStudy"
                          select
                          label="Year of Study"
                          value={formData.yearOfStudy}
                          onChange={handleChange}
                          error={!!errors.yearOfStudy}
                          helperText={errors.yearOfStudy}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CalendarToday color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        >
                          {yearOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
  
                      {/* Username Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="username"
                          label="Username"
                          value={formData.username}
                          onChange={handleChange}
                          error={!!errors.username}
                          helperText={errors.username}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AccountCircle color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* Password Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="password"
                          type="password"
                          label="Password"
                          value={formData.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* Confirm Password Field */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          error={!!errors.confirmPassword}
                          helperText={errors.confirmPassword}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Lock color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
  
                      {/* Address Field */}
                      <Grid item xs={12}>
                        <TextField
                          name="address"
                          label="Address (Optional)"
                          value={formData.address}
                          onChange={handleChange}
                          multiline
                          rows={2}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Home color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
  

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'rgb(222, 82, 43)',
                        '&:hover': { bgcolor: ' #0D1F2D' },
                        py: 1.5,
                        borderRadius: 1.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: 'none'
                      }}
                      size="large"
                    
                    >
                      Submit Information
                    </Button>
                  </form>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    );
  };
  
  export default InfoForm;