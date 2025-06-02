
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const ImageUpload = ({ onImageUpload, onAnalyze }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, or WEBP image.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      onImageUpload(reader.result, file.name);
    };
    reader.readAsDataURL(file);
    toast({
      title: "Image Selected!",
      description: `${file.name} is ready for analysis.`,
      className: "bg-primary text-primary-foreground"
    });
  };

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      processFile(event.dataTransfer.files[0]);
    }
  }, [onImageUpload, toast]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 md:p-8 rounded-xl main-diagnosis-area text-primary-foreground greek-border border-accent"
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif font-semibold text-gold-DEFAULT">Upload Leaf Image</h2>
        <p className="text-primary-foreground/80 mt-1">Let's diagnose your plant's health!</p>
      </div>

      <div
        className={`w-full p-8 border-4 border-dashed rounded-lg transition-all duration-300 ease-in-out text-center cursor-pointer
          ${isDragging ? 'border-gold-DEFAULT bg-primary/50 scale-105' : 'border-primary-foreground/50 hover:border-gold-DEFAULT hover:bg-primary/30'}
          ${previewUrl ? 'bg-green-700/50' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('file-upload-input').click()}
      >
        <Input
          id="file-upload-input"
          type="file"
          className="hidden"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleFileChange}
        />
        {previewUrl ? (
          <div className="flex flex-col items-center">
            <img  src={previewUrl} alt="Uploaded leaf preview" className="max-h-48 w-auto rounded-md mb-4 shadow-lg border-2 border-gold-DEFAULT" src="https://images.unsplash.com/photo-1682099642900-2bebb40233b2" />
            <p className="font-semibold text-lg text-gold-DEFAULT">Image Ready!</p>
            <p className="text-sm text-primary-foreground/90">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <UploadCloud className="w-16 h-16 mb-4 text-gold-DEFAULT animate-pulse-subtle" />
            <Label htmlFor="file-upload-input" className="font-semibold text-lg text-gold-DEFAULT cursor-pointer">
              Drag & drop or click to upload
            </Label>
            <p className="text-xs text-primary-foreground/70 mt-1">PNG, JPG, WEBP up to 5MB</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Button 
            onClick={onAnalyze} 
            size="lg" 
            className="bg-gold-DEFAULT text-primary hover:bg-gold-dark shadow-retro-gold w-full sm:w-auto"
            aria-label="Analyze uploaded image"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Analyze Image
          </Button>
          <Button 
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl(null);
              onImageUpload(null, null);
            }} 
            variant="outline" 
            size="lg" 
            className="border-gold-DEFAULT text-gold-DEFAULT hover:bg-gold-DEFAULT hover:text-primary w-full sm:w-auto"
            aria-label="Clear selected image"
          >
            <AlertTriangle className="mr-2 h-5 w-5" />
            Clear Selection
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImageUpload;
  