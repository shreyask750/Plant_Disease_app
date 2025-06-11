
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Eye, Calendar, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const History = () => {
  const [diagnoses, setDiagnoses] = useState([]);

  useEffect(() => {
    const savedDiagnoses = localStorage.getItem('leafguard_diagnoses');
    if (savedDiagnoses) {
      setDiagnoses(JSON.parse(savedDiagnoses));
    } else {
      setDiagnoses([]);
    }
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
    toast({
      title: "View Report",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleDownloadPDF = (diagnosis) => {
    toast({
      title: "Download PDF",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const clearHistory = () => {
    setDiagnoses([]);
    localStorage.removeItem('leafguard_diagnoses');
    toast({
      title: "History cleared",
      description: "All diagnosis records have been removed."
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

        {diagnoses.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-green-500/10 border-b border-green-500/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Plant</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Disease</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Confidence</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Severity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-green-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnoses.map((diagnosis, index) => (
                    <motion.tr
                      key={diagnosis.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <img  
                          className="w-12 h-12 rounded-lg object-cover border border-green-500/30"
                          alt={`${diagnosis.plantType} leaf scan`}
                         src="https://images.unsplash.com/photo-1649838615949-54e58df30c2a" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-gray-300">
                          <Calendar className="h-4 w-4 mr-2 text-green-400" />
                          <div>
                            <div className="font-semibold">{diagnosis.date}</div>
                            <div className="text-sm text-gray-400">{diagnosis.time}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">{diagnosis.plantType}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${
                          diagnosis.disease === 'Healthy' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {diagnosis.disease}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                            <div 
                              className="bg-green-400 h-2 rounded-full" 
                              style={{ width: `${diagnosis.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-300">{diagnosis.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(diagnosis.severity)}`}>
                          {diagnosis.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(diagnosis.status)}`}>
                          {getStatusIcon(diagnosis.status)}
                          <span className="capitalize">{diagnosis.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleViewReport(diagnosis)}
                            size="sm"
                            variant="outline"
                            className="border-green-500 text-green-400 hover:bg-green-500/20"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => handleDownloadPDF(diagnosis)}
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-400 hover:bg-blue-500/20"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gray-800/60 backdrop-blur-sm border border-green-500/30 rounded-lg p-12 text-center"
          >
            <FileText className="h-16 w-16 text-green-400/50 mx-auto mb-4" />
            <h3 className="font-orbitron text-xl font-semibold text-green-400/70 mb-2">
              No Diagnosis History
            </h3>
            <p className="text-gray-400 mb-6">
              Start by uploading your first plant image for AI analysis. Your results will appear here.
            </p>
            <Button
              onClick={() => window.location.href = '/upload'}
              className="bg-green-500 hover:bg-green-600 text-black font-bold"
            >
              Upload First Image
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;