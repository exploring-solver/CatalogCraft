import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavbarWithMegaMenu } from './components/OutNavbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Signup from './components/Singup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddCatalogue from './components/AddCatalogue';
import { ProductTypeSelection, StoreTypeSelection } from './components/TypeSelection';
import Catalogue from './components/CatalogDetails';
import Catalogs from './components/Catalogs';
import AuthState from './Context/Auth/AuthState';
import NavbarMain from './components/NavbarMain';

function App() {
  {/*PITCH: include the   Technology Service Provide part for our solution.*/}
  return (
    <Router>
      <AuthState>
        <NavbarMain />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/catalog" element={<Home />} />
          <Route path="/catalogs" element={<Catalogs />} />
          <Route path="/store-select" element={<StoreTypeSelection />} />
          <Route path="/product-select" element={<ProductTypeSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-catalog" element={<AddCatalogue />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogue/:id" element={<Catalogue />} />
        </Routes>
        <Footer />
      </AuthState>
    </Router>
  );
}

export default App; 
