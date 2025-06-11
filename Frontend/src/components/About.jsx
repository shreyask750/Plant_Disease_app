import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Brain, Globe, Users, Cpu, Database, Aperture } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Cpu,
      title: "AI-Powered Detection",
      description: "Advanced machine learning models are trained on extensive datasets of plant disease images to ensure accurate diagnosis."
    },
    {
      icon: Leaf,
      title: "Plant Health Focus",
      description: "Specialized in identifying common crop diseases to help maintain healthy and productive agricultural systems."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Aimed at supporting farmers worldwide in early disease detection to help sustain food supply chains and ensure food security."
    },
    {
      icon: Users,
      title: "User-Centric Design",
      description: "Developed with a focus on ease of use, providing clear and actionable insights for users of all technical backgrounds."
    }
  ];

  const techStack = [
    { name: "React", description: "A modern JavaScript library for building user interfaces with a component-based architecture." },
    { name: "FastAPI", description: "A high-performance Python web framework for building APIs, ideal for serving AI models efficiently." },
    { name: "TensorFlow/PyTorch", description: "Leading deep learning frameworks utilized for developing and training computer vision models." },
    { name: "Google Maps API", description: "Integrated for potential future features like regional disease tracking and localized advice." },
    { name: "PlantVillage Dataset", description: "A comprehensive, publicly available dataset of plant disease images used for model training." },
    { name: "EfficientNet/MobileNetV2", description: "State-of-the-art, efficient convolutional neural network architectures for image classification." }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        variants={itemVariants}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-semibold mb-6 font-['Cinzel'] title-text-gradient">
          About LeafGuard AI
        </h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
          An AI-powered platform designed to provide farmers and gardeners with advanced tools for crop disease detection and management, promoting sustainable agriculture.
        </p>
      </motion.div>

      <motion.div
        className="professional-card rounded-xl p-8 md:p-12 mb-16"
        variants={itemVariants}
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-foreground mb-6 flex items-center justify-center">
            <Aperture className="w-8 h-8 mr-3 text-primary" />
            Our Mission
          </h2>
          <p className="text-lg text-foreground/80 leading-relaxed max-w-4xl mx-auto">
            Plant diseases represent a significant challenge to agricultural productivity and global food security. LeafGuard AI aims to mitigate this by leveraging artificial intelligence for early and accurate disease detection. Our mission is to empower users with accessible, data-driven insights and actionable recommendations, fostering healthier crops and more resilient food systems.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mb-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-semibold text-center mb-12 title-text-gradient">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="professional-card rounded-lg p-6 flex items-start space-x-4"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="professional-card rounded-xl p-8 md:p-12 mb-16"
        variants={itemVariants}
      >
        <h2 className="text-4xl font-semibold text-foreground text-center mb-12 flex items-center justify-center">
          <Database className="w-8 h-8 mr-3 text-primary" />
          Technology Stack
        </h2>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-primary transition-shadow duration-300 hover:shadow-lg"
              variants={itemVariants}
              whileHover={{ borderColor: "hsl(var(--primary-hover))" }}
            >
              <h3 className="font-semibold text-foreground/90 mb-1">{tech.name}</h3>
              <p className="text-foreground/70 text-sm">{tech.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="professional-card rounded-xl p-8 md:p-12"
        variants={itemVariants}
      >
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-foreground mb-10 flex items-center justify-center">
            <Globe className="w-8 h-8 mr-3 text-primary" />
            Real-World Impact
          </h2>
          <motion.div className="grid md:grid-cols-3 gap-8" variants={containerVariants}>
            {[
              { title: "Early Detection", description: "Identify crop diseases in their initial stages, preventing widespread damage and minimizing crop loss." },
              { title: "Resource Optimization", description: "Reduce unnecessary pesticide use through accurate diagnosis and targeted treatment recommendations." },
              { title: "Enhanced Food Security", description: "Contribute to global food security by helping farmers maintain healthy, productive crops more efficiently." }
            ].map((impact, index) => (
              <motion.div key={index} variants={itemVariants}>
                <h3 className="text-2xl font-medium primary-text-gradient mb-2">{impact.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{impact.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;