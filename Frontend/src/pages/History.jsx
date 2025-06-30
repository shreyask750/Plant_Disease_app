import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const BACKEND_URL = "https://plant-backend-s47e.onrender.com";

const History = () => {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/history`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched history:", data); // <-- Debug output
        setDiagnoses(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'treated': return <CheckCircle className="h-5 w-5 text-blue-400" />;
      case 'monitoring': return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'untreated': return <XCircle className="h-5 w-5 text-red-400" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'treated': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'monitoring': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'untreated': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'text-red-400 bg-red-500/10';
      case 'Medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'Low': return 'text-green-400 bg-green-500/10';
      case 'None': return 'text-green-400 bg-green-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const handleViewReport = (diagnosis) => {
    window.open(`${BACKEND_URL}/download/pdf/${diagnosis.reportFilename}`, '_blank');
  };

  const handleDownloadPDF = (diagnosis) => {
    const link = document.createElement('a');
    link.href = `${BACKEND_URL}/download/pdf/${diagnosis.reportFilename}`;
    link.download = diagnosis.reportFilename;
    link.click();
  };

  const clearHistory = () => {
    setDiagnoses([]);
    toast({
      title: "History cleared",
      description: "History is synced with backend. To reset, clear on backend."
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron text-4xl md:text-6xl font-bold text-green-400 text-emphasis mb-6">
            Diagnosis History
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your plant health monitoring journey. Results will appear here after analysis.
          </p>
        </motion.div>

        {diagnoses.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{diagnoses.length}</div>
                <div className="text-sm text-gray-400">Total Scans</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {diagnoses.filter(d => d.status === 'treated').length}
                </div>
                <div className="text-sm text-gray-400">Treated</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm border border-yellow-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {diagnoses.filter(d => d.status === 'monitoring').length}
                </div>
                <div className="text-sm text-gray-400">Monitoring</div>
              </div>
              <div className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {diagnoses.filter(d => d.disease === 'Healthy').length}
                </div>
                <div className="text-sm text-gray-400">Healthy</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="font-orbitron text-2xl font-bold text-green-400">
                Recent Diagnoses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {diagnoses.map((diagnosis, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(diagnosis.status)}
                        <h3 className="text-lg font-semibold text-white">{diagnosis.prediction}</h3>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(diagnosis.status)}`}>
                        {diagnosis.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Confidence:</strong> {(diagnosis.confidence * 100).toFixed(2)}%
                    </p>
                    <p className="text-sm text-gray-300 mb-1">
                      <strong>Severity:</strong> <span className={`${getSeverityColor(diagnosis.severity)} px-2 py-0.5 rounded`}>{diagnosis.severity}</span>
                    </p>
                    <p className="text-sm text-gray-400 mb-2">
                      <strong>Date:</strong> {diagnosis.timestamp}
                    </p>
                    <div className="flex gap-3 mt-3">
                      <Button onClick={() => window.open(`${BACKEND_URL}${diagnosis.image_url}`, "_blank")}>
                        <Eye className="w-4 h-4 mr-1" /> Image
                      </Button>
                      <Button onClick={() => handleDownloadPDF(diagnosis)} variant="outline">
                        <Download className="w-4 h-4 mr-1" /> PDF
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={clearHistory}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500/20"
                disabled={diagnoses.length === 0}
              >
                Clear History
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
