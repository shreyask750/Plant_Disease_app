
import React from 'react';
import { motion } from 'framer-motion';
import { Feather, ScrollText, Users2, MailCheck } from 'lucide-react';

const ContactBackground = () => {
  const numElements = 12; 
  const icons = [Feather, ScrollText, Users2, MailCheck];

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 contact-bg-medieval-council">
      {Array.from({ length: numElements }).map((_, i) => {
        const IconComponent = icons[i % icons.length];
        const colorClass = i % 4 === 0 ? 'text-yellow-500/20' : 
                           i % 4 === 1 ? 'text-amber-600/20' :
                           i % 4 === 2 ? 'text-orange-600/15' :
                           'text-yellow-700/15';
        return (
          <motion.div
            key={`medieval-icon-${i}`}
            className={`absolute ${colorClass}`}
            initial={{ 
              opacity: 0, 
              scale: Math.random() * 0.5 + 0.4, // Slightly larger base
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              rotate: (Math.random() - 0.5) * 45, // Less rotation
            }}
            animate={{ 
              opacity: [0, 0.25, 0.25, 0], // More visible
              x: `+=${(Math.random() - 0.5) * 150}px`, // Slower, wider drift
              y: `+=${(Math.random() - 0.5) * 150}px`,
              rotate: `+=${(Math.random() - 0.5) * 30}`,
            }}
            transition={{ 
              duration: Math.random() * 25 + 15, // Longer duration
              repeat: Infinity, 
              repeatType: "mirror",
              ease: "circInOut", // Smoother ease
              delay: Math.random() * 8
            }}
          >
            <IconComponent style={{ fontSize: `${Math.random() * 40 + 40}px` }} />
          </motion.div>
        );
      })}

      {/* Subtle scroll/parchment texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a07c43' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </div>
  );
};

export default ContactBackground;
