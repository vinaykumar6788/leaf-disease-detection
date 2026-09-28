import React from 'react';
import { AlertTriangle, CheckCircle2, Info, Activity, ShieldCheck, Stethoscope } from 'lucide-react';

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  const isHealthy = prediction.disease_name.toLowerCase().includes('healthy');

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'healthy':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'high':
      case 'severe':
      case 'critical':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 overflow-hidden relative">
      {/* Header Accent Glow */}
      <div
        className={`absolute top-0 left-0 right-0 h-1.5 ${
          isHealthy ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-rose-500'
        }`}
      />

      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Stethoscope className="w-5 h-5 text-emerald-600" />
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400">
              AI Diagnostic Assessment
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {prediction.disease_name}
          </h3>
          <p className="text-sm font-serif italic text-slate-500 mt-0.5">
            {prediction.scientific_name}
          </p>
        </div>

        {/* Severity Badge */}
        <div className="flex flex-col items-end gap-1.5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getSeverityStyle(
              prediction.severity
            )}`}
          >
            {prediction.severity} Severity
          </span>
          <span className="text-[11px] text-slate-400">
            {prediction.is_mock ? 'Visual Heuristic Analysis' : 'TensorFlow Deep Learning'}
          </span>
        </div>
      </div>

      {/* Confidence Bar & Metric */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            Confidence Level
          </span>
          <span className="text-sm font-extrabold text-emerald-700">
            {prediction.confidence}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              isHealthy ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-emerald-600'
            }`}
            style={{ width: `${prediction.confidence}%` }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-sm text-slate-600 leading-relaxed bg-emerald-50/40 p-3.5 rounded-xl border border-emerald-100/80">
          {prediction.description}
        </p>
      </div>

      {/* Symptoms Identified */}
      <div>
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-slate-500" />
          Key Pathological Symptoms Observed:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {prediction.symptoms.map((symptom, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50/80 border border-slate-100 text-xs text-slate-700 font-medium"
            >
              <CheckCircle2
                className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                  isHealthy ? 'text-emerald-600' : 'text-amber-600'
                }`}
              />
              <span>{symptom}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
