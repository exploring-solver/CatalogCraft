import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Typography, Alert } from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

const BulkData = () => {
    const [excelFile, setExcelFile] = useState(null);
    const [zipFile, setZipFile] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [secondShowAlert, setSecondShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e, url, setAlert) => {
        e.preventDefault();
        if (!excelFile || !zipFile) {
            alert("Please upload both Excel and Zip files.");
            return;
        }

        const confirmUpload = window.confirm("Are you sure you want to upload these files?");
        if (!confirmUpload) return;

        const formData = new FormData();
        formData.append('excel_file', excelFile);
        formData.append('zip_file', zipFile);

        try {
            const response = await axios.post(url, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'multipart/form-data'

                }
            });
            localStorage.setItem('bulkUploadResponse', JSON.stringify(response.data));
            setAlert(true);
            if (url === 'http://panel.mait.ac.in:8012/catalogue/upload-catalogue/') {
                navigate('/bulk-data-show');
            } else {
                navigate('/my-cata');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div className="w-[90%] mx-auto py-8 ">
            <Typography variant="h4" className="mb-4">Bulk Data Upload</Typography>
            <Typography variant="body1" className="mb-2">
                Steps for bulk data addition:
            </Typography>
            <ol className="list-decimal list-inside mb-4">
                <li>First, fill the data in the columns as in the demo Excel file.</li>
                <li>Create a .zip file with the images and enter the same name in the Excel column for images.</li>
                <li>Hit upload and edit the fields that were left blank.</li>
            </ol>
            <a href="/path/to/demo/file.xlsx" download className="text-blue-600 underline mb-4 block">Download Demo File</a>
            <form onSubmit={(e) => handleSubmit(e, 'http://panel.mait.ac.in:8012/catalogue/upload-catalogue/', setShowAlert)}>
                <div className="mb-4">
                    <Input
                        type="file"
                        label="Excel File"
                        onChange={(e) => handleFileChange(e, setExcelFile)}
                        required
                        accept=".xlsx"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="file"
                        label="Zip File"
                        onChange={(e) => handleFileChange(e, setZipFile)}
                        required
                        accept=".zip"
                    />
                </div>
                <Button type="submit" color="blue">Upload</Button>
            </form>
            {showAlert && (
                <Alert color="green" className="mt-4">
                    Files uploaded successfully!
                </Alert>
            )}

            <hr className="my-8" />

            <Typography variant="h4" className="mb-4">Instant Catalog Creation</Typography>
            <Typography variant="body1" className="mb-2">
                Please adhere to the given template for instant catalog creation:
            </Typography>
            <a href="ONDC_Sample_Data2.xlsx" download className="text-blue-600 underline mb-4 block">Download Demo File</a>
            <form onSubmit={(e) => handleSubmit(e, 'http://panel.mait.ac.in:8012/catalogue/upload-save-catalogue/', setSecondShowAlert)}>
                <div className="mb-4">
                    <Input
                        type="file"
                        label="Excel File"
                        onChange={(e) => handleFileChange(e, setExcelFile)}
                        required
                        accept=".xlsx"
                    />
                </div>
                <div className="mb-4">
                    <Input
                        type="file"
                        label="Zip File"
                        onChange={(e) => handleFileChange(e, setZipFile)}
                        required
                        accept=".zip"
                    />
                </div>
                <Button type="submit" color="blue">Upload</Button>
            </form>
            {secondShowAlert && (
                <Alert color="green" className="mt-4">
                    Congrats! The file upload and catalog creation was successful!
                </Alert>
            )}
        </div>
    );
};

export default BulkData;
