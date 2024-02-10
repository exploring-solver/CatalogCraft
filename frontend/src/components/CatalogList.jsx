import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function CatalogList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-5">Categories</h1>
      <ul className="divide-y divide-gray-300">
        {categories.map(category => (
          <li key={category.id} className="py-4">
            <h2 className="text-2xl font-bold mb-2">{category.name}</h2>
            <ul>
              {category.catalogues.map(catalogue => (
                <li key={catalogue.id} className="py-2">
                  <Link to={`/catalog/${catalogue.id}`} className="text-blue-600 hover:underline">{catalogue.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CatalogList;
