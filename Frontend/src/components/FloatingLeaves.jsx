import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const FloatingLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const newLeaves = [];
    const numLeaves = 10; 

    for (let i = 0; i < numLeaves; i++) {
      newLeaves.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10, 
        duration: 10 + Math.random() * 10, 
        size: 0.6 + Math.random() * 0.6, 
        opacity: 0.1 + Math.random() * 0.2,
        rotationStart: Math.random() * 360,
        rotationEnd: Math.random() * 360 + 180,
      });
    }
    setLeaves(newLeaves);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            opacity: leaf.opacity,
          }}
          initial={{ y: '110vh', rotate: leaf.rotationStart }}
          animate={{
            y: '-10vh',
            rotate: leaf.rotationEnd,
            x: [0, Math.random() > 0.5 ? 20 : -20, 0], 
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: 'linear',
            repeatType: "loop"
          }}
        >
          <Leaf 
            className="text-primary" 
            style={{ fontSize: `${leaf.size}rem`}}
            size={leaf.size * 16} 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingLeaves;