import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CataContext from '../Context/Catalogue/CataContext';
import { useNavigate } from 'react-router-dom';

const ProductListItem = ({ catalog }) => {
  const { product_image_1, product_name, mrp, gst_percentage, csin, ean, category } = catalog;
  const [catalogType, setCatalogType] = useState('');
  const searchedCatalog = JSON.parse(localStorage.getItem('searchedCatalog')) || {};
  const setSearchedCatalog = (catalog) => {
    localStorage.setItem('searchedCatalog', JSON.stringify(catalog));
  };
  const navigate = useNavigate();
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleCatalogTypeChange = (event) => {
    setCatalogType(event.target.value);
    setIsButtonEnabled(event.target.value !== '');
  };

  const handleCreateCatalog = () => {
    setSearchedCatalog(catalog); localStorage.setItem('searchedCatalog', JSON.stringify(catalog)); navigate("/lateral")
  };

  const handleInstantCreateCatalog = () => {
    if (isButtonEnabled) {
      localStorage.setItem('searchedCatalog', JSON.stringify(catalog));
      navigate(`/instant-lateral`);
    }
  };

  return (
    <Card className="flex flex-row items-center px-4 py-2 m-4 shadow-lg justify-between max-w-5xl ">
      <img
        component="img"
        src={`${backend_url}${product_image_1}`}
        alt={product_name}
        className="w-24 object-fit border-[1px] bg-gray-200 shadow border-black p-2"
      />
      <CardContent className="flex ml-4 items-center gap-3 ">
        <div className=''>
          <Typography variant="h6" className="font-medium">
            {product_name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            MRP: ₹{mrp}, GST: {gst_percentage}%
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <Box className="mt-2 flex gap-5 flex-wrap">
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>CSIN:</strong> {csin}</Typography>
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>EAN:</strong> {ean}</Typography>
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>Category:</strong> {category}</Typography>
          </Box>
          <Box className="flex flex-col items-end mr-4 gap-2">
            <Typography variant='h6'>Condition</Typography>
            <FormControl variant="outlined" className="mb-2">
              <InputLabel>Type</InputLabel>
              <Select
                value={catalogType}
                onChange={handleCatalogTypeChange}
                label="Type"
                className='w-20'
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="old">Old</MenuItem>
              </Select>
            </FormControl>
            <div className='flex gap-3 flex-wrap md:flex-nowrap'>
              <Button
                variant="contained"
                color="primary"
                disabled={!isButtonEnabled}
                className='!text-sm'
                onClick={handleCreateCatalog}
              >
                Create Catalog
              </Button>
              <Button
                variant="contained"
                color="primary"
                disabled={!isButtonEnabled}
                className='!text-sm'
                onClick={handleInstantCreateCatalog}
              >
                Quick Create
              </Button>
            </div>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
