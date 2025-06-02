
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageUpload from '@/components/ImageUpload';
import AnalysisReport from '@/components/AnalysisReport';
import { useToast } from '@/components/ui/use-toast';
import { Leaf, ShieldCheck, AlertOctagon } from 'lucide-react';

const mockAnalysisData = {
  "Tomato___Late_blight": {
    diseaseName: "Tomato Late Blight",
    confidence: 0.92,
    isHealthy: false,
    overview: "Late blight is a destructive disease affecting tomatoes and potatoes, caused by the oomycete Phytophthora infestans. It thrives in cool, moist conditions.",
    treatments: {
      organic: [
        "Remove and destroy infected plants immediately.",
        "Ensure good air circulation around plants.",
        "Apply copper-based fungicides preventatively.",
        "Water at the base of plants to keep foliage dry."
      ],
      chemical: [
        "Apply fungicides containing mancozeb, chlorothalonil, or fluopicolide.",
        "Alternate fungicide types to prevent resistance.",
        "Follow label instructions carefully for application rates and timing."
      ]
    }
  },
  "Potato___healthy": {
    diseaseName: "Healthy Potato Plant",
    confidence: 0.99,
    isHealthy: true,
    overview: "The plant appears to be in good health. Continue good agricultural practices.",
    treatments: { organic: [], chemical: [] }
  },
  "Apple_scab": {
    diseaseName: "Apple Scab",
    confidence: 0.85,
    isHealthy: false,
    overview: "Apple scab is a common fungal disease caused by Venturia inaequalis. It affects leaves, fruit, and twigs.",
    treatments: {
      organic: [
        "Rake and destroy fallen leaves in autumn to reduce overwintering spores.",
        "Prune trees for better air circulation.",
        "Apply sulfur or copper-based sprays.",
        "Choose scab-resistant apple varieties."
      ],
      chemical: [
        "Apply fungicides like captan, myclobutanil, or thiophanate-methyl.",
        "Timing is critical; start applications at green tip and continue through petal fall.",
        "Consult local extension services for recommended spray schedules."
      ]
    }
  }
};

const HomePage = () => {
  const [currentStep, setCurrentStep] = useState('upload'); // 'upload', 'analyzing', 'results'
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  const handleImageUpload = (imagePreviewUrl, fileName) => {
    setUploadedImage(imagePreviewUrl);
    setImageFileName(fileName);
    if (!imagePreviewUrl) { // Image cleared
      setCurrentStep('upload');
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedImage) {
      toast({
        title: "No Image Selected",
        description: "Please upload an image first to analyze.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep('analyzing');
    // Simulate API call
    setTimeout(() => {
      const diseases = Object.keys(mockAnalysisData);
      const randomDiseaseKey = diseases[Math.floor(Math.random() * diseases.length)];
      setAnalysisResult(mockAnalysisData[randomDiseaseKey]);
      setCurrentStep('results');
      toast({
        title: "Analysis Complete!",
        description: `Diagnosis for ${imageFileName} is ready.`,
        className: "bg-primary text-primary-foreground"
      });
    }, 2500);
  };

  const handleReset = () => {
    setCurrentStep('upload');
    setUploadedImage(null);
    setImageFileName('');
    setAnalysisResult(null);
    toast({
      title: "New Diagnosis Started",
      description: "Upload a new image to begin.",
    });
  };

  const pageVariants = {
    initial: { opacity: 0, x: -50 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 50 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-10rem)] flex flex-col items-center"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <AnimatePresence mode="wait">
        {currentStep === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl"
          >
            <ImageUpload onImageUpload={handleImageUpload} onAnalyze={handleAnalyze} />
          </motion.div>
        )}

        {(currentStep === 'analyzing' || currentStep === 'results') && (
           <motion.div
            key="report"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl"
          >
            {uploadedImage && (
              <div className="mb-8 p-4 bg-background rounded-lg shadow-md border border-primary/20 flex items-center justify-center flex-col">
                <img  src={uploadedImage} alt={imageFileName || "Uploaded leaf"} className="max-h-40 w-auto rounded-md border-2 border-primary shadow-lg" src="https://images.unsplash.com/photo-1577668692180-7196b5049c71" />
                <p className="mt-2 text-sm text-muted-foreground font-medium">{imageFileName}</p>
              </div>
            )}
            <AnalysisReport result={analysisResult} isLoading={currentStep === 'analyzing'} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>

      {currentStep === 'upload' && (
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center max-w-3xl"
        >
          <h2 className="text-3xl font-bold font-serif text-primary mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 hover:shadow-retro-green transition-shadow">
              <Leaf className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-serif text-primary mb-2">1. Upload Image</h3>
              <p className="text-muted-foreground text-sm">
                Snap a clear photo of the affected plant leaf and upload it using our simple interface.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 hover:shadow-retro-green transition-shadow">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-serif text-primary mb-2">2. AI Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Our advanced AI model analyzes the image to identify potential diseases with high accuracy.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg shadow-lg border border-primary/20 hover:shadow-retro-green transition-shadow">
              <AlertOctagon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-serif text-primary mb-2">3. Get Solutions</h3>
              <p className="text-muted-foreground text-sm">
                Receive a detailed report with the diagnosis, confidence level, and recommended treatment steps.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default HomePage;
  