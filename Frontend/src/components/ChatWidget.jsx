import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Leafy, your friendly assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef(null);

  const predefinedQuestions = [
    { id: 'q1', text: "What is this project?" },
    { id: 'q2', text: "Who built this?" },
  ];

  const predefinedAnswers = {
    "What is this project?": "LeafGuard AI is a plant disease diagnosis tool. Upload an image of a plant leaf, and our AI will try to identify any diseases and suggest treatments!",
    "Who built this?": "LeafGuard AI was built by the talented team: Sampark Bhol, Akshat Jain, and Shreyas K. You can find their GitHub profiles on the Contact Us page!",
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = (text) => {
    const userMessage = text.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { id: Date.now(), text: userMessage, sender: 'user' }];
    
    let botResponseText = "I'm sorry, I can only answer predefined questions right now. Try one of the options!";
    if (predefinedAnswers[userMessage]) {
      botResponseText = predefinedAnswers[userMessage];
    }
    
    const botMessage = { id: Date.now() + 1, text: botResponseText, sender: 'bot' };
    setMessages([...newMessages, botMessage]);
    setInputValue('');
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

  const chatBubbleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <>
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      >
        <Button
          onClick={toggleChat}
          size="lg"
          className="rounded-full w-16 h-16 bg-primary text-primary-foreground hover:bg-primary/90 shadow-retro-hard !p-0 flex items-center justify-center"
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
            className="fixed bottom-24 right-6 w-[360px] h-[500px] bg-card shadow-retro-hard border-2 border-primary rounded-none flex flex-col overflow-hidden z-40 pixel-borders"
          >
            <header className="p-3 bg-primary text-primary-foreground flex items-center justify-between border-b-2 border-primary-foreground/30">
              <h3 className="text-lg font-semibold font-serif flex items-center">
                <Bot className="w-6 h-6 mr-2" /> Leafy Chat
              </h3>
              <Button variant="ghost" size="icon" onClick={toggleChat} className="text-primary-foreground hover:bg-primary/80 h-8 w-8">
                <X className="w-5 h-5" />
              </Button>
            </header>

            <ScrollArea className="flex-1 p-4 bg-background/50" ref={scrollAreaRef}>
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
                    {msg.sender === 'bot' && <Bot className="w-6 h-6 text-primary flex-shrink-0 mb-1" />}
                    {msg.sender === 'user' && <User className="w-6 h-6 text-secondary flex-shrink-0 mb-1" />}
                    <div
                      className={cn(
                        "p-3 rounded-sm text-sm shadow-sm pixel-block",
                        msg.sender === 'user'
                          ? "bg-secondary text-secondary-foreground border-2 border-secondary-foreground/30"
                          : "bg-primary/10 text-foreground border-2 border-primary/30"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t-2 border-primary/30 bg-card">
              <div className="flex space-x-2 mb-2">
                {predefinedQuestions.map((q) => (
                  <Button 
                    key={q.id} 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleQuickReply(q.text)}
                    className="text-xs flex-1 btn-retro-outline border-primary/50 text-primary/90 hover:bg-primary/20"
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
                  placeholder="Type a message..."
                  className="flex-1 pixel-input border-primary/50 focus:ring-secondary"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 btn-retro-secondary">
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;