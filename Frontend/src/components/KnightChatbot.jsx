
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, UserCircle, HelpCircle, MessageSquare, ChevronDown, ChevronUp, CheckSquare, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';

const predefinedQnAs = [
  {
    question: "What is LeafGuard AI?",
    answer: "LeafGuard AI is an intelligent system designed to help you identify plant diseases from images of their leaves. It uses advanced AI to provide quick diagnoses and suggest potential treatments."
  },
  {
    question: "How do I use LeafGuard AI?",
    answer: "Simply navigate to the 'Home' tab, upload a clear image of an affected plant leaf, and our AI will analyze it. You'll receive a diagnosis, confidence level, and treatment advice."
  },
  {
    question: "What kind of images work best?",
    answer: "For the best results, use clear, well-lit photos of the leaf. Focus on the affected areas and try to place the leaf on a plain, contrasting background if possible."
  },
  {
    question: "Is the diagnosis always accurate?",
    answer: "LeafGuard AI uses sophisticated models, but it's a tool to assist, not replace professional advice. Confidence scores are provided. For critical issues, always consult a local agricultural expert."
  },
  {
    question: "What common diseases can it detect?",
    answer: "LeafGuard AI is trained on a wide variety of common plant diseases affecting various crops and ornamental plants. The specific diseases it can identify are continually being updated and expanded."
  },
  {
    question: "How can I prevent plant diseases?",
    answer: "Good practices include: ensuring proper watering (not too much, not too little), providing good air circulation, using healthy soil, giving adequate sunlight, and regularly inspecting plants for early signs of trouble. Disease-resistant varieties and crop rotation can also help."
  },
];

const KnightChatbot = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState('chat'); // 'chat' or 'qna'
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Greetings! I am the LeafGuard AI assistant. Ask me anything about plant health, or browse common questions in the Q&A section.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [openQnaIndex, setOpenQnaIndex] = useState(null);

  const botResponses = {
    greeting: [
      "Hello! How can I assist you with plant health today?",
      "Greetings! I'm here to help with your plant disease questions.",
    ],
    diseases: [
      "Plant diseases can manifest in various ways. Could you describe the symptoms you're observing?",
      "Common signs of plant disease include leaf discoloration, spots, wilting, or stunted growth. What are you seeing?",
      "Understanding the specific symptoms is key to identifying a plant disease. Please provide more details.",
    ],
    prevention: [
      "Preventative care is crucial. This includes proper watering, good soil health, adequate sunlight, and air circulation.",
      "Regularly inspecting your plants for early signs of trouble can make a big difference.",
      "Consider using disease-resistant plant varieties and practicing crop rotation if applicable.",
    ],
    treatment: [
      "Treatment options depend on the specific disease. Generally, it involves removing affected parts, improving plant care, and sometimes applying organic or chemical treatments.",
      "For accurate treatment advice, a precise diagnosis is needed. Can you upload an image of the affected plant?",
      "Mild issues can often be resolved by adjusting care routines. More severe cases might require targeted interventions.",
    ],
    general: [
      "I can provide general information on plant diseases. For a specific diagnosis, please use the image upload feature.",
      "Remember, I'm an AI assistant. For critical issues, consulting a local agricultural expert is always recommended.",
      "Consistent care and observation are your best tools for maintaining plant health."
    ]
  };

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) return botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
    if (message.includes('disease') || message.includes('sick') || message.includes('problem') || message.includes('symptom')) return botResponses.diseases[Math.floor(Math.random() * botResponses.diseases.length)];
    if (message.includes('prevent') || message.includes('avoid') || message.includes('protect')) return botResponses.prevention[Math.floor(Math.random() * botResponses.prevention.length)];
    if (message.includes('treat') || message.includes('cure') || message.includes('fix') || message.includes('help')) return botResponses.treatment[Math.floor(Math.random() * botResponses.treatment.length)];
    return botResponses.general[Math.floor(Math.random() * botResponses.general.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    const userMsg = { id: Date.now(), type: 'user', text: inputMessage, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
    const botMsg = { id: Date.now() + 1, type: 'bot', text: getBotResponse(inputMessage), timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); } };
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, activeSection]);

  const toggleQna = (index) => setOpenQnaIndex(openQnaIndex === index ? null : index);

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-end justify-center sm:items-center z-[100] p-0 sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
    >
      <motion.div
        className="professional-card rounded-t-2xl sm:rounded-2xl w-full max-w-lg h-[90vh] sm:h-[80vh] max-h-[750px] flex flex-col shadow-2xl"
        initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">AI Plant Guardian</h3>
              <p className="text-muted-foreground text-xs">Ready to Assist</p>
            </div>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted">
            <X className="w-5 h-5" />
          </Button>
        </header>

        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveSection('chat')}
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${activeSection === 'chat' ? 'text-primary border-b-2 border-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground/80 hover:bg-muted/50'}`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Online Chat</span>
          </button>
          <button
            onClick={() => setActiveSection('qna')}
            className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 flex items-center justify-center space-x-2 ${activeSection === 'qna' ? 'text-primary border-b-2 border-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground/80 hover:bg-muted/50'}`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Q&A Guide</span>
          </button>
        </div>

        {activeSection === 'chat' && (
          <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-card">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex items-end space-x-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }} layout
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-xl p-3 shadow-md ${message.type === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted text-foreground/90 rounded-bl-none'}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1.5 ${message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground/80'} text-right`}>{message.timestamp}</p>
                  </div>
                  {message.type === 'user' && <UserCircle className="w-8 h-8 text-muted-foreground flex-shrink-0" />}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div className="flex items-end space-x-2 justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} layout>
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-primary" /></div>
                <div className="bg-muted text-foreground/90 rounded-xl rounded-bl-none p-3 shadow-md">
                  <div className="flex space-x-1 items-center h-5">
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </main>
        )}

        {activeSection === 'qna' && (
          <main className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-muted scrollbar-track-card">
            <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">Browse these frequently asked questions for quick information about LeafGuard AI and plant health.</p>
            {predefinedQnAs.map((item, index) => (
              <div key={index} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleQna(index)}
                  className="w-full flex items-center justify-between p-3 text-left bg-muted/70 hover:bg-muted transition-colors"
                >
                  <span className="font-medium text-foreground/90 text-sm">{item.question}</span>
                  {openQnaIndex === index ? <ChevronUp className="w-5 h-5 text-primary" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {openQnaIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="bg-card"
                    >
                      <p className="p-3 text-sm text-foreground/80 leading-relaxed border-t border-border">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </main>
        )}

        {activeSection === 'chat' && (
          <footer className="p-3 border-t border-border bg-card">
            <div className="flex items-center space-x-2">
              <textarea
                value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyPress={handleKeyPress}
                placeholder="Type your message to the Guardian..."
                className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none scrollbar-thin scrollbar-thumb-muted scrollbar-track-background text-sm"
                rows={1} style={{ maxHeight: '80px' }}
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="professional-button p-2.5 h-auto" aria-label="Send message">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </footer>
        )}
      </motion.div>
    </motion.div>
  );
};

export default KnightChatbot;
