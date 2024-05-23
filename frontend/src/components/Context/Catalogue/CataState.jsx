import React, { useState } from 'react';
import CataContext from './CataContext';

const CataState = (props) => {
    const [searchedCatalog, setSearchedCatalog] = useState(null);
    const [searchResults, setSearchResults] = useState('');
    const [selectedTemplate, setSelectedTemplate] = useState('');

    const contextValue = {
        searchedCatalog,
        setSearchedCatalog,
        searchResults,
        setSearchResults,
        selectedTemplate,
        setSelectedTemplate
    };

    return (
        <CataContext.Provider value={contextValue}>
            {props.children}
        </CataContext.Provider>
    );
};

export default CataState;