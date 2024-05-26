import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { EcommerceCard } from '../Utils/EcommerceCard';

const MyCatalogs = () => {
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backend_url = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await axios.get(`${backend_url}/catalogue/get/`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, // Add the token to the 'Authorization' header
                        'Content-Type': 'application/json', // Adjust headers as needed
                    }
                });
                setCatalogs(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchCatalogs();
    }, [backend_url]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading catalogs: {error.message}</p>;

    const categories = [...new Set(catalogs.map(catalog => catalog.category))];

    return (
        <div className="w-[90%] mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-700">Your Catalogues by Category</h1>
            {categories.map(category => (
                <div key={category} className="mb-8 shadow px-5 py-5 rounded">
                    <h2 className="text-xl font-bold mb-4 text-blue-700">{category}</h2>
                    <hr />
                    <div className="flex flex-wrap gap-10">
                        {catalogs.filter(catalog => catalog.category === category).map(catalog => (
                            <Link key={catalog.id} to={`/yourcatalogue/${catalog.id}`} className="block">
                                <EcommerceCard
                                    imageUrl={`${backend_url}${catalog.product_image_1}`}
                                    productName={catalog.product_name}
                                    price={`${catalog.selling_prize}`}
                                    description={`MRP: ${catalog.mrp}`}
                                    ean={`${catalog.ean}`}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyCatalogs;
