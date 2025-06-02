<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact Page</title>
  <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/framer-motion@11/dist/framer-motion.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://cdn.jsdelivr.net/npm/lucide-react@0.453.0/dist/umd/lucide-react.min.js"></script>
  <script>
    // Shim for cn utility function
    const cn = (...classes) => classes.filter(Boolean).join(' ');
  </script>
  <style>
    .pixel-borders {
      border: 2px solid #1a202c;
      box-shadow: 4px 4px 0 #000;
    }
    .pixel-borders-red {
      border: 2px solid #e53e3e;
      box-shadow: 4px 4px 0 #000;
    }
    .pixel-text {
      font-family: 'Courier New', Courier, monospace;
    }
    .pixel-text-hard {
      font-family: 'Courier New', Courier, monospace;
      font-weight: bold;
    }
    .pixel-input {
      border: 2px solid #1a202c;
      box-shadow: 2px 2px 0 #000;
    }
    .shadow-retro-red {
      box-shadow: 4px 4px 0 #e53e3e;
    }
    .shadow-retro-red-hover:hover {
      box-shadow: 6px 6px 0 #c53030;
    }
    .btn-retro {
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .btn-retro:hover {
      transform: translate(-2px, -2px);
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { motion } = window.FramerMotion;
    const { Github, Mail, UserCircle } = window.LucideReact;

    const teamMembers = [
      { name: "Sampark Bhol", github: "https://github.com/SamparkBhol" },
      { name: "Akshat Jain", github: "https://github.com/Ajain2916" },
      { name: "Shreyas K", github: "https://github.com/shreyask750" },
    ];

    const Card = ({ className, children }) => (
      <div className={cn('bg-white rounded-sm', className)}>{children}</div>
    );
    const CardHeader = ({ children }) => <div className="p-4">{children}</div>;
    const CardTitle = ({ children, className }) => (
      <h2 className={cn('text-2xl font-bold', className)}>{children}</h2>
    );
    const CardContent = ({ children }) => <div className="p-4">{children}</div>;
    const Button = ({ className, children, ...props }) => (
      <button
        className={cn(
          'px-4 py-2 bg-red-600 text-white rounded-sm border-2 border-black hover:bg-red-700 shadow-retro-red btn-retro',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
    const Input = ({ className, ...props }) => (
      <input
        className={cn(
          'w-full px-3 py-2 border-2 border-gray-800 bg-white text-black rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600 pixel-input',
          className
        )}
        {...props}
      />
    );
    const Label = ({ className, ...props }) => (
      <label className={cn('block text-sm font-medium text-gray-800', className)} {...props} />
    );
    const Textarea = React.forwardRef(({ className, ...props }, ref) => (
      <textarea
        className={cn(
          'w-full min-h-[80px] px-3 py-2 border-2 border-gray-800 bg-white text-black rounded-sm focus:outline-none focus:ring-2 focus:ring-red-600 pixel-input',
          className
        )}
        ref={ref}
        {...props}
      />
    ));
    Textarea.displayName = 'Textarea';

    const ContactPage = () => {
      const pageVariants = {
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 },
      };

      const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition: { type: 'spring', bounce: 0.4, duration: 0.8 },
        },
      };

      const inputVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02, transition: { duration: 0.2 } },
        focus: { borderColor: '#e53e3e', boxShadow: '4px 4px 0 #e53e3e' },
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
            <motion.h1
              variants={cardVariants}
              className="text-5xl font-bold font-mono text-gray-800 mb-4 pixel-text-hard"
            >
              Contact <span className="text-red-600">Us</span>
            </motion.h1>
            <motion.p
              variants={cardVariants}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Got questions or feedback? Drop us a line! We're all ears (or leaves, in this case).
            </motion.p>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="shadow-retro-red border-2 border-gray-800 p-2 bg-white/70 pixel-borders">
                <CardHeader>
                  <CardTitle className="text-3xl text-gray-800 font-mono pixel-text">
                    Send a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendMessage} className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="text-gray-800 font-semibold">
                        Full Name
                      </Label>
                      <motion.div variants={inputVariants} whileHover="hover" whileFocus="focus">
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="Your Name (e.g., Player One)"
                          className="mt-1 border-gray-800 focus:ring-red-600 pixel-input"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-800 font-semibold">
                        Email Address
                      </Label>
                      <motion.div variants={inputVariants} whileHover="hover" whileFocus="focus">
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="mt-1 border-gray-800 focus:ring-red-600 pixel-input"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-800 font-semibold">
                        Message
                      </Label>
                      <motion.div variants={inputVariants} whileHover="hover" whileFocus="focus">
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Type your message here..."
                          rows={5}
                          className="mt-1 border-gray-800 focus:ring-red-600"
                        />
                      </motion.div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-red-600 text-white hover:bg-red-700 shadow-retro-red shadow-retro-red-hover btn-retro"
                      >
                        <Mail className="mr-2 h-5 w-5" /> Send Message
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
            >
              <Card className="shadow-retro-red border-2 border-red-600 p-2 bg-white/70 pixel-borders-red">
                <CardHeader>
                  <CardTitle className="text-3xl text-red-600 font-mono pixel-text">
                    Meet the Dev Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.name}
                      className="p-4 rounded-sm border-2 border-gray-800/30 bg-gray-800/5 hover:shadow-retro-red transition-shadow duration-200 pixel-borders"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex items-center mb-2">
                        <UserCircle className="w-10 h-10 mr-3 text-gray-800" />
                        <div>
                          <h3 className="text-xl font-semibold font-mono text-gray-800">
                            {member.name}
                          </h3>
                        </div>
                      </div>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm text-red-600 hover:text-red-700 transition-colors group"
                      >
                        <Github className="mr-1.5 h-4 w-4 group-hover:animate-pulse" /> GitHub Profile
                      </a>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      );
    };

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<ContactPage />);
  </script>
  <script src="https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js"></script>
</body>
</html>
