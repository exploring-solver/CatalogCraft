import React, { useState } from 'react';
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
// The component that shows up after selecting from existing Catalog
const CatalogueLateralForm = () => {
  const [showAdditional, setShowAdditional] = useState(false);
  const { searchedCatalog } = useContext(CataContext);
  const handleToggleAdditional = () => {
    setShowAdditional(!showAdditional);
  };

  return (
    <Card className="w-full max-w-lg mx-auto mt-10">
      <CardHeader variant="gradient" color="gray" className="mb-4 p-4">
        <Typography variant="h4" color="white">
          Catalog Details
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* Read-Only Preview Section */}
        <div className="mb-4">
          <Typography variant="h6" className="mb-2">Name</Typography>
          <Typography className="mb-4">{searchedCatalog.name}</Typography>
          <Typography variant="h6" className="mb-2">Description</Typography>
          <Typography className="mb-4">{searchedCatalog.description}</Typography>
          <Typography variant="h6" className="mb-2">ASIN</Typography>
          <Typography className="mb-4">{searchedCatalog.ASIN}</Typography>
          <Typography variant="h6" className="mb-2">UPC</Typography>
          <Typography className="mb-4">{searchedCatalog.UPC}</Typography>
          <Typography variant="h6" className="mb-2">Images</Typography>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {searchedCatalog.images.map((image, index) => (
              <img key={index} src={image} alt={`Preview ${index}`} className="h-16 w-16 object-cover" />
            ))}
          </div>
          <Typography variant="h6" className="mb-2">About</Typography>
          <Typography className="mb-4">{searchedCatalog.about}</Typography>
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
