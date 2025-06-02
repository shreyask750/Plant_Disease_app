import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import AnalysisHistoryPage from '@/pages/AnalysisHistoryPage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { Toaster } from '@/components/ui/toaster';
import { motion } from 'framer-motion';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background bg-greek-pattern selection:bg-gold-DEFAULT selection:text-primary">
        <Header />
        <motion.main 
          className="flex-grow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/history" element={<AnalysisHistoryPage />} />
          </Routes>
        </motion.main>
        <Footer />
        <ChatWidget />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;