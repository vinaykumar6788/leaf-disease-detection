import React, { useState } from 'react';
import { Leaf, FlaskConical, Tractor, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';

const TreatmentCard = ({ treatments, diseaseName }) => {
  const [activeTab, setActiveTab] = useState('organic');
  const [copied, setCopied] = useState(false);

  if (!treatments) return null;

  const tabs = [
    {
      id: 'organic',
      label: 'Biological & Organic',
      icon: Leaf,
      color: 'emerald',
      items: treatments.organic || [],
      subtitle: 'Eco-friendly biocontrol agents and organic extracts',
    },
    {
      id: 'chemical',
      label: 'Chemical Controls',
      icon: FlaskConical,
      color: 'rose',
      items: treatments.chemical || [],
      subtitle: 'Prescribed targeted chemical fungicides & bactericides with dosages',
    },
    {
      id: 'cultural',
      label: 'Cultural Practices',
      icon: Tractor,
      color: 'amber',
      items: treatments.cultural || [],
      subtitle: 'Field agronomy, water regulation, and nitrogen fertilizer management',
    },
    {
      id: 'prevention',
      label: 'Preventive Measures',
      icon: ShieldCheck,
      color: 'blue',
      items: treatments.prevention || [],
      subtitle: 'Seed treatment protocols and certified disease-resistant crop varieties',
    },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopyAdvice = () => {
    const textToCopy = `RiceGuard Treatment Protocol for ${diseaseName}:\n\n` +
      tabs.map((tab) => `[${tab.label.toUpperCase()}]\n` + tab.items.map((it) => `- ${it}`).join('\n')).join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Prescribed Treatment & Management Plan
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Scientifically validated agronomic intervention protocols.
          </p>
        </div>

        <button
          onClick={handleCopyAdvice}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-500" />
              <span>Copy Full Advisory</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 mb-4 border-b border-slate-100 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              {tab.label}
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-slate-800 text-emerald-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.items.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Subtitle */}
      <div className="mb-4">
        <p className="text-xs font-medium text-slate-500">
          {currentTab.subtitle}
        </p>
      </div>

      {/* Recommendation Items */}
      <div className="space-y-2.5">
        {currentTab.items.length > 0 ? (
          currentTab.items.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-sm text-slate-800 hover:bg-slate-50 transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 shadow-2xs">
                {index + 1}
              </div>
              <span className="leading-relaxed text-xs sm:text-sm">{item}</span>
            </div>
          ))
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 text-xs text-slate-500 text-center">
            No specific measures required for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default TreatmentCard;
