import React from 'react';
import CatalogResult from './CatalogResult';

const CatalogLists = () => {
    const jsonData = [
        {
          image: 'path/to/image1.jpg',
          name: 'Product 1',
          description: 'Description 1',
          ASIN: 'ASIN1',
          EAN: 'EAN1',
          UPC: 'UPC1',
          category: 'Category 1',
        },
        {
          image: 'path/to/image2.jpg',
          name: 'Product 2',
          description: 'Description 2',
          ASIN: 'ASIN2',
          EAN: 'EAN2',
          UPC: 'UPC2',
          category: 'Category 2',
        },
      ];
      
    return (
    <div className='flex flex-wrap justify-center flex-col'>
      {jsonData.map((product, index) => (
        <CatalogResult key={index} product={product} />
      ))}
    </div>
  );
};

export default CatalogLists;
