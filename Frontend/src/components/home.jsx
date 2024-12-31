import React, { useState } from 'react';
import { styled, createTheme } from '@mui/material/styles';
import {
  Box, Container, Typography, Button, IconButton, Grid, Card, CardContent,
  Avatar, Paper, AppBar, Toolbar, ThemeProvider, CssBaseline, InputBase,
  Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, CircularProgress
} from '@mui/material';
import {
  NotificationsOutlined, PersonOutline, Search, HomeOutlined,
  CalendarTodayOutlined, ArrowForwardOutlined, MenuOutlined,
  ExploreOutlined, SettingsOutlined, GroupOutlined
} from '@mui/icons-material';
import { Heart, MessageSquare, Share2 } from 'lucide-react';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(231, 88, 48)',
      light: 'rgb(255, 122, 89)',
      dark: 'rgb(183, 66, 34)'
    },
    background: {
      default: '#0D1F2D',
      paper: 'rgba(30, 52, 69, 0.95)'
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)'
    }
  },
  typography: {
    fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
    h4: { fontWeight: 700, letterSpacing: '0.02em' },
    h6: { fontWeight: 600, letterSpacing: '0.01em' },
    button: { textTransform: 'none', letterSpacing: '0.02em' }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, rgba(30, 52, 69, 0.95), rgba(30, 52, 69, 0.85))',
          backdropFilter: 'blur(10px)',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-4px)' }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-2px)' }
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': { borderWidth: '2px' }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.1)' }
        }
      }
    }
  }
});

const StyledSearchBar = styled(Paper)(({ theme }) => ({
  padding: '2px 16px',
  display: 'flex',
  alignItems: 'center',
  width: 300,
  borderRadius: theme.shape.borderRadius * 3,
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)'
}));

const defaultCollegeEvents = [{
  id: 1,
  college: "COLLEGE 1",
  verified: true,
  title: "Open Mic Night! 🎤 ✨",
  description: "Join us for an evening of talent and creativity at our Innovation Hub.",
  date: "MON, 17 JAN 2024",
  time: "09:00 AM - 05:00 PM",
  likes: 24,
  comments: 5,
  shares: 2,
  image: "/api/placeholder/600/300"
}
];

const defaultUpcomingEvents = [
  { title: 'Web3 Summit', date: 'Mar 15, 2024', icon: '🌐' },
  { title: 'Design Systems Workshop', date: 'Mar 18, 2024', icon: '🎨' },
  { title: 'Product Launch', date: 'Mar 20, 2024', icon: '🚀' }
];

const navItems = [
  { text: 'Home', icon: <HomeOutlined /> },
  { text: 'Events', icon: <CalendarTodayOutlined /> },
  { text: 'Explore', icon: <ExploreOutlined /> },
  { text: 'Community', icon: <GroupOutlined /> },
  { text: 'Settings', icon: <SettingsOutlined /> }
];

const SocialAction = ({ icon: Icon, count }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    '&:hover': { color: 'primary.main' },
    cursor: 'pointer'
  }}>
    <Icon size={20} /> {count}
  </Box>
);

const EventCard = ({ event }) => (
  <Card sx={{ mb: 4, borderRadius: 4, overflow: 'hidden' }}>
    <Box sx={{ position: 'relative', height: 200 }}>
      <img
        src={event.image}
        alt={event.title}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Box>
    <CardContent sx={{ p: 3 }}>
      <EventHeader college={event.college} verified={event.verified} date={event.date} time={event.time} />
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>{event.title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>{event.description}</Typography>
      <Box sx={{ display: 'flex', gap: 4, color: 'text.secondary' }}>
        <SocialAction icon={Heart} count={event.likes} />
        <SocialAction icon={MessageSquare} count={event.comments} />
        <SocialAction icon={Share2} count={event.shares} />
      </Box>
    </CardContent>
  </Card>
);

const EventHeader = ({ college, verified, date, time }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }} />
      <Box>
        <Typography variant="h6">
          {college}
          {verified && <Box component="span" sx={{ ml: 1, color: 'primary.main' }}>✓</Box>}
        </Typography>
        <Typography variant="body2" color="text.secondary">{date} • {time}</Typography>
      </Box>
    </Box>
    <Button variant="outlined" color="primary" sx={{ borderRadius: 8, px: 3 }}>Follow</Button>
  </Box>
);

const UpcomingEventItem = ({ event }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    mb: 2.5,
    p: 2,
    borderRadius: 2,
    bgcolor: 'rgba(255, 255, 255, 0.03)',
    '&:hover': {
      bgcolor: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(4px)'
    },
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer'
  }}>
    <Avatar sx={{ bgcolor: 'primary.main', fontSize: '1.2rem' }}>{event.icon}</Avatar>
    <Box sx={{ ml: 2, flexGrow: 1 }}>
      <Typography variant="subtitle1">{event.title}</Typography>
      <Typography variant="caption" color="text.secondary">{event.date}</Typography>
    </Box>
    <IconButton size="small" sx={{ color: 'primary.main', '&:hover': { bgcolor: 'rgba(231, 88, 48, 0.1)' } }}>
      <ArrowForwardOutlined />
    </IconButton>
  </Box>
);

const NetworkAlarm = ({ collegeEvents = defaultCollegeEvents, upcomingEvents = defaultUpcomingEvents }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const NavDrawer = (
    <Box sx={{ bgcolor: 'background.paper', height: '100%' }}>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.text} sx={{ py: 2 }}>
            <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', minWidth: '100vw' }}>
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                border: 'none',
                bgcolor: 'background.paper'
              }
            }}
          >
            {NavDrawer}
          </Drawer>
        )}

        <Box component="main" sx={{ flexGrow: 1, pb: 8 }}>
          <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Toolbar>
              {isMobile && (
                <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
                  <MenuOutlined />
                </IconButton>
              )}
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>Network</Box>
                Alarm
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StyledSearchBar sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <InputBase placeholder="Search events..." sx={{ ml: 1, flex: 1 }} />
                  <IconButton type="submit" sx={{ p: '10px' }}><Search /></IconButton>
                </StyledSearchBar>
                <IconButton color="inherit"><NotificationsOutlined /></IconButton>
                <Avatar sx={{ bgcolor: 'primary.main', cursor: 'pointer', '&:hover': { bgcolor: 'primary.dark' } }}>
                  <PersonOutline />
                </Avatar>
              </Box>
            </Toolbar>
          </AppBar>

          <Container maxWidth="xl" sx={{ mt: 4, px: { xs: 2, sm: 3, md: 4 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                {collegeEvents.map(event => <EventCard key={event.id} event={event} />)}
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, position: 'sticky', top: 100 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>UPCOMING EVENTS</Typography>
                    {upcomingEvents.map((event, index) => (
                      <UpcomingEventItem key={index} event={event} />
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>

          {isMobile && (
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }} elevation={0}>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', p: 1.5 }}>
                {navItems.slice(0, 4).map((item) => (
                  <Box key={item.text} sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0.5,
                    color: item.text === 'Home' ? 'primary.main' : 'text.secondary',
                    cursor: 'pointer',
                    '&:hover': { color: 'primary.main' }
                  }}>
                    {item.icon}
                    <Typography variant="caption">{item.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}

          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
            }}
          >
            {NavDrawer}
          </Drawer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default NetworkAlarm;