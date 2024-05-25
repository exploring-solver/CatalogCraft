import React from 'react';
import { Input, Checkbox, Button, Select, Option } from '@material-tailwind/react';

function Modal({ isOpen, onClose, onSubmit, catalogueData, handleInputChange, handleCheckboxChange, categories }) {
    if (!isOpen) return null;

    const categoryOptions = Array.isArray(categories) ? categories.map(category => ({ value: category, label: category })) : [];

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
                        label="GST Percentage"
                        type="text"
                        name="gst_percentage"
                        placeholder="GST Percentage"
                        value={catalogueData.gst_percentage}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="ASIN"
                        type="text"
                        name="asin"
                        placeholder="ASIN"
                        value={catalogueData.asin}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="UPC"
                        type="text"
                        name="upc"
                        placeholder="UPC"
                        value={catalogueData.upc}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="Product Image 1"
                        type="text"
                        name="product_image_1"
                        placeholder="Product Image 1"
                        value={catalogueData.product_image_1}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="Product Image 2"
                        type="text"
                        name="product_image_2"
                        placeholder="Product Image 2"
                        value={catalogueData.product_image_2}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="Product Image 3"
                        type="text"
                        name="product_image_3"
                        placeholder="Product Image 3"
                        value={catalogueData.product_image_3}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="Product Image 4"
                        type="text"
                        name="product_image_4"
                        placeholder="Product Image 4"
                        value={catalogueData.product_image_4}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Input
                        label="Product Image 5"
                        type="text"
                        name="product_image_5"
                        placeholder="Product Image 5"
                        value={catalogueData.product_image_5}
                        onChange={handleInputChange}
                        className="border p-2"
                    />
                    <Checkbox
                        name="standardized"
                        label="Standardized"
                        checked={catalogueData.standardized}
                        onChange={handleCheckboxChange}
                    />
                    <Select
                        label="Category"
                        name="category"
                        value={catalogueData.category}
                        onChange={handleInputChange}
                    >
                        {categoryOptions.map(option => (
                            <Option key={option.value} value={option.value}>{option.label}</Option>
                        ))}
                    </Select>
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
