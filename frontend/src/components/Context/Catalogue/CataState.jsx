import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CataContext from './CataContext';

const CataState = (props) => {
    const [searchedCatalog, setSearchedCatalog] = useState(null);
    const [searchResults, setSearchResults] = useState(null);

    const contextValue = {
        searchedCatalog,
        setSearchedCatalog,
        searchResults,
        setSearchResults,
    };

    return (
        <CataContext.Provider value={contextValue}>
            {props.children}
        </CataContext.Provider>
    );
};

export default CataState;