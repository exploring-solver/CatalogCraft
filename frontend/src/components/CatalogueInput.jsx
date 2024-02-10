import React, { useState } from 'react';

function CatalogueInput({ label, name, value, onChange, errorMessage }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type="text"
        placeholder={label}
        name={name}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
    </div>
  );
}

export default CatalogueInput;