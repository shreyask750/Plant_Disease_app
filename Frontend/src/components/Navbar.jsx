// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Leaf, Menu, X } from 'lucide-react';
// import { Button } from '@/components/ui/button';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Upload', path: '/upload' },
//     { name: 'How It Works', path: '/how-it-works' },
//     { name: 'About', path: '/about' },
//     { name: 'History', path: '/history' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-green-500/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <Link to="/" className="flex items-center space-x-2 group">
//             <motion.div
//               whileHover={{ rotate: 360 }}
//               transition={{ duration: 0.5 }}
//               className="p-2 bg-green-500/10 rounded-lg"
//             >
//               <Leaf className="h-6 w-6 text-green-400" />
//             </motion.div>
//             <span className="font-orbitron font-bold text-xl text-green-400 text-emphasis">
//               LeafGuard AI
//             </span>
//           </Link>

//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
//                     location.pathname === item.path
//                       ? 'bg-green-500/20 text-green-300'
//                       : 'text-gray-400 hover:bg-green-500/10 hover:text-green-300'
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="md:hidden">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-green-400 hover:bg-green-500/20"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </Button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           className="md:hidden bg-gray-800/95 backdrop-blur-md border-b border-green-500/20"
//         >
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
//                   location.pathname === item.path
//                     ? 'bg-green-500/20 text-green-300'
//                     : 'text-gray-400 hover:bg-green-500/10 hover:text-green-300'
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Upload', path: '/upload' },
    { name: 'Nearby Shops', path: '/nearby' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'About', path: '/about' },
    { name: 'History', path: '/history' },
    { name: 'Contact', path: '/contact' },

  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-green-500/10 rounded-lg"
            >
              <Leaf className="h-6 w-6 text-green-400" />
            </motion.div>
            <span className="font-orbitron font-bold text-xl text-green-400 text-emphasis">
              LeafGuard AI
            </span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-green-500/20 text-green-300'
                      : 'text-gray-400 hover:bg-green-500/10 hover:text-green-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-400 hover:bg-green-500/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-gray-800/95 backdrop-blur-md border-b border-green-500/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-green-500/20 text-green-300'
                    : 'text-gray-400 hover:bg-green-500/10 hover:text-green-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;