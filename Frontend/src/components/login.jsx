import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useTheme, useMediaQuery } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleRegisterClick = () => navigate("/infoform");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/logins/login", { email, password });
      
      if (response.status === 200) {
        // Store user data and email in localStorage
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        // Navigate to home page
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

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

  return (
    <Box sx={{ height: "100vh", width: "100vw", background: "#0D1F2D", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Card sx={{ width: "100%", maxWidth: { xs: "90%", sm: "400px", md: "1000px" }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, borderRadius: 2, boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)" }}>
        
        {/* Left Side - Welcome Section (Hidden on mobile) */}
        <Box sx={{ p: 6, background: "linear-gradient(to right, rgb(231, 88, 48), rgb(231, 88, 48))", color: "black", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "auto", display: { xs: "none", md: "flex" } }}>
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 4 }}>
              <Box component="img" src="../src/assets/Logo.png" alt="Logo" sx={{ height: "110px", width: "auto" }} />
              <Typography variant="h5" sx={{ fontWeight: "800", color: "black" }}>Network Alarm</Typography>
            </Box>
            <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>Welcome Page</Typography>
            <Typography variant="h6" sx={{ color: "rgba(2, 2, 2, 0.93)" }}>Sign in to continue access</Typography>
          </Box>
          <Typography sx={{ color: "rgba(9, 9, 9, 0.6)" }}>www.networkalarm.com</Typography>
        </Box>

        {/* Right Side - Sign In Form */}
        <Box sx={{ 
          p: { xs: 4, sm: 6 }, 
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          background: { xs: "linear-gradient(to right, rgb(231, 88, 48), rgb(231, 88, 48))", sm: "white" },
          color: "black"
        }}>
          <Box color="black" sx={{ width: "100%", maxWidth: "400px", mx: "auto" }}>
            {/* Mobile Welcome Header */}
            {isMobile && (
              <Box sx={{ 
                mb: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Box component="img" src="../src/assets/Logo.png" alt="Logo" sx={{ height: "80px", width: "auto" }} />
                  <Typography variant="h5" sx={{ fontWeight: "800", color: "black" }}>Network Alarm</Typography>
                </Box>
                <Typography variant="h6" sx={{ color: "rgba(2, 2, 2, 0.93)", textAlign: "center" }}>
                  Sign in to continue access
                </Typography>
              </Box>
            )}

            <Typography variant="h5" sx={{ mb: 4, fontWeight: 600, fontSize: "1.75rem", color: "black" }}>Sign In</Typography>

            {error && (
              <Typography sx={{ 
                color: "error.main", 
                fontSize: "0.875rem", 
                mb: 2.5,
                p: 1.5,
                bgcolor: "error.light",
                borderRadius: 1,
                textAlign: "center"
              }}>
                {error}
              </Typography>
            )}

            <Box component="form" onSubmit={handleLoginSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              <TextField
                fullWidth
                type="email"
                placeholder="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 1.5 },
                }}
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 1.5 },
                }}
                sx={textFieldStyles}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#0D1F2D",
                  "&:hover": { bgcolor: "#1a3346" },
                  py: 1.5,
                  borderRadius: 1.5,
                  textTransform: "none",
                  fontSize: "1rem",
                  boxShadow: "none",
                }}
              >
                Continue
              </Button>
            </Box>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Typography sx={{ color: "black", fontSize: "0.875rem", mb: 2.5 }}>
                or Register Now
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegisterClick}
                  sx={{
                    bgcolor: "#0D1F2D",
                    "&:hover": { bgcolor: "#1a3346" },
                    py: 1.5,
                    borderRadius: 1.5,
                    textTransform: "none",
                    fontSize: "0.875rem",
                    boxShadow: "none",
                  }}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Login;