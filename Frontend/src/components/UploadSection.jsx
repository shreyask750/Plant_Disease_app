import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const UploadSection = ({ onDiagnosis }) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid image file (e.g., JPG, PNG).",
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />,
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
       toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 10MB.",
        variant: "destructive",
        action: <AlertCircle className="text-red-500" />,
      });
      return;
    }

    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const simulateAnalysis = async () => {
    if (!selectedImage) return;
    setUploading(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const mockDiseases = [
      { name: "Tomato Late Blight", confidence: 92, treatment: "Apply copper-based fungicide. Ensure good air circulation. Remove and destroy infected plant matter.", severity: "High" },
      { name: "Powdery Mildew on Roses", confidence: 87, treatment: "Use potassium bicarbonate or neem oil spray. Prune for better airflow. Avoid overhead watering.", severity: "Medium" },
      { name: "Apple Scab", confidence: 78, treatment: "Apply appropriate fungicides during early spring. Rake and remove fallen leaves in autumn. Prune infected twigs.", severity: "Medium" },
      { name: "Corn Common Rust", confidence: 95, treatment: "Usually minor; resistant varieties are key. Fungicides may be needed for susceptible sweet corn.", severity: "Low" },
      { name: "Potato Early Blight", confidence: 89, treatment: "Practice crop rotation. Apply protective fungicides. Ensure adequate plant nutrition.", severity: "High"},
    ];

    const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
    
    const diagnosis = {
      id: `diag_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      image: imagePreview, 
      disease: randomDisease.name,
      confidence: randomDisease.confidence,
      treatment: randomDisease.treatment,
      severity: randomDisease.severity,
      date: new Date().toISOString(),
      timestamp: new Date().toLocaleString(),
    };

    onDiagnosis(diagnosis);
    setUploading(false);
    setSelectedImage(null);
    setImagePreview(null);

    toast({
      title: "Analysis Complete",
      description: `Detected: ${randomDisease.name} (${randomDisease.confidence}% confidence).`,
      action: <CheckCircle className="text-green-500" />,
    });
  };

  const clearSelection = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] } }
  };

  return (
    <section className="py-12 md:py-20">
      <motion.div
        className="max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold title-text-gradient mb-5 font-['Cinzel']">
            Diagnose Your Plant
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            Upload a clear photo of an affected plant leaf for an AI-powered disease analysis.
          </p>
        </div>

        <motion.div 
          className="professional-card rounded-xl p-6 md:p-10"
          whileHover={{ boxShadow: "0px 10px 30px rgba(var(--primary-rgb), 0.1)"}}
          transition={{ duration: 0.3 }}
        >
          {!imagePreview ? (
            <div
              className={`upload-area rounded-lg p-8 md:p-12 text-center cursor-pointer transition-all duration-300 ease-in-out
                ${dragOver ? 'upload-area-dragover' : 'border-muted hover:border-primary/70'}`}
              onDragOver={handleDragOver}
              onDragEnter={handleDragOver} 
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              aria-label="Drag and drop image or click to upload"
            >
              <motion.div
                className="flex flex-col items-center space-y-5"
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <UploadCloud className="w-16 h-16 md:w-20 md:h-20 text-primary/80" strokeWidth={1.5}/>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-2">
                    Drag & Drop Leaf Image Here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or <span className="text-primary font-medium">click to browse</span>
                  </p>
                  <div className="text-xs text-muted-foreground/80 space-x-2">
                    <span>JPG, PNG, WebP</span>
                    <span>•</span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="text-center">
              <motion.div 
                className="relative inline-block mb-8 shadow-xl rounded-lg overflow-hidden border-2 border-border"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <img
                  src={imagePreview}
                  alt="Selected plant leaf"
                  className="max-w-sm md:max-w-md max-h-80 object-contain rounded-md"
                />
              </motion.div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={simulateAnalysis}
                  disabled={uploading}
                  className="professional-button w-full sm:w-auto px-8 py-3 text-base font-semibold"
                  size="lg"
                >
                  {uploading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing Image...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="w-5 h-5" />
                      <span>Analyze Plant Leaf</span>
                    </div>
                  )}
                </Button>
                
                <Button
                  onClick={clearSelection}
                  variant="outline"
                  className="professional-button-secondary w-full sm:w-auto"
                  size="lg"
                  disabled={uploading}
                >
                  Choose Different Image
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            aria-hidden="true"
          />
        </motion.div>

        <motion.div
          className="mt-10 p-6 professional-card rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-primary" />
            Tips for Best Results
          </h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1.5 text-sm">
            <li>Ensure the leaf is well-lit, preferably with natural, indirect light.</li>
            <li>Focus primarily on the affected areas of the leaf.</li>
            <li>Avoid blurry images; ensure the camera is focused.</li>
            <li>Place the leaf on a plain, contrasting background if possible.</li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default UploadSection;