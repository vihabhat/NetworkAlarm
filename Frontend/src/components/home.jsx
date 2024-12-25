import React, { useState } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Box,
  useTheme,
  useMediaQuery,
  Fab,
  Paper
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

// Sample data moved to separate file in real application
const categories = [
  { id: 'competitions', label: 'Competitions', icon: '🏆' },
  { id: 'hackathons', label: 'Hackathons', icon: '💻' },
  { id: 'assessments', label: 'Assessments', icon: '📝' },
  { id: 'scholarships', label: 'Scholarships', icon: '🎓' },
  { id: 'workshops', label: 'Workshops', icon: '🔧' },
  { id: 'conferences', label: 'Conferences', icon: '👥' },
  { id: 'cultural', label: 'Cultural', icon: '🎭' }
];

const opportunities = [
  {
    id: 1,
    title: "Technical Symposium 2024",
    organization: "Engineering College",
    registeredCount: 3078,
    daysLeft: 18,
    status: "Online",
    type: "Free",
    logo: "/api/placeholder/50/50"
  },
  {
    id: 1,
    title: "Technical Symposium 2024",
    organization: "Engineering College",
    registeredCount: 3078,
    daysLeft: 18,
    status: "Online",
    type: "Free",
    logo: "/api/placeholder/50/50"
  },
  {
    id: 1,
    title: "Technical Symposium 2024",
    organization: "Engineering College",
    registeredCount: 3078,
    daysLeft: 18,
    status: "Online",
    type: "Free",
    logo: "/api/placeholder/50/50"
  },
  {
    id: 2,
    title: "AI Workshop Series",
    organization: "Tech Institute",
    registeredCount: 1268,
    daysLeft: 2,
    status: "Offline",
    type: "Paid",
    logo: "/api/placeholder/50/50"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Code Olympics 2024",
    date: "Mar 15, 2024",
    time: "10:00 AM",
    type: "Competition"
  },
  {
    id: 2,
    title: "Data Science Workshop",
    date: "Mar 18, 2024",
    time: "2:00 PM",
    type: "Workshop"
  },
  {
    id: 3,
    title: "Tech Career Fair",
    date: "Mar 20, 2024",
    time: "11:00 AM",
    type: "Career Fair"
  }
];

const OpportunityCard = ({ opportunity }) => (
  <Card 
    sx={{ 
      height: '100%',
      background: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(156, 39, 176, 0.2))',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)'
      }
    }}
  >
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Avatar
          src={opportunity.logo}
          alt={opportunity.title}
          sx={{ width: 56, height: 56, border: '2px solid rgba(156, 39, 176, 0.3)' }}
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label={opportunity.status}
            size="small"
            sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)', color: 'white' }}
          />
          <Chip 
            label={opportunity.type}
            size="small"
            sx={{ bgcolor: 'rgba(156, 39, 176, 0.3)', color: 'white' }}
          />
        </Box>
      </Box>
      <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
        {opportunity.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
        {opportunity.organization}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          pt: 2,
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          {opportunity.registeredCount.toLocaleString()} Registered
        </Typography>
        <Typography variant="body2" sx={{ color: 'white' }}>
          {opportunity.daysLeft} days left
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

const EventItem = ({ event }) => (
  <Paper 
    sx={{ 
      p: 2,
      mb: 2,
      bgcolor: 'rgba(156, 39, 176, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      '&:hover': {
        bgcolor: 'rgba(156, 39, 176, 0.2)'
      }
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(156, 39, 176, 0.2)' }}>
          <CalendarTodayIcon />
        </Avatar>
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'white' }}>
            {event.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {event.date} • {event.time}
          </Typography>
          <Chip 
            label={event.type}
            size="small"
            sx={{ 
              mt: 1,
              bgcolor: 'rgba(156, 39, 176, 0.2)',
              color: 'white'
            }}
          />
        </Box>
      </Box>
      <IconButton 
        sx={{ 
          color: 'white',
          '&:hover': { bgcolor: 'rgba(156, 39, 176, 0.2)' }
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  </Paper>
);

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('competitions');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #9c27b0, #6a1b9a, #4a148c)',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
              Popular Opportunities
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 3,
                maxWidth: '100%',
                overflow: 'auto'
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "contained" : "outlined"}
                  onClick={() => setActiveCategory(category.id)}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    '&.MuiButton-contained': {
                      bgcolor: 'rgba(156, 39, 176, 0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(156, 39, 176, 0.3)'
                      }
                    },
                    '&:hover': {
                      bgcolor: 'rgba(156, 39, 176, 0.2)',
                      borderColor: 'rgba(255, 255, 255, 0.5)'
                    }
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{category.icon}</span>
                  {!isMobile && category.label}
                </Button>
              ))}
            </Box>

            <Grid container spacing={3}>
              {opportunities.map((opportunity) => (
                <Grid key={opportunity.id} item xs={12} md={6}>
                  <OpportunityCard opportunity={opportunity} />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card 
              sx={{ 
                bgcolor: 'rgba(156, 39, 176, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Upcoming Events
                  </Typography>
                  <Button 
                    sx={{ 
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(156, 39, 176, 0.2)' }
                    }}
                  >
                    View All
                  </Button>
                </Box>
                {upcomingEvents.map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Fab 
        color="secondary"
        sx={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: 'rgba(156, 39, 176, 0.9)',
          '&:hover': {
            bgcolor: 'rgba(156, 39, 176, 1)',
            transform: 'scale(1.1)'
          }
        }}
      >
        <NotificationsIcon />
      </Fab>
    </Box>
  );
};

export default Home;
