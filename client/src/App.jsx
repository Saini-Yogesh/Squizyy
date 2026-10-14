import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/layout/CartDrawer';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import OurStory from './pages/OurStory';
import StoreLocator from './pages/StoreLocator';
import Wholesale from './pages/Wholesale';
import SproutsContest from './pages/SproutsContest';
import Rules from './pages/Rules';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <CartDrawer />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/all" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/pages/our-story" element={<OurStory />} />
          <Route path="/pages/store-locator" element={<StoreLocator />} />
          <Route path="/pages/wholesale" element={<Wholesale />} />
          <Route path="/pages/sproutslaunchwinflightstoaustralia" element={<SproutsContest />} />
          <Route path="/pages/rules" element={<Rules />} />
          <Route path="/policies/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/policies/terms-of-service" element={<TermsOfService />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
