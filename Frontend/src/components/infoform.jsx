import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
  AccountCircle,
  Lock,
  Home,
} from "@mui/icons-material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Logo from "../assets/Logo.png";

const theme = createTheme({
  palette: { primary: { main: "rgb(222, 82, 43)" } },
  typography: { fontFamily: "'Inter', sans-serif" },
  components: {
    MuiTextField: {
      defaultProps: { variant: "outlined", fullWidth: true },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F9F9F1",
            "&:hover fieldset": { borderColor: "rgb(222, 82, 43)" },
          },
          "& input:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #F9F9F1 inset",
            "-webkit-text-fill-color": "black",
          },
        },
      },
    },
    MuiButton: { styleOverrides: { root: { textTransform: "none", padding: "12px" } } },
  },
});

const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#F9F9F1",
    "&.Mui-focused": {
      backgroundColor: "#F9F9F1",
    },
    "&:hover": {
      backgroundColor: "#F9F9F1",
    },
    "& .MuiInputAdornment-root": {
      alignItems: "flex-start",
      marginTop: "13px",
    },
  },
  "& input:-webkit-autofill, & textarea:-webkit-autofill": {
    "-webkit-box-shadow": "0 0 0 100px #F9F9F1 inset",
    "-webkit-text-fill-color": "black",
  },
};

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
    email: "",
  });
  const [errors, setErrors] = useState({});

  const fields = [
    { name: "name", label: "Full Name", icon: <Person /> },
    { name: "collegeName", label: "College Name", icon: <School /> },
    { name: "email", label: "Email Address", icon: <EmailOutlinedIcon />, type: "email" },
    { name: "phone", label: "Phone Number", icon: <Phone /> },
    { name: "collegeId", label: "College ID", icon: <Badge /> },
    { name: "username", label: "Username", icon: <AccountCircle /> },
    { name: "password", label: "Password", icon: <Lock />, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", icon: <Lock />, type: "password" },
    { name: "address", label: "Address (Optional)", icon: <Home />, multiline: true, rows: 2 },
  ];

  const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      if (!formData[field] && field !== "address") newErrors[field] = "This field is required";
    });
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/logins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        response.ok ? navigate("/success") : toast.error(data.message || "Registration failed");
      } catch {
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          display: "flex",
          alignItems: "center",
          background: "rgb(13, 32, 48)",
          overflowX: "hidden",
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
            <Grid item xs={12} md={8} sx={{ margin: "0 auto" }}>
              <Paper sx={{ p: 4, background: "#F9F9F1", borderRadius: 2 }}>
                <Typography variant="h4" fontWeight="bold" mb={4}>Registration Form</Typography>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {fields.map(({ name, label, icon, ...props }) => (
                      <Grid item xs={12} sm={6} key={name}>
                        <TextField
                          name={name}
                          label={label}
                          value={formData[name] || ""}
                          onChange={handleChange}
                          error={!!errors[name]}
                          helperText={errors[name]}
                          sx={textFieldStyles}
                          InputProps={{
                            startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                          }}
                          {...props}
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="yearOfStudy"
                        select
                        label="Year of Study"
                        value={formData.yearOfStudy}
                        onChange={handleChange}
                        error={!!errors.yearOfStudy}
                        helperText={errors.yearOfStudy}
                      >
                        {yearOptions.map((year) => (
                          <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                  <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5 }}>Register</Button>
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
