import React, { useEffect, useState } from 'react';
import { CatalogCard } from '../Utils/CatalogCard';
import { Typography } from '@material-tailwind/react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function BulkDataAddition() {
    const { name: selectedTemplate } = useParams();
    const [catalogs, setCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('bulkUploadResponse');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                const formattedData = parsedData.map(catalog => ({
                    ...catalog,
                    images: [
                        catalog.product_image_1,
                        catalog.product_image_2,
                        catalog.product_image_3,
                        catalog.product_image_4,
                        catalog.product_image_5
                    ].filter(Boolean)
                }));
                setCatalogs(formattedData);
            }
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, []);

    const handleSubmit = async (catalogData) => {
        if (window.confirm('Are you sure you want to create this catalog?')) {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const formDataWithImages = new FormData();

                for (let i = 1; i <= 5; i++) {
                    if (catalogData[`product_image_${i}`]) {
                        formDataWithImages.append(`product_image_${i}`, catalogData[`product_image_${i}`]);
                    }
                }
                for (const key in catalogData) {
                    if (!key.startsWith('product_image_')) {
                        formDataWithImages.append(key, catalogData[key]);
                    }
                }
                const response = await axios.post('http://panel.mait.ac.in:8012/catalogue/create/', formDataWithImages, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log(response.data);
                alert('Catalogue Created Successfully!!');
                setCatalogs(prevCatalogs => prevCatalogs.filter(item => item.id !== catalogData.id));
            } catch (error) {
                console.error('Catalogue creation error:', error);
                if (error.response && error.response.data) {
                    alert('Error creating catalogue: ' + JSON.stringify(error.response.data));
                }
            }
        }
    };

    const onRemove = (catalog) => {
        if (window.confirm('Are you sure you want to remove this catalog?')) {
            setCatalogs(prevCatalogs => prevCatalogs.filter(item => item.id !== catalog.id));
            alert('Catalogue removed successfully!');
        }
    };

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error loading catalogs: {error.message}</Typography>;
    }

    return (
        <div className="flex flex-wrap mt-10 gap-10 bg-gray-50 p-5 justify-center">
            {catalogs && catalogs.length > 0 ? (
                catalogs.map((catalog) => (
                    <CatalogCard
                        key={catalog.id}
                        catalog={catalog}
                        onSave={handleSubmit}
                        onRemove={onRemove}
                    />
                ))
            ) : (
                <Typography>No catalogs available</Typography>
            )}
        </div>
    );
}
