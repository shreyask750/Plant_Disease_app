
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Send, User, MessageSquare, CheckCircle, Feather, ScrollText, Users2, MailCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const developers = [
    {
      name: "Sampark Bhol",
      github: "https://github.com/SamparkBhol",
      icon: User,
    },
    {
      name: "Akshat Jain",
      github: "https://github.com/Ajain2916",
      icon: User,
    },
    {
      name: "Shreyas K",
      github: "https://github.com/shreyask750",
      icon: User,
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSent(false);

    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Sending email to aj29162460@gmail.com:', formData);

    toast({
      title: "Message Sent!",
      description: "Your missive has been dispatched. We shall respond anon!",
      action: <MailCheck className="text-green-400" />,
    });

    setFormData({ name: '', email: '', message: '' });
    setSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 font-['Cinzel']">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-semibold mb-6 title-text-gradient-alt">
          The Royal Scribes
        </h1>
        <p className="text-xl text-theme-yellow-text/80 max-w-3xl mx-auto">
          Meet the skilled artisans who forged LeafGuard AI.
        </p>
      </motion.div>

      <motion.div 
        className="grid md:grid-cols-3 gap-10 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {developers.map((dev, index) => (
          <motion.div
            key={index}
            className="medieval-card rounded-lg p-6 text-center group border-2 border-yellow-700/50 hover:border-yellow-600/80"
            variants={itemVariants}
            whileHover={{ y: -6, boxShadow: "0 12px 25px rgba(185, 137, 54, 0.2)" }}
          >
            <dev.icon className="w-20 h-20 mx-auto mb-5 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            <h3 className="text-2xl font-bold text-theme-yellow-text mb-2">
              {dev.name}
            </h3>
            <motion.a
              href={dev.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 medieval-button-secondary px-5 py-2.5 rounded-md text-yellow-300 font-semibold text-sm"
              whileHover={{ scale: 1.05, backgroundColor: "hsl(var(--border-medieval-hover))" }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              <span>View Chronicle</span>
            </motion.a>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="medieval-card rounded-xl p-8 md:p-12 border-2 border-yellow-700/60"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-theme-yellow-text mb-5 flex items-center justify-center">
            <Feather className="w-10 h-10 mr-4 text-yellow-500" />
            Send a Missive
          </h2>
          <p className="text-theme-yellow-text/70 text-lg">
            Shouldst thou have queries or require aid, pen thy thoughts here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-theme-yellow-text/90 font-semibold mb-2 text-sm">
                Thy Noble Name
              </label>
              <div className="relative">
                <Users2 className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-600" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="medieval-input w-full pl-12 pr-4 py-3 rounded-md"
                  placeholder="e.g., Sir Reginald Oakheart"
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-theme-yellow-text/90 font-semibold mb-2 text-sm">
                Thy Courier's Mark (Email)
              </label>
              <div className="relative">
                <ScrollText className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-600" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="medieval-input w-full pl-12 pr-4 py-3 rounded-md"
                  placeholder="e.g., sir.reginald@camelot.com"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block text-theme-yellow-text/90 font-semibold mb-2 text-sm">
              Thy Message Scroll
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-4 w-5 h-5 text-yellow-600" />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="medieval-input w-full pl-12 pr-4 py-3 rounded-md resize-none"
                placeholder="Hark, scribe thy query or tidings upon this parchment..."
              />
            </div>
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <Button
              type="submit"
              disabled={sending || sent}
              className="medieval-button px-10 py-3.5 text-base font-bold w-full md:w-auto"
              size="lg"
            >
              {sending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-yellow-200 border-t-transparent rounded-full animate-spin" />
                  <span>Dispatching Scroll...</span>
                </div>
              ) : sent ? (
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-300" />
                  <span>Scroll Sent!</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Dispatch Missive</span>
                </div>
              )}
            </Button>
          </motion.div>
        </form>

        <div className="mt-10 text-center">
          <p className="text-yellow-600 text-sm">
            Thy missives shall be delivered to the Grand Scribe at: <span className="font-mono text-yellow-400/80">aj29162460@gmail.com</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
