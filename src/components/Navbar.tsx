import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'programs', label: 'Programs' },
    { id: 'impact', label: 'Impact' },
    { id: 'vision', label: 'Our Vision' },
    { id: 'team', label: 'Team' },
    { id: 'partners', label: 'Partners' },
    { id: 'reports', label: 'Reports' },
    { id: 'get-involved', label: 'Get Involved' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Top Banner for Mission & Long-term vision context */}
      <div className="bg-[#0e4b3c] text-emerald-50 text-xs py-1.5 px-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Inspire STEM Girls Initiative · Empowering girls from underserved communities in Nigeria</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-emerald-100">
          <span>Vision: Future Tuition-Free Science School</span>
          <span aria-hidden="true">·</span>
          <span>Aligned with UN SDG 4 & 5</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0e4b3c] flex items-center justify-center text-white font-bold shadow-md shadow-emerald-950/10 group-hover:scale-105 transition-transform">
              <span className="text-xl tracking-tighter font-serif-display">ISG</span>
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#0e4b3c] transition-colors leading-tight">
                Inspire STEM Girls
              </span>
              <span className="block text-[11px] font-semibold tracking-wider uppercase text-emerald-800">
                Initiative · Nigeria
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-[#0e4b3c] font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#0e4b3c] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button: Prominent Donate */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('donate')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                currentPage === 'donate'
                  ? 'bg-amber-600 text-white shadow-amber-900/20'
                  : 'bg-[#0e4b3c] text-white hover:bg-[#155e4b] shadow-emerald-950/20 hover:shadow'
              }`}
            >
              <Heart className="w-4 h-4 fill-current text-amber-300" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('donate')}
              className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#0e4b3c] text-white"
            >
              <Heart className="w-3 h-3 fill-current text-amber-300" />
              <span>Donate</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-emerald-50 text-[#0e4b3c] font-semibold'
                      : 'text-slate-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0e4b3c]"></span>}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('donate')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-[#0e4b3c] text-white shadow-sm"
            >
              <Heart className="w-4 h-4 fill-current text-amber-300" />
              <span>Donate to Inspire STEM Girls</span>
            </button>
            <button
              onClick={() => handleNavClick('vision')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border border-stone-300 text-slate-700 hover:bg-stone-50"
            >
              <span>Explore Future Science School Vision</span>
              <ArrowRight className="w-4 h-4 text-emerald-700" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
