import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Ye fields art barren",
        description: "Pray, fill all the required scrolls.",
        variant: "destructive"
      });
      return;
    }

    const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`;
    const mailtoLink = `mailto:aj29162460@gmail.com?subject=${encodeURIComponent(formData.subject || 'Scroll from LeafGuard AI')}&&body=${encodeURIComponent(emailBody)}`;

    try {
      window.location.href = mailtoLink;
      toast({
        title: "Scroll Prepared!",
        description: "Thy email parchment is ready in your messenger!"
      });
    } catch (error) {
      toast({
        title: "Alas!",
        description: "Could not conjure thy email. Please copy it manually.",
        variant: "destructive"
      });
      console.error("Failed to open mailto link:", error);
    }

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const teamMembers = [
    { name: " Sampark of Bhol", github: "https://github.com/samparkbhol" },
    { name: " Akshat of Jain", github: "https://github.com/akshatjain" },
    { name: " Shreyas of K", github: "https://github.com/shreyask" }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-[#2b1d0e] text-[#f0e6d2] font-[Cinzel]">
      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#d4af37] mb-4 drop-shadow-md">
            Send Thy Message
          </h1>
          <p className="text-xl text-[#e6decf] max-w-2xl mx-auto">
            Be thee troubled or inspired? Deliver thy scroll unto our council!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#3d2a14] border border-[#a9743d] rounded-xl p-8 shadow-[0_0_10px_#a9743d80]"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-bold">
                  Thy Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#4b3621] border border-[#a9743d] rounded-md text-[#f9f5ec] placeholder-[#c8bca8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  placeholder="Sir Galahad"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold">
                  Thy Scroll Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#4b3621] border border-[#a9743d] rounded-md text-[#f9f5ec] placeholder-[#c8bca8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  placeholder="ye@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-bold">
                Scroll Title
              </label>
              <input
                type="text"
                name="subject"
                id="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#4b3621] border border-[#a9743d] rounded-md text-[#f9f5ec] placeholder-[#c8bca8] focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                placeholder="Matters of the Realm..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block mb-2 text-sm font-bold">
                Thy Words *
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-[#4b3621] border border-[#a9743d] rounded-md text-[#f9f5ec] placeholder-[#c8bca8] focus:outline-none focus:ring-2 focus:ring-[#d4af37] resize-none"
                placeholder="Speak thy thoughts..."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#d4af37] hover:bg-[#c49b2f] text-black font-bold py-3 text-lg rounded-full"
            >
              <Send className="mr-2 h-5 w-5" />
              Dispatch Scroll
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 bg-[#3d2a14] border border-[#a9743d] rounded-xl p-8 shadow-[0_0_10px_#a9743d80]"
        >
          <h2 className="text-2xl font-bold text-center text-[#d4af37] mb-8">The Royal Scribes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 transition-colors text-sm mt-1 inline-block"
                >
                  Visit their Codex
                </a>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
