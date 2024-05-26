import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, Option } from '@material-tailwind/react';
import Modal from './Modal';

const API_URL = import.meta.env.VITE_BACKEND_URL;

function CatalogueAdmin() {
    const [loading, setLoading] = useState(false);
    const [catalogues, setCatalogues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);
    const [catalogueData, setCatalogueData] = useState({
        product_name: '',
        mrp: '',
        gst_percentage: '',
        csin: '',
        ean: '',
        product_image_1: '',
        product_image_2: '',
        product_image_3: '',
        product_image_4: '',
        product_image_5: '',
        standardized: false,
        category: ''
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [catalogueToDelete, setCatalogueToDelete] = useState(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        fetchCatalogues();
        fetchCategories();
    }, []);

    const fetchCatalogues = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/catalogue/get-all/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const allCatalogues = Object.values(response.data).flat();
            setCatalogues(allCatalogues);
        } catch (error) {
            console.error('Error fetching catalogues', error);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/catalogue/categories/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories', error);
        } finally {
            setLoading(false);
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

    const handleSortChange = (criteria) => {
        const order = sortCriteria === criteria && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortCriteria(criteria);
        setSortOrder(order);
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
            resetForm();
            setModalOpen(false);
            fetchCatalogues();
        } catch (error) {
            console.error('Error submitting catalogue', error);
        }
    };

    const resetForm = () => {
        setCatalogueData({
            product_name: '',
            mrp: '',
            gst_percentage: '',
            csin: '',
            ean: '',
            product_image_1: '',
            product_image_2: '',
            product_image_3: '',
            product_image_4: '',
            product_image_5: '',
            standardized: false,
            category: ''
        });
    };

    const handleEdit = (catalogue) => {
        setCatalogueData(catalogue);
        setModalOpen(true);
    };

    const handleDelete = async (id) => {
        setCatalogueToDelete(id);
        setShowConfirmation(true);
    };

    const confirmDelete = async () => {
        setLoadingDelete(true);
        try {
            await axios.delete(`${API_URL}/catalogue/delete-sellercatalogue/${catalogueToDelete}/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCatalogues(catalogues.filter(catalogue => catalogue.id !== catalogueToDelete));
        } catch (error) {
            console.error('Error deleting catalogue', error);
        } finally {
            setLoadingDelete(false);
            setShowConfirmation(false);
        }
    };    

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getFilteredCatalogues = () => {
        return catalogues.filter((catalogue) =>
            catalogue.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    const getSortedCatalogues = (catalogueList) => {
        return sortCriteria
            ? catalogueList.sort((a, b) => {
                if (sortCriteria === 'price') {
                    return sortOrder === 'asc' ? parseFloat(a.mrp) - parseFloat(b.mrp) : parseFloat(b.mrp) - parseFloat(a.mrp);
                } else if (sortCriteria === 'name') {
                    return sortOrder === 'asc' ? a.product_name.localeCompare(b.product_name) : b.product_name.localeCompare(a.product_name);
                } else {
                    return 0;
                }
            })
            : catalogueList;
    };

    const getPaginatedCatalogues = (catalogueList) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return catalogueList.slice(startIndex, startIndex + itemsPerPage);
    };

    const sortedCatalogues = getSortedCatalogues(getFilteredCatalogues());
    const paginatedCatalogues = getPaginatedCatalogues(sortedCatalogues);

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold my-4 text-center">Catalogue Admin</h1>
            {loading && <Spinner color="blue" size="large" className="mx-auto" />}
            {!loading && (
                <>
                    <div className="flex justify-around items-center mb-4 flex-col gap-5">
                        <div className='flex gap-5 w-[90%] m-auto'>
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
                            <a href="">

                            </a>
                            <Button
                            >
                                Add Catalogue
                            </Button>

                        </div>
                        <Select
                            value={sortCriteria}
                            label='Sort by'
                            onChange={handleSortChange}
                        >
                            <Option value="price">Price</Option>
                            <Option value="category">Category</Option>
                        </Select>
                    </div>

                    <Modal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSubmit={handleSubmit}
                        catalogueData={catalogueData}
                        handleInputChange={handleInputChange}
                        handleCheckboxChange={handleCheckboxChange}
                        categories={categories}
                    />

                    <div>
                        <h2 className="text-2xl my-4">Catalogue List:</h2>
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 text-start px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSortChange('name')}>
                                Name {sortCriteria === 'name' && (sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                            </th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSortChange('price')}>
                                MRP {sortCriteria === 'price' && (sortOrder === 'asc' ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />)}
                            </th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200">GST Percentage</th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200">CSIN</th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200">EAN</th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200">Category</th>
                                    <th className="py-2 text-start px-4 border-b border-gray-200">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCatalogues.map((catalogue, index) => (
                                    <tr key={catalogue.id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} border-t border-gray-200`}>
                                        <td className="py-2 px-4">{catalogue.product_name}</td>
                                        <td className="py-2 px-4">{catalogue.mrp}</td>
                                        <td className="py-2 px-4">{catalogue.gst_percentage}</td>
                                        <td className="py-2 px-4">{catalogue.csin}</td>
                                        <td className="py-2 px-4">{catalogue.ean}</td>
                                        <td className="py-2 px-4">{catalogue.category}</td>
                                        <td className="py-2 px-4 flex gap-2 flex-wrap">
                                            <Button
                                                color='amber'
                                                onClick={() => handleEdit(catalogue)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                color='red'
                                                onClick={() => handleDelete(catalogue.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-between mt-4">
                    <Button
                        color='blue-gray'
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <span className='border-2 border-black rounded-full p-2 font-semibold'>Page {currentPage}</span>
                    <Button
                        color='blue-gray'
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage * itemsPerPage >= sortedCatalogues.length}
                    >
                        Next
                    </Button>
                </div>
            </div>
                    {showConfirmation && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                            <div className="bg-white p-4 rounded shadow-md">
                                <p>Are you sure you want to delete this catalogue?</p>
                                <div className="flex justify-end mt-4 gap-5">
                                    <Button
                                        color="red"
                                        onClick={() => {
                                            setShowConfirmation(false);
                                            setCatalogueToDelete(null);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="green"
                                        onClick={confirmDelete}
                                        disabled={loadingDelete}
                                    >
                                        {loadingDelete ? <Spinner color="white" size="sm" /> : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>

    );
}

export default CatalogueAdmin;
