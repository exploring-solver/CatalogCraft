import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from React Router

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
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <hr />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {catalogs.map(catalog => (
              <Link key={catalog.id} to={`/catalogue/${catalog.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md p-4 cursor-pointer">
                  <img src={`${url}${catalog.product_image_1}`} alt={catalog.product_name} className="w-full h-32 object-cover mb-4" />
                  <h3 className="text-lg font-bold mb-2">{catalog.product_name}</h3>
                  <p className="text-sm">MRP: {catalog.mrp}</p>
                  <p className="text-sm">Selling Price: {catalog.selling_prize}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Catalogs;
