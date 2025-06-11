import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Zap, AlertTriangle, CheckCircle, BarChart3, HelpCircle, BookOpen } from 'lucide-react';

const History = ({ diagnoses }) => {
  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'medium':
        return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <HelpCircle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return 'border-red-500/50 bg-red-900/20 hover:bg-red-900/30';
      case 'medium':
        return 'border-yellow-500/50 bg-yellow-900/20 hover:bg-yellow-900/30';
      case 'low':
        return 'border-green-500/50 bg-green-900/20 hover:bg-green-900/30';
      default:
        return 'border-muted/50 bg-muted/20 hover:bg-muted/30';
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };


  return (
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-semibold title-text-gradient mb-6 font-['Cinzel']">
          Diagnosis History
        </h1>
        <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
          Review your past plant health analyses and treatment recommendations.
        </p>
      </motion.div>

      {diagnoses.length === 0 ? (
        <motion.div
          className="professional-card rounded-xl p-12 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <BookOpen className="w-20 h-20 mx-auto mb-6 text-primary" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            No Diagnosis Records Found
          </h2>
          <p className="text-foreground/70 text-lg">
            Your diagnosis history is currently empty. Upload a plant image to start building your records.
          </p>
        </motion.div>
      ) : (
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {diagnoses.map((diagnosis) => (
            <motion.div
              key={diagnosis.id}
              className={`professional-card rounded-lg p-6 border-l-4 transition-all duration-300 ${getSeverityColor(diagnosis.severity)}`}
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 md:w-1/4">
                  <img
                    src={diagnosis.image}
                    alt="Diagnosed plant leaf"
                    className="w-full h-48 object-cover rounded-md border-2 border-border shadow-md"
                  />
                </div>

                <div className="flex-grow md:w-3/4">
                  <div className="flex flex-col sm:flex-row items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-semibold text-foreground mb-1 flex items-center">
                        {getSeverityIcon(diagnosis.severity)}
                        <span className="ml-2">{diagnosis.disease}</span>
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{new Date(diagnosis.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} - {new Date(diagnosis.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <div className="text-3xl font-bold primary-text-gradient">
                        {diagnosis.confidence}%
                      </div>
                      <div className="text-sm text-muted-foreground">Confidence Score</div>
                    </div>
                  </div>

                  <div className="bg-background/30 rounded-md p-4 border border-border mb-4">
                    <h4 className="font-semibold text-foreground/90 mb-1 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-primary" />
                      Recommended Treatment
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{diagnosis.treatment}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                     <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        diagnosis.severity?.toLowerCase() === 'high' 
                          ? 'bg-red-500/20 text-red-300' 
                          : diagnosis.severity?.toLowerCase() === 'medium'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-green-500/20 text-green-300'
                      }`}>
                        Severity: {diagnosis.severity || 'N/A'}
                      </span>
                    <div className="text-xs text-gray-600">
                      ID: {diagnosis.id}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            className="professional-card rounded-xl p-6 mt-10"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-center flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-3 text-primary"/>
              Diagnosis Summary
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {[
                { label: "Total Diagnoses", value: diagnoses.length },
                { label: "Avg. Confidence", value: `${diagnoses.length > 0 ? Math.round(diagnoses.reduce((acc, d) => acc + d.confidence, 0) / diagnoses.length) : 0}%` },
                { label: "Unique Diseases", value: new Set(diagnoses.map(d => d.disease)).size }
              ].map(stat => (
                <div key={stat.label} className="bg-muted/30 p-4 rounded-lg">
                  <div className="text-3xl font-bold primary-text-gradient">{stat.value}</div>
                  <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default History;