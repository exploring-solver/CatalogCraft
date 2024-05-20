import React, { useContext } from 'react';
import CatalogResult from './CatalogResult';
import CataContext from '../Context/Catalogue/CataContext';

const CatalogLists = () => {
    const { searchResults } = useContext(CataContext);

    if (!searchResults) {
        return <div>No results found</div>;
    }

    return (
        <div className='flex flex-wrap justify-center'>
            {searchResults.map((catalog, index) => (
                <CatalogResult key={index} catalog={catalog} />
            ))}
        </div>
    );
};

export default CatalogLists;
