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
      text: "🌿 Hi, I'm Leafy from LeafGuard AI! Upload a leaf image to diagnose diseases or ask about treatments, shops, or reports. Try an option below! 🌱",
      sender: 'bot'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [fontSize, setFontSize] = useState(12); // Default font size in px
  const scrollAreaRef = useRef(null);

  const predefinedQuestions = [
    { id: 'q1', text: "How to diagnose plant disease?" },
    { id: 'q2', text: "Treatments for tomato blight?" },
    { id: 'q3', text: "Treatments for apple scab?" },
    { id: 'q4', text: "Find agro-shops near me" },
    { id: 'q5', text: "How to save diagnosis report?" },
    { id: 'q6', text: "Weather alerts for diseases?" }
  ];

  const predefinedAnswers = {
    "How to diagnose plant disease?": "Upload a leaf image on the main page. Our MobileNetV2 AI will detect diseases like Tomato Late Blight with confidence scores. Try it now!",
    "Treatments for tomato blight?": "Organic: Remove infected leaves, improve air flow, use copper sprays weekly. Chemical: Apply chlorothalonil, rotate crops. Source: FAO.",
    "Treatments for apple scab?": "Organic: Prune trees, apply sulfur sprays. Chemical: Use captan fungicide, remove fallen leaves. Source: WikiHow.",
    "Find agro-shops near me": "Enter your 6-digit PIN code below to find nearby agro-shops via Google Maps!",
    "How to save diagnosis report?": "After diagnosis, click 'Save Report' on the results page to download a PDF with the disease, confidence, and treatment steps.",
    "Weather alerts for diseases?": "Check the main page for weather-based alerts (via OpenWeather API) to know if conditions favor diseases like blight."
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
        text: "⚠️ Please enter a message!",
        sender: 'bot'
      }]);
      return;
    }

    const newMessages = [...messages, { id: Date.now(), text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    setIsBotTyping(true);

    setTimeout(() => {
      let botResponseText = "Sorry, I can only answer predefined questions or PIN codes for shops. Try an option below!";
      if (predefinedAnswers[userMessage]) {
        botResponseText = predefinedAnswers[userMessage];
      } else if (/^\d{6}$/.test(userMessage)) {
        botResponseText = `Searching shops near PIN ${userMessage}... Example: Green Agro Supplies, 2 km away. Use Shop Locator for real results!`;
      }
      
      const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
      setMessages([...newMessages, botMessage]);
      setIsBotTyping(false);
    }, 800);
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
      text: "🌿 Hi, I'm Leafy from LeafGuard AI! Upload a leaf image to diagnose diseases or ask about treatments, shops, or reports. Try an option below! 🌱",
      sender: 'bot'
    }]);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
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
          className="rounded-full w-14 h-14 bg-green-500 text-white hover:bg-green-600 shadow-retro-hard flex items-center justify-center"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <AnimatePresence initial={false} mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <MessageSquare className="w-6 h-6" />
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
            exit={{ opacity: Gl0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-20 right-6 w-[320px] h-[450px] bg-card shadow-retro-hard border-2 border-green-600 rounded-none flex flex-col overflow-hidden z-40 pixel-borders"
          >
            <header className="p-2 bg-green-600 text-white flex items-center justify-between border-b-2 border-green-800/30">
              <h3 className="text-base font-semibold font-serif flex items-center">
                <Bot className="w-5 h-5 mr-1" /> Leafy (βeta version) Chat
              </h3>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClearChat}
                  className="text-white hover:bg-green-700 h-7 w-7"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleChat}
                  className="text-white hover:bg-green-700 h-7 w-7"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </header>

            <ScrollArea className="flex-1 p-3 bg-background/50" ref={scrollAreaRef}>
              <div className="space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    variants={chatBubbleVariants}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                      "flex items-end space-x-2 max-w-[80%]",
                      msg.sender === 'user' ? "ml-auto flex-row-reverse space-x-reverse" : ""
                    )}
                  >
                    {msg.sender === 'bot' && <Bot className="w-5 h-5 text-green-600 flex-shrink-0 mb-1" />}
                    {msg.sender === 'user' && <User className="w-5 h-5 text-blue-600 flex-shrink-0 mb-1" />}
                    <div
                      className={cn(
                        "p-2 rounded-sm shadow-sm pixel-block",
                        msg.sender === 'user'
                          ? "bg-blue-100 text-blue-900 border-2 border-blue-300/50"
                          : "bg-green-100 text-green-900 border-2 border-green-300/50"
                      )}
                      style={{ fontSize: `${fontSize}px` }}
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
                    className="flex items-end space-x-2 max-w-[80%]"
                  >
                    <Bot className="w-5 h-5 text-green-600 flex-shrink-0 mb-1" />
                    <div
                      className="p-2 rounded-sm shadow-sm bg-green-100 text-green-900 border-2 border-green-300/50"
                      style={{ fontSize: `${fontSize}px` }}
                    >
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <div className="p-2 border-t-2 border-green-300/50 bg-card">
              <div className="flex flex-wrap gap-1 mb-2">
                {predefinedQuestions.map((q) => (
                  <Button
                    key={q.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(q.text)}
                    className="text-[10px] flex-1 bg-green-50 text-green-700 border-green-400/50 hover:bg-green-200 pixel-block"
                  >
                    {q.text}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <label htmlFor="font-size-slider" className="text-xs text-green-700">
                  Text Size:
                </label>
                <input
                  id="font-size-slider"
                  type="range"
                  min="8"
                  max="14"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  className="w-20 h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs text-green-700">{fontSize}px</span>
              </div>
              <form onSubmit={handleFormSubmit} className="flex items-center space-x-1">
                <Input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Message or PIN code..."
                  className="flex-1 text-xs border-green-400/50 focus:ring-green-500 pixel-input h-8"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-green-500 text-white hover:bg-green-600 pixel-block h-8 w-8"
                >
                  <Send className="w-4 h-4" />
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
