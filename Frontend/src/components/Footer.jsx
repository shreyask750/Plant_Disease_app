import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <motion.footer 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="bg-gray-900 text-gray-400 py-10 mt-16 border-t-4 border-primary pixel-borders-gold"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <span className="font-serif text-xl text-gold-DEFAULT">LeafGuard AI</span>
          <p className="text-sm text-gray-500 mt-1">Your Partner in Plant Health</p>
        </div>
        <div className="flex flex-wrap justify-center space-x-6 mb-6">
          <NavLink to="/about" className="hover:text-gold-DEFAULT transition-colors">About Us</NavLink>
          <NavLink to="/history" className="hover:text-gold-DEFAULT transition-colors">Analysis History</NavLink>
          <NavLink to="/contact" className="hover:text-gold-DEFAULT transition-colors">Contact Us</NavLink>
          <a href="#" className="hover:text-gold-DEFAULT transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gold-DEFAULT transition-colors">Terms of Service</a>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LeafGuard AI. All rights reserved.
        </p>
        <div className="mt-6 h-1.5 w-24 mx-auto bg-gold-DEFAULT rounded-sm pixel-block"></div>
      </div>
    </motion.footer>
  );
};

export default Footer;