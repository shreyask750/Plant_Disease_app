import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Sparkles } from 'lucide-react';

const AboutBackground = () => {
  const numScrolls = 8;
  const numSparkles = 15;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 about-bg-scrolls">
      {Array.from({ length: numScrolls }).map((_, i) => (
        <motion.div
          key={`scroll-${i}`}
          className="absolute text-secondary/30"
          initial={{ 
            opacity: 0, 
            scale: Math.random() * 0.5 + 0.3,
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            rotate: Math.random() * 360 - 180
          }}
          animate={{ 
            opacity: [0, 0.3, 0.3, 0],
            x: `calc(${Math.random() * 100}vw - 50px)`, // -50px to adjust for icon size
            y: `calc(${Math.random() * 100}vh - 50px)`,
            scale: Math.random() * 0.3 + 0.5,
            rotate: Math.random() * 180 - 90
          }}
          transition={{ 
            duration: Math.random() * 20 + 15, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        >
          <ScrollText style={{ fontSize: `${Math.random() * 40 + 60}px` }} />
        </motion.div>
      ))}
      {Array.from({ length: numSparkles }).map((_, i) => (
         <motion.div
          key={`sparkle-about-${i}`}
          className="absolute text-tertiary/50"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: Math.random() * 0.5 + 0.2,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.2, Math.random() * 0.5 + 0.3, 0.2],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "circOut"
          }}
        >
          <Sparkles style={{ fontSize: `${Math.random() * 15 + 10}px` }} />
        </motion.div>
      ))}
    </div>
  );
};

export default AboutBackground;