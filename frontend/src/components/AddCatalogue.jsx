import React, { useState } from 'react';
import CatalogueInput from './CatalogueInput';
import axios from 'axios';

function AddCatalogue() {
  const [formData, setFormData] = useState({
    product_name: '',
    mrp: '',
    selling_prize: '',
    buying_prize: '',
    hsn_code: '',
    gst_percentage: '',
    unit: '',
    quantity: '',
    standardized: '',
    category: '', // Update to match the new fields
    mapped_to_master: '',
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8000/catalogue/create/', formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      // Handle successful catalogue creation, such as redirecting to another page
    } catch (error) {
      console.error('Catalogue creation error:', error);
      if (error.response && error.response.data) {
        setErrorMessages(error.response.data);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Input fields for each catalogue detail */}
        <CatalogueInput
          label="Product Name"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          errorMessage={errorMessages.product_name}
        />
        <CatalogueInput
          label="MRP"
          name="mrp"
          value={formData.mrp}
          onChange={handleChange}
          errorMessage={errorMessages.mrp}
        />
        <CatalogueInput
          label="Selling Prize"
          name="selling_prize"
          value={formData.selling_prize}
          onChange={handleChange}
          errorMessage={errorMessages.selling_prize}
        />
        <CatalogueInput
          label="Buying Prize"
          name="buying_prize"
          value={formData.buying_prize}
          onChange={handleChange}
          errorMessage={errorMessages.buying_prize}
        />
        <CatalogueInput
          label="HSN Code"
          name="hsn_code"
          value={formData.hsn_code}
          onChange={handleChange}
          errorMessage={errorMessages.hsn_code}
        />
        <CatalogueInput
          label="GST Percentage"
          name="gst_percentage"
          value={formData.gst_percentage}
          onChange={handleChange}
          errorMessage={errorMessages.gst_percentage}
        />
        <CatalogueInput
          label="Unit"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          errorMessage={errorMessages.unit}
        />
        <CatalogueInput
          label="Quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          errorMessage={errorMessages.quantity}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="standardized">
            Standardized?
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="standardized"
            name="standardized"
            value={formData.standardized}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.standardized}</p>}
        </div>
        {/* Additional input fields for the new fields in the model */}
        <CatalogueInput
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          errorMessage={errorMessages.category}
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mapped_to_master">
            Map to Master Catalogue?
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mapping"
            name="mapped_to_master"
            value={formData.mapped_to_master}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.mapped_to_master}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Add Catalogue
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCatalogue;