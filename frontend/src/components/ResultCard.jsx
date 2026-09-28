import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  ShieldAlert,
  ShieldCheck,
  Activity,
  Check,
  Copy,
  BarChart3,
  Stethoscope,
  Sparkles,
  FileText,
  CheckCircle2
} from 'lucide-react';
import WeatherWidget from './WeatherWidget';

const ResultCard = ({ result }) => {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const {
    filename = '',
    disease = 'Unknown',
    confidence = 0,
    all_probabilities = {},
    risk_level = 'NONE',
    treatment = [],
    weather = null,
  } = result;

  // Badge styles: HIGH=red, MODERATE=yellow, LOW=green, NONE=gray
  const getRiskBadge = (level) => {
    switch (level?.toUpperCase()) {
      case 'HIGH':
      case 'SEVERE':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MODERATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'NONE':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleCopyTreatment = () => {
    if (!treatment || !treatment.length) return;
    const text = `RiceGuard Treatment Protocol for ${disease} (Image: ${filename || 'leaf.jpg'}):\n\n` +
      treatment.map((step, idx) => `${idx + 1}. ${step}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Prepare chart data for Recharts
  const chartData = Object.entries(all_probabilities).map(([className, prob]) => {
    const numVal = typeof prob === 'number' ? prob : parseFloat(prob) || 0;
    return {
      name: className.replace('Bacterial Leaf Blight', 'B. Blight'),
      fullName: className,
      probability: numVal,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6 animate-fade-in">
      {/* Top Header: Disease Name, Uploaded Image Name & Risk Level Badge */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5 text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>AI Diagnostic Result</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {disease}
          </h2>
          {filename && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-2 bg-slate-100/90 px-3 py-1 rounded-lg w-fit border border-slate-200/80">
              <FileText className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span className="text-slate-400 font-normal">Uploaded Image:</span>
              <span className="text-slate-800 truncate max-w-xs">{filename}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getRiskBadge(
              risk_level
            )}`}
          >
            Risk: {risk_level}
          </span>
        </div>
      </div>

      {/* Confidence Bar */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
          <span className="flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            Confidence Score
          </span>
          <span className="text-sm font-extrabold text-emerald-700">
            {confidence}%
          </span>
        </div>
        <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700"
            style={{ width: `${Math.min(confidence, 100)}%` }}
          />
        </div>
      </div>

      {/* Embedded WeatherWidget */}
      {weather && (
        <div>
          <WeatherWidget weather={weather} />
        </div>
      )}

      {/* Actionable Treatment Protocol: Single Consistent Protocol */}
      <div className="bg-slate-50/70 rounded-2xl border border-slate-200/70 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Actionable Treatment Protocol
              </h3>
              <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Single Validated Protocol
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Follow these sequential, non-conflicting field remediation measures for <strong className="text-slate-700">{disease}</strong>.
            </p>
          </div>

          {treatment && treatment.length > 0 && (
            <button
              type="button"
              onClick={handleCopyTreatment}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Protocol</span>
                </>
              )}
            </button>
          )}
        </div>

        <div className="space-y-2.5">
          {Array.isArray(treatment) && treatment.length > 0 ? (
            treatment.map((step, idx) => {
              const colonIndex = step.indexOf(':');
              const hasPrefix = colonIndex > 0 && colonIndex < 35;
              const title = hasPrefix ? step.substring(0, colonIndex) : null;
              const description = hasPrefix ? step.substring(colonIndex + 1).trim() : step;

              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 text-xs sm:text-sm text-slate-800 shadow-2xs"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="leading-relaxed">
                    {title ? (
                      <>
                        <strong className="text-slate-900 font-bold mr-1.5 block sm:inline">
                          {title}:
                        </strong>
                        <span className="text-slate-700">{description}</span>
                      </>
                    ) : (
                      <span className="text-slate-700">{step}</span>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-xs text-slate-500 p-3 bg-white rounded-xl text-center">
              No specific chemical or biological measures required.
            </div>
          )}
        </div>
      </div>

      {/* Bar Chart of all_probabilities using Recharts */}
      {chartData.length > 0 && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pathogen Probability Distribution (%)
            </h4>
          </div>

          <div className="w-full h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  unit="%"
                />
                <Tooltip
                  formatter={(val, name, item) => [`${val}%`, item.payload.fullName]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    borderColor: '#e2e8f0',
                    fontSize: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  }}
                />
                <Bar dataKey="probability" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.fullName === disease ? '#059669' : '#cbd5e1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
