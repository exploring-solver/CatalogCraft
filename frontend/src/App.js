import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Signup from './components/Singup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddCatalogue from './components/AddCatalogue';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/catalog" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-catalog" element={<AddCatalogue />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App; 
