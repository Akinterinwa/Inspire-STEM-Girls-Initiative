import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { PageId, ProgramItem } from '../../types';
import {
  siteImages,
  impactMetrics,
  programsData,
  impactStories,
  sdgGoals,
} from '../../data/siteData';
import { SmartCounter } from '../CountUp';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import { SocialFeedSection } from '../SocialFeedSection';
import {
  ArrowRight,
  Heart,
  Compass,
  Users,
  KeyRound,
  GraduationCap,
  Sparkles,
  CheckCircle,
  Building,
  School,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Camera,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram: (program: ProgramItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProgram,
}) => {
  // Mobile Carousel States
  const [pathwaysIndex, setPathwaysIndex] = useState(0);
  const pathwaysScrollRef = useRef<HTMLDivElement>(null);

  const [girlsActionIndex, setGirlsActionIndex] = useState(0);
  const girlsActionScrollRef = useRef<HTMLDivElement>(null);

  const [impactNumbersIndex, setImpactNumbersIndex] = useState(0);
  const impactNumbersScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainerTo = (container: HTMLDivElement | null, targetIndex: number, totalItems: number) => {
    if (!container) return;
    const clamped = Math.max(0, Math.min(totalItems - 1, targetIndex));
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    container.scrollTo({
      left: clamped * (cardWidth + 16),
      behavior: 'smooth',
    });
  };

  const handleContainerScroll = (container: HTMLDivElement | null, setIndex: (idx: number) => void) => {
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    const newIdx = Math.round(container.scrollLeft / (cardWidth + 16));
    setIndex(newIdx);
  };
  return (
    <div className="space-y-0 selection:bg-[#2C0E40] selection:text-[#FFBD59]">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* Mobile: Full background image with text overlay                */}
      {/* Desktop: Big, expansive hero photography with rich layout      */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden border-b border-[#EFEFF0]">
        {/* MOBILE HERO (Visible on mobile / tablet < lg) */}
        <div className="block lg:hidden bg-gradient-to-b from-[#F6EFF9]/60 via-white to-white px-5 sm:px-8 pt-8 pb-10">
          <div className="space-y-5 text-left">
            {/* Eyebrow Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6EFF9] border border-[#2C0E40]/15 text-[#2C0E40] text-xs font-semibold uppercase tracking-wider"
            >
              <span>Inspire STEM Girls · Nigeria</span>
            </motion.div>

            {/* Headline */}
            <AnimatedHeading
              as="h1"
              accent
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight text-left"
            >
              Building Brighter Futures for Girls Through STEM
            </AnimatedHeading>

            {/* Concise Value Proposition (Reduced, no bulky text) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal"
            >
              Empowering girls from underserved Nigerian communities through hands-on STEM education, mentorship, and opportunities.
            </motion.p>

            {/* Clean Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 pt-1"
            >
              <button
                onClick={() => {
                  onNavigate('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#FFBD59] hover:bg-[#DCB132] text-[#2C0E40] transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Explore Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('donate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#2C0E40] hover:bg-[#41175E] text-white transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#FFBD59] fill-current" />
                <span>Support Our Mission</span>
              </button>
            </motion.div>

            {/* Dedicated Hero Image Frame — 100% Unobstructed, No Text Blocking the Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="pt-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-100">
                <img
                  src={siteImages.hero}
                  alt="Young Nigerian school girls enthusiastically participating in hands-on STEM workshop"
                  className="w-full aspect-[4/3] sm:aspect-[16/10] object-cover object-center"
                  loading="eager"
                  decoding="async"
                />
                {/* Clean Bottom Meta Badge */}
                <div className="px-4 py-2.5 bg-[#150520]/90 backdrop-blur-md text-white flex items-center justify-between text-xs">
                  <span className="font-semibold text-stone-200 truncate">Hands-On STEM Lab · Nigeria</span>
                  <span className="text-[#FFBD59] font-bold shrink-0 ml-2">1,250+ Girls Reached</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* DESKTOP HERO (Visible on lg and above: Grand split layout with enlarged photography) */}
        <div className="hidden lg:block bg-gradient-to-b from-[#EFEFF0]/50 via-white to-[#EFEFF0]/30 pt-16 pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-10 items-center">
              {/* Left Column: Core Message with Animated H1 */}
              <div className="col-span-6 space-y-6 text-left">
                <AnimatedHeading
                  as="h1"
                  accent
                  subtitle="Inspire STEM Girls Initiative · Nigeria"
                  subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
                  className="text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-left"
                >
                  Building Brighter Futures for Girls Through STEM
                </AnimatedHeading>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="text-lg xl:text-xl text-slate-700 leading-relaxed font-normal"
                >
                  Inspire STEM Girls Initiative expands access to science, technology, engineering and mathematics education for girls from underserved communities in Nigeria through mentorship, STEM exposure, educational support and hands-on learning.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="p-5 rounded-2xl bg-[#EFEFF0] border-l-4 border-[#2C0E40] shadow-xs"
                >
                  <p className="text-base font-semibold text-[#2C0E40] leading-snug">
                    Our long-term vision is to establish a tuition-free science/STEM school for girls from underserved communities in Nigeria.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="pt-2 flex items-center gap-4"
                >
                  <button
                    onClick={() => {
                      onNavigate('programs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold bg-[#2C0E40] text-white hover:bg-[#41175E] hover:text-[#FFBD59] shadow-lg shadow-purple-950/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <span>Explore Our Programs</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('donate');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold border-2 border-[#2C0E40] text-[#2C0E40] hover:bg-[#EFEFF0] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 text-[#FFBD59] fill-current" />
                    <span>Support Our Mission</span>
                  </button>
                </motion.div>

                <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 border-t border-[#EFEFF0]">
                  <span>Serving public schools & grassroots communities</span>
                  <span aria-hidden="true">·</span>
                  <span>Active across Nigeria</span>
                  <span aria-hidden="true">·</span>
                  <span>Aligned with UN SDG 4 & 5</span>
                </div>
              </div>

              {/* Right Column: Enlarged, Magnified Hero Image with Motion entrance */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-6 relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#150520] h-[520px] group">
                  <img
                    src={siteImages.hero}
                    alt="Young Nigerian school girls enthusiastically participating in hands-on STEM workshop"
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150520]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Caption tag */}
                  <div className="absolute bottom-14 left-5 right-5 text-white backdrop-blur-md bg-black/60 p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Hands-On STEM Discovery Workshop</p>
                      <p className="text-stone-300 text-xs mt-0.5">
                        Students assembling electronic circuits & programmable logic in Nigeria.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2C0E40] bg-[#FFBD59] px-2.5 py-1 rounded-md shadow-xs">
                      Lagos Cohort
                    </span>
                  </div>
                </div>

                {/* Floating Stat Badge with SmartCounter */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#EFEFF0] hidden sm:flex items-center gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#2C0E40] flex items-center justify-center text-[#FFBD59]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-[#2C0E40] leading-none">
                      <SmartCounter value="1,250+" />
                    </span>
                    <span className="text-xs font-bold text-slate-800">Girls Reached</span>
                    <span className="text-[11px] text-slate-500 block">Across 28 Communities</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. IMPACT SECTION (Numbers reading till total)                */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-[#150520] text-white relative border-y border-[#2C0E40]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Measurable Progress"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#FFBD59] block mb-1"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-left"
            >
              Our Impact
            </AnimatedHeading>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm text-[#EFEFF0]/80 max-w-md"
            >
              Every metric represents a girl given practical tools, a caring mentor, or an uninterrupted academic pathway in STEM.
            </motion.p>
          </div>

          {/* Mobile Carousel Controls for Numbers (Mobile only) */}
          <div className="flex sm:hidden items-center justify-between pb-3 pt-1">
            <span className="text-xs font-semibold text-[#FFBD59]">
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollContainerTo(impactNumbersScrollRef.current, impactNumbersIndex - 1, impactMetrics.slice(0, 5).length)}
                disabled={impactNumbersIndex === 0}
                aria-label="Previous metric"
                className="w-8 h-8 rounded-full border border-purple-800 bg-[#2C0E40] flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#41175E] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainerTo(impactNumbersScrollRef.current, impactNumbersIndex + 1, impactMetrics.slice(0, 5).length)}
                disabled={impactNumbersIndex >= impactMetrics.slice(0, 5).length - 1}
                aria-label="Next metric"
                className="w-8 h-8 rounded-full border border-purple-800 bg-[#2C0E40] flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#41175E] transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* DESKTOP GRID (sm and above: untouched) */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {impactMetrics.slice(0, 5).map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#2C0E40]/70 border border-[#41175E] rounded-2xl p-5 sm:p-6 hover:border-[#FFBD59] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Number reading up till total */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FFBD59] tracking-tight mb-2 min-h-[44px]">
                  <SmartCounter value={metric.value} />
                </div>
                <div className="text-sm sm:text-base font-semibold text-white mb-1 leading-snug">
                  {metric.label}
                </div>
                <div className="text-xs text-[#EFEFF0]/70 leading-relaxed">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE CAROUSEL FOR NUMBERS (Visible ONLY on mobile < sm) */}
          <div className="block sm:hidden">
            <div
              ref={impactNumbersScrollRef}
              onScroll={() => handleContainerScroll(impactNumbersScrollRef.current, setImpactNumbersIndex)}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3.5 pb-2 -mx-4 px-4"
            >
              {impactMetrics.slice(0, 5).map((metric) => (
                <div
                  key={metric.id}
                  className="w-[74vw] max-w-[260px] flex-shrink-0 snap-center p-5 rounded-2xl bg-[#2C0E40]/90 border border-[#41175E] shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="text-3xl font-extrabold text-[#FFBD59] tracking-tight mb-1.5">
                      <SmartCounter value={metric.value} />
                    </div>
                    <div className="text-sm font-semibold text-white mb-1 leading-snug">
                      {metric.label}
                    </div>
                  </div>
                  <div className="text-xs text-[#EFEFF0]/70 leading-relaxed pt-2 border-t border-[#41175E]/60">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Dots */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {impactMetrics.slice(0, 5).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollContainerTo(impactNumbersScrollRef.current, idx, 5)}
                  aria-label={`Go to metric ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    impactNumbersIndex === idx ? 'w-6 bg-[#FFBD59]' : 'w-2 bg-purple-900'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#2C0E40] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <button
              onClick={() => {
                onNavigate('impact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#FFBD59] hover:text-[#DCB132] font-semibold inline-flex items-center gap-1.5 transition-all hover:translate-x-1 cursor-pointer"
            >
              <span>View full impact data & stories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. WHAT WE DO SECTION                                          */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-14 gap-4">
            <div className="max-w-3xl">
              <AnimatedHeading
                as="h2"
                accent
                subtitle="Our Core Pillars"
                subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-2"
                className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-left"
              >
                Creating Pathways Into STEM
              </AnimatedHeading>
              {/* Desktop text */}
              <p className="hidden md:block mt-3 text-base sm:text-lg text-slate-600">
                We design holistic interventions that meet girls where they are—providing the exposure, guidance, resources, and community required to thrive in science and technology.
              </p>
              {/* Mobile text: reduced & concise */}
              <p className="block md:hidden mt-2 text-sm text-slate-600">
                Holistic interventions providing hands-on exposure, mentorship, and resources for girls across Nigeria.
              </p>
            </div>

            {/* Mobile Carousel Controls */}
            <div className="flex md:hidden items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-500">
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollContainerTo(pathwaysScrollRef.current, pathwaysIndex - 1, 4)}
                  disabled={pathwaysIndex === 0}
                  aria-label="Previous pathway"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollContainerTo(pathwaysScrollRef.current, pathwaysIndex + 1, 4)}
                  disabled={pathwaysIndex === 3}
                  aria-label="Next pathway"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP GRID (md and above: untouched 2x2 grid) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Area 1: STEM Education & Exposure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-6 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  STEM Education & Exposure
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We introduce girls to science, technology, engineering and mathematics through practical learning experiences, workshops and career exposure.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] flex items-center justify-between text-xs text-slate-500">
                <span>Hands-on kits · Electronics · Coding</span>
                <button
                  onClick={() => {
                    onNavigate('programs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>View workshops</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Area 2: Mentorship */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-6 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Mentorship
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We connect girls with professionals and role models who can guide, encourage and expand their understanding of what is possible in STEM.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] flex items-center justify-between text-xs text-slate-500">
                <span>1-on-1 Mentorship · Circle Sessions · Guidance</span>
                <button
                  onClick={() => {
                    onNavigate('get-involved');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Become a mentor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Area 3: Educational Access */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFBD59] text-[#2C0E40] flex items-center justify-center mb-6 shadow-sm font-bold">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Educational Access
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We help remove financial and social barriers that may prevent girls from accessing educational opportunities and progressing in their academic journey.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] flex items-center justify-between text-xs text-slate-500">
                <span>Exam sponsorships · Learning kits · Resources</span>
                <button
                  onClick={() => {
                    onNavigate('programs');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Access details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Area 4: School & Community Outreach */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-6 shadow-sm">
                  <School className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  School & Community Outreach
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                  We work directly with schools and underserved communities to bring STEM education and opportunities closer to the girls who need them most.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] flex items-center justify-between text-xs text-slate-500">
                <span>Public schools · Grassroots hubs · Science clubs</span>
                <button
                  onClick={() => {
                    onNavigate('partners');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
                >
                  <span>Partner with us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* MOBILE CAROUSEL (Visible ONLY on mobile / small devices < md) */}
          <div className="block md:hidden">
            <div
              ref={pathwaysScrollRef}
              onScroll={() => handleContainerScroll(pathwaysScrollRef.current, setPathwaysIndex)}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
            >
              {/* Card 1 */}
              <div className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/70 border border-[#E3E3E5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-4 shadow-xs">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    STEM Education & Exposure
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Practical robotics workshops, electronics, coding, and real-world science exposure for schoolgirls.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-[#E3E3E5] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Kits · Coding · Labs</span>
                  <button
                    onClick={() => {
                      onNavigate('programs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-[#2C0E40] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/70 border border-[#E3E3E5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-4 shadow-xs">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Mentorship
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Pairing girls with female scientists, tech leads, and role models who champion their dreams.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-[#E3E3E5] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">1-on-1 · Circles</span>
                  <button
                    onClick={() => {
                      onNavigate('get-involved');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-[#2C0E40] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 3 */}
              <div className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/70 border border-[#E3E3E5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FFBD59] text-[#2C0E40] flex items-center justify-center mb-4 shadow-xs font-bold">
                    <KeyRound className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Educational Access
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Removing financial hurdles with exam sponsorships, learning kits, and school supplies.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-[#E3E3E5] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Sponsorships · Kits</span>
                  <button
                    onClick={() => {
                      onNavigate('programs');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-[#2C0E40] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Card 4 */}
              <div className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center p-6 rounded-2xl bg-[#EFEFF0]/70 border border-[#E3E3E5] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mb-4 shadow-xs">
                    <School className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    School & Community Outreach
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Bringing STEM workshops directly to public schools and grassroots community hubs.
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-[#E3E3E5] flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">Schools · Hubs</span>
                  <button
                    onClick={() => {
                      onNavigate('partners');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-bold text-[#2C0E40] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Partner</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Dots */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollContainerTo(pathwaysScrollRef.current, idx, 4)}
                  aria-label={`Go to pillar ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    pathwaysIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PHOTO SHOWCASE: OUR GIRLS IN ACTION                         */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-[#EFEFF0]/60 border-y border-[#E3E3E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <AnimatedHeading
                as="h2"
                accent
                subtitle="Field Visuals"
                subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-left"
              >
                Our Girls in Action Across Nigeria
              </AnimatedHeading>
            </div>

            {/* Desktop link button */}
            <button
              onClick={() => {
                onNavigate('programs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex text-xs font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 items-center gap-1 transition-all cursor-pointer"
            >
              <span>Explore all program photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Controls */}
            <div className="flex sm:hidden items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-500">
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scrollContainerTo(girlsActionScrollRef.current, girlsActionIndex - 1, 4)}
                  disabled={girlsActionIndex === 0}
                  aria-label="Previous photo"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollContainerTo(girlsActionScrollRef.current, girlsActionIndex + 1, 4)}
                  disabled={girlsActionIndex === 3}
                  aria-label="Next photo"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* DESKTOP PHOTO GRID (sm and above: untouched 4-column grid) */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                img: siteImages.galleryRobotics,
                label: 'Robotics Lab',
                caption: 'Assembling automated sensor kits',
              },
              {
                img: siteImages.galleryChemistry,
                label: 'Practical Science',
                caption: 'Mobile chemistry demonstration',
              },
              {
                img: siteImages.mentorship,
                label: 'Mentorship Circles',
                caption: 'Direct guidance from women in tech',
              },
              {
                img: siteImages.galleryCelebration,
                label: 'Cohort Graduation',
                caption: 'Celebrating STEM certifications',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-md bg-white border border-[#E3E3E5] relative aspect-[4/3]"
              >
                <img
                  src={item.img}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#150520]/85 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold text-[#FFBD59] uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <p className="text-xs font-semibold mt-0.5">{item.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE PHOTO CAROUSEL (Visible ONLY on mobile screens < sm) */}
          <div className="block sm:hidden">
            <div
              ref={girlsActionScrollRef}
              onScroll={() => handleContainerScroll(girlsActionScrollRef.current, setGirlsActionIndex)}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
            >
              {[
                {
                  img: siteImages.galleryRobotics,
                  label: 'Robotics Lab',
                  caption: 'Assembling automated sensor kits',
                },
                {
                  img: siteImages.galleryChemistry,
                  label: 'Practical Science',
                  caption: 'Mobile chemistry demonstration',
                },
                {
                  img: siteImages.mentorship,
                  label: 'Mentorship Circles',
                  caption: 'Direct guidance from women in tech',
                },
                {
                  img: siteImages.galleryCelebration,
                  label: 'Cohort Graduation',
                  caption: 'Celebrating STEM certifications',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="w-[82vw] max-w-[300px] flex-shrink-0 snap-center rounded-2xl overflow-hidden shadow-md bg-white border border-[#E3E3E5] relative aspect-[4/3]"
                >
                  <img
                    src={item.img}
                    alt={item.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150520]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-[#FFBD59] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <p className="text-xs font-semibold mt-0.5">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Dots */}
            <div className="flex items-center justify-center gap-2 pt-3">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => scrollContainerTo(girlsActionScrollRef.current, idx, 4)}
                  aria-label={`Go to photo ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    girlsActionIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. OUR VISION SECTION (Animated heading with image)            */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-[#2C0E40] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <AnimatedHeading
                as="h2"
                accent
                subtitle="Our Vision"
                subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFBD59]"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight text-left"
              >
                The Future We Are Building
              </AnimatedHeading>

              <div className="space-y-4 text-base sm:text-lg text-[#EFEFF0]/90 leading-relaxed font-normal">
                <p>
                  Our vision extends beyond individual programs.
                </p>
                <p>
                  We are working toward a future where a girl&rsquo;s socioeconomic background does not determine the quality of education or opportunities available to her.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('vision');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold bg-[#FFBD59] hover:bg-[#DCB132] text-[#2C0E40] transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                  <span>Learn About Our Vision</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Architectural Concept Visual with AnimatedImage */}
            <div className="lg:col-span-5">
              <AnimatedImage
                src={siteImages.schoolVision}
                alt="Architectural concept of the future tuition-free ISG Science School for Girls in Nigeria"
                containerClassName="rounded-3xl border border-[#41175E] shadow-2xl bg-[#150520] h-80"
                className="w-full h-80 object-cover object-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#150520]/95 via-[#150520]/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-[11px] text-[#FFBD59] uppercase tracking-wider font-semibold">
                    <span>Future Campus Concept</span>
                    <span aria-hidden="true">·</span>
                    <span>Long-Term Goal</span>
                  </div>
                  <p className="text-sm font-semibold mt-1">
                    ISG Tuition-Free Science & Technology Academy for Girls
                  </p>
                  <p className="text-xs text-stone-300 mt-1">
                    Laboratories, robotics maker-spaces, and digital discovery centers.
                  </p>
                </div>
              </AnimatedImage>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. FEATURED PROGRAMS PREVIEW                                   */}
      {/* ============================================================== */}
      <section className="py-20 sm:py-24 bg-[#EFEFF0]/40 border-b border-[#E3E3E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Real Action on the Ground"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-left"
            >
              Featured Programs in Action
            </AnimatedHeading>
            <button
              onClick={() => {
                onNavigate('programs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-bold text-[#2C0E40] hover:text-[#41175E] inline-flex items-center gap-1 self-start md:self-auto hover:translate-x-1 transition-all cursor-pointer"
            >
              <span>Explore all programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programsData.slice(0, 3).map((program, idx) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E3E3E5] hover:border-[#2C0E40]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden relative group">
                    <img
                      src={program.image}
                      alt={program.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2C0E40] text-[#FFBD59] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                      {program.categoryLabel}
                    </div>
                    {program.images && program.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                        <Camera className="w-3 h-3 text-[#FFBD59]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-slate-500 mb-2 flex items-center gap-2">
                      <span>{program.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{program.location}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                      {program.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {program.shortDescription}
                    </p>
                    <div className="text-xs font-bold text-[#2C0E40] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2C0E40]" />
                      <span>
                        <SmartCounter value={`${program.girlsReached}`} /> girls reached in this cohort
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#EFEFF0] flex items-center justify-between">
                  <button
                    onClick={() => onSelectProgram(program)}
                    className="text-xs font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <span>View Photo Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-500 font-medium">
                    {program.ageGroup.split('(')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 7. LIVE SOCIAL COMMUNITY FEED (Instagram & LinkedIn Updates)   */}
      {/* ============================================================== */}
      <SocialFeedSection onNavigate={onNavigate} />

      {/* ============================================================== */}
      {/* 8. IMPACT TESTIMONIAL PREVIEW                                  */}
      {/* ============================================================== */}
      <section className="py-20 bg-[#EFEFF0] border-t border-[#E3E3E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40]">
              Voices From Our Programs
            </span>
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif-display text-slate-900 leading-snug">
              &ldquo;{impactStories[0].quote}&rdquo;
            </blockquote>
            <div className="text-sm">
              <span className="font-bold text-slate-900">{impactStories[0].studentName}</span>
              <span className="text-slate-500"> · {impactStories[0].school}, {impactStories[0].location}</span>
            </div>
            <div className="pt-2">
              <button
                onClick={() => {
                  onNavigate('impact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-xs font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
              >
                <span>Read more participant impact stories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 9. CALL TO ACTION                                              */}
      {/* ============================================================== */}
      <section className="py-20 bg-[#2C0E40] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
          >
            Join Us in Expanding STEM Opportunities for Girls
          </motion.h2>
          <p className="text-base sm:text-lg text-[#EFEFF0]/90 max-w-2xl mx-auto leading-relaxed">
            Whether as a corporate partner, mentor, school collaborator, or philanthropic supporter, your involvement directly impacts a girl’s academic and professional trajectory.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                onNavigate('donate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#FFBD59] hover:bg-[#DCB132] text-[#2C0E40] transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Support Our Mission
            </button>
            <button
              onClick={() => {
                onNavigate('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#41175E] hover:bg-[#58247C] text-white border border-[#FFBD59]/40 hover:border-[#FFBD59] transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
            >
              Get Involved as a Partner or Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
