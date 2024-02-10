import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <p>Made by Team Progmatic for Build for Bharat Hackathon for ONDC company</p>
        <p>© {new Date().getFullYear()} CatalogCraft - All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
