
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Upload, Zap, History, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from '@/components/ThreeScene';

const Home = () => {
  // scrollProgress is no longer needed for the new ThreeScene logic
  // but keeping the structure in case other scroll-based animations are added later to the page content
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[200vh]"> 
      <ThreeScene /> {/* scrollProgress prop removed */}
      
      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="font-orbitron text-6xl md:text-8xl font-black text-green-400 text-emphasis mb-6">
                LeafGuard AI
              </h1>
              <div className="text-xl md:text-2xl text-green-300 mb-8 font-space-mono">
                <span className="text-glow-amber">AI-Powered Plant Disease Diagnosis</span>
                <br />
                <span className="text-green-400">& Treatment Recommendations</span>
              </div>
              <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Revolutionizing agriculture with cutting-edge AI technology. Upload a leaf image 
                and get instant disease diagnosis with professional treatment recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/upload">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-4 text-lg hover-glow transition-all duration-300">
                    <Upload className="mr-2 h-5 w-5" />
                    Start Diagnosis
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20 px-8 py-4 text-lg">
                    <Zap className="mr-2 h-5 w-5" />
                    How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-900/80 backdrop-blur-sm mt-[50vh]"> 
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-green-400 text-emphasis mb-6">
                Advanced Plant Health Analysis
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the future of agricultural technology with our retro-futuristic 
                AI-powered plant disease detection system.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Upload,
                  title: "Upload & Analyze",
                  description: "Simply upload a leaf image and our AI instantly analyzes it for diseases",
                  color: "text-green-400"
                },
                {
                  icon: Zap,
                  title: "AI Diagnosis",
                  description: "Advanced neural network provides accurate disease identification",
                  color: "text-yellow-400"
                },
                {
                  icon: Leaf,
                  title: "Treatment Plans",
                  description: "Get detailed treatment recommendations and prevention strategies",
                  color: "text-blue-400"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-8 hover-glow cursor-pointer group"
                >
                  <div className={`${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-12 w-12" />
                  </div>
                  <h3 className="font-orbitron text-xl font-bold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-green-400 text-emphasis mb-8">
                Ready to Protect Your Plants?
              </h2>
              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                Join thousands of farmers and gardeners who trust LeafGuard AI 
                for accurate plant disease diagnosis and treatment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/upload">
                  <Button className="bg-green-500 hover:bg-green-600 text-black font-bold px-12 py-6 text-xl pulse-glow">
                    <Upload className="mr-3 h-6 w-6" />
                    Upload Leaf Image
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500/20 px-12 py-6 text-xl">
                    <History className="mr-3 h-6 w-6" />
                    View History
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
