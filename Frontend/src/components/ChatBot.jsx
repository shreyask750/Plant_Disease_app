import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const predefinedQuestions = [
  { id: 'q1', text: "What is LeafGuard AI?" },
  { id: 'q2', text: "How does plant disease detection work?" },
  { id: 'q3', text: "What types of plants can I scan?" },
  { id: 'q4', text: "Is my data secure?" },
];

const predefinedResponses = {
  q1: "LeafGuard AI is an advanced platform that uses Artificial Intelligence to detect plant diseases from images of plant leaves, providing quick diagnosis and treatment recommendations.",
  q2: "You upload an image of a plant leaf, and our AI model (once fully integrated) will analyze it for visual patterns indicative of diseases. It will then provide a diagnosis and suggest potential treatments.",
  q3: "LeafGuard AI is designed to work with a wide variety of common agricultural and garden plants. We are continuously expanding our database to support more plant species.",
  q4: "Yes, protecting your data is our priority. All uploaded images and diagnosis results are handled securely. You can learn more in our (upcoming) Privacy Policy.",
};

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Blighty the Fungus 🍄. Ask me a question from the list below!",
      isBot: true,
    },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleQuestionSelect = (questionId) => {
    const selectedQuestion = predefinedQuestions.find(q => q.id === questionId);
    if (!selectedQuestion) return;

    const userMessage = {
      id: Date.now(),
      text: selectedQuestion.text,
      isBot: false,
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponseText = predefinedResponses[questionId] || "I'm not sure how to answer that yet!";
      const botResponse = {
        id: Date.now() + 1,
        text: botResponseText,
        isBot: true,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 pulse-glow"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 w-80 h-[500px] bg-gray-800/95 backdrop-blur-md border border-green-500/30 rounded-lg shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-green-500/30 bg-green-500/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full pulse-glow"></div>
                  <span className="font-orbitron font-bold text-green-400">
                    Blighty the Fungus
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-green-400 hover:bg-green-500/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm break-words ${
                      message.isBot
                        ? 'bg-green-500/20 text-green-100 border border-green-500/30'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-green-500/30 max-h-[180px] overflow-y-auto">
              <p className="text-xs text-gray-400 mb-2">Select a question:</p>
              <div className="space-y-2">
                {predefinedQuestions.map((q) => (
                  <Button
                    key={q.id}
                    variant="outline"
                    className="w-full justify-start text-left border-green-500/50 text-green-300 hover:bg-green-500/10 hover:text-green-200"
                    onClick={() => handleQuestionSelect(q.id)}
                  >
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;