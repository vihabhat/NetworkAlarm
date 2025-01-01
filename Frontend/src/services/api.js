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