import React from 'react';
import { CatalogCard } from '../Utils/CatalogCard';
import { Typography } from '@material-tailwind/react';
export function TemplateCatalog() {
  const catalogs = [
    {
      name: "Product 1",
      description: "Description 1",
      asin: "ASIN1",
      upc: "UPC1",
      images: ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"],
      about: "About 1",
      category: "Category 1",
      sellerSKU: "SKU1",
      yourPrice: "Price 1",
      quantity: "10",
      itemCondition: "New",
      hsnCode: "HSN1",
      addOffer: "Offer 1",
      additionalDescription: "Additional Description 1",
      productTaxCode: "Tax Code 1",
      salePriceOfferDetails: "Sale Offer Details 1",
    },
    {
      name: "Product 2",
      description: "Description 2",
      asin: "ASIN2",
      upc: "UPC2",
      images: ["image6.jpg", "image7.jpg", "image8.jpg", "image9.jpg", "image10.jpg"],
      about: "About 2",
      category: "Category 2",
      sellerSKU: "SKU2",
      yourPrice: "Price 2",
      quantity: "20",
      itemCondition: "Used",
      hsnCode: "HSN2",
      addOffer: "Offer 2",
      additionalDescription: "Additional Description 2",
      productTaxCode: "Tax Code 2",
      salePriceOfferDetails: "Sale Offer Details 2",
    },
  ];

  const onSave = (index) => {
    console.log(`Save catalog at index: ${index}`);
  };

  const onRemove = (index) => {
    console.log(`Remove catalog at index: ${index}`);
  };

  return (
    <div className="flex flex-wrap justify-between">
      {catalogs && catalogs.length > 0 ? (
        catalogs.map((catalog, index) => (
          <CatalogCard
            key={index}
            name={catalog.name}
            description={catalog.description}
            asin={catalog.asin}
            upc={catalog.upc}
            images={catalog.images}
            about={catalog.about}
            category={catalog.category}
            sellerSKU={catalog.sellerSKU}
            yourPrice={catalog.yourPrice}
            quantity={catalog.quantity}
            itemCondition={catalog.itemCondition}
            hsnCode={catalog.hsnCode}
            addOffer={catalog.addOffer}
            additionalDescription={catalog.additionalDescription}
            productTaxCode={catalog.productTaxCode}
            salePriceOfferDetails={catalog.salePriceOfferDetails}
            onSave={() => onSave(index)}
            onRemove={() => onRemove(index)}
          />
        ))
      ) : (
        <Typography>No catalogs available</Typography>
      )}
    </div>
  );
}
