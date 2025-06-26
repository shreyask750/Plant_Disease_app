import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Camera, FileImage, Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null); 
        toast({
          title: "Image ready!",
          description: "Click 'Analyze with AI' to proceed.",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  }, []);

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setResult(null); 
        toast({
          title: "Image ready!",
          description: "Click 'Analyze with AI' to proceed.",
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };


//   const handleAnalyze = async () => {
//   if (!selectedFile) {
//     toast({
//       title: "No image selected",
//       description: "Please upload an image first.",
//       variant: "destructive",
//     });
//     return;
//   }

//   setIsAnalyzing(true);
//   setResult(null);

//   const formData = new FormData();
//   formData.append("file", selectedFile);

//   try {
//     const response = await fetch("http://localhost:8000/predict", {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get prediction");
//     }

//     const data = await response.json();

//     setResult({
//       disease: data.prediction || "Unknown Disease",
//       confidence: `${(data.confidence * 100).toFixed(2)}%`,
//       severity: data.severity || "N/A",
//       treatment: data.treatment || "No treatment recommendation available.",
//       prevention: data.prevention || "No prevention tips available.",
//     });
//   } catch (error) {
//     toast({
//       title: "Prediction failed",
//       description: error.message,
//       variant: "destructive",
//     });
//   } finally {
//     setIsAnalyzing(false);
//   }
// };
  const handleAnalyze = async () => {
  if (!selectedFile) {
    toast({
      title: "No image selected",
      description: "Please upload an image first.",
      variant: "destructive",
    });
    return;
  }

  setIsAnalyzing(true);
  setResult(null);

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to get prediction");
    }

    const data = await response.json();

    setResult({
      disease: data.prediction || "Unknown Disease",
      confidence: `${(data.confidence * 100).toFixed(2)}%`,
      severity: data.severity || "N/A",
      treatment: data.treatment || "No treatment recommendation available.",
      prevention: data.prevention || "No prevention tips available.",
      pdf_url: data.pdf_url,
      image_url: data.image_url,
    });

    toast({
      title: "Analysis Complete",
      description: "You can now view and download the report.",
    });

  } catch (error) {
    toast({
      title: "Prediction failed",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsAnalyzing(false);
  }
};

  const resetUpload = () => {
    setSelectedFile(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900 botanical-pattern-light">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-green-400 text-emphasis mb-6">
            Plant Disease Diagnosis
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload a clear image of a plant leaf to get AI-powered disease analysis.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-green-400 bg-green-500/10 glow-green' 
                  : 'border-green-500/50 hover:border-green-400 hover:bg-green-500/5'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {selectedFile ? (
                <div className="space-y-4">
                  <FileImage className="h-16 w-16 text-green-400 mx-auto" />
                  <div>
                    <p className="text-green-400 font-semibold">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    onClick={resetUpload}
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500/20"
                  >
                    Choose Different Image
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-16 w-16 text-green-400 mx-auto" />
                  <div>
                    <p className="text-xl font-semibold text-green-400 mb-2">
                      Drop your leaf image here
                    </p>
                    <p className="text-gray-400">
                      or click to browse files
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Supports: JPG, PNG, WebP (Max 10MB)
                  </div>
                </div>
              )}
            </div>
            <div className="text-center">
              <Button
                onClick={() => toast({
                  title: "Camera feature",
                  description: "🚧 This feature isn't implemented yet."
                })}
                variant="outline"
                className="border-green-500 text-green-400 hover:bg-green-500/20"
              >
                <Camera className="mr-2 h-5 w-5" />
                Take Photo
              </Button>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 text-lg glow-green-intense disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 bg-black rounded-full loading-dot"></div>
                    <div className="w-2 h-2 bg-black rounded-full loading-dot"></div>
                    <div className="w-2 h-2 bg-black rounded-full loading-dot"></div>
                  </div>
                  Analyzing...
                </div>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Analyze with AI
                </>
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {isAnalyzing || result ? ( 
              result ? (
                <div className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
                  <h3 className="font-orbitron text-2xl font-bold text-green-400 mb-6 text-emphasis">
                    Diagnosis Results
                  </h3>
                  <div className="space-y-4">
                    <div className={`flex items-center justify-between p-4 ${result.disease === "Awaiting Real AI Analysis" ? "bg-yellow-500/20 border-yellow-500/30" : "bg-red-500/20 border-red-500/30"} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <AlertCircle className={`h-6 w-6 ${result.disease === "Awaiting Real AI Analysis" ? "text-yellow-400" : "text-red-400"}`} />
                        <div>
                          <p className={`font-semibold ${result.disease === "Awaiting Real AI Analysis" ? "text-yellow-400" : "text-red-400"}`}>{result.disease}</p>
                          <p className="text-sm text-gray-400">Confidence: {result.confidence}</p>
                        </div>
                      </div>
                      {result.severity !== "N/A" && 
                        <span className={`px-3 py-1 ${result.disease === "Awaiting Real AI Analysis" ? "bg-yellow-500/30 text-yellow-400" : "bg-red-500/30 text-red-400"} rounded-full text-sm font-semibold`}>
                          {result.severity} Risk
                        </span>
                      }
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Treatment Recommendation:</h4>
                        <p className="text-gray-300 bg-gray-700/50 p-3 rounded-lg">
                          {result.treatment}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Prevention Tips:</h4>
                        <p className="text-gray-300 bg-gray-700/50 p-3 rounded-lg">
                          {result.prevention}
                        </p>
                      </div>
                    </div>
                    {/* <div className="flex space-x-3 pt-4">
                      <Button
                        onClick={() => toast({
                          title: "PDF Export",
                          description: "🚧 This feature requires backend integration. Request it next! 🚀"
                        })}
                        className="flex-1 bg-blue-500 hover:bg-blue-600"
                      >
                        Export Report
                      </Button>
                      <Button
                        onClick={() => toast({
                          title: "Save to History",
                          description: "🚧 This feature requires backend integration. Request it next! 🚀"
                        })}
                        variant="outline"
                        className="flex-1 border-green-500 text-green-400 hover:bg-green-500/20"
                      >
                        Save to History
                      </Button>
                    </div> */}
                    <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 pt-4">
                      {result.pdf_url && (
                        <a href={result.pdf_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full bg-blue-500 hover:bg-blue-600">
                            Download Report (PDF)
                          </Button>
                        </a>
                      )}
                      {result.image_url && (
                        <a href={result.image_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button className="w-full bg-gray-700 hover:bg-gray-800">
                            Download Image
                          </Button>
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              ) : (
                 <div className="bg-gray-800/30 border border-green-500/20 rounded-lg p-8 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex space-x-1 mr-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full loading-dot"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full loading-dot"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full loading-dot"></div>
                      </div>
                      <span className="font-orbitron text-xl font-semibold text-green-400/70">Analyzing Image...</span>
                    </div>
                    <p className="text-gray-400">
                      Please wait while our AI processes your image.
                    </p>
                  </div>
              )
            ) : (
              <div className="bg-gray-800/30 border border-green-500/20 rounded-lg p-8 text-center">
                <Zap className="h-16 w-16 text-green-400/50 mx-auto mb-4" />
                <h3 className="font-orbitron text-xl font-semibold text-green-400/70 mb-2">
                  Awaiting Analysis
                </h3>
                <p className="text-gray-400">
                  Upload an image and click "Analyze with AI" to see results.
                </p>
              </div>
            )}
            <div className="bg-gray-800/30 border border-green-500/20 rounded-lg p-6">
              <h4 className="font-orbitron font-semibold text-green-400 mb-3">
                📸 Photography Tips
              </h4>
              <ul className="text-sm text-gray-300 space-y-2">
                <li>• Use good lighting (natural light preferred)</li>
                <li>• Focus on the affected leaf area</li>
                <li>• Avoid blurry or dark images</li>
                <li>• Include the entire leaf when possible</li>
                <li>• Clean the leaf surface before photographing</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;