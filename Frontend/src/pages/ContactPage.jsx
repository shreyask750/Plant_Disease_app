import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const teamMembers = [
  { name: "Sampark Bhol", github: "https://github.com/SamparkBhol" },
  { name: "Akshat Jain", github: "https://github.com/Ajain2916" },
  { name: "Shreyas K", github: "https://github.com/Ajain2916" },
];

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-sm border-2 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pixel-input',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';


const ContactPage = () => {
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

  const handleSendMessage = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const message = event.target.message.value;
    const mailtoLink = `mailto:aj29162460@gmail.com?subject=Message from LeafGuard AI User: ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(name)} (${encodeURIComponent(email)})`;
    window.location.href = mailtoLink;
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
        <motion.h1 variants={cardVariants} className="text-5xl font-bold font-serif text-primary mb-4 pixel-text-hard">
          Contact <span className="text-gold-DEFAULT">Us</span>
        </motion.h1>
        <motion.p variants={cardVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Got questions or feedback? Drop us a line! We're all ears (or leaves, in this case).
        </motion.p>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}>
          <Card className="shadow-retro-hard border-2 border-primary p-2 bg-card/70 pixel-borders">
            <CardHeader>
              <CardTitle className="text-3xl text-primary font-serif pixel-text">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSendMessage} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-primary font-semibold">Full Name</Label>
                  <Input id="name" name="name" type="text" placeholder="Your Name (e.g., Player One)" className="mt-1 border-primary focus:ring-gold-DEFAULT pixel-input" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-primary font-semibold">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="your.email@example.com" className="mt-1 border-primary focus:ring-gold-DEFAULT pixel-input" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-primary font-semibold">Message</Label>
                  <Textarea id="message" name="message" placeholder="Type your message here..." rows={5} className="mt-1 border-primary focus:ring-gold-DEFAULT" />
                </div>
                <Button type="submit" size="lg" className="w-full bg-gold-DEFAULT text-primary hover:bg-gold-dark shadow-retro-gold btn-retro">
                  <Mail className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.3 }} variants={cardVariants}>
          <Card className="shadow-retro-hard border-2 border-gold-DEFAULT p-2 bg-card/70 pixel-borders-gold">
            <CardHeader>
              <CardTitle className="text-3xl text-gold-DEFAULT font-serif pixel-text">Meet the Dev Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="p-4 rounded-sm border-2 border-primary/30 bg-primary/5 hover:shadow-retro-green transition-shadow duration-200 pixel-borders-light">
                  <div className="flex items-center mb-2">
                    <UserCircle className="w-10 h-10 mr-3 text-primary" />
                    <div>
                      <h3 className="text-xl font-semibold font-serif text-primary">{member.name}</h3>
                    </div>
                  </div>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-gold-DEFAULT hover:text-gold-dark transition-colors group"
                  >
                    <Github className="mr-1.5 h-4 w-4 group-hover:animate-pulse-subtle" /> GitHub Profile
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;