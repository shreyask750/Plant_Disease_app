
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20">
      <motion.div
        className="professional-card-footer mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 rounded-t-xl py-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-3 mb-5">
              <ShieldCheck className="w-10 h-10 text-primary" />
              <h2 className="text-3xl font-semibold primary-text-gradient font-['Press_Start_2P'] tracking-tight">
                LeafGuard AI
              </h2>
              <Leaf className="w-8 h-8 text-primary" />
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm font-['VT323'] text-lg leading-relaxed">
              Advanced AI solutions for plant health and agricultural sustainability. Committed to empowering growers with cutting-edge technology. Pixel by pixel, we protect your harvest.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-500 font-medium text-sm font-['VT323'] text-base">
              © {new Date().getFullYear()} LeafGuard AI Project Limited. All Rights Reserved. Est. 2025.
            </p>
            <p className="text-gray-600 text-xs mt-2 font-['VT323'] text-sm">
              System Online. All code compiled with precision and expertise.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
