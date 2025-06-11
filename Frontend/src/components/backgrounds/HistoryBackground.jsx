import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Landmark } from 'lucide-react';

const HistoryBackground = () => {
  const numElements = 6;

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 history-bg-vault">
      {Array.from({ length: numElements }).map((_, i) => (
        <motion.div
          key={`landmark-${i}`}
          className="absolute text-border/20"
          initial={{ 
            opacity: 0, 
            scale: Math.random() * 0.4 + 0.6,
            x: `${Math.random() * 80 + 10}vw`, // Keep within viewport a bit more
            y: `${Math.random() * 70 + 15}vh`, //
            filter: `blur(${Math.random() * 3}px)`
          }}
          animate={{ 
            opacity: [0, 0.1, 0.1, 0],
            x: `${Math.random() * 80 + 10}vw`,
            y: `${Math.random() * 70 + 15}vh`,
          }}
          transition={{ 
            duration: Math.random() * 25 + 20, 
            repeat: Infinity, 
            repeatType: "mirror",
            ease: "linear",
            delay: Math.random() * 7
          }}
        >
          <Landmark style={{ fontSize: `${Math.random() * 80 + 80}px` }} />
        </motion.div>
      ))}
       {Array.from({ length: numElements + 2 }).map((_, i) => (
        <motion.div
          key={`book-${i}`}
          className="absolute text-muted/30"
          initial={{ 
            opacity: 0, 
            scale: Math.random() * 0.2 + 0.2,
            x: `${Math.random() * 90 + 5}vw`,
            y: `${Math.random() * 90 + 5}vh`,
            rotate: Math.random() * 40 - 20,
          }}
          animate={{ 
            opacity: [0, 0.2, 0.2, 0],
            y: `+=${Math.random() * 40 - 20}vh`, // slow drift
          }}
          transition={{ 
            duration: Math.random() * 30 + 25, 
            repeat: Infinity, 
            repeatType: "loop", // loop rather than mirror for continuous drift
            ease: "easeInOut",
            delay: Math.random() * 10
          }}
        >
          <BookOpen style={{ fontSize: `${Math.random() * 30 + 40}px` }} />
        </motion.div>
      ))}
    </div>
  );
};

export default HistoryBackground;