import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, ShieldCheck, FileText } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: UploadCloud,
      title: "Upload Leaf Image",
      description: "Securely upload a clear photograph of the affected plant leaf through our intuitive interface.",
      color: "text-sky-400" 
    },
    {
      icon: Cpu,
      title: "AI-Powered Analysis",
      description: "Our advanced AI model processes the image, comparing it against a vast database of plant diseases.",
      color: "text-purple-400"
    },
    {
      icon: FileText,
      title: "Detailed Report",
      description: "Receive a comprehensive diagnosis, including confidence level and potential disease identification.",
      color: "text-orange-400"
    },
    {
      icon: ShieldCheck,
      title: "Treatment Guidance",
      description: "Access curated treatment suggestions and preventative measures based on the analysis.",
      color: "text-green-400"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="py-16 md:py-24">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-semibold title-text-gradient mb-5 font-['Cinzel']">
            How LeafGuard AI Works
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto">
            A streamlined process from image upload to actionable plant health insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="professional-card rounded-xl p-6 md:p-8 text-center relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 12px 25px rgba(0,0,0,0.25)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative z-10">
                <div className="mb-6">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center shadow-lg border-2 border-primary/30`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="text-4xl font-bold primary-text-gradient opacity-30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-foreground/70 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
        >
          <div className="professional-card rounded-xl p-8 md:p-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-5 flex items-center justify-center">
              <Cpu className="w-7 h-7 mr-3 text-primary"/>
              Powered by Advanced AI
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              Our system utilizes sophisticated computer vision models, including EfficientNet and MobileNetV2, trained on the extensive PlantVillage dataset. This ensures high accuracy and efficiency in disease identification.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks;