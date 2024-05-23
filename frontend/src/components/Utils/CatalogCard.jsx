import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

export function CatalogCard({
  catalog,
  onSave,
  onRemove,
}) {
  const [catalogData, setCatalogData] = useState({
    seller_sku: '',
    selling_prize: '',
    quantity: '',
    item_condition: '',
    hsn_code: '',
    add_offer: '',
    additional_description: '',
    product_tax_code: '',
    sale_price_offer_details: '',
    product_name: catalog.product_name || '',
    mrp: catalog.mrp || '',
    gst_percentage: catalog.gst_percentage || '',
    asin: catalog.asin || '',
    upc: catalog.upc || '',
    category: catalog.category || '',
    images: catalog.images || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCatalogData((prevData) => ({ ...prevData, [name]: value }));
  };

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  return (
    <Card className="w-[500px] m-4">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-10 place-items-center"
      >
        <Typography variant="h6" color="white">
          Create Catalog
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* Image Preview Section */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {catalogData.images && catalogData.images.length > 0 ? (
            catalogData.images.map((image, index) => (
              <img
                key={index}
                src={`${backend_url}${image}`}
                alt={`Preview ${index + 1}`}
                className="h-16 w-16 object-cover border-[1px] rounded shadow border-black p-1"
              />
            ))
          ) : (
            <Typography>No images available</Typography>
          )}
        </div>

        {/* Text Fields Section */}
        <Input label="Product Name" size="lg" name="product_name" value={catalogData.product_name} onChange={handleChange} />
        <Input label="MRP" size="lg" name="mrp" value={catalogData.mrp} onChange={handleChange} />
        <Input label="GST Percentage" size="lg" name="gst_percentage" value={catalogData.gst_percentage} onChange={handleChange} />
        <Input label="ASIN" size="lg" name="asin" value={catalogData.asin} onChange={handleChange} />
        <Input label="UPC" size="lg" name="upc" value={catalogData.upc} onChange={handleChange} />
        <Input label="Category" size="lg" name="category" value={catalogData.category} onChange={handleChange} />
        <Input label="Seller SKU" size="lg" name="seller_sku" value={catalogData.seller_sku} onChange={handleChange} />
        <Input label="Selling Prize" size="lg" name="selling_prize" value={catalogData.selling_prize} onChange={handleChange} />
        <Input label="Quantity" size="lg" name="quantity" value={catalogData.quantity} onChange={handleChange} />
        <Input label="Item Condition" size="lg" name="item_condition" value={catalogData.item_condition} onChange={handleChange} />
        <Input label="HSN Code" size="lg" name="hsn_code" value={catalogData.hsn_code} onChange={handleChange} />
        <Input label="Add Offer" size="lg" name="add_offer" value={catalogData.add_offer} onChange={handleChange} />
        <Input label="Additional Description" size="lg" name="additional_description" value={catalogData.additional_description} onChange={handleChange} />
        <Input label="Product Tax Code" size="lg" name="product_tax_code" value={catalogData.product_tax_code} onChange={handleChange} />
        <Input label="Sale Price Offer Details" size="lg" name="sale_price_offer_details" value={catalogData.sale_price_offer_details} onChange={handleChange} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth className="mb-2" onClick={() => onSave(catalogData)}>
          Save
        </Button>
        <Button variant="gradient" fullWidth color="red" onClick={() => onRemove(catalog)}>
          Remove from Catalog
        </Button>
      </CardFooter>
    </Card>
  );
}
