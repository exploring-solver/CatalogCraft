import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Typography } from '@material-tailwind/react';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user details from your API
    axios.get('http://panel.mait.ac.in:8012/auth/user-details/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        // Assuming the API response contains user data
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 h-screen bg-yellow-50">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Card className="mb-4">
            <CardHeader className="bg-gray-800 text-white p-5">
              <Typography variant="h4" color="white">
                Profile
              </Typography>
            </CardHeader>
            <CardBody>
              <Typography variant="h6">Email: <span className='!font-normal text-black'>{user.email}</span></Typography>
              <Typography variant="h6">Name: <span className='!font-normal text-black'>{user.name}</span></Typography>
              <Typography variant="h6">Phone Number: <span className='!font-normal text-black'>{user.number}</span></Typography>
              <Typography variant="h6">Role: <span className='!font-normal text-black'>{user.role}</span></Typography>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}

export default ProfileScreen;
