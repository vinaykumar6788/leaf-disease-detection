import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const ImageUpload = ({ onDetect, loading = false }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    setError('');
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Invalid file type. Please upload an image file (JPEG, PNG, WEBP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setError('Image file is too large. Maximum supported size is 15MB.');
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && onDetect && !loading) {
      onDetect(selectedFile);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Upload Leaf Image
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Take or drag a photograph of the suspect rice leaf.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag and Drop Zone */}
      {!previewUrl ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-emerald-500 bg-emerald-50/70 scale-[0.99]'
              : 'border-slate-300 hover:border-emerald-400 bg-slate-50/60 hover:bg-emerald-50/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Click to upload or drag & drop leaf photo
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Accepts all image formats (JPEG, PNG, WEBP) up to 15MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-xl overflow-hidden border border-emerald-100 bg-slate-900/5 aspect-video flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Leaf Preview Thumbnail"
              className="max-h-64 object-contain rounded-lg shadow-xs"
            />
            <button
              type="button"
              onClick={handleRemove}
              disabled={loading}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white backdrop-blur transition-colors disabled:opacity-50"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{selectedFile?.name}</span>
            </div>
          </div>
        </div>
      )}

      {/* Detect Disease Action Button */}
      <div className="mt-4">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedFile || loading}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Detecting Disease...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Detect Disease</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;
