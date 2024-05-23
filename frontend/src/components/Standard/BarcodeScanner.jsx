import { useContext, useState } from "react";
import { useZxing } from "react-zxing";
import CataContext from "../Context/Catalogue/CataContext";
import { Button, Input } from "@material-tailwind/react";
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

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${backend_url}/catalogue/search-catalogues/?query=${result}`);
            console.log('Search response:', response.data);
            setSearchResults(response.data); // Set the search results to the context
        } catch (error) {
            console.error('Error searching catalogues:', error);
        }
    };

    return (
        <>
            {!result &&
            <video ref={ref} />}
            {/* <p>
                <span>Last result:</span>
                <span>{result}</span>
            </p> */}
            <Input placeholder="UPC Number" label="UPC Number" type="text" value={result} readOnly className="product-search-input !text-black" />
            <Button variant="filled" onClick={handleSearch}>Submit</Button>
        </>
    );
};
