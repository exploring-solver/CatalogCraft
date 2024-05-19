import React, { useState } from 'react';
import { Box, Typography, Card, CardContent,
  Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ProductListItem = ({ product }) => {
  const { image, name, description, ASIN, EAN, UPC, category } = product;
  const [catalogType, setCatalogType] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCatalogTypeChange = (event) => {
    setCatalogType(event.target.value);
    setIsButtonEnabled(event.target.value !== '');
  };

  return (
    <Card className="flex flex-row items-center px-4 py-2 m-4 shadow-lg justify-between">
      <img
        component="img"
        src={image}
        alt={name}
        className="w-10 h-10 object-cover"
      />
      <CardContent className="flex ml-4 items-center gap-3">
        <div className=''>
          <Typography variant="h6" className="font-bold">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </div>
        <div className='flex items-center gap-2'>
          <Box className="mt-2 flex gap-5  flex-wrap">
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>ASIN:</strong> {ASIN}</Typography>
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>EAN:</strong> {EAN}</Typography>
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>UPC:</strong> {UPC}</Typography>
            <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>Category:</strong> {category}</Typography>
          </Box>
          <Box className="flex flex-col items-end mr-4 gap-2">
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
            <Button
              variant="contained"
              color="primary"
              disabled={!isButtonEnabled}
            >
              Create Catalog
            </Button>
          </Box>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
