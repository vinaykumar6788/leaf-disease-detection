import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  History as HistoryIcon,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  FileQuestion,
  Scan
} from 'lucide-react';
import { getHistory, deleteHistory } from '../services/api';
import HistoryTable from '../components/HistoryTable';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHistory(50);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load history records:', err);
      setError(
        err.response?.data?.detail ||
          err.message ||
          'Unable to load historical records. Please verify the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (recordId) => {
    try {
      await deleteHistory(recordId);
      setHistory((prev) => prev.filter((r) => (r.id || r._id) !== recordId));
    } catch (err) {
      console.error('Failed to delete history record:', err);
      alert('Failed to delete record. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <HistoryIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audit Trail & Records</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Diagnosis History
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Review past field diagnoses, neural confidence ratings, environmental risk classifications, and assigned treatment regimens.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchRecords}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <Link
            to="/detect"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all"
          >
            <Scan className="w-4 h-4" />
            <span>New Diagnosis</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Error State Banner */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 shadow-sm flex items-start justify-between gap-3 animate-fade-in">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                Failed to Load History
              </h4>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={fetchRecords}
            className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-16 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-slate-700">Loading diagnosis records...</p>
          <p className="text-xs text-slate-400 mt-0.5">Fetching past evaluations from MongoDB database</p>
        </div>
      ) : history.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-14 text-center text-slate-500 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            No Diagnosis History Found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1.5 mb-6 leading-relaxed">
            You have not scanned or diagnosed any rice leaf samples yet. Upload a leaf photo to generate your first diagnostic record.
          </p>
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <Scan className="w-4 h-4" />
            <span>Diagnose First Leaf</span>
          </Link>
        </div>
      ) : (
        /* Render HistoryTable Component */
        <HistoryTable records={history} pageSize={10} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default History;
