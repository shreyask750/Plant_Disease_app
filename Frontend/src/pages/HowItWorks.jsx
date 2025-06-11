
import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Brain, FileText, Camera, Zap, Shield } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Camera,
      title: "Upload Image",
      description: "Take a clear photo of the affected plant leaf or upload an existing image from your device.",
      details: "Our system accepts JPG, PNG, and WebP formats up to 10MB. For best results, ensure good lighting and focus on the diseased area.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced neural network analyzes the image using deep learning algorithms.",
      details: "Trained on a comprehensive dataset of plant disease images, our AI can identify common plant diseases. Backend integration required for full functionality.",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      icon: FileText,
      title: "Get Solution",
      description: "Receive detailed diagnosis results with treatment recommendations and prevention strategies.",
      details: "Our system will provide confidence scores, severity assessment, treatment protocols, and preventive measures once the AI backend is fully integrated.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30"
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results quickly with our optimized AI inference engine (requires backend)."
    },
    {
      icon: Shield,
      title: "Highly Accurate",
      description: "High accuracy rate targeted with expert agricultural assessments (requires backend)."
    },
    {
      icon: Brain,
      title: "Continuously Learning",
      description: "Our AI model is designed to improve with every diagnosis (requires backend)."
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900 botanical-pattern-light">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-green-400 text-emphasis mb-6">
            How LeafGuard AI Works
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the technology behind our AI-powered plant disease 
            diagnosis system.
          </p>
        </motion.div>

        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-orbitron text-3xl font-bold text-center text-green-400 text-emphasis mb-12"
          >
            Three Simple Steps
          </motion.h2>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={`flex-1 bg-gray-800/60 backdrop-blur-sm border ${step.borderColor} rounded-lg p-8 hover-glow`}>
                  <div className="flex items-center mb-6">
                    <div className={`p-4 ${step.bgColor} rounded-lg mr-4`}>
                      <step.icon className={`h-8 w-8 ${step.color}`} />
                    </div>
                    <div>
                      <span className="text-sm text-gray-400 font-semibold">STEP {index + 1}</span>
                      <h3 className="font-orbitron text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 mb-4">
                    {step.description}
                  </p>
                  <p className="text-gray-400 leading-relaxed">
                    {step.details}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 ${step.bgColor} border-2 ${step.borderColor} rounded-full flex items-center justify-center glow-green`}>
                    <span className={`font-orbitron text-2xl font-bold ${step.color}`}>
                      {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="font-orbitron text-3xl font-bold text-center text-green-400 text-emphasis mb-12">
            Advanced AI Technology
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 text-center hover-glow"
              >
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="font-orbitron text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-8 glow-green"
        >
          <h2 className="font-orbitron text-2xl font-bold text-green-400 text-emphasis mb-6">
            Technical Specifications
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-3">AI Model Architecture</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Base Model:</strong> Custom Neural Networks</li>
                <li>• <strong>Training Dataset:</strong> Large-scale Plant Disease Datasets</li>
                <li>• <strong>Disease Classes:</strong> Diverse range of common plant diseases</li>
                <li>• <strong>Accuracy:</strong> High accuracy targeted</li>
                <li>• <strong>Inference Time:</strong> Optimized for speed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-3">System Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• <strong>Backend:</strong> FastAPI (or similar) with inference pipeline</li>
                <li>• <strong>Image Processing:</strong> Automated preprocessing</li>
                <li>• <strong>Treatment Database:</strong> Curated recommendations (backend dependent)</li>
                <li>• <strong>Weather Integration:</strong> Planned feature (backend dependent)</li>
                <li>• <strong>Location Services:</strong> Planned feature (backend dependent)</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;