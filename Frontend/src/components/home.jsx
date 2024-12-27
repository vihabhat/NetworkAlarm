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
  Fab,
  styled
} from '@mui/material';
import {
  NotificationsOutlined as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F6F4F0, #F6F4F0)',
  border: '1px solid rgba(121, 215, 190, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2E5077, #4DA1A9)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(45deg, #4DA1A9, #2E5077)',
  }
}));

// Sample data
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
    id: 2,
    title: "AI Workshop Series",
    organization: "Tech Institute",
    registeredCount: 1268,
    daysLeft: 2,
    status: "Offline",
    type: "Paid",
    logo: "/api/placeholder/50/50"
  },
  {
    id: 3,
    title: "Coding Championship",
    organization: "Tech Academy",
    registeredCount: 2456,
    daysLeft: 5,
    status: "Online",
    type: "Free",
    logo: "/api/placeholder/50/50"
  },
  {
    id: 4,
    title: "Data Science Bootcamp",
    organization: "Data Institute",
    registeredCount: 892,
    daysLeft: 12,
    status: "Hybrid",
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
  <GradientCard>
    <CardContent>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Avatar
          src={opportunity.logo}
          alt={opportunity.title}
          sx={{ 
            width: 56, 
            height: 56, 
            border: '2px solid #4DA1A9'
          }}
        />
        <Box display="flex" gap={1}>
          <Chip 
            label={opportunity.status}
            size="small"
            sx={{ 
              bgcolor: '#2E5077',
              color: 'white',
              '& .MuiChip-label': { px: 2 }
            }}
          />
          <Chip 
            label={opportunity.type}
            size="small"
            sx={{ 
              bgcolor: '#4DA1A9',
              color: 'white',
              '& .MuiChip-label': { px: 2 }
            }}
          />
        </Box>
      </Box>
      <Typography variant="h6" sx={{ color: '#2E5077', mb: 1 }}>
        {opportunity.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
        {opportunity.organization}
      </Typography>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          pt: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="body2" sx={{ color: '#4DA1A9' }}>
          {opportunity.registeredCount.toLocaleString()} Registered
        </Typography>
        <Typography variant="body2" sx={{ color: '#2E5077', fontWeight: 500 }}>
          {opportunity.daysLeft} days left
        </Typography>
      </Box>
    </CardContent>
  </GradientCard>
);

const EventItem = ({ event }) => (
  <Card sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.9)' }}>
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: '#2E5077' }}>
            <CalendarTodayIcon />
          </Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ color: '#2E5077' }}>
              {event.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {event.date} • {event.time}
            </Typography>
            <Chip 
              label={event.type}
              size="small"
              sx={{ 
                mt: 1,
                bgcolor: '#4DA1A9',
                color: 'white'
              }}
            />
          </Box>
        </Box>
        <IconButton sx={{ color: '#2E5077' }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </CardContent>
  </Card>
);

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('competitions');

  return (
    <Box 
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #F6F4F0, #4DA1A9 60%, rgba(121, 215, 190, 0.2))',
        py: 4
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Typography variant="h4" sx={{ color: '#2E5077', mb: 3 }}>
              Popular Opportunities
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                mb: 3
              }}
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "contained" : "outlined"}
                  onClick={() => setActiveCategory(category.id)}
                  sx={{
                    borderColor: activeCategory === category.id ? 'transparent' : '#2E5077',
                    bgcolor: activeCategory === category.id ? '#2E5077' : 'transparent',
                    color: activeCategory === category.id ? 'white' : '#2E5077',
                    '&:hover': {
                      bgcolor: activeCategory === category.id ? '#2E5077' : 'rgba(121, 215, 190, 0.1)',
                    }
                  }}
                >
                  <span style={{ marginRight: '8px' }}>{category.icon}</span>
                  {category.label}
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
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(121, 215, 190, 0.2)'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#2E5077' }}>
                    Upcoming Events
                  </Typography>
                  <Button sx={{ color: '#4DA1A9' }}>
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
        color="primary"
        sx={{ 
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: '#2E5077',
          '&:hover': {
            bgcolor: '#4DA1A9'
          }
        }}
      >
        <NotificationsIcon />
      </Fab>
    </Box>
  );
};

export default Home;