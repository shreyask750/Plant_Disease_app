
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import UploadSection from '@/components/UploadSection';
import HowItWorks from '@/components/HowItWorks';
import About from '@/components/About';
import History from '@/components/History';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import KnightChatbot from '@/components/KnightChatbot';
import { Bot, Loader } from 'lucide-react';
import AboutBackground from '@/components/backgrounds/AboutBackground';
import HistoryBackground from '@/components/backgrounds/HistoryBackground';
import ContactBackground from '@/components/backgrounds/ContactBackground';

const RoyalGroveScene = React.lazy(() => import('@/components/RoyalGroveScene'));

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showChatbot, setShowChatbot] = useState(false);
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const savedDiagnoses = localStorage.getItem('leafguard-diagnoses');
    if (savedDiagnoses) {
      setDiagnoses(JSON.parse(savedDiagnoses));
    }
  }, []);

  const addDiagnosis = (diagnosis) => {
    const newDiagnoses = [diagnosis, ...diagnoses];
    setDiagnoses(newDiagnoses);
    localStorage.setItem('leafguard-diagnoses', JSON.stringify(newDiagnoses));
  };

  const renderBackground = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Suspense fallback={
            <div className="fixed inset-0 bg-background flex items-center justify-center z-0">
              <Loader className="w-12 h-12 text-primary animate-spin"/>
              <p className="ml-4 text-lg text-theme-yellow-text">Loading Sanctuary...</p>
            </div>
          }>
            <RoyalGroveScene />
          </Suspense>
        );
      case 'about':
        return <AboutBackground />;
      case 'history':
        return <HistoryBackground />;
      case 'contact':
        return <ContactBackground />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'history':
        return <History diagnoses={diagnoses} />;
      case 'contact':
        return <Contact />;
      default: // home
        return (
          <>
            <UploadSection onDiagnosis={addDiagnosis} />
            <HowItWorks />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen professional-bg relative overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-bg`}
          className="fixed inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
        >
          {renderBackground()}
        </motion.div>
      </AnimatePresence>
      
      <div className={`relative z-10 ${activeTab !== 'home' ? 'bg-background/70 backdrop-blur-lg' : ''} min-h-screen flex flex-col`}>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="container mx-auto px-4 py-12 flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <motion.button
        className="fixed bottom-10 right-10 w-16 h-16 professional-button rounded-full flex items-center justify-center z-50 shadow-2xl"
        onClick={() => setShowChatbot(!showChatbot)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        aria-label="Toggle Chatbot"
      >
        <Bot className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {showChatbot && (
          <KnightChatbot onClose={() => setShowChatbot(false)} />
        )}
      </AnimatePresence>

      <Toaster />
    </div>
  );
}

export default App;
