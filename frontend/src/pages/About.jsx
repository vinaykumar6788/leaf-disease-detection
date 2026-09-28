import React from 'react';
import { Cpu, Database, Cloud, Layers, ShieldCheck, CheckCircle2, Code2, HeartHandshake } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
          <span>Agricultural AI Innovation</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          About the RiceGuard System
        </h1>
        <p className="mt-3 text-base text-slate-600 leading-relaxed">
          RiceGuard is an AI-powered diagnostic and decision-support platform designed to combat catastrophic yield loss caused by foliar rice pathogens through instant leaf disease classification and targeted IPM remedies.
        </p>
      </div>

      {/* Tech Stack Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Deep Learning & Vision</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Utilizes TensorFlow and Pillow image pipeline to analyze leaf textures, discoloration patterns, necrotic lesion geometries, and chlorosis zones.
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              224x224x3 Tensor
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Softmax Classification
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Heuristic Resilient Fallback
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-4">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">High-Speed Async Backend</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Engineered with FastAPI and Motor for fully non-blocking asynchronous MongoDB persistence, providing ultra-low inference latency and instant report delivery.
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              FastAPI
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              Motor (MongoDB)
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
              HTTPX Weather Client
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
            <Code2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-2">Modern Responsive UI</h3>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            Constructed with React 18, Vite, and TailwindCSS for sub-millisecond interaction feedback, accessible layouts, and field-ready mobile usability.
          </p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              React + Vite
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Tailwind CSS
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              Axios
            </span>
          </div>
        </div>
      </div>

      {/* Pipeline Breakdown */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          Diagnostic Pipeline Architecture
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Step 1</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Image Acquisition</h4>
            <p className="text-xs text-slate-500">
              User uploads leaf photograph via responsive drag-and-drop or camera capture.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Step 2</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Vision Preprocessing</h4>
            <p className="text-xs text-slate-500">
              Pillow normalizes aspect ratio, resizes to 224x224, and scales pixel channels to [0, 1].
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Step 3</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Neural Inference</h4>
            <p className="text-xs text-slate-500">
              CNN analyzes visual lesions and classifies pathogen signature with confidence scoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">Step 4</div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">Treatment Dispatch</h4>
            <p className="text-xs text-slate-500">
              Expert system maps disease to targeted organic, chemical, and agronomic management plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
