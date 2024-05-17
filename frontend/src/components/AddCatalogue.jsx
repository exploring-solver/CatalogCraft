import React, { useState } from 'react';
import CatalogueInput from './CatalogueInput';
import axios from 'axios';
import CatalogImageInput from './CatalogImageInput';
import { Button, Input } from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function AddCatalogue() {

  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(prevState => !prevState);
  };
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
    const prompt = "I am giving you these details of a form arrange the data in an array and separate them by a comma and if I tell in hindi then also just convert them in english and arrange the data in an array and separate them by a comma, " + words.join(', ');
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
    <div className="w-[90%] mx-auto mt-8">
      {/*TODO: There needs to be an image upload and auto fill details option for the Seller app coordinator or sales person to create catalogue very fast. Maybe use Gemini's generative AI for this using GCP*/}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex gap-1 flex-col">
        <h1 className='text-2xl font-mono my-5'>Catalogue Creation</h1>
        <Button variant='filled' color='amber' className="flex items-center gap-3 max-w-56" id="voiceButton" onClick={toggleListening} >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          </svg>
          {isListening ? "Stop Voice Input" : "Start Voice Input"}
        </Button>
        <div className='sm:flex gap-3 flex-wrap'>
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.product_name}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.mrp}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.selling_prize}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.buying_prize}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.hsn_code}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.gst_percentage}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.unit}</p>}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.quantity}</p>}
          </div>


          {/*TODO: there needs to be a select option from react select to make it a select with search for the seller NP.*/}
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
            {errorMessages && <p className="text-red-500 text-xs italic">{errorMessages.category}</p>}
          </div>
        </div>

        <div className='flex flex-wrap gap-10'>
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
        </div>
        <div className='flex flex-col gap-5'>
          <Button
            variant="outlined"
            className="flex items-center gap-3 text-base font-normal capitalize tracking-normal max-w-60"
            onClick={toggleAdditionalDetails}
          >
            {showAdditionalDetails ? 'Hide Additional Details' : 'Additional Details'}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3.5 w-3.5 transition-transform ${showAdditionalDetails ? 'rotate-180' : ''
                }`}
            />
          </Button>
          <br />
          {/*TODO: make more details additional to reduce the work on a seller NP to create catalogue.*/}
          {/*TODO: Make it as per taxonomy and when image is uplaoded it serves the purpose*/}
          {/*PITCH: Now you would think skipping these details will actually decrease the quality of catalogue but no our cv model actually works on this and makes sure that these details are filled exact from the database.
          Humen abhi inn feilds ko khali aur optional choda h to make catalogue digitization easy but if you want you can just get them from existing records too.*/}
          <div>
            {showAdditionalDetails && (
              <div className='flex flex-wrap gap-5 flex-'>
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
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button fullWidth color='green' variant='filled' type="submit">
            Add Catalogue
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCatalogue;