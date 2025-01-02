// src/services/api.js

const API_BASE_URL = 'http://localhost:5000/api';

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/logins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userData.name,
        collegeName: userData.collegeName,
        email: userData.email,
        phone: userData.phone,
        collegeId: userData.collegeId,
        yearOfStudy: userData.yearOfStudy,
        username: userData.username,
        password: userData.password,
        address: userData.address
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Something went wrong');
  }
};

// services/api.js
export const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/events');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Ensure we have the events array
    if (!data.events || !Array.isArray(data.events)) {
      throw new Error('Invalid data format received from server');
    }
    
    return data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await fetch('http://localhost:5000/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};