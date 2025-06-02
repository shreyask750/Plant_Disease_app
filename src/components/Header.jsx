import React from 'react';
import { Leaf, Home, Info, History, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'About', path: '/about', icon: Info },
  { name: 'Analysis History', path: '/history', icon: History },
  { name: 'Contact Us', path: '/contact', icon: Users },
];

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gradient-to-r from-primary via-green-600 to-green-700 text-primary-foreground shadow-lg sticky top-0 z-50 border-b-4 border-gold-DEFAULT"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center group">
            <Leaf className="h-10 w-10 mr-3 text-gold-DEFAULT group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl font-bold font-serif tracking-tight">
              LeafGuard <span className="text-gold-DEFAULT">AI</span>
            </h1>
          </NavLink>
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => // Corrected: isActive is destructured from the function argument
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out group
                  ${isActive 
                    ? 'bg-gold-DEFAULT text-primary shadow-retro-gold' 
                    : 'text-primary-foreground hover:bg-primary-foreground/20 hover:text-gold-DEFAULT transform hover:scale-105'
                  }`
                }
              >
                {({ isActive }) => ( // Pass isActive to children if needed, or use it directly for icon
                  <>
                    <item.icon className={`mr-2 h-5 w-5 transition-colors duration-300 ${isActive ? 'text-primary' : 'text-gold-DEFAULT group-hover:text-gold-DEFAULT'}`} />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;