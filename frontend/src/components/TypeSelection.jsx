import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StoreTypeSelection() {
  const [storeType, setStoreType] = useState('');
  const navigate = useNavigate();

  const handleStoreTypeSelection = (selectedType) => {
    setStoreType(selectedType);
    navigate('/product-select');
  };


  //TODO: make a quick catalog creation tab and a custom where this list is involved
  //TODO: Handle category creation if not listed in a seller node
  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Please select the store type:</h2>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => handleStoreTypeSelection('grocery')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Grocery Store
        </button>
        <button
          onClick={() => handleStoreTypeSelection('electronic')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Electronic Store
        </button>
        <button
          onClick={() => handleStoreTypeSelection('hardware')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Hardware Store
        </button>
        <button
          onClick={() => handleStoreTypeSelection('clothing')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clothing Store
        </button>
        <button
          onClick={() => handleStoreTypeSelection('food')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Food Store
        </button>
        <button
          onClick={() => handleStoreTypeSelection('other')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Other
        </button>
      </div>
    </div>
  );
}

function ProductTypeSelection() {
  const navigate = useNavigate();

  const handleProductTypeSelection = (selectedType) => {
    // You can perform any necessary actions based on the selected type
    navigate('/add-catalog');
  };

  return (
    <div className="max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Please select the type of products:</h2>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => handleProductTypeSelection('standardized')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Standardized Products
        </button>
        <button
          onClick={() => handleProductTypeSelection('non-standardized')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Non-Standardized Products
        </button>
      </div>
    </div>
  );
}

export { StoreTypeSelection, ProductTypeSelection };
