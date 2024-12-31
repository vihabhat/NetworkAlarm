import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
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
  useMediaQuery,
} from "@mui/material";
import {
  Person,
  School,
  Phone,
  Badge,
  CalendarToday,
  AccountCircle,
  Lock,
  Home,
} from "@mui/icons-material";
import Logo from "../assets/Logo.png";

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F9F9F1",
    "&.Mui-focused": {
      backgroundColor: "#F9F9F1",
    },
    "&:hover": {
      backgroundColor: "#F9F9F1",
    },
    // Handle the input adornment alignment for multiline
    "& .MuiInputAdornment-root": {
      alignItems: "flex-start",
      marginTop: "13px", // Align with first line of text
    },
  },
  // Maintain other styles
  "& input:-webkit-autofill, & textarea:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 100px #F9F9F1 inset",
    "-webkit-text-fill-color": "black",
  },
  "& input:-webkit-autofill:focus, & textarea:-webkit-autofill:focus": {
    "-webkit-box-shadow": "0 0 0 100px #F9F9F1 inset",
    "-webkit-text-fill-color": "black",
  },
  "& input:-webkit-autofill:hover, & textarea:-webkit-autofill:hover": {
    "-webkit-box-shadow": "0 0 0 100px #F9F9F1 inset",
    "-webkit-text-fill-color": "black",
  },
  "& input:autofill, & textarea:autofill": {
    backgroundColor: "#F9F9F1 !important",
    color: "black !important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(0, 0, 0, 0.2)",
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(222, 82, 43)",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "rgb(222, 82, 43)",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "12px",
        },
      },
    },
  },
});

const InfoForm = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    phone: "",
    collegeId: "",
    yearOfStudy: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const validatePhone = (phone) => {
    const pattern = /^\d{10}$/;
    return pattern.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "collegeName",
      "phone",
      "collegeId",
      "yearOfStudy",
      "username",
      "password",
      "confirmPassword",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/logins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Registration successful!");
          navigate("/success");
        } else {
          toast.error(data.message || "Registration failed");
        }
      } catch (error) {
        toast.error("An error occurred during registration");
        console.error("Registration error:", error);
      }
    }
  };

  const yearOptions = [
    { value: "1", label: "1st Year" },
    { value: "2", label: "2nd Year" },
    { value: "3", label: "3rd Year" },
    { value: "4", label: "4th Year" },
    { value: "5", label: "5th Year" },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          background: "rgb(13, 32, 48)",
          overflowX: "hidden", // Prevent horizontal scroll
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            mx: "auto",
            width: "100%",
            px: { xs: 0, sm: 2 }, // Remove extra padding on mobile
          }}
        >
          {/* Logo for mobile screens */}
          {isSmallScreen && (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
                mt: 2,
              }}
            >
              <img
                src={Logo}
                alt="Logo"
                style={{
                  height: 80,
                  width: "auto",
                  marginBottom: "1rem",
                }}
              />
              <Typography variant="h5" sx={{ color: "white", mb: 2 }}>
                Network Alarm
              </Typography>
            </Box>
          )}

          <Grid
            container
            spacing={{ xs: 2, md: 4 }} // Reduced spacing on mobile
            sx={{ width: "100%", m: 0 }} // Remove default margin
          >
            {/* Logo and Welcome Section for larger screens */}
            {!isSmallScreen && (
              <Grid
                item
                xs={12}
                md={4}
                sx={{ p: { xs: 1, md: 2 } }} // Adjust padding
              >
                <Box
                  sx={{
                    color: "white",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: { xs: 2, md: 4 },
                  }}
                >
                  <Box sx={{ mb: 6 }}>
                    <img
                      src={Logo}
                      alt="Logo"
                      style={{
                        height: 110,
                        width: "auto",
                        maxWidth: "100%",
                      }}
                    />
                    <Typography variant="h5" sx={{ mt: 2 }}>
                      Network Alarm
                    </Typography>
                  </Box>

                  <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
                    Welcome
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Please fill in your information to continue
                  </Typography>

                  <Typography sx={{ mt: "auto", opacity: 0.7 }}>
                    www.networkalarm.com
                  </Typography>
                </Box>
              </Grid>
            )}

            {/* Form Section */}
            <Grid
              item
              xs={12}
              md={8}
              sx={{ p: { xs: 1, md: 2 } }} // Adjust padding
            >
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3, md: 4 },
                  borderRadius: 2,
                  background: " #F9F9F1",
                  width: "100%",
                  maxWidth: "100%",
                  boxSizing: "border-box",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mb: 4,
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  Registration Form
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={{ xs: 2, sm: 3 }}>
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
                      />
                    </Grid>

                    {/* Email Field */}
                    {/* Email Field */}
                    <Grid item xs={12}>
                      <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailOutlinedIcon color="primary" />
                            </InputAdornment>
                          ),
                        }}
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
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
                        sx={textFieldStyles}
                      />
                    </Grid>

                    {/* Address Field */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
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
                        sx={textFieldStyles}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      bgcolor: "rgb(222, 82, 43)",
                      "&:hover": { bgcolor: "#0D1F2D" },
                      py: 1.5,
                      mt: 3,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      boxShadow: "none",
                    }}
                    size="large"
                  >
                    Register
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
