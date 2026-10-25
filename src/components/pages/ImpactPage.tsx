import React, { useState, useRef } from 'react';
import { PageId, ProgramItem } from '../../types';
import { impactMetrics, programsData, impactStories, siteImages } from '../../data/siteData';
import { SmartCounter } from '../CountUp';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import {
  Users,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Quote,
  CheckCircle2,
  Calendar,
  MapPin,
  Heart,
  Camera,
  Layers,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram: (program: ProgramItem) => void;
}

export const ImpactPage: React.FC<ImpactPageProps> = ({
  onNavigate,
  onSelectProgram,
}) => {
  // Mobile Carousel States
  const [numbersIndex, setNumbersIndex] = useState(0);
  const numbersScrollRef = useRef<HTMLDivElement>(null);

  const [storiesIndex, setStoriesIndex] = useState(0);
  const storiesScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainerTo = (container: HTMLDivElement | null, targetIndex: number, totalItems: number) => {
    if (!container) return;
    const clamped = Math.max(0, Math.min(totalItems - 1, targetIndex));
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 260;
    container.scrollTo({
      left: clamped * (cardWidth + 16),
      behavior: 'smooth',
    });
  };

  const handleContainerScroll = (container: HTMLDivElement | null, setIndex: (idx: number) => void) => {
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 260;
    const newIdx = Math.round(container.scrollLeft / (cardWidth + 16));
    setIndex(newIdx);
  };

  return (
    <div className="py-8 sm:py-16 bg-white space-y-12 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#FFBD59]">
      {/* Top Header with Animated H1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Evidence & Outcomes"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Our Impact
          </AnimatedHeading>
          {/* Desktop text */}
          <p className="hidden sm:block mt-4 text-lg text-slate-600 leading-relaxed">
            Measuring real transformations in confidence, skills, academic continuation, and STEM career interest among girls from underserved communities in Nigeria.
          </p>
          {/* Mobile text: concise */}
          <p className="block sm:hidden mt-2 text-sm text-slate-600 leading-relaxed">
            Measuring real transformations in skills, confidence, and education for Nigerian girls.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. IMPACT AT A GLANCE (Numbers count up smoothly)              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E3E3E5] pb-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <AnimatedHeading
              as="h2"
              accent
              className="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
            >
              Impact at a Glance
            </AnimatedHeading>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Core progress indicators verified across our cohorts and school partnerships.
            </p>
          </div>

          {/* Mobile Carousel Controls for Numbers */}
          <div className="flex sm:hidden items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-500">
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollContainerTo(numbersScrollRef.current, numbersIndex - 1, impactMetrics.length)}
                disabled={numbersIndex === 0}
                aria-label="Previous metric"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainerTo(numbersScrollRef.current, numbersIndex + 1, impactMetrics.length)}
                disabled={numbersIndex >= impactMetrics.length - 1}
                aria-label="Next metric"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP 5-COLUMN GRID (sm and above: untouched) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {impactMetrics.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40] hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#2C0E40] tracking-tight mb-2">
                  <SmartCounter value={item.value} />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-[#E3E3E5]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* MOBILE CAROUSEL FOR NUMBERS (Visible ONLY on mobile < sm) */}
        <div className="block sm:hidden">
          <div
            ref={numbersScrollRef}
            onScroll={() => handleContainerScroll(numbersScrollRef.current, setNumbersIndex)}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
          >
            {impactMetrics.map((item) => (
              <div
                key={item.id}
                className="w-[76vw] max-w-[280px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/70 border border-[#E3E3E5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-[#2C0E40] tracking-tight mb-1.5">
                    <SmartCounter value={item.value} />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2.5 border-t border-[#E3E3E5]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 pt-3">
            {impactMetrics.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollContainerTo(numbersScrollRef.current, idx, impactMetrics.length)}
                aria-label={`Go to metric ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  numbersIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. OUR PROGRAMS IN ACTION (With Short Wordings on Mobile)      */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E3E3E5] pb-4 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div>
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Field Execution"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
              className="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
            >
              Our Programs in Action
            </AnimatedHeading>
          </div>
          {/* Desktop description */}
          <p className="hidden sm:block text-sm text-slate-600 max-w-md">
            Showcasing individual projects with authentic photographs, community locations, and verified measurable outcomes. Click any project to launch its multi-image dossier slider.
          </p>
          {/* Mobile description: concise */}
          <p className="block sm:hidden text-xs text-slate-600">
            Field projects with authentic photos and verified outcomes. Tap to view full dossier.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {programsData.slice(0, 3).map((program) => (
            <div
              key={program.id}
              className="bg-[#EFEFF0]/40 rounded-3xl border border-[#E3E3E5] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center p-5 sm:p-8 hover:shadow-xl hover:border-[#2C0E40]/30 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Photo with Click-to-Slider feature */}
              <div
                onClick={() => onSelectProgram(program)}
                className="lg:col-span-5 rounded-2xl overflow-hidden shadow-sm aspect-[16/10] bg-[#150520] relative group cursor-pointer"
              >
                <img
                  src={program.image}
                  alt={program.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#2C0E40] text-[#FFBD59] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {program.categoryLabel}
                </div>

                {program.images && program.images.length > 1 && (
                  <div className="absolute top-3 right-3 bg-[#150520]/90 text-[#FFBD59] backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 shadow-sm border border-[#FFBD59]/30">
                    <Camera className="w-3.5 h-3.5 text-[#FFBD59]" />
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 rounded-xl bg-white text-[#2C0E40] font-bold text-xs shadow-lg flex items-center gap-2">
                    <Camera className="w-4 h-4 text-[#2C0E40]" />
                    <span>Open Photo Slideshow</span>
                  </span>
                </div>
              </div>

              {/* Data & Outcomes */}
              <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span className="font-bold text-[#2C0E40]">{program.status}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {program.date}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {program.location}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
                  {program.name}
                </h3>

                {/* Desktop Description (Full) */}
                <p className="hidden sm:block text-slate-600 text-sm leading-relaxed">
                  {program.fullDescription}
                </p>

                {/* Mobile Description (Short wording - full details available on click) */}
                <p className="block sm:hidden text-slate-600 text-xs leading-relaxed line-clamp-2">
                  {program.shortDescription}
                </p>

                {/* Measurable Outcomes (Visible on Desktop; on Mobile, available inside full details modal) */}
                <div className="hidden sm:block p-4 rounded-2xl bg-white border border-[#E3E3E5] space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                    Measurable Outcomes Achieved:
                  </span>
                  <ul className="space-y-1.5">
                    {program.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 sm:pt-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Reached <SmartCounter value={`${program.girlsReached}`} /> girls ({program.ageGroup.split('(')[0].trim()})
                  </span>

                  {/* Desktop view link */}
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="hidden sm:inline-flex text-xs font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>View Project ({program.images?.length || 1} Images)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Mobile View Full Details Button */}
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="w-full sm:hidden inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#FFBD59]" />
                    <span>Click to View Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. STORIES OF IMPACT (Participant testimonials in Carousel)    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E3E3E5] pb-4 mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1">
              Human Transformation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Stories of Impact
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Hear directly from the girls participating in our mentorship cycles and practical workshops.
            </p>
          </div>

          {/* Mobile Carousel Controls for Stories */}
          <div className="flex md:hidden items-center justify-between pt-1">
            <span className="text-xs font-semibold text-slate-500">
              Story ({storiesIndex + 1} of {impactStories.length})
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollContainerTo(storiesScrollRef.current, storiesIndex - 1, impactStories.length)}
                disabled={storiesIndex === 0}
                aria-label="Previous story"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainerTo(storiesScrollRef.current, storiesIndex + 1, impactStories.length)}
                disabled={storiesIndex >= impactStories.length - 1}
                aria-label="Next story"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP 3-COLUMN GRID (md and above: untouched) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactStories.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-[#EFEFF0]/40 border border-[#E3E3E5] flex flex-col justify-between hover:shadow-xl hover:border-[#2C0E40]/30 transition-all duration-300 hover:-translate-y-1 relative"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-[#2C0E40]/35" />

                <blockquote className="text-slate-800 text-sm sm:text-base font-serif-display italic leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.story}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E3E3E5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {item.studentName} (Age {item.age})
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {item.school}
                    </p>
                  </div>
                  <span className="text-[10px] bg-[#EFEFF0] text-[#2C0E40] font-bold px-2 py-0.5 rounded border border-[#2C0E40]/15">
                    {item.location.split(',')[0]}
                  </span>
                </div>
                <div className="mt-2 text-[11px] font-bold text-[#2C0E40]">
                  Outcome: {item.outcome}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE CAROUSEL FOR STORIES (Visible ONLY on mobile < md) */}
        <div className="block md:hidden">
          <div
            ref={storiesScrollRef}
            onScroll={() => handleContainerScroll(storiesScrollRef.current, setStoriesIndex)}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
          >
            {impactStories.map((item) => (
              <div
                key={item.id}
                className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/50 border border-[#E3E3E5] flex flex-col justify-between shadow-xs relative"
              >
                <div className="space-y-3">
                  <Quote className="w-7 h-7 text-[#2C0E40]/35" />

                  <blockquote className="text-slate-800 text-xs sm:text-sm font-serif-display italic leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                    {item.story}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#E3E3E5]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {item.studentName} (Age {item.age})
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        {item.school}
                      </p>
                    </div>
                    <span className="text-[10px] bg-white text-[#2C0E40] font-bold px-2 py-0.5 rounded border border-[#2C0E40]/15">
                      {item.location.split(',')[0]}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[10px] font-bold text-[#2C0E40]">
                    Outcome: {item.outcome}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 pt-3">
            {impactStories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollContainerTo(storiesScrollRef.current, idx, impactStories.length)}
                aria-label={`Go to story ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  storiesIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Support Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2C0E40] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFBD59] block mb-2">
              Scale This Change
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white">
              Help Us Reach the Next 5,000 Girls in Nigeria
            </h3>
            <p className="text-[#EFEFF0]/85 text-sm sm:text-base mt-2 leading-relaxed">
              Your partnership allows us to equip more public schools with mobile science kits, expand mentor matching, and remove examination cost barriers.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onNavigate('donate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#FFBD59] hover:bg-[#DCB132] text-[#2C0E40] transition-all duration-200 text-center shadow-md hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Invest in Her Future
            </button>
            <button
              onClick={() => {
                onNavigate('reports');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#41175E] hover:bg-[#58247C] text-white border border-[#FFBD59]/40 hover:border-[#FFBD59] transition-all duration-200 text-center hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Read 2026 Impact Report
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
