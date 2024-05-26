// ObjectDetection.js
import React, { useState } from 'react';
import { detectObjects, loadImageBase64 } from './api'; // Adjust the import path as needed

const ObjectDetection = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const base64Image = await loadImageBase64(selectedFile);
            const response = await detectObjects(base64Image);
            setResults(response);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="object-detection">
            <h1>Object Detection</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Detect Objects</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {results && (
                <div>
                    <h2>Detection Results:</h2>
                    <pre>{JSON.stringify(results, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ObjectDetection;
