import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CatalogDetailsPage from './CatalogDetailsPage';
import CatalogForm from './CatalogForm';

const CatalogListItem = ({ product }) => {
  const { image, name, description, ASIN, EAN, UPC, category } = product;
  const [catalogType, setCatalogType] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const history = useHistory();

  const handleCatalogTypeChange = (event) => {
    setCatalogType(event.target.value);
    setIsButtonEnabled(event.target.value !== '');
  };

  const handleCreateCatalog = () => {
    if (isButtonEnabled) {
      history.push(`/catalog-details/${name}`);
    }
  };

  return (
    <Card className="flex flex-row items-center p-2 m-4 shadow-lg">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-cover border-[1px] border-gray-700"
      />
      <CardContent className="flex flex-wrap ml-4 gap-5 items-center">
        <Typography variant="" className=" text-lg hover:underline text-blue-700">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
        <Box className="mt-2 flex flex-wrap gap-5">
          <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>ASIN:</strong> {ASIN}</Typography>
          <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>EAN:</strong> {EAN}</Typography>
          <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>UPC:</strong> {UPC}</Typography>
          <Typography variant="body2" className="mr-4"><strong className='text-yellow-900'>Category:</strong> {category}</Typography>
        </Box>
        <Box className="flex flex-col gap-4 mr-4">
          <Button
            variant="contained"
            color="primary"
            disabled={!isButtonEnabled}
            onClick={handleCreateCatalog}
          >
            View Catalog
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CatalogListItem;
