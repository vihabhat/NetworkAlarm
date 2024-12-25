import {
    Box,
    Card,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    InputAdornment,
  } from '@mui/material';
  import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
  import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import FacebookIcon from '@mui/icons-material/Facebook';
  //import CircleIcon from '@mui/icons-material/Circle';
  
  function Login() {
    const isMobile = useMediaQuery('(max-width:600px)');
  
    const Logo = () => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 4 }}>
        <Box 
          component="img"
          src="../src/assets/Logo.png" // Replace with your actual logo path
          alt="Logo"
          sx={{
            height: '100px', // Adjust size as needed
            width: 'auto'
          }}
        />
        <Typography 
        fontWeight="800" 
        variant="h5" 
        sx={{ 
          ml: 1, 
          color: isMobile ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 50%, #6b21a8 100%)' : 'white' // Purple text for mobile view
        }}
      >
        NetworkAlarm
      </Typography>
      </Box>
    );
  
    return (
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 50%, #6b21a8 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden', // This will remove any potential scrollbars
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: { xs: '90%', sm: '400px', md: '1000px' },
            maxHeight: '90vh',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            overflow: 'auto',
            borderRadius: 2,
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Left Side - Welcome Section */}
          <Box
            sx={{
              position: 'relative',
              p: 6,
              background: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 50%, #6b21a8 100%)',
              color: 'white',
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: { md: 'auto' }
            }}
          >
            <Box>
              <Logo /> {/* Logo added here for larger screens */}
              <Typography 
                variant="h3" 
                fontWeight="bold" 
                sx={{ mb: 2, fontSize: { md: '2.5rem', lg: '3rem' } }}
              >
                Welcome Page
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                Sign in to continue access
              </Typography>
            </Box>
            <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
              www.yoursite.com
            </Typography>
          </Box>
  
          {/* Right Side - Sign In Form */}
          <Box
            sx={{
              p: { xs: 4, sm: 6 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              bgcolor: 'white',
              height: 'auto',
            }}
          >
            <Box color="purple" sx={{ width: '100%', maxWidth: '400px', mx: 'auto' }}>
              {isMobile && <Logo />} {/* Logo for mobile view */}
              
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  fontWeight: 600,
                  fontSize: '1.75rem'
                }}
              >
                Sign In
              </Typography>
  
              <Box 
                component="form" 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 2.5 
                }}
              >
                <TextField
                  fullWidth
                  type="email"
                  placeholder="Email Address"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 1.5,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      }
                    }
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon sx={{ color: 'text.secondary' }} />
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 1.5,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                      }
                    }
                  }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#9333ea',
                    '&:hover': { bgcolor: '#7e22ce' },
                    py: 1.5,
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    boxShadow: 'none'
                  }}
                >
                  Continue
                </Button>
              </Box>
  
              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    mb: 2.5
                  }}
                >
                  or Connect with Social Media
                </Typography>
  
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<TwitterIcon />}
                    sx={{
                      bgcolor: '#1DA1F2',
                      '&:hover': { bgcolor: '#1a8cd8' },
                      py: 1.5,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      boxShadow: 'none'
                    }}
                  >
                    Sign in with Twitter
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FacebookIcon />}
                    sx={{
                      bgcolor: '#4267B2',
                      '&:hover': { bgcolor: '#365899' },
                      py: 1.5,
                      borderRadius: 1.5,
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      boxShadow: 'none'
                    }}
                  >
                    Sign in with Facebook
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
  
  