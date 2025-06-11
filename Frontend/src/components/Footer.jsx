import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative bg-gray-900/80 border-t border-green-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="font-orbitron text-green-400 flicker"
          >
            <span className="text-lg font-bold">© 2025 LeafGuard AI Project Limited</span>
          </motion.div>
          <div className="mt-4 text-sm text-gray-400">
            <span>Advanced AI for Plant Health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;