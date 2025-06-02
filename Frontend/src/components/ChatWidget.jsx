import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌿 Welcome to LeafGuard AI! I'm Leafy, your plant care assistant. Upload a leaf image for disease diagnosis, or ask about treatments and nearby agro-shops. Try one of the options below! 🌱",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const scrollAreaRef = useRef(null);

  const predefinedQuestions = [
    { id: 'q1', text: "How do I diagnose a plant disease?" },
    { id: 'q2', text: "What treatments are available for tomato blight?" },
    { id: 'q3', text: "Find agro-shops near me" },
  ];

  const predefinedAnswers = {
    "How do I diagnose a plant disease?": "To diagnose a plant disease, upload a clear image of the affected leaf using the upload button on the main page. Our AI, powered by MobileNetV2, will analyze it and return the disease name with confidence scores. For example, it might detect Tomato Late Blight with 95% confidence. Try it now!",
    "What treatments are available for tomato blight?": "Organic Treatment for Tomato Blight:\n1. Remove Affected Leaves: Carefully cut off infected leaves and dispose of them away from plants.\n2. Improve Air Circulation: Space plants adequately and prune lower leaves.\n3. Apply Copper-Based Fungicide: Use organic copper sprays like Bordeaux mixture weekly.\nChemical Treatment:\n1. Fungicides: Apply chlorothalonil or mancozeb-based fungicides as per label instructions.\n2. Rotate Crops: Prevent recurrence by rotating crops yearly.\nSource: WikiHow & FAO Guidelines",
    "Find agro-shops near me": "Please provide your PIN code in the input field, and I'll use Google Maps to find nearby agro-chemical shops for your plant care needs!",
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isOpen, isBotTyping]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (text) => {
    const userMessage = text.trim();
    if (!userMessage) {
      setMessages([...messages, {
        id: Date.now(),
        text: "⚠️ Please enter a valid message!",
        sender: 'bot'
      }]);
      return;
    }

    const newMessages = [...messages, { id: Date.now(), text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsBotTyping(true);

    setTimeout(() => {
      let botResponseText = "I'm sorry, I can only answer predefined questions or respond to PIN codes for shop locations. Try one of the options below!";
      if (predefinedAnswers[userMessage]) {
        botResponseText = predefinedAnswers[userMessage];
      } else if (/^\d{6}$/.test(userMessage)) {
        botResponseText = `🔍 Searching for agro-shops near PIN ${userMessage}...\nExample Shop: Green Agro Supplies, 2 km away.\nNote: For real shop results, check the Shop Locator on the main page with Google Maps integration!`;
      }
      
      const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages([...newMessages, botMessage]);
      setIsBotTyping(false);
    }, 1000); // Simulate typing delay
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleQuickReply = (questionText) => {
    handleSendMessage(questionText);
  };

  const handleClearChat = () => {
    setMessages([{
      id: 1,
      text: "🌿 Welcome to LeafGuard AI! I'm Leafy, your plant care assistant. Upload a leaf image for disease diagnosis, or ask about treatments and nearby agro-shops. Try one of the options below! 🌱",
      sender: 'bot'
    }]);
  };

  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const typingVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' } }
  };

  return (
    <div className="font-sans">
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      >
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-16 h-16 bg-green-600 text-white hover:bg-green-700 shadow-lg flex items-center justify-center transition-all"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare className="w-8 h-8" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-[360px] h-[500px] bg-white shadow-2xl border-2 border-green-600 rounded-lg flex flex-col overflow-hidden z-40"
          >
            <header className="p-3 bg-green-600 text-white flex items-center justify-between border-b-2 border-green-800/30">
              <h3 className="text-lg font-semibold font-serif flex items-center">
                <Bot className="w-6 h-6 mr-2" /> Leafy Chat
              </h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="text-white hover:bg-green-700 h-8 w-8"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="text-white hover:bg-green-700 h-8 w-8"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </header>

            <ScrollArea className="flex-1 p-4 bg-gray-50" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={chatBubbleVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "flex items-end space-x-2 max-w-[85%]",
                      msg.sender === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
                    )}
                  >
                    {msg.sender === 'bot' && <Bot className="w-6 h-6 text-green-600 flex-shrink-0 mb-1" />}
                    {msg.sender === 'user' && <User className="w-6 h-6 text-blue-600 flex-shrink-0 mb-1" />}
                    <div
                      className={cn(
                        "p-3 rounded-lg text-sm shadow-sm whitespace-pre-line",
                        msg.sender === 'user'
                          ? "bg-blue-100 text-blue-900 border-2 border-blue-300"
                          : "bg-green-100 text-green-900 border-2 border-green-300"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                {isBotTyping && (
                  <motion.div
                    variants={typingVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex items-end space-x-2 max-w-[85%]"
                  >
                    <Bot className="w-6 h-6 text-green-600 flex-shrink-0 mb-1" />
                    <div className="p-3 rounded-lg text-sm bg-green-100 text-green-900 border-2 border-green-300">
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-3 border-t-2 border-green-300 bg-white">
              <div className="flex flex-wrap gap-2 mb-3">
                {predefinedQuestions.map((q) => (
                  <Button
                    key={q.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(q.text)}
                    className="text-xs flex-1 bg-green-50 text-green-700 border-green-400 hover:bg-green-200 transition-colors"
                  >
                    {q.text}
                  </Button>
                ))}
              </div>
              <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message or PIN code..."
                  className="flex-1 border-green-400 focus:ring-green-500 focus:border-green-500 rounded-lg"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-green-600 text-white hover:bg-green-700 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
