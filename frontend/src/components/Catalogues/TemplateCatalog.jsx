import React, { useEffect, useState } from 'react';
import { CatalogCard } from '../Utils/CatalogCard';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function TemplateCatalog() {
  const { name: selectedTemplate } = useParams();
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get(`http://panel.mait.ac.in:8012/catalogue/template-catalogues/${selectedTemplate}/`);
        const formattedData = response.data.map(catalog => ({
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
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, [selectedTemplate]); 

  const onSave = (index) => {
    console.log(`Save catalog at index: ${index}`);
  };

  const onRemove = (index) => {
    console.log(`Remove catalog at index: ${index}`);
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
        catalogs.map((catalog, index) => (
          <CatalogCard
            key={catalog.id}
            name={catalog.product_name}
            description={`MRP: ${catalog.mrp}, GST: ${catalog.gst_percentage}%`}
            asin={catalog.asin}
            upc={catalog.upc}
            images={catalog.images}
            category={catalog.category}
            onSave={() => onSave(index)}
            onRemove={() => onRemove(index)}
          />
        ))
      ) : (
        <Typography>No catalogs available</Typography>
      )}
    </div>
  );
}
