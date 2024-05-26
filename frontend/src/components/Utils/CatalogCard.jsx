import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Textarea, Button } from '@material-tailwind/react';

export default function CatalogCard({ catalog = {}, onSave, onRemove }) {
  const [catalogData, setCatalogData] = useState({
    product_name: catalog.product_name || '',
    description: catalog.description || '',
    mrp: catalog.mrp || '',
    selling_price: catalog.selling_price || '',
    csin: catalog.csin || '',
    gst_percentage: catalog.gst_percentage || '',
    quantity: catalog.quantity || '',
    category: catalog.category || '',
    ean: catalog.ean || '',
    seller_sku: catalog.seller_sku || '',
    color: catalog.color || '',
    brand: catalog.brand || '',
    size: catalog.size || '',
    product_image_1: catalog.product_image_1 || null,
    product_image_2: catalog.product_image_2 || null,
    product_image_3: catalog.product_image_3 || null,
    product_image_4: catalog.product_image_4 || null,
    product_image_5: catalog.product_image_5 || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatalogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setCatalogData((prevData) => ({ ...prevData, [name]: files[0] }));
    }
  };

  return (
    <Card className="w-[500px] m-4">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-10 place-items-center"
      >
        <Typography variant="h6" color="white">
          {catalog.id ? 'Edit Catalog' : 'Create Catalog'}
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {[catalogData.product_image_1, catalogData.product_image_2, catalogData.product_image_3, catalogData.product_image_4, catalogData.product_image_5].map((image, index) => (
            <img
              key={index}
              src={image ? `${import.meta.env.VITE_BACKEND_URL}${image}` : 'https://via.placeholder.com/150'}
              alt={`Preview ${index + 1}`}
              className="h-16 w-16 object-cover border-[1px] rounded shadow border-black p-1"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
          ))}
        </div>

        <Input label="Product Name" size="lg" name="product_name" value={catalogData.product_name} onChange={handleChange} />
        <Input label="MRP" size="lg" name="mrp" value={catalogData.mrp} onChange={handleChange} />
        <Input label="GST Percentage" size="lg" name="gst_percentage" value={catalogData.gst_percentage} onChange={handleChange} />
        <Input label="EAN" size="lg" name="ean" value={catalogData.ean} onChange={handleChange} />
        <Input label="Category" size="lg" name="category" value={catalogData.category} onChange={handleChange} />
        <Input label="Seller SKU" size="lg" name="seller_sku" value={catalogData.seller_sku} onChange={handleChange} />
        <Input label="Selling Price" size="lg" name="selling_price" value={catalogData.selling_price} onChange={handleChange} />
        <Input label="Quantity" size="lg" name="quantity" value={catalogData.quantity} onChange={handleChange} />
        <Textarea label="Description" size="lg" name="description" value={catalogData.description} onChange={handleChange} />
        <Typography>Additional Details</Typography>
        <Input label="Brand" size="lg" name="brand" value={catalogData.brand} onChange={handleChange} />
        <Input label="Color" size="lg" name="color" value={catalogData.color} onChange={handleChange} />
        <Input label="Size" size="lg" name="size" value={catalogData.size} onChange={handleChange} />

        <Typography>Product Images</Typography>
        {[1, 2, 3, 4, 5].map((num) => (
          <div key={num} className="mb-4">
            <Input type="file" name={`product_image_${num}`} onChange={handleImageChange} />
          </div>
        ))}
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth className="mb-2" onClick={() => onSave(catalogData, catalog)}>
          {catalog.id ? 'Update' : 'Save'}
        </Button>
        {catalog.id && (
          <Button variant="gradient" fullWidth color="red" onClick={() => onRemove(catalog)}>
            Remove from Catalog
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
