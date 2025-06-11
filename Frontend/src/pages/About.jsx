import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Globe } from 'lucide-react';

const DataGlobe = () => {
  const globeRef = useRef();
  const leavesRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.005;
    }
    if (leavesRef.current) {
      leavesRef.current.rotation.y -= 0.003;
    }
  });

  return (
    <group>
      <Sphere ref={globeRef} args={[2]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#1a4a1a" 
          emissive="#00cc66" 
          emissiveIntensity={0.05}
          wireframe
        />
      </Sphere>
      <group ref={leavesRef}>
        {Array.from({ length: 20 }).map((_, i) => {
          const phi = Math.acos(-1 + (2 * i) / 20);
          const theta = Math.sqrt(20 * Math.PI) * phi;
          const x = 2.2 * Math.cos(theta) * Math.sin(phi);
          const y = 2.2 * Math.sin(theta) * Math.sin(phi);
          const z = 2.2 * Math.cos(phi);
          return (
            <Sphere key={i} args={[0.05]} position={[x, y, z]}>
              <meshStandardMaterial 
                color="#00cc66" 
                emissive="#00cc66" 
                emissiveIntensity={0.6}
              />
            </Sphere>
          );
        })}
      </group>
      {Array.from({ length: 10 }).map((_, i) => (
        <Sphere 
          key={`pulse-${i}`} 
          args={[0.02]} 
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6
          ]}
        >
          <meshStandardMaterial 
            color="#66ffff" 
            emissive="#66ffff" 
            emissiveIntensity={0.8}
          />
        </Sphere>
      ))}
    </group>
  );
};

const About = () => {
  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-emphasis text-green-400 mb-6">
            About LeafGuard AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionizing agriculture through artificial intelligence, bringing cutting-edge 
            plant disease detection to farmers and gardeners worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-8">
            <h2 className="font-orbitron text-3xl font-bold text-center text-green-400 text-emphasis mb-8">
              Global Plant Health Network
            </h2>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="h-80">
                <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                  <ambientLight intensity={0.2} />
                  <pointLight position={[10, 10, 10]} intensity={0.7} color="#00ff00" />
                  <DataGlobe />
                </Canvas>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-green-400 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To democratize plant health monitoring through accessible AI technology, 
                    helping farmers and gardeners protect their crops with professional-grade 
                    disease detection and treatment recommendations.
                  </p>
                </div>
                <div>
                  <h3 className="font-orbitron text-xl font-bold text-green-400 mb-3">
                    Technology Stack
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• <strong>AI Framework:</strong> TensorFlow/PyTorch with Custom Models</li>
                    <li>• <strong>Backend:</strong> FastAPI with optimized inference pipeline</li>
                    <li>• <strong>Frontend:</strong> React with Three.js 3D visualizations</li>
                    <li>• <strong>Hosting:</strong> Scalable Cloud Infrastructure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg p-8 text-center"
        >
          <Globe className="h-16 w-16 text-green-400 mx-auto mb-4" />
          <h2 className="font-orbitron text-2xl font-bold text-green-400 text-emphasis mb-4">
            Robust & Scalable Platform
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Our AI infrastructure is built for performance, providing scalable backend 
            services, fast inference capabilities, and optimized 3D rendering for the best 
            user experience.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Scalable AI Backend</h4>
              <p className="text-gray-400">Auto-scaling inference servers for high availability</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Fast Inference</h4>
              <p className="text-gray-400">Optimized model serving with rapid response times</p>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">3D Optimization</h4>
              <p className="text-gray-400">Hardware-accelerated 3D rendering and animations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;