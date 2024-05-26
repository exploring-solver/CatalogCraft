import React from 'react';
import { Input, Checkbox, Button, Select, Option } from '@material-tailwind/react';

function Modal({ isOpen, onClose, onSubmit, catalogueData, handleInputChange, handleCheckboxChange, categories }) {
    // console.log(categories)
    if (!isOpen) return null;
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const categoryOptions = Array.isArray(categories) ? categories.map(category => ({ value: category, label: category })) : [];

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/2">
                <h2 className="text-xl mb-4">{catalogueData.id ? 'Edit Catalogue' : 'Add New Catalogue'}</h2>
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((index) => {
                            const imageKey = `product_image_${index}`;
                            const imageUrl = catalogueData[imageKey];
                            if (imageUrl) {
                                return (
                                    <img
                                        key={index}
                                        src={`${backend_url}${imageUrl}`}
                                        alt={`Preview ${index}`}
                                        className="h-16 w-16 object-cover border-2 border-gray-600"
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div>

                    </div>
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
                        label="GST Percentage"
                        type="text"
                        name="gst_percentage"
                        placeholder="GST Percentage"
                        value={catalogueData.gst_percentage}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="CSIN"
                        type="text"
                        name="csin"
                        placeholder="CSIN"
                        value={catalogueData.csin}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="EAN"
                        type="text"
                        name="ean"
                        placeholder="EAN"
                        value={catalogueData.ean}
                        onChange={handleInputChange}
                        className="border p-2"
                    />

                    <Checkbox
                        name="standardized"
                        label="Standardized"
                        checked={catalogueData.standardized}
                        onChange={handleCheckboxChange}
                    />
                    <select
                        className="form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="category"
                        name="category"
                        value={catalogueData.category}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a category</option>
                        {Array.isArray(categories.categories) &&
                            categories.categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                    </select>
                    <div className="col-span-2 flex justify-end gap-5">
                        <Button
                            variant='outlined'
                            type="button" onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='gradient'
                            type="submit"
                        >
                            {catalogueData.id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Modal;
