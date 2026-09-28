import React from 'react';
import { Sprout, ShieldAlert, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-900">Rice<span className="text-emerald-600">Guard</span></span>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              An intelligent agro-diagnostic system leveraging deep learning and computer vision to detect early rice leaf diseases, delivering rapid agronomic intervention protocols to safeguard yields and food security.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">Target Pathogens</h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>Bacterial Leaf Blight</li>
              <li>Leaf Blast (Pyricularia oryzae)</li>
              <li>Brown Spot (Bipolaris oryzae)</li>
              <li>Leaf Smut (Entyloma oryzae)</li>
              <li>Tungro Disease</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} RiceGuard AI System. Developed for Agronomic Research & Crop Protection.</p>
          <div className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
            <span>Always consult local agricultural extension officers before heavy chemical application.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
