import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Cpu, Users, Target } from 'lucide-react';

const AboutPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <motion.h1 variants={cardVariants} className="text-5xl font-bold font-serif text-primary mb-4">
          About LeafGuard <span className="text-gold-DEFAULT">AI</span>
        </motion.h1>
        <motion.p variants={cardVariants} className="text-xl text-muted-foreground max-w-3xl mx-auto">
          LeafGuard AI is a revolutionary tool designed to empower farmers and gardening enthusiasts with cutting-edge technology for early plant disease detection and management.
        </motion.p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}>
          <Card className="h-full shadow-retro-green border-2 border-primary hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <Target className="w-8 h-8 mr-3 text-gold-DEFAULT" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Our mission is to make plant healthcare accessible, affordable, and accurate. We aim to help reduce crop losses, promote sustainable agriculture, and support food security by providing timely and actionable insights into plant health. We believe that technology can bridge the gap between traditional farming practices and modern agricultural needs.
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}>
          <Card className="h-full shadow-retro-green border-2 border-primary hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-primary">
                <Cpu className="w-8 h-8 mr-3 text-gold-DEFAULT" />
                The Technology
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                LeafGuard AI utilizes state-of-the-art computer vision models, fine-tuned on extensive datasets like PlantVillage. Our system can identify a wide range of plant diseases from a simple leaf image. We provide not just a diagnosis, but also confidence scores and practical treatment recommendations, covering both organic and chemical approaches.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        className="mb-16"
      >
        <motion.h2 variants={cardVariants} className="text-3xl font-bold font-serif text-primary text-center mb-8">
          Why LeafGuard AI?
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Leaf, title: "Early Detection", text: "Identify diseases at an early stage to prevent widespread damage and save your crops." },
            { icon: Users, title: "User-Friendly", text: "Simple drag-and-drop interface, making advanced AI accessible to everyone." },
            { icon: Cpu, title: "Actionable Insights", text: "Get clear, step-by-step treatment guides for effective disease management." }
          ].map((feature, index) => (
            <motion.div key={index} initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}>
              <Card className="text-center p-6 shadow-retro-gold border-2 border-gold-DEFAULT hover:bg-primary/5 transition-colors duration-300">
                <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold font-serif text-primary mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center"
      >
        <motion.p variants={cardVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join us in revolutionizing plant care. With LeafGuard AI, a healthier harvest is just a click away.
        </motion.p>
      </motion.section>
    </motion.div>
  );
};

export default AboutPage;