import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";

export function CatalogCard({
  catalog,
  onSave,
  onRemove,
}) {
  const [catalogData, setCatalogData] = useState({
    seller_sku: catalog.seller_sku || '',
    selling_price: '',
    quantity: '',
    hsn_code: '',
    add_offer: '',
    description: catalog.description || '',
    brand: catalog.brand || '',
    color: catalog.color || '',
    size: catalog.size || '',
    product_name: catalog.product_name || '',
    mrp: catalog.mrp || '',
    gst_percentage: catalog.gst_percentage || '',
    csin: catalog.csin || '',
    ean: catalog.ean || '',
    category: catalog.category || '',
    images: catalog.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatalogData((prevData) => ({ ...prevData, [name]: value }));
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
          {catalogData.images.map((image, index) => (
            <img
              key={index}
              src={`${import.meta.env.VITE_BACKEND_URL}${image}`}
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
        {/* <Input label="CSIN" size="lg" name="csin" value={catalogData.csin} onChange={handleChange} /> */}
        <Input label="EAN" size="lg" name="ean" value={catalogData.ean} onChange={handleChange} />
        <Input label="Category" size="lg" name="category" value={catalogData.category} onChange={handleChange} />
        <Input label="Seller SKU" size="lg" name="seller_sku" value={catalogData.seller_sku} onChange={handleChange} />
        <Input label="Selling Price" size="lg" name="selling_price" value={catalogData.selling_price} onChange={handleChange} />
        <Input label="Quantity" size="lg" name="quantity" value={catalogData.quantity} onChange={handleChange} />
        {/* <Input label="HSN Code" size="lg" name="hsn_code" value={catalogData.hsn_code} onChange={handleChange} /> */}
        <Textarea label="Description" size="lg" name="description" value={catalogData.description} onChange={handleChange} />
        <Typography>Additional Details</Typography>
        <Input label="Brand" size="lg" name="brand" value={catalogData.brand} onChange={handleChange} />
        <Input label="Color" size="lg" name="color" value={catalogData.color} onChange={handleChange} />
        <Input label="Size" size="lg" name="size" value={catalogData.size} onChange={handleChange} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth className="mb-2" onClick={() => onSave(catalogData ,catalog)}>
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
