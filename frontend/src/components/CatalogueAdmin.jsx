import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Checkbox } from '@material-tailwind/react';

const API_URL = 'http://panel.mait.ac.in:8012';

function CatalogueAdmin() {
    const [catalogues, setCatalogues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [catalogueData, setCatalogueData] = useState({
        product_name: '',
        mrp: '',
        gst_percentage: '',
        asin: '',
        upc: '',
        product_image_1: '',
        product_image_2: '',
        product_image_3: '',
        product_image_4: '',
        product_image_5: '',
        standardized: false,
        category: 'Electronics'
    });
    const [modalOpen, setModalOpen] = useState(false);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchCatalogues();
    }, []);

    const fetchCatalogues = async () => {
        try {
            const response = await axios.get(`${API_URL}/catalogue/get-all-by-category/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const electronicsCatalogues = response.data.Electronics || [];
            setCatalogues(electronicsCatalogues);
        } catch (error) {
            console.error('Error fetching catalogues', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCatalogueData({ ...catalogueData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCatalogueData({ ...catalogueData, [name]: checked });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (catalogueData.id) {
                await axios.put(`${API_URL}/catalogue/update-sellercatalogue/${catalogueData.id}/`, catalogueData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                const response = await axios.post(`${API_URL}/catalogue/create/`, catalogueData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setCatalogues([...catalogues, response.data]);
            }
            setCatalogueData({
                product_name: '',
                mrp: '',
                gst_percentage: '',
                asin: '',
                upc: '',
                product_image_1: '',
                product_image_2: '',
                product_image_3: '',
                product_image_4: '',
                product_image_5: '',
                standardized: false,
                category: 'Electronics'
            });
            setModalOpen(false);
            fetchCatalogues();
        } catch (error) {
            console.error('Error submitting catalogue', error);
        }
    };

    const handleEdit = (catalogue) => {
        setCatalogueData(catalogue);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/catalogue/delete-sellercatalogue/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCatalogues(catalogues.filter(catalogue => catalogue.id !== id));
        } catch (error) {
            console.error('Error deleting catalogue', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredCatalogues = Array.isArray(catalogues)
        ? catalogues.filter((catalogue) =>
            catalogue.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold my-4 text-center">Catalogue Admin</h1>

            <div className="flex justify-around items-center mb-4">
                <div>
                    <Input
                        label='Search Catalogues'
                        id='searchbar'
                        type="text"
                        placeholder="Search Catalogues"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border p-2 border-black rounded-xl"
                    />
                </div>
                <Button
                    variant='filled'
                    onClick={() => setModalOpen(true)}
                // className="bg-green-500 text-white p-2 rounded"
                >
                    Add Catalogue
                </Button>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                catalogueData={catalogueData}
                handleInputChange={handleInputChange}
                handleCheckboxChange={handleCheckboxChange}
            />

            <div>
                <h2 className="text-2xl my-4 ml-12">Catalogue List:</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Name</th>
                            <th className="py-2">MRP</th>
                            <th className="py-2">GST Percentage</th>
                            <th className="py-2">ASIN</th>
                            <th className="py-2">UPC</th>
                            <th className="py-2">Category</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCatalogues.map((catalogue) => (
                            <tr key={catalogue.id} className="border-t">
                                <td className="py-2 px-4">{catalogue.product_name}</td>
                                <td className="py-2 px-4">{catalogue.mrp}</td>
                                <td className="py-2 px-4">{catalogue.gst_percentage}</td>
                                <td className="py-2 px-4">{catalogue.asin}</td>
                                <td className="py-2 px-4">{catalogue.upc}</td>
                                <td className="py-2 px-4">{catalogue.category}</td>
                                <td className="py-2 px-4 flex space-x-2">
                                    <Button
                                        color='amber'
                                        onClick={() => handleEdit(catalogue)}
                                    // className="bg-yellow-500 text-white p-2 rounded"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        color='red'
                                        onClick={() => handleDelete(catalogue.id)}
                                        // className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CatalogueAdmin;

function Modal({ isOpen, onClose, onSubmit, catalogueData, handleInputChange, handleCheckboxChange }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2">
                <h2 className="text-xl mb-4">{catalogueData.id ? 'Edit Catalogue' : 'Add New Catalogue'}</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
                    <Input
                    label='Product Name'
                        type="text"
                        name="product_name"
                        placeholder="Product Name"
                        value={catalogueData.product_name}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                    label='MRP'
                        type="text"
                        name="mrp"
                        placeholder="MRP"
                        value={catalogueData.mrp}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="gst_percentage"
                        placeholder="GST Percentage"
                        label="GST Percentage"
                        value={catalogueData.gst_percentage}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="asin"
                        placeholder="ASIN"
                        label="ASIN"
                        value={catalogueData.asin}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="upc"
                        placeholder="UPC"
                        label="UPC"
                        value={catalogueData.upc}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="product_image_1"
                        placeholder="Product Image 1"
                        label="Product Image 1"
                        value={catalogueData.product_image_1}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="product_image_2"
                        placeholder="Product Image 2"
                        label="Product Image 2"
                        value={catalogueData.product_image_2}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="product_image_3"
                        placeholder="Product Image 3"
                        label="Product Image 3"
                        value={catalogueData.product_image_3}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="product_image_4"
                        placeholder="Product Image 4"
                        label="Product Image 4"
                        value={catalogueData.product_image_4}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        type="text"
                        name="product_image_5"
                        placeholder="Product Image 5"
                        label="Product Image 5"
                        value={catalogueData.product_image_5}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <div className="flex items-center">
                        <Checkbox
                            type="checkbox"
                            name="standardized"
                            label="Standardized"
                            checked={catalogueData.standardized}
                            onChange={handleCheckboxChange}
                            // className="mr-2"
                        />
                        {/* <label>Standardized</label> */}
                    </div>
                    <Input
                        type="text"
                        name="category"
                        placeholder="Category"
                        label="Category"
                        value={catalogueData.category}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <div className="col-span-2 flex justify-end gap-5">
                        <Button
                            variant='outlined'
                            type="button" onClick={onClose}
                            // className="bg-gray-500 text-white p-2 rounded mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='gradient'
                            type="submit"
                        // className="bg-blue-500 text-white p-2 rounded"
                        >
                            {catalogueData.id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
