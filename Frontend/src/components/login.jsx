import {
  Box,
  Card,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

function Login() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/infoform");
  };
  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'white',
        '&.Mui-focused': {
            backgroundColor: 'white'
        },
        '&:hover': {
            backgroundColor: 'white'
        }
    },
    // Handle Webkit browsers autofill
    '& input:-webkit-autofill': {
        '-webkit-box-shadow': '0 0 0 100px white inset',
        '-webkit-text-fill-color': 'black',
    },
    '& input:-webkit-autofill:focus': {
        '-webkit-box-shadow': '0 0 0 100px white inset',
        '-webkit-text-fill-color': 'black',
    },
    '& input:-webkit-autofill:hover': {
        '-webkit-box-shadow': '0 0 0 100px white inset',
        '-webkit-text-fill-color': 'black',
    },
    // Handle Firefox autofill
    '& input:autofill': {
        backgroundColor: 'white !important',
        color: 'black !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(0, 0, 0, 0.2)',
    }
};
  const Logo = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 4 }}>
      <Box
        component="img"
        src="../src/assets/Logo.png"
        alt="Logo"
        sx={{
          height: "110px",
          width: "auto",
        }}
      />
      <Typography
        fontWeight="800"
        variant="h5"
        sx={{
          ml: 1,
          color: isMobile ? "#0D1F2D" : "black",
        }}
      >
        Network Alarm
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "#0D1F2D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: { xs: "90%", sm: "400px", md: "1000px" },
          maxHeight: "90vh",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          overflow: "auto",
          borderRadius: 2,
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        {/* Left Side - Welcome Section */}
        <Box
          sx={{
            position: "relative",
            p: 6,
            background:
              "linear-gradient(to right, rgb(231, 88, 48) 0%, rgb(231, 88, 48) 100%);",
            color: "black",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            justifyContent: "space-between",
            height: { md: "auto" },
          }}
        >
          <Box>
            <Logo />
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ mb: 2, fontSize: { md: "2.5rem", lg: "3rem" } }}
            >
              Welcome Page
            </Typography>
            <Typography variant="h6" sx={{ color: "rgba(2, 2, 2, 0.93)" }}>
              Sign in to continue access
            </Typography>
          </Box>
          <Typography sx={{ color: "rgba(9, 9, 9, 0.6)" }}>
            www.networkalarm.com
          </Typography>
        </Box>

        {/* Right Side - Sign In Form */}
        <Box
          sx={{
            p: { xs: 4, sm: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "white",
            height: "auto",
          }}
        >
          <Box
            color="black"
            sx={{ width: "100%", maxWidth: "400px", mx: "auto" }}
          >
            {isMobile && <Logo />}

            <Typography
              variant="h5"
              sx={{
                mb: 4,
                fontWeight: 600,
                fontSize: "1.75rem",
              }}
            >
              Sign In
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
              }}
            >
              <TextField  
                fullWidth
                type="email"
                placeholder="Email Address"
                variant="outlined"
                defaultValue=""
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon sx={{ color: "" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 1.5,
                  },
                }}
                sx={textFieldStyles}
              />
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: 1.5,
                  },
                }}
                sx={textFieldStyles}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#0D1F2D",
                  "&:hover": { bgcolor: "rgb(231, 88, 48)" },
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
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  mb: 2.5,
                }}
              >
                or Register Now
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleRegisterClick}
                  sx={{
                    bgcolor: "#0D1F2D",
                    "&:hover": { bgcolor: "rgb(231, 88, 48)" },
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
