import React, { useState } from 'react';
import CatalogueInput from './CatalogueInput';
import axios from 'axios';
import CatalogImageInput from './CatalogImageInput';

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
    category: '', 
    mapped_to_master: '',
    product_image_1: null,
    product_image_2: null,
    product_image_3: null,
    product_image_4: null,
    product_image_5: null,
  });
  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const formDataWithImages = new FormData();
      // Append image files to the formData object
      for (let i = 1; i <= 5; i++) {
        formDataWithImages.append(`product_image_${i}`, formData[`product_image_${i}`]);
      }
      // Append other form data fields
      for (const key in formData) {
        if (key !== 'product_image_1' && key !== 'product_image_2' && key !== 'product_image_3' && key !== 'product_image_4' && key !== 'product_image_5') {
          formDataWithImages.append(key, formData[key]);
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
      setFormData({ // Reset form fields to their initial state
        product_name: '',
        mrp: '',
        selling_prize: '',
        buying_prize: '',
        hsn_code: '',
        gst_percentage: '',
        unit: '',
        quantity: '',
        standardized: '',
        category: '', 
        mapped_to_master: '',
        product_image_1: null,
        product_image_2: null,
        product_image_3: null,
        product_image_4: null,
        product_image_5: null,
      });
      setErrorMessages({});
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
        <h1 className='text-2xl font-mono my-5'>Catalogue Creation</h1>
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
        <CatalogImageInput
          label="Product Image 1"
          name="product_image_1"
          type="file"
          onChange={handleImageChange}
          errorMessage={errorMessages.product_image_1}
        />
        <CatalogImageInput
          label="Product Image 2"
          name="product_image_2"
          type="file"
          onChange={handleImageChange}
          errorMessage={errorMessages.product_image_2}
        />
        <CatalogImageInput
          label="Product Image 3"
          name="product_image_3"
          type="file"
          onChange={handleImageChange}
          errorMessage={errorMessages.product_image_3}
        />
        <CatalogImageInput
          label="Product Image 4"
          name="product_image_4"
          type="file"
          onChange={handleImageChange}
          errorMessage={errorMessages.product_image_4}
        />
        <CatalogImageInput
          label="Product Image 5"
          name="product_image_5"
          type="file"
          onChange={handleImageChange}
          errorMessage={errorMessages.product_image_5}
        />
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