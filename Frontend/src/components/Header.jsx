import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Home, Info, BookOpen, MessageSquare } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'history', label: 'Diagnoses', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: MessageSquare }
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, color: "hsl(var(--primary))" },
    tap: { scale: 0.95 }
  };

  return (
    <motion.header 
      className="relative z-20 py-5 backdrop-blur-sm bg-background/50 sticky top-0 shadow-lg border-b border-border/50"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative p-2 bg-primary/10 rounded-full">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <Leaf className="w-5 h-5 text-green-400 absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold header-title-gradient font-['Cinzel'] tracking-wider">
                LeafGuard AI
              </h1>
              <p className="text-xs text-foreground/70 font-medium tracking-wide">
                Intelligent Plant Diagnostics
              </p>
            </div>
          </motion.div>

          <nav className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors duration-300 flex items-center space-x-2 ${
                  activeTab === item.id
                    ? 'bg-primary/90 text-white shadow-md'
                    : 'text-foreground/80 hover:bg-muted hover:text-primary'
                }`}
                onClick={() => setActiveTab(item.id)}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-muted text-foreground/90 px-4 py-2.5 rounded-lg border border-border focus:ring-primary focus:border-primary text-sm"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;