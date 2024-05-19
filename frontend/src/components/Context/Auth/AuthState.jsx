import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthState = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://panel.mait.ac.in:8012/auth/user-details/', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        });

        setUser(response.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);


  const logout = async () => {
    try {
      await axios.post('http://panel.mait.ac.in:8012/auth/logout/', {
        refresh_token: localStorage.getItem('refreshToken'),
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const contextValue = {
    isAuthenticated,
    user,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;