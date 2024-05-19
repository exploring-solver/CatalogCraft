import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router
import { EcommerceCard } from './Utils/EcommerceCard';

function Catalogs() {
  const [catalogsByCategory, setCatalogsByCategory] = useState({});
  const url = "http://panel.mait.ac.in:8012";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://panel.mait.ac.in:8012/catalogue/get-all/');
        const catalogs = response.data;

        // Group catalogs by category
        const catalogsGroupedByCategory = {};
        catalogs.forEach(catalog => {
          if (catalog.category in catalogsGroupedByCategory) {
            catalogsGroupedByCategory[catalog.category].push(catalog);
          } else {
            catalogsGroupedByCategory[catalog.category] = [catalog];
          }
        });

        setCatalogsByCategory(catalogsGroupedByCategory);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Catalogs by Category</h1>
      {Object.entries(catalogsByCategory).map(([category, catalogs]) => (
        <div key={category} className="mb-8 shadow px-5 py-5 rounded">
          <h2 className="text-xl font-bold mb-4 text-orange-700">{category}</h2>
          <hr />
          <div className="flex flex-wrap gap-10 ">
            {catalogs.map(catalog => (
              <Link key={catalog.id} to={`/catalogue/${catalog.id}`} className="block">
                <EcommerceCard
                  imageUrl={`${url}${catalog.product_image_1}`}
                  productName={catalog.product_name}
                  price={`${catalog.selling_prize}`}
                  description={`MRP: ${catalog.mrp}`}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Catalogs;
