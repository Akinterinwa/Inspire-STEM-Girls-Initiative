import React, { useState, useEffect, useRef } from 'react';
import { ProgramItem } from '../types';
import {
  X,
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Building,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon,
} from 'lucide-react';

interface ProgramModalProps {
  program: ProgramItem | null;
  onClose: () => void;
  onGetInvolved: () => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  onClose,
  onGetInvolved,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Normalize images list
  const slides = program?.images && program.images.length > 0
    ? program.images
    : program?.image
    ? [program.image]
    : [];

  // Reset slide index when program changes
  useEffect(() => {
    setCurrentSlide(0);
    setIsPaused(false);
  }, [program?.id]);

  // Auto-advance timer (every 3.8 seconds if not paused)
  useEffect(() => {
    if (!program || slides.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [program, slides.length, isPaused]);

  if (!program) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-stone-200 transform transition-all relative">
        {/* Close Button top-right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/60 hover:bg-slate-950 text-white backdrop-blur-md transition-all focus:outline-none shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ============================================================== */}
        {/* MULTI-IMAGE AUTO-SLIDER BANNER                                 */}
        {/* ============================================================== */}
        <div
          className="relative h-72 sm:h-96 w-full overflow-hidden bg-stone-950 select-none group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {slides.map((imgUrl, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={imgUrl}
                alt={`${program.name} photo ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            </div>
          ))}

          {/* Navigation Arrows for Slider (visible if multiple images) */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md focus:outline-none"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md focus:outline-none"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Auto-Slide Indicator & Photo Count Badge */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold border border-white/20">
              <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
              <span>
                Photo {currentSlide + 1} of {slides.length}
              </span>
            </span>

            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 rounded-full bg-black/60 backdrop-blur-md text-stone-300 hover:text-white border border-white/20 transition-colors"
                title={isPaused ? 'Resume auto-slideshow' : 'Pause slideshow'}
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </button>
            )}
          </div>

          {/* Title & Metadata over Banner */}
          <div className="absolute bottom-5 left-6 right-6 z-20">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              <span>{program.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-300 font-bold">{program.status}</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-sm">
              {program.name}
            </h2>

            {/* Slider Dots */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2 mt-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                      idx === currentSlide
                        ? 'w-7 bg-amber-400'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODAL CONTENT BODY                                             */}
        {/* ============================================================== */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-22rem)] overflow-y-auto">
          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Date</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5 text-[#0e4b3c] flex-shrink-0" />
                {program.date}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Location</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-1 truncate">
                <MapPin className="w-3.5 h-3.5 text-[#0e4b3c] flex-shrink-0" />
                <span className="truncate">{program.location}</span>
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Girls Reached</span>
              <span className="font-bold text-emerald-800 flex items-center gap-1 mt-1">
                <Users className="w-3.5 h-3.5 text-[#0e4b3c] flex-shrink-0" />
                {program.girlsReached} Girls
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider">Age Group</span>
              <span className="font-semibold text-slate-800 flex items-center gap-1 mt-1 truncate">
                <Award className="w-3.5 h-3.5 text-[#0e4b3c] flex-shrink-0" />
                <span className="truncate">{program.ageGroup.split('(')[0]}</span>
              </span>
            </div>
          </div>

          {/* Program Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Program Overview
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {program.fullDescription}
            </p>
          </div>

          {/* Measurable Outcomes */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Measurable Outcomes & Highlights
            </h3>
            <ul className="space-y-2">
              {program.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Collaborating Partners */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Collaborating Partners
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              {program.partners.map((partner, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-stone-100 rounded-lg border border-stone-200"
                >
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-500 text-center sm:text-left">
            Interested in partnering, sponsoring kits, or replicating this program in your community?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-slate-900 border border-stone-300 rounded-lg hover:bg-white transition-colors"
            >
              Close Dossier
            </button>
            <button
              onClick={() => {
                onClose();
                onGetInvolved();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 text-xs font-bold bg-[#0e4b3c] hover:bg-[#155e4b] text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Partner On This</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
