import React, { useState } from 'react';
import CatalogueInput from './CatalogueInput';
import axios from 'axios';
import CatalogImageInput from './CatalogImageInput';
import { Input } from '@material-tailwind/react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddCatalogue() {

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

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
  const [isListening, setIsListening] = useState(false);
  const [wordsArray, setWordsArray] = useState([]);

  const recognition = new window.webkitSpeechRecognition(); // For Chrome
  recognition.continuous = true;
  recognition.lang = 'en-US';

  recognition.onend = function () {
    sendSpeechToServer(wordsArray);
  };

  recognition.onerror = function (event) {
    console.error('Speech recognition error:', event.error);
  };

  recognition.onresult = function (event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const words = transcript.split(',').map(word => word.trim());
    setWordsArray(prevWordsArray => prevWordsArray.concat(words.filter(Boolean)));
    console.log('Current array:', wordsArray);
  };

  function changeInputValues(values) {
    const form = document.getElementsByTagName("form")[0];
    const inputs = form.querySelectorAll("input, textarea, select");

    for (let i = 0; i < inputs.length && i < values.length; i++) {
      const input = inputs[i];
      const value = values[i];

      if (input.tagName.toLowerCase() === 'input') {
        if (input.type === 'checkbox' || input.type === 'radio') {
          input.checked = value;
        } else {
          input.value = value;
        }
      } else if (input.tagName.toLowerCase() === 'textarea') {
        input.value = value;
      } else if (input.tagName.toLowerCase() === 'select') {
        const option = input.querySelector(`option[value="${value}"]`);
        if (option) {
          option.selected = true;
        }
      }
    }
  }

  const BASE_URL = 'http://panel.mait.ac.in:3012';
  const sendSpeechToServer = (words) => {
    const prompt = "I am giving you these details of a form arrange the data in an array and separate them by a comma, " + words.join(', ');
    fetch(`${BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    })
      .then(response => response.json())
      .then(data => {
        const responseWordsArray = JSON.parse(data.text);
        console.log('Words array:', responseWordsArray);
        changeInputValues(responseWordsArray);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
      for (let i = 1; i <= 5; i++) {
        formDataWithImages.append(`product_image_${i}`, formData[`product_image_${i}`]);
      }
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
      setFormData({
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

  const toggleListening = () => {
    if (!isListening) {
      recognition.start();
      setIsListening(true);
      setWordsArray([]);
    } else {
      recognition.stop();
      setIsListening(false);
      sendSpeechToServer(wordsArray);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className='text-2xl font-mono my-5'>Catalogue Creation</h1>
        <button id="voiceButton" onClick={toggleListening} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {isListening ? "Stop Voice Input" : "Start Voice Input"}
        </button>
        <div className="form-group">
          <Input
            label='Product Name'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="mrp" className="block text-gray-700 text-sm font-bold mb-2">MRP</label> */}
          <Input
            label='MRP'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mrp"
            name="mrp"
            value={formData.mrp}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="selling_prize" className="block text-gray-700 text-sm font-bold mb-2">Selling Price</label> */}
          <Input
            label='Selling Price'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="selling_prize"
            name="selling_prize"
            value={formData.selling_prize}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="buying_prize" className="block text-gray-700 text-sm font-bold mb-2">Buying Price</label> */}
          <Input
            label='Buying Price'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="buying_prize"
            name="buying_prize"
            value={formData.buying_prize}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="hsn_code" className="block text-gray-700 text-sm font-bold mb-2">HSN Code</label> */}
          <Input
            label='HSN Code'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hsn_code"
            name="hsn_code"
            value={formData.hsn_code}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="gst_percentage" className="block text-gray-700 text-sm font-bold mb-2">GST Percentage</label> */}
          <Input
            label='GST Percentage'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="gst_percentage"
            name="gst_percentage"
            value={formData.gst_percentage}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="unit" className="block text-gray-700 text-sm font-bold mb-2">Unit</label> */}
          <Input
            label='Unit'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">Quantity</label> */}
          <Input
            label='Qunatity'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="standardized" className="block text-gray-700 text-sm font-bold mb-2">Standardized</label> */}
          <select
            label='Standardized'
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="standardized"
            name="standardized"
            value={formData.standardized}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          {/* <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label> */}
          <Input
            label='Category'
            type="text"
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div className="form-group w-72">
          {/* <label htmlFor="mapped_to_master" className="block text-gray-700 text-sm font-bold mb-2">Map
            to Master Catalogue</label> */}
          <select
            label='Map
          to Master Catalogue'
            className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="mapped_to_master"
            name="mapped_to_master"
            value={formData.mapped_to_master}
            onChange={handleChange}>
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>

          </select>
        </div>
        <div className="form-group">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file"
              className="form-control-file"
              id="product_image_1"
              name="product_image_1"
              onChange={handleImageChange} />
          </Button>
        </div>
        <div className="form-group">
          <label htmlFor="product_image_2" className="block text-gray-700 text-sm font-bold mb-2">Product Image 2</label>
          <input
            type="file"
            className="form-control-file"
            id="product_image_2"
            name="product_image_2"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_image_3" className="block text-gray-700 text-sm font-bold mb-2">Product Image 3</label>
          <input
            type="file"
            className="form-control-file"
            id="product_image_3"
            name="product_image_3"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_image_4" className="block text-gray-700 text-sm font-bold mb-2">Product Image 4</label>
          <input
            type="file"
            className="form-control-file"
            id="product_image_4"
            name="product_image_4"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="product_image_5" className="block text-gray-700 text-sm font-bold mb-2">Product Image 5</label>
          <input
            type="file"
            className="form-control-file"
            id="product_image_5"
            name="product_image_5"
            onChange={handleImageChange}
          />
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