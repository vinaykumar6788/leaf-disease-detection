import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Scan, History, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Detect', path: '/detect', icon: Scan },
    { name: 'History', path: '/history', icon: History },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 text-emerald-800 group"
          >
            <span className="text-2xl select-none" role="img" aria-label="Rice">
              🌾
            </span>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-emerald-900 group-hover:text-emerald-700 transition-colors">
                Rice<span className="text-emerald-600">Guard</span>
              </span>
              <span className="text-[10px] text-emerald-600 font-medium tracking-wide -mt-1 hidden sm:block">
                AI Crop Protection
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-100/70 text-emerald-900 shadow-2xs'
                        : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Responsive Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg animate-fade-in">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-emerald-100/80 text-emerald-900'
                      : 'text-slate-600 hover:text-emerald-800 hover:bg-emerald-50'
                  }`
                }
              >
                <Icon className="w-5 h-5 text-emerald-600" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Navbar;
