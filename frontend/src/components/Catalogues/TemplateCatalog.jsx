import React, { useEffect, useState } from 'react';
import { CatalogCard } from '../Utils/CatalogCard';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';

export function TemplateCatalog() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const response = await axios.get('http://panel.mait.ac.in:8012/catalogue/template-catalogues/str:template_name/');
        setCatalogs(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCatalogs();
  }, []);

  const onSave = (index) => {
    console.log(`Save catalog at index: ${index}`);
  };

  const onRemove = (index) => {
    console.log(`Remove catalog at index: ${index}`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error loading catalogs: {error.message}</Typography>;
  }

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
