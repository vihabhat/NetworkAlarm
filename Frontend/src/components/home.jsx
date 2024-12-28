/* eslint-disable no-unused-vars */
import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  LinearProgress,
  Paper,
  AppBar,
  Toolbar,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@mui/material';
import {
  NotificationsOutlined,
  PersonOutline,
  SettingsOutlined,
  CalendarToday,
  ArrowForward
} from '@mui/icons-material';

// Custom theme based on the retro design
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(231, 88, 48)',
    },
    secondary: {
      main: 'rgb(149, 167, 179)',
    },
    background: {
      default: ' #0D1F2D',
      paper: 'rgb(246, 242, 242)',
    },
    text: {
      primary: 'rgb(245, 240, 240)',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: 1,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100% !important',
          padding: '0 !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'uppercase',
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(136, 170, 198, 0.41)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

// Static data
const analyticsData = [
];

const opportunitiesData = [
  
  {
    title: 'AI Hackathon',
    description: 'Build the future',
    events: 'events-2'
  },
];

const eventsData = [
  { title: 'Web3 Summit', date: 'Mar 15, 2024' },
  { title: 'Design Systems Workshop', date: 'Mar 18, 2024' },
  { title: 'Product Launch', date: 'Mar 20, 2024' },
];

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: 'background.default'
      }}>
        {/* Top Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar sx={{ px: { xs: 2, sm: 4 } }}>
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              gap: { xs: 1, sm: 3 },
              overflow: 'auto'
            }}>
              {['Home','events','Profile', 'Settings'].map((item) => (
                <Button
                  key={item}
                  color="inherit"
                  sx={{ 
                    opacity: 0.7,
                    '&:hover': { opacity: 1 },
                    minWidth: 'auto'
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
            <IconButton color="primary">
              <NotificationsOutlined />
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.main', ml: 2 }}>
              <PersonOutline />
            </Avatar>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, sm: 4 }
        }}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            {/* Left Sidebar */}
            <Grid item xs={12} md={3}>
              <Box sx={{ mb: 4 }}>
                {analyticsData.map((item, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: index === 0 ? 'primary.main' : 'secondary.main',
                          mr: 2,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={item.value}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Center Content */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" align="center" gutterBottom>
                POPULAR OPPORTUNITIES
              </Typography>
              <Typography
                variant="body1"
                align="center"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Discover trending opportunities and events in your field
              </Typography>

              

              <Grid container spacing={3}>
                {opportunitiesData.map((opportunity, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }} />
                          <Chip
                            label={opportunity.events}
                            size="small"
                            sx={{ bgcolor: 'secondary.main' }}
                          />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {opportunity.title}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 2 }}>
                          {opportunity.description}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: 'text.secondary',
                          }}
                        >
                          
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            {/* Right Sidebar */}
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    UPCOMING EVENTS
                  </Typography>
                  {eventsData.map((event, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        gap: 2,
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <CalendarToday />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle2">{event.title}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.date}
                        </Typography>
                      </Box>
                      <IconButton size="small">
                        <ArrowForward />
                      </IconButton>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;