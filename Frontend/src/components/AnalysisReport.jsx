
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Share2, Save, MapPin, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const AnalysisReport = ({ result, isLoading, onReset }) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full p-6 md:p-8 rounded-xl main-diagnosis-area text-primary-foreground greek-border border-accent"
      >
        <div className="flex flex-col items-center justify-center h-64">
          <Zap className="w-16 h-16 text-gold-DEFAULT animate-ping mb-4" />
          <h2 className="text-3xl font-serif font-semibold text-gold-DEFAULT mb-2">Analyzing Image...</h2>
          <p className="text-primary-foreground/80 mb-6">Our AI is working its magic!</p>
          <Progress value={66} className="w-3/4 h-3 bg-primary-foreground/30 [&>div]:bg-gold-DEFAULT" />
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const confidenceColor = result.confidence > 0.8 ? 'text-green-400' : result.confidence > 0.5 ? 'text-yellow-400' : 'text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
      className="w-full"
    >
      <Card className="bg-card/90 backdrop-blur-sm border-primary shadow-xl greek-border">
        <CardHeader className="text-center pb-4 bg-primary/10 rounded-t-lg">
          <div className="flex justify-center mb-2">
            {result.isHealthy ? <CheckCircle className="w-12 h-12 text-primary" /> : <AlertTriangle className="w-12 h-12 text-destructive" />}
          </div>
          <CardTitle className="text-3xl text-primary">{result.diseaseName}</CardTitle>
          {!result.isHealthy && (
            <CardDescription className="text-lg">
              Confidence: <span className={`font-bold ${confidenceColor}`}>{(result.confidence * 100).toFixed(1)}%</span>
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {result.isHealthy ? (
            <Alert variant="default" className="bg-green-100 border-green-500 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="font-serif text-green-800">Great News!</AlertTitle>
              <AlertDescription>
                Your plant appears to be healthy. Keep up the good work with plant care!
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="mb-6">
                <h4 className="text-xl font-semibold font-serif text-primary mb-2">Quick Overview</h4>
                <p className="text-muted-foreground">{result.overview}</p>
              </div>

              <Separator className="my-6 bg-primary/30" />

              <Tabs defaultValue="organic" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-primary/10">
                  <TabsTrigger value="organic" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Organic Treatments</TabsTrigger>
                  <TabsTrigger value="chemical" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Chemical Treatments</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-48 mt-2 p-1 rounded-md border border-primary/20">
                  <TabsContent value="organic" className="p-4">
                    <h5 className="font-semibold mb-2 text-primary font-serif">Organic Steps:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.treatments.organic.map((step, index) => (
                        <li key={`organic-${index}`}>{step}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="chemical" className="p-4">
                    <h5 className="font-semibold mb-2 text-primary font-serif">Chemical Steps:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {result.treatments.chemical.map((step, index) => (
                        <li key={`chemical-${index}`}>{step}</li>
                      ))}
                    </ul>
                    <Alert variant="destructive" className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle className="font-serif">Caution</AlertTitle>
                      <AlertDescription>
                        Always follow product label instructions and safety precautions when using chemical treatments.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </ScrollArea>
              </Tabs>
            </>
          )}

          <Separator className="my-6 bg-primary/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              <MapPin className="mr-2 h-4 w-4" /> Find Nearby Agro Shops
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              <Save className="mr-2 h-4 w-4" /> Save Diagnosis
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-center p-6 bg-primary/10 rounded-b-lg">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <Button className="bg-primary hover:bg-green-700">
              <FileText className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <Button className="bg-secondary text-secondary-foreground hover:bg-gold-dark">
              <Share2 className="mr-2 h-4 w-4" /> Share Report
            </Button>
          </div>
          <Button onClick={onReset} variant="ghost" className="text-primary hover:bg-primary/20">
            Start New Diagnosis
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnalysisReport;
  