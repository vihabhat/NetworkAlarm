import React, { useState, useEffect } from 'react';
import { LogOut } from "lucide-react";

const UserDropdown = ({ isOpen }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        
        if (!userEmail) {
          throw new Error('No user email found');
        }

        const response = await fetch(`http://localhost:5000/api/user/${userEmail}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        
        const data = await response.json();
        setUserData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUserData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignOut = () => {
    localStorage.removeItem('userEmail');
    window.location.href = '/login';
  };

  return (
    <div className="fixed right-4 top-16 w-64 bg-slate-800 rounded-lg shadow-lg border border-slate-700 z-50">
      {loading ? (
        <div className="p-4 text-center">
          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
        </div>
      ) : error ? (
        <div className="p-4 text-red-500 text-sm">{error}</div>
      ) : userData ? (
        <>
          <div className="p-4 border-b border-slate-700">
            <h3 className="font-semibold text-lg">{userData.name}</h3>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>
          <div className="p-2">
            <div className="p-2 text-sm text-gray-400">
              <p>College: {userData.college_name}</p>
              <p>College ID: {userData.college_id}</p>
            </div>
            <button 
              onClick={handleSignOut}
              className="w-full mt-2 p-2 text-left text-red-500 hover:bg-slate-700 rounded flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 text-center text-gray-400">No user data available</div>
      )}
    </div>
  );
};

export default UserDropdown;