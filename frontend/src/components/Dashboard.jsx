import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the user details from your API
        axios.get('http://localhost:8000/auth/user-details/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Add the token to the 'Authorization' header
                'Content-Type': 'application/json', // Adjust headers as needed
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
    }, []); // Use empty dependency array to fetch user details only once on component mount

    return (
        <div className="max-w-4xl mx-auto mt-8">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <h2 className="text-xl font-bold mb-2">Logged in as</h2>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Number:</strong> {user.number}</p>
                        <p><strong>Role:</strong> {user.role} NP</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-xl font-bold mb-2">Catalogs</h2>
                        {/* Render catalogs here */}
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            <Link to={'/store-select'}>
                                Add Catalog
                            </Link>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Dashboard;
