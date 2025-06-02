import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Trash2, Eye, Ghost } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const AnalysisHistoryPage = () => {
  const [historyItems, setHistoryItems] = React.useState([]); // Start with an empty array

  const handleDelete = (id) => {
    setHistoryItems(prevItems => prevItems.filter(item => item.id !== id));
    // Here you would also call an API to delete from persistent storage (localStorage or Supabase)
    // For now, this only affects local state.
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const listItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (index) => ({
      opacity: 1,
      x: 0,
      transition: { delay: index * 0.1, duration: 0.3 }
    }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } }
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
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold font-serif text-primary mb-4 pixel-text-shadow">
          Analysis <span className="text-gold-DEFAULT">History</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Review your past plant disease diagnoses. Your saved analyses will appear here.
        </p>
      </motion.section>

      {historyItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16 bg-card/50 p-8 rounded-lg shadow-retro-hard pixel-borders"
        >
          <Ghost className="w-24 h-24 text-primary/40 mx-auto mb-6 animate-pulse-subtle" />
          <h2 className="text-3xl font-semibold font-serif text-primary mb-3 pixel-text">No History Yet!</h2>
          <p className="text-muted-foreground mb-6">
            Looks like your analysis log is empty. <br/>
            Time to diagnose some plants!
          </p>
          <Button asChild size="lg" className="bg-gold-DEFAULT text-primary hover:bg-gold-dark shadow-retro-gold btn-retro">
            <NavLink to="/">
              Analyze New Image
            </NavLink>
          </Button>
        </motion.div>
      ) : (
        <ScrollArea className="h-[600px] w-full rounded-md border-2 border-primary/50 p-4 shadow-retro-hard bg-card/30 backdrop-blur-sm pixel-borders">
          <div className="space-y-6">
            {historyItems.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={listItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
                <Card className="overflow-hidden shadow-retro-green border-2 border-primary hover:border-gold-DEFAULT transition-colors duration-300 bg-card pixel-borders-light">
                  <CardHeader className="flex flex-row items-start space-x-4 p-4 bg-primary/5">
                    <img  src={item.imageUrl} alt={item.imageName} className="w-24 h-24 object-cover rounded-sm border-2 border-gold-DEFAULT pixel-block" src="https://images.unsplash.com/photo-1597916039849-8527c8f64333?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MjM4NDZ8MHwxfHNlYXJjaHwxfHx0b21hdG8lMjBsZWFmJTIwZGlzZWFzZXxlbnwwfHx8fDE3MTcxMDYwMDZ8MA&ixlib=rb-4.0.3&q=80&w=400" />
                    <div className="flex-1">
                      <CardTitle className="text-xl font-serif text-primary pixel-text">{item.diagnosis}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">
                        Analyzed on: {new Date(item.date).toLocaleDateString()} <br />
                        Image: {item.imageName}
                      </CardDescription>
                      <div className="mt-1 flex items-center">
                        {item.isHealthy ? (
                          <CheckCircle className="w-5 h-5 text-green-500 mr-1" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-destructive mr-1" />
                        )}
                        <span className={`text-sm font-semibold ${item.isHealthy ? 'text-green-600' : 'text-destructive'}`}>
                          Confidence: {(item.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <Separator className="bg-primary/20" />
                  <CardFooter className="p-4 flex justify-end space-x-2 bg-primary/10">
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 btn-retro-outline">
                      <Eye className="mr-1.5 h-4 w-4" /> View
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)} className="btn-retro">
                      <Trash2 className="mr-1.5 h-4 w-4" /> Delete
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      )}
    </motion.div>
  );
};

export default AnalysisHistoryPage;