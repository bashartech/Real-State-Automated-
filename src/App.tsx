import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Sell from './pages/Sell';
import Neighborhoods from './pages/Neighborhoods';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';

export default function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/neighborhoods" element={<Neighborhoods />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
            <Footer />
            <Chatbot />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}
