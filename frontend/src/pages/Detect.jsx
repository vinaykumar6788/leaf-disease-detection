import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Navigation,
  Sparkles,
  AlertCircle,
  X,
  Loader2,
  CheckCircle2,
  Info
} from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import ResultCard from '../components/ResultCard';
import { predictDisease } from '../services/api';

const Detect = () => {
  // Coordinates state (defaults to Varanasi, a major rice research hub)
  const [lat, setLat] = useState(25.3176);
  const [lon, setLon] = useState(82.9739);
  const [locating, setLocating] = useState(false);
  const [locationDetected, setLocationDetected] = useState(false);

  // Diagnostic state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [errorToast, setErrorToast] = useState(null);

  // Auto-fetch geolocation on mount
  useEffect(() => {
    fetchUserLocation();
  }, []);

  const fetchUserLocation = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(parseFloat(pos.coords.latitude.toFixed(4)));
        setLon(parseFloat(pos.coords.longitude.toFixed(4)));
        setLocationDetected(true);
        setLocating(false);
      },
      (err) => {
        console.warn('Geolocation access failed or denied:', err.message);
        setLocating(false);
      },
      { timeout: 7000 }
    );
  };

  // Triggered when ImageUpload's "Detect Disease" button is clicked
  const handleDetect = async (imageFile) => {
    if (!imageFile) return;

    setLoading(true);
    setErrorToast(null);
    setResult(null);

    try {
      const data = await predictDisease(imageFile, lat, lon);
      setResult({
        ...data,
        filename: data.filename || imageFile.name || 'uploaded_leaf.jpg',
      });

      // Trigger celebratory confetti if leaf is healthy
      if (data.disease?.toLowerCase().includes('healthy')) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#34d399', '#059669', '#a7f3d0'],
        });
      }
    } catch (err) {
      console.error('Diagnosis request error:', err);
      const message =
        err.response?.data?.detail ||
        (err.response?.status === 500 && !err.response?.data?.detail
          ? 'FastAPI backend server is not reachable on port 8000. Please start the backend server.'
          : err.message) ||
        'Could not complete diagnosis. Please verify the FastAPI backend server is running.';
      setErrorToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Error Toast */}
      {errorToast && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 shadow-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Diagnosis Failed
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">{errorToast}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setErrorToast(null)}
            className="p-1 rounded-lg text-rose-500 hover:text-rose-800 hover:bg-rose-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Real-time Diagnosis Workspace</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Rice Leaf Disease Detection
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
          Upload a clear photograph of the suspect rice leaf blade to identify foliar pathogens, analyze localized weather outbreak risk, and generate actionable treatment steps.
        </p>
      </div>

      {/* Two-Column Layout: Upload on Left (5 cols), Results on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: GPS Location + ImageUpload Component */}
        <div className="lg:col-span-5 space-y-6">
          {/* Field Coordinates Card */}
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                Field Location (GPS)
              </span>

              <button
                type="button"
                onClick={fetchUserLocation}
                disabled={locating}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors disabled:opacity-50"
              >
                <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Locating...' : locationDetected ? 'Re-detect GPS' : 'Detect GPS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="e.g. 25.3176"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lon}
                  onChange={(e) => setLon(parseFloat(e.target.value) || 0)}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  placeholder="e.g. 82.9739"
                />
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-2.5 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              <span>Used to query live micro-climate for environmental disease risk assessment.</span>
            </p>
          </div>

          {/* Component: ImageUpload */}
          <ImageUpload onDetect={handleDetect} loading={loading} />

          {/* Photography Guidelines */}
          <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100 p-4 text-xs text-emerald-900 space-y-1.5">
            <span className="font-bold flex items-center gap-1.5 text-emerald-950">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Guidelines For High Accuracy:
            </span>
            <ul className="list-disc list-inside space-y-0.5 text-emerald-800 text-[11px] pl-1">
              <li>Frame the infected leaf blade in sharp focus under daylight.</li>
              <li>Ensure lesions (spots, blight stripes, discoloration) are visible.</li>
              <li>Avoid blurred camera movement or cluttered background weed leaves.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Loading State or ResultCard */}
        <div className="lg:col-span-7">
          {loading ? (
            <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-16 text-center text-slate-500 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                Running Neural Diagnosis...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
                Analyzing leaf textures with Convolutional Neural Network and querying local micro-climate indices for epidemic risk assessment.
              </p>
            </div>
          ) : result ? (
            <ResultCard result={result} />
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center text-slate-400">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-base font-bold text-slate-700">
                Awaiting Leaf Photograph
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 leading-relaxed">
                Select a leaf image on the left and click "Detect Disease" to run deep learning inference, weather risk assessment, and actionable treatment generation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detect;
