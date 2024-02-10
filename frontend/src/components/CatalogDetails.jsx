import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function CatalogDetails() {
  const { id } = useParams();
  const [catalogue, setCatalogue] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/catalog/${id}`)
      .then(response => {
        setCatalogue(response.data);
      })
      .catch(error => {
        console.error('Error fetching catalogue details:', error);
      });
  }, [id]);

  if (!catalogue) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    // Handle back button functionality
    // You can use react-router-dom's history object to go back
    // Example: history.goBack();
  };

  return (
    <div>
      <div>
        <button onClick={handleBack}>Back</button>
      </div>
      <h1>Catalogue Details</h1>
      <div>
        <h2>{catalogue.name}</h2>
        <p>Description: {catalogue.description}</p>
        <p>Price: {catalogue.price}</p>
        {/* Render carousel for images */}
        <div>
          {/* Render carousel images here */}
          {catalogue.images.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CatalogDetails;
