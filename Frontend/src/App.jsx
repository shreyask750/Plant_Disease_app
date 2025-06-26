import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Upload from '@/pages/Upload';
import HowItWorks from '@/pages/HowItWorks';
import About from '@/pages/About';
import History from '@/pages/History';
import Contact from '@/pages/Contact';
import NearbyShops from '@/pages/NearbyShops'; // ✅ New page
import Footer from '@/components/Footer';
import ChatBot from '@/components/ChatBot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 relative">
        <div className="scan-lines absolute inset-0 pointer-events-none"></div>
        <Navbar />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nearby" element={<NearbyShops />} /> {/* ✅ New route */}
          </Routes>
        </main>
        <Footer />
        <ChatBot />
        <Toaster />
      </div>
    </Router>
  );
}

export default App; 