import React from 'react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">
          CatalogCraft
        </div>
        <ul className="flex">
          <li className="ml-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li className="ml-4">
            <a href="/catalogs" className="text-white hover:text-gray-300">Catalogues</a>
          </li>
          <li className="ml-4">
            <a href="/login" className="text-white hover:text-gray-300">Login</a>
          </li>
          <li className="ml-4">
            <a href="/signup" className="text-white hover:text-gray-300">Sign Up</a>
          </li>
          <li className="ml-4">
            <a href="http://panel.mait.ac.in:8012/media/images/CatalogCraft.apk" className="text-white hover:text-gray-300">Download App</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
