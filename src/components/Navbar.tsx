import React, { useState } from 'react';
import { PageId } from '../types';
import { Menu, X, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#EFEFF0] shadow-xs">
      {/* Top Banner with Brand Purple and Radiant Gold Accent */}
      <div className="bg-[#2C0E40] text-[#EFEFF0] text-xs py-1.5 px-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F0C747] animate-pulse"></span>
          <span>Inspire STEM Girls Initiative · Empowering girls from underserved communities in Nigeria</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-[#EFEFF0]/80">
          <span className="text-[#F0C747] font-semibold">Vision: Future Tuition-Free Science School</span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>Aligned with UN SDG 4 & 5</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name with tactile hover */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            <Logo size="md" />
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#2C0E40] transition-colors leading-tight">
                Inspire STEM Girls
              </span>
              <span className="block text-[11px] font-semibold tracking-wider uppercase text-[#2C0E40]">
                Initiative · Nigeria
              </span>
            </div>
          </button>

          {/* Desktop Navigation with high-engagement hover states */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group/nav cursor-pointer ${
                    isActive
                      ? 'text-[#2C0E40] font-bold bg-[#EFEFF0] shadow-xs'
                      : 'text-slate-600 hover:text-[#2C0E40] hover:bg-[#EFEFF0]/70 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Gold bottom accent line */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#F0C747] opacity-100 scale-x-100'
                        : 'bg-[#F0C747] opacity-0 scale-x-0 group-hover/nav:opacity-100 group-hover/nav:scale-x-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Action Button: Prominent Donate with tactile hover */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('donate')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md cursor-pointer ${
                currentPage === 'donate'
                  ? 'bg-[#F0C747] text-[#2C0E40] font-bold shadow-amber-500/25 ring-2 ring-[#2C0E40]'
                  : 'bg-[#2C0E40] text-white hover:bg-[#41175E] hover:text-[#F0C747] shadow-purple-950/25 hover:shadow-lg hover:shadow-purple-950/30 hover:-translate-y-0.5 active:scale-95'
              }`}
            >
              <Heart className="w-4 h-4 fill-current text-[#F0C747] group-hover:scale-110 transition-transform" />
              <span>Donate</span>
            </button>
          </div>

          {/* Mobile Menu Button with hover state */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('donate')}
              className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2C0E40] text-[#F0C747] hover:bg-[#41175E] transition-all cursor-pointer"
            >
              <Heart className="w-3 h-3 fill-current text-[#F0C747]" />
              <span>Donate</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-[#2C0E40] hover:bg-[#EFEFF0] focus:outline-none transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#2C0E40]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with hover states */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#EFEFF0] bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-base font-medium flex items-center justify-between transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#EFEFF0] text-[#2C0E40] font-bold border-l-4 border-[#F0C747]'
                      : 'text-slate-700 hover:bg-[#EFEFF0]/80 hover:text-[#2C0E40] hover:translate-x-1'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#F0C747]"></span>}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-[#EFEFF0] flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('donate')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-[#2C0E40] text-[#F0C747] hover:bg-[#41175E] hover:shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#F0C747]" />
              <span>Donate to Inspire STEM Girls</span>
            </button>
            <button
              onClick={() => handleNavClick('vision')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-[#2C0E40]/25 text-[#2C0E40] hover:bg-[#EFEFF0] transition-all cursor-pointer"
            >
              <span>Explore Future Science School Vision</span>
              <ArrowRight className="w-4 h-4 text-[#2C0E40]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
