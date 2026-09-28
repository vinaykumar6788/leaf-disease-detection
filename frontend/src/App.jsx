import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detect from './pages/Detect';
import History from './pages/History';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-200 selection:text-emerald-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Detect />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
