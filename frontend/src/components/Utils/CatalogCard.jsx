import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export function CatalogCard({
  name,
  description,
  asin,
  upc,
  images = [],
  about,
  category,
  sellerSKU,
  yourPrice,
  quantity,
  itemCondition,
  hsnCode,
  addOffer,
  additionalDescription,
  productTaxCode,
  salePriceOfferDetails,
  onSave,
  onRemove,
})

{
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  return (
    <Card className="w-[500px] m-4">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-10 place-items-center"
      >
        <Typography variant="h6" color="white">
          Manage Catalog
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        {/* Image Preview Section */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {images && images.length > 0 ? (
            images.map((image, index) => (
              <img
                key={index}
                src={`${backend_url}${image}`}
                alt={`Preview ${index + 1}`}
                className="h-16 w-16 object-cover"
              />
            ))
          ) : (
            <Typography>No images available</Typography>
          )}
        </div>

        {/* Text Fields Section */}
        <Input label="Name" size="lg" value={name || ''} />
        <Input label="Description" size="lg" value={description || ''} />
        <Input label="ASIN" size="lg" value={asin || ''} />
        <Input label="UPC" size="lg" value={upc || ''} />
        {/* <Input label="Images" size="lg" value={images.join(', ') || ''} /> */}
        <Input label="About" size="lg" value={about || ''} />
        <Input label="Category" size="lg" value={category || ''} />

        {/* Form Inputs Section */}
        <Input label="Seller SKU" size="lg" value={sellerSKU || ''} />
        <Input label="Your Price" size="lg" value={yourPrice || ''} />
        <Input label="Quantity" size="lg" value={quantity || ''} />
        <Input label="Item Condition" size="lg" value={itemCondition || ''} />
        <Input label="HSN Code" size="lg" value={hsnCode || ''} />
        <Input label="Add offer" size="lg" value={addOffer || ''} />
        <Input label="Additional Description" size="lg" value={additionalDescription || ''} />
        <Input label="Product Tax Code" size="lg" value={productTaxCode || ''} />
        <Input label="Sale price offer details" size="lg" value={salePriceOfferDetails || ''} />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth className="mb-2" onClick={onSave}>
          Save
        </Button>
        <Button variant="gradient" fullWidth color="red" onClick={onRemove}>
          Remove from Catalog
        </Button>
      </CardFooter>
    </Card>
  );
}
