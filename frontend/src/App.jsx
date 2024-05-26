import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Footer from './components/Footer';
import Signup from './components/Singup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddCatalogue from './components/AddCatalogue';
import Catalogue from './components/CatalogDetails';
import Catalogs from './components/Catalogs';
import NavbarMain from './components/NavbarMain';
import NotFound from './components/Standard/NotFound';
import { TemplateCatalog } from './components/Catalogues/TemplateCatalog';
import CatalogList from './components/CatalogList';
import ProfileScreen from './components/Profile/ProfileScreen';
import ProductSearch from './components/Catalogues/ProductSearch';
import Help from './components/Help';
import Translator from './components/Translator';
import CatalogueLateralForm from './components/Catalogues/CatalogueLateralForm';
import MyCatalogs from './components/Catalogues/MyCatalogs';
import UserCatalogCard from './components/Utils/UserCatalogDetails';
import BulkData from './components/Catalogues/BulkData';
import CatalogueAdmin from './components/CatalogueAdmin';
import { BulkDataAddition } from './components/Catalogues/BulkDataAddition';
import CatalogQuickLateralForm from './components/Catalogues/CatalogQuickLateral';
import AddProductForm from './components/Catalogues/VoiceAddCatalog';
import VoiceForm from './components/Catalogues/VoiceAddCatalog';

function App() {
  return (
    <>
      <NavbarMain />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/catalog" element={<Home />} />
        <Route path="/my-cata" element={<MyCatalogs />} />
        <Route path="/cata-admin" element={<CatalogueAdmin />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route path="/product-search" element={<ProductSearch />} />
        <Route path="/catalogues/search/:query" element={<CatalogList />} />
        <Route path="/catalogues/template/:name" element={<TemplateCatalog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/lateral" element={<CatalogueLateralForm />} />
        <Route path="/instant-lateral" element={<CatalogQuickLateralForm />} />
        <Route path="/add-catalog" element={<VoiceForm />} />
        <Route path="/bulk-data" element={<BulkData />} />
        <Route path="/bulk-data-show" element={<BulkDataAddition />} />
        <Route path="/login" element={<Login />} />
        <Route path="/help" element={<Help />} />
        <Route path="/catalogue/:id" element={<Catalogue />} />
        <Route path="/yourcatalogue/:id" element={<UserCatalogCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
