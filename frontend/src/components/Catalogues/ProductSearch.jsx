import { Button, Input, Typography } from '@material-tailwind/react';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import banner from "../../assets/bg1_digi-transparent.png"
import CatalogImageInput from '../CatalogImageInput';
const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [image, setImage] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };

      recognitionRef.current = recognition;
    } else {
      console.error('Speech recognition not supported in this browser.');
    }
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  return (
    <div className='h-screen bg-orange-50 flex justify-center items-center'>
      <div className="product-search-container ">
        <img src={banner} className='m-auto w-full max-w-[400px] h-auto' alt="" />
        <br />
        <Typography variant='h3' className='text-center'>Find your products in the CatalogCraft's catalog</Typography>
        <br />
        <div className="flex flex-col justify-center items-center">
          <Typography variant='h6'>Place your product image here</Typography>
          {image && <img src={image} alt="Product" className="product-image" />}
          <CatalogImageInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="image-input"
          />
        </div>
        <br />
        <div className="flex gap-10 justify-center items-center mx-5">
          <Input
            label='Product name, UPC, EAN, ISBN or ASIN'
            size='xl'
            type="text"
            placeholder="Product name, UPC, EAN, ISBN or ASIN"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="product-search-input !text-black"
          />

          <Button variant='filled' color='amber' className="flex items-center gap-3 max-w-56" id="voiceButton" onClick={handleVoiceInput} >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
            </svg>
            {isListening ? "Stop Voice Input" : "Speak Here!!"}
          </Button>
        </div>
        <div className="dropdown-container flex flex-col gap-4 justify-center items-center my-4">
          <Typography variant='h6' className='text-center'>Use Templates to create Catalog in Seconds</Typography>
          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="template-dropdown p-2 border border-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black bg-transparent"
          >
            <option className='' value="">Select a template...</option>
            <option className='' value="template1">Template 1</option>
            <option className='' value="template2">Template 2</option>
            <option className='' value="template3">Template 3</option>
          </select>
        </div>
        {/* Create Schema and frontend and application design to showcase the effort and explain the architecture. */}
        {/* PITCH : Include the complexity and database integration to ensure fast and efficient creation. */}
        <div className="flex justify-center items-center flex-wrap gap-5">
          <Link className='text-blue-800 text-lg underline' to="/add-catalog" >
            I am adding a product not available in CatalogCraft
          </Link>
          <Link className='text-blue-800 text-lg underline' to="/upload-products" >
            I am uploading a file to add multiple products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
