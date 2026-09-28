import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scan,
  Cpu,
  CloudRain,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Leaf,
  Heart
} from 'lucide-react';

const Home = () => {
  const featureCards = [
    {
      title: 'CNN Detection',
      description:
        'Deep Convolutional Neural Network trained on thousands of leaf images classifies foliar infections including Rice Blast, Bacterial Blight, Brown Spot, Leaf Smut, and Tungro with high precision.',
      icon: Cpu,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    },
    {
      title: 'Weather Analytics',
      description:
        'Analyzes live micro-climate indices—temperature, ambient humidity, and rainfall—to calculate pathogen sporulation vulnerability and predict impending epidemic pressure.',
      icon: CloudRain,
      color: 'bg-blue-50 text-blue-700 border-blue-100',
    },
    {
      title: 'Smart Treatment',
      description:
        'Generates actionable 4-step Integrated Pest Management (IPM) protocols featuring specific chemical dosages, bio-control alternatives, and water management practices.',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-700 border-teal-100',
    },
  ];

  const targetDiseases = [
    'Rice Blast',
    'Bacterial Leaf Blight',
    'Brown Spot',
    'Leaf Smut',
    'Tungro Virus',
    'Healthy Foliage',
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-200 text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Driven Agronomic Decision Support System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            AI-Powered Rice <span className="text-emerald-600">Disease Detection</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload a leaf image, get instant diagnosis + treatment using CNN + Weather Analytics.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/detect"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02]"
            >
              <Scan className="w-5 h-5" />
              <span>Detect Disease Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 3 Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-emerald-100/80 shadow-card hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${card.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Target Diseases Coverage Strip */}
        <section className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Target Pathogen Spectrum
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluated through computer vision feature maps and visual disease symptom markers.
              </p>
            </div>
            <Link
              to="/detect"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              <span>Test with image</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {targetDiseases.map((d, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-100"
              >
                {d}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Footer with Credits */}
      <footer className="mt-16 border-t border-emerald-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-medium">
            <span>🌾 <strong>RiceGuard</strong> AI System</span>
            <span>•</span>
            <span>Early Detection & Crop Security</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Agronomists, Farmers, and Agricultural Research.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
