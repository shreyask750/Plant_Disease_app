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
    { name: "Sampark Bhol", github: "https://github.com/samparkbhol" },
    { name: "Akshat Jain", github: "https://github.com/akshatjain" },
    { name: "Shreyas K", github: "https://github.com/shreyas750" }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 bg-[#1a130b] text-[#f5ecd4] font-[Cinzel]">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#d4af37] mb-4 drop-shadow-md border-b-4 border-[#8b5e3c] pb-4">
            📜 The Scroll of Contact 📜
          </h1>
          <p className="text-xl italic text-[#e9e3c7] max-w-2xl mx-auto mt-4">
            Should thee seek counsel, wisdom, or forge an alliance, inscribe thy message below.
          </p>
        </motion.div>

        {/* Scroll Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-[#3d2a14] border-8 border-[#c2a679] rounded-[2rem] p-6 md:p-10 shadow-[0_0_30px_#c2a67955] font-serif"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, #3d2a14 0px, #3d2a14 30px, #2e1f12 30px, #2e1f12 60px)",
            backgroundSize: "cover"
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Handmade field */}
            <div>
              <p className="text-[#f9f3e7] mb-2">Thy Name *</p>
              <div className="bg-[#291b10] border border-[#c2a679] px-4 py-3 rounded-md text-[#e9dbc3]">
                <input
                  name="name"
                  type="text"
                  placeholder="Write thy name here..."
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none placeholder-[#b6a284] text-inherit"
                />
              </div>
            </div>

            <div>
              <p className="text-[#f9f3e7] mb-2">Scroll Address (Email) *</p>
              <div className="bg-[#291b10] border border-[#c2a679] px-4 py-3 rounded-md text-[#e9dbc3]">
                <input
                  name="email"
                  type="email"
                  placeholder="thy@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none placeholder-[#b6a284] text-inherit"
                />
              </div>
            </div>

            <div>
              <p className="text-[#f9f3e7] mb-2">Subject of the Scroll</p>
              <div className="bg-[#291b10] border border-[#c2a679] px-4 py-3 rounded-md text-[#e9dbc3]">
                <input
                  name="subject"
                  type="text"
                  placeholder="Matters of the realm..."
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full bg-transparent outline-none placeholder-[#b6a284] text-inherit"
                />
              </div>
            </div>

            <div>
              <p className="text-[#f9f3e7] mb-2">Thy Message *</p>
              <div className="bg-[#291b10] border border-[#c2a679] px-4 py-3 rounded-md text-[#e9dbc3]">
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Inscribe thy noble words..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-transparent outline-none placeholder-[#b6a284] text-inherit resize-none"
                />
              </div>
            </div>

            {/* Wax seal style button */}
            <div className="text-center">
              <Button
                type="submit"
                className="bg-[#a32626] hover:bg-[#831d1d] text-white font-bold text-lg px-6 py-3 rounded-full shadow-md border-2 border-[#731616] hover:scale-105 transition-transform"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Scroll
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Dev Names */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-6 bg-[#2a1b0d] border-l-4 border-[#d4af37] rounded-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-[#d4af37] text-center">Developers of This Scroll</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center text-[#f5ecd4]">
            {teamMembers.map((member, index) => (
              <div key={index}>
                <p className="font-semibold text-lg">{member.name}</p>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:underline"
                >
                  View their codex
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
