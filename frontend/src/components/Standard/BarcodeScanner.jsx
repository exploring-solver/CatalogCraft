import { useContext, useState, useEffect } from "react";
import { useZxing } from "react-zxing";
import CataContext from "../Context/Catalogue/CataContext";
import {useNavigate} from 'react-router-dom'
import { Alert, Button, Input } from "@material-tailwind/react";
import axios from "axios";

export const BarcodeScanner = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const { setSearchResults } = useContext(CataContext);
    const [result, setResult] = useState("");
    const { ref } = useZxing({
        onDecodeResult(result) {
            setResult(result.getText());
        },
    });
    const navigate = useNavigate();
    useEffect(() => {
        const handleLookup = async () => {
            if (result) {
                try {
                    const response = await axios.get(`${backend_url}/catalogue/lookup/${result}/`);
                    console.log('Lookup response:', response.data);
                    setResult(' ');
                    setSearchedCatalog(response.data)
                    navigate()
                    // Assuming you want to do something with the response data
                } catch (error) {
                    if (error.response && error.response.status === 400) {
                        console.log('Product EAN not found');
                    } else {
                        console.error('Error looking up product:', error);
                    }
                }
            }
        };

        handleLookup();
    }, [result]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${backend_url}/catalogue/search-catalogues/?query=${result}/`);
            console.log('Search response:', response.data);
            setSearchedCatalog(response.data);
        } catch (error) {
            console.error('Error searching catalogues:', error);
        }
    };

    return (
        <>
            {!result && <video ref={ref} />}
            <Input placeholder="EAN Number" label="EAN Number" type="text" value={result} readOnly className="product-search-input !text-black" />
            <Button variant="filled" onClick={handleSearch}>Submit</Button>
        </>
    );
};
