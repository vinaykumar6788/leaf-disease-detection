import React, { useState, useEffect } from 'react';
import { getAllDiseases } from '../services/api';
import { BookOpen, Search, Filter, ShieldAlert, CheckCircle2, FlaskConical, Leaf, Tractor } from 'lucide-react';

const DiseaseLibrary = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pathogenFilter, setPathogenFilter] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const data = await getAllDiseases();
        setDiseases(data);
        if (data.length > 0) {
          setSelectedDisease(data[0]);
        }
      } catch (err) {
        console.error('Error loading disease catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDiseases();
  }, []);

  const filteredDiseases = diseases.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.symptoms.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      pathogenFilter === 'All' ||
      d.pathogen_type.toLowerCase().includes(pathogenFilter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Rice Agronomy Knowledge Base</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Rice Leaf Disease Encyclopedia
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Comprehensive field identification guidelines, pathogenic profiles, and evidence-based IPM (Integrated Pest Management) protocols.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by disease name, pathogen, or symptom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block mr-1" />
          {['All', 'Fungal', 'Bacterial', 'Viral'].map((type) => (
            <button
              key={type}
              onClick={() => setPathogenFilter(type)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                pathogenFilter === type
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      {loading ? (
        <div className="p-16 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          Loading disease encyclopedia...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Disease List Sidebar */}
          <div className="lg:col-span-4 space-y-3">
            {filteredDiseases.map((item) => {
              const isSelected = selectedDisease?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedDisease(item)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-600'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.pathogen_type === 'Fungal'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : item.pathogen_type === 'Bacterial'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : item.pathogen_type === 'Viral'
                          ? 'bg-purple-100 text-purple-800 border-purple-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {item.pathogen_type}
                    </span>
                  </div>
                  <p className="text-xs italic text-slate-500 mt-1 font-serif">
                    {item.scientific_name}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}

            {filteredDiseases.length === 0 && (
              <div className="p-8 text-center text-xs text-slate-500 bg-white rounded-xl border border-slate-200">
                No diseases matching your filter criteria.
              </div>
            )}
          </div>

          {/* Detailed View */}
          <div className="lg:col-span-8">
            {selectedDisease ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {selectedDisease.pathogen_type} Pathogen
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {selectedDisease.name}
                  </h2>
                  <p className="text-sm font-serif italic text-slate-500 mt-1">
                    Scientific: {selectedDisease.scientific_name}
                  </p>
                  <p className="text-sm text-slate-600 mt-4 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedDisease.description}
                  </p>
                </div>

                {/* Favorable Environmental Conditions */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-600" />
                    Favorable Environmental Factors
                  </h3>
                  <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 font-medium leading-relaxed">
                    {selectedDisease.favorable_conditions}
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-xs uppercase font-bold tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Diagnostic Field Symptoms
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedDisease.symptoms.map((sym, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                      >
                        • {sym}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Integrated Treatment Protocols */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Management & Treatment Protocols
                  </h3>

                  {/* Biological */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 mb-1.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      Biological & Bio-Control:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                      {selectedDisease.treatments?.organic?.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Chemical */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-rose-800 mb-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-rose-600" />
                      Chemical Controls (Fungicides / Antibiotics):
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                      {selectedDisease.treatments?.chemical?.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Agronomic */}
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1.5">
                      <Tractor className="w-3.5 h-3.5 text-amber-600" />
                      Cultural & Preventive Strategies:
                    </div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                      {selectedDisease.treatments?.cultural?.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseaseLibrary;
