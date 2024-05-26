import React, { useContext, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from '@material-tailwind/react';
import CataContext from '../Context/Catalogue/CataContext';
import { useNavigate } from 'react-router-dom';
import ProductSearch from './ProductSearch';
import axios from 'axios';

const CatalogueLateralForm = () => {
  const [showAdditional, setShowAdditional] = useState(false);
  const { searchedCatalog } = useContext(CataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    seller_sku: '',
    selling_prize: '',
    quantity: '',
    item_condition: '',
    hsn_code: '',
    add_offer: '',
    additional_description: '',
    product_tax_code: '',
    sale_price_offer_details: '',
    product_name: searchedCatalog.product_name || '',
    mrp: searchedCatalog.mrp || '',
    gst_percentage: searchedCatalog.gst_percentage || '',
    csin: searchedCatalog.csin || '',
    ean: searchedCatalog.ean || '',
    category: searchedCatalog.category || '',
  });
  const [errorMessages, setErrorMessages] = useState({});
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (searchedCatalog.product_name === null) {
      navigate('/product-search');
    } else {
      setFormData((prevData) => ({
        ...prevData,
        product_name: searchedCatalog.product_name,
        mrp: searchedCatalog.mrp,
        gst_percentage: searchedCatalog.gst_percentage,
        csin: searchedCatalog.csin,
        ean: searchedCatalog.ean,
        category: searchedCatalog.category,
      }));
    }
  }, [searchedCatalog, navigate]);

  const handleToggleAdditional = () => {
    setShowAdditional(!showAdditional);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const formDataWithImages = new FormData();

      for (let i = 1; i <= 5; i++) {
        formDataWithImages.append(`product_image_${i}`, searchedCatalog[`product_image_${i}`]);
      }

      for (const key in formData) {
        formDataWithImages.append(key, formData[key]);
      }

      const response = await axios.post(`${backend_url}/catalogue/create/`, formDataWithImages, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      alert('Catalogue Created Successfully!!');
      navigate('/product-search')
      setFormData({
        seller_sku: '',
        selling_prize: '',
        quantity: '',
        item_condition: '',
        hsn_code: '',
        add_offer: '',
        additional_description: '',
        product_tax_code: '',
        sale_price_offer_details: '',
        product_name: searchedCatalog.product_name || '',
        mrp: searchedCatalog.mrp || '',
        gst_percentage: searchedCatalog.gst_percentage || '',
        csin: searchedCatalog.csin || '',
        ean: searchedCatalog.ean || '',
        category: searchedCatalog.category || '',
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
    <Card className="w-full max-w-lg mx-auto mt-10 bg-gray-100 p-5" component="form" onSubmit={handleSubmit}>
      <CardHeader variant="gradient" color="gray" className="mb-4 p-4">
        <Typography variant="h4" color="white">
          Catalog Details
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((index) => {
            const imageKey = `product_image_${index}`;
            const imageUrl = searchedCatalog[imageKey];
            if (imageUrl) {
              return (
                <img
                  key={index}
                  src={`${backend_url}${imageUrl}`}
                  alt={`Preview ${index}`}
                  className="h-16 w-16 object-cover border-2 border-gray-600"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">Name</Typography>
          <Typography className="mb-4">{searchedCatalog.product_name}</Typography>
          <Typography variant="h6" className="mb-2">MRP</Typography>
          <Typography className="mb-4">₹{searchedCatalog.mrp}</Typography>
          <Typography variant="h6" className="mb-2">GST Percentage</Typography>
          <Typography className="mb-4">{searchedCatalog.gst_percentage}%</Typography>
          <Typography variant="h6" className="mb-2">CSIN</Typography>
          <Typography className="mb-4">{searchedCatalog.csin}</Typography>
          <Typography variant="h6" className="mb-2">EAN</Typography>
          <Typography className="mb-4">{searchedCatalog.ean}</Typography>
          <Typography variant="h6" className="mb-2">Category</Typography>
          <Typography className="mb-4">{searchedCatalog.category}</Typography>
        </div>
        <Input label="Seller SKU" size="lg" name="seller_sku" value={formData.seller_sku} onChange={handleChange} />
        <Input label="Your Price" size="lg" name="selling_prize" value={formData.selling_prize} onChange={handleChange} />
        <Input label="Quantity" size="lg" name="quantity" value={formData.quantity} onChange={handleChange} />
        <Input label="HSN Code" size="lg" name="hsn_code" value={formData.hsn_code} onChange={handleChange} />

        <Button variant="text" className='bg-gray-500 w-fit' onClick={handleToggleAdditional}>
          {showAdditional ? 'Hide Additional Details' : 'Show Additional Details'}
        </Button>

        {showAdditional && (
          <>
            <Input label="Item Condition" size="lg" name="item_condition" value={formData.item_condition} onChange={handleChange} />
            <Input label="Add offer" size="lg" name="add_offer" value={formData.add_offer} onChange={handleChange} />
            <Input label="Additional Description" size="lg" name="additional_description" value={formData.additional_description} onChange={handleChange} />
            <Input label="Product Tax Code" size="lg" name="product_tax_code" value={formData.product_tax_code} onChange={handleChange} />
            <Input label="Sale price offer details" size="lg" name="sale_price_offer_details" value={formData.sale_price_offer_details} onChange={handleChange} />
          </>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth type="submit" onClick={handleSubmit}>
          Create Catalog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatalogueLateralForm;
