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
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ProductSearch from './ProductSearch';

const CatalogueLateralForm = () => {
  const [showAdditional, setShowAdditional] = useState(false);
  const { searchedCatalog } = useContext(CataContext);
  const navigate = useNavigate(); // Get history object from useHistory

  const handleToggleAdditional = () => {
    setShowAdditional(!showAdditional);
  };
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    // Check if product_name is null
    if (searchedCatalog.product_name === null) {
      // Navigate to /product-search
      return <ProductSearch/>
    }
  }, [searchedCatalog.product_name, navigate]); // Run this effect when searchedCatalog.product_name or navigate changes

  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
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
                className="h-16 w-16 object-cover"
              />
            );
          }
          return null;
        })}
      </div>
      <CardHeader variant="gradient" color="gray" className="mb-4 p-4">
        <Typography variant="h4" color="white">
          Catalog Details
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* Read-Only Preview Section */}
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">Name</Typography>
          <Typography className="mb-4">{searchedCatalog.product_name}</Typography>
          <Typography variant="h6" className="mb-2">MRP</Typography>
          <Typography className="mb-4">₹{searchedCatalog.mrp}</Typography>
          <Typography variant="h6" className="mb-2">GST Percentage</Typography>
          <Typography className="mb-4">{searchedCatalog.gst_percentage}%</Typography>
          <Typography variant="h6" className="mb-2">ASIN</Typography>
          <Typography className="mb-4">{searchedCatalog.asin}</Typography>
          <Typography variant="h6" className="mb-2">UPC</Typography>
          <Typography className="mb-4">{searchedCatalog.upc}</Typography>
          <Typography variant="h6" className="mb-2">Category</Typography>
          <Typography className="mb-4">{searchedCatalog.category}</Typography>
        </div>

        {/* Form Inputs Section */}
        <Input label="Seller SKU" size="lg" />
        <Input label="Your Price" size="lg" />
        <Input label="Quantity" size="lg" />
        <Input label="Item Condition" size="lg" />
        <Input label="HSN Code" size="lg" />

        {/* Toggle Additional Details */}
        <Button variant="text" onClick={handleToggleAdditional}>
          {showAdditional ? 'Hide Additional Details' : 'Show Additional Details'}
        </Button>

        {showAdditional && (
          <>
            <Input label="Add offer" size="lg" />
            <Input label="Additional Description" size="lg" />
            <Input label="Product Tax Code" size="lg" />
            <Input label="Sale price offer details" size="lg" />
          </>
        )}
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Create searchedCatalog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CatalogueLateralForm;
