import React from 'react';
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
  return (
    <div className="space-y-0 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* ============================================================== */}
      {/* 1. HERO SECTION                                                */}
      {/* Mobile: Full background image with text overlay                */}
      {/* Desktop: Big, expansive hero photography with rich layout      */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden border-b border-[#EFEFF0]">
        {/* MOBILE BACKGROUND HERO (Visible on mobile / tablet < lg) */}
        <div className="block lg:hidden relative min-h-[580px] sm:min-h-[640px] flex items-center">
          <motion.img
            initial={{ scale: 1.08, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            src={siteImages.hero}
            alt="Young Nigerian school girls enthusiastically participating in hands-on STEM workshop"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Rich dark gradient overlay for crystal-clear readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#150520] via-[#150520]/85 to-[#2C0E40]/60" />

          {/* Mobile Text Overlay with Animated H1 */}
          <div className="relative z-10 px-5 sm:px-8 py-16 text-white space-y-5">
            <AnimatedHeading
              as="h1"
              accent
              subtitle="Inspire STEM Girls Initiative · Nigeria"
              subtitleClassName="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C0E40]/60 backdrop-blur-md text-[#F0C747] text-xs font-semibold uppercase tracking-wider border border-[#F0C747]/40"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md text-left"
            >
              Building Brighter Futures for Girls Through STEM
            </AnimatedHeading>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal"
            >
              Inspire STEM Girls Initiative expands access to science, technology, engineering and mathematics education for girls from underserved communities in Nigeria through mentorship, STEM exposure, educational support and hands-on learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="p-4 rounded-xl bg-[#2C0E40]/90 border-l-4 border-[#F0C747] backdrop-blur-md"
            >
              <p className="text-xs sm:text-sm font-semibold text-[#F0C747] leading-snug">
                Our long-term vision is to establish a tuition-free science/STEM school for girls from underserved communities in Nigeria.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="pt-2 flex flex-col sm:flex-row gap-3"
            >
              <button
                onClick={() => {
                  onNavigate('programs');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Explore Our Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onNavigate('donate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/30 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#F0C747] fill-current" />
                <span>Support Our Mission</span>
              </button>
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
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold bg-[#2C0E40] text-white hover:bg-[#41175E] hover:text-[#F0C747] shadow-lg shadow-purple-950/20 hover:shadow-xl hover:-translate-y-1 active:scale-95 transition-all duration-200 cursor-pointer"
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
                    <Heart className="w-4 h-4 text-[#F0C747] fill-current" />
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
                  <div className="absolute bottom-5 left-5 right-5 text-white backdrop-blur-md bg-black/60 p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Hands-On STEM Discovery Workshop</p>
                      <p className="text-stone-300 text-xs mt-0.5">
                        Students assembling electronic circuits & programmable logic in Nigeria.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#2C0E40] bg-[#F0C747] px-2.5 py-1 rounded-md shadow-xs">
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
                  <div className="w-12 h-12 rounded-xl bg-[#2C0E40] flex items-center justify-center text-[#F0C747]">
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
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#F0C747] block mb-1"
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
              Every metric represents an underserved girl given practical tools, a caring mentor, or an uninterrupted academic pathway in STEM.
            </motion.p>
          </div>

          {/* Cards for Girls Reached, Girls Mentored, Schools/Communities Reached, STEM Mentors, Programs Delivered */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {impactMetrics.slice(0, 5).map((metric, idx) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-[#2C0E40]/70 border border-[#41175E] rounded-2xl p-5 sm:p-6 hover:border-[#F0C747] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Number reading up till total */}
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F0C747] tracking-tight mb-2 min-h-[44px]">
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

          <div className="mt-8 pt-6 border-t border-[#2C0E40] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            <span>* Figures actively updated as community cohorts and school cycles conclude.</span>
            <button
              onClick={() => {
                onNavigate('impact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#F0C747] hover:text-[#DCB132] font-semibold inline-flex items-center gap-1.5 transition-all hover:translate-x-1 cursor-pointer"
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
      <section className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Our Core Pillars"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-2"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight text-left"
            >
              Creating Pathways Into STEM
            </AnimatedHeading>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              We design holistic interventions that meet girls where they are—providing the exposure, guidance, resources, and community required to thrive in science and technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Area 1: STEM Education & Exposure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:bg-[#EFEFF0] hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mb-6 shadow-sm">
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
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mb-6 shadow-sm">
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
                <div className="w-12 h-12 rounded-2xl bg-[#F0C747] text-[#2C0E40] flex items-center justify-center mb-6 shadow-sm font-bold">
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
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mb-6 shadow-sm">
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
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. PHOTO SHOWCASE: OUR GIRLS IN ACTION                         */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-[#EFEFF0]/60 border-y border-[#E3E3E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Field Visuals"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-left"
            >
              Our Girls in Action Across Nigeria
            </AnimatedHeading>
            <button
              onClick={() => {
                onNavigate('programs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#2C0E40] hover:text-[#41175E] hover:translate-x-1 inline-flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>Explore all program photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                  <span className="text-[10px] font-bold text-[#F0C747] uppercase tracking-wider block">
                    {item.label}
                  </span>
                  <p className="text-xs font-semibold mt-0.5">{item.caption}</p>
                </div>
              </motion.div>
            ))}
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
                subtitle="Our Strategic Roadmap"
                subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F0C747]"
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
                <p className="text-white font-medium bg-[#1E082C] p-4 rounded-xl border border-[#41175E]">
                  Our long-term goal is to establish a <strong className="text-[#F0C747] font-bold">tuition-free science/STEM school in Nigeria for girls from underserved communities</strong>, providing access to quality education, laboratories, technology, mentorship, innovation and pathways into STEM careers.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('vision');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all shadow-lg hover:shadow-amber-500/30 hover:-translate-y-1 active:scale-95 cursor-pointer"
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
                  <div className="flex items-center gap-2 text-[11px] text-[#F0C747] uppercase tracking-wider font-semibold">
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
                    <div className="absolute top-3 left-3 bg-[#2C0E40] text-[#F0C747] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                      {program.categoryLabel}
                    </div>
                    {program.images && program.images.length > 1 && (
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-medium flex items-center gap-1">
                        <Camera className="w-3 h-3 text-[#F0C747]" />
                        <span>{program.images.length} Photos</span>
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
                    <span>View Photo Dossier ({program.images?.length || 1} Images)</span>
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
      {/* 8. SDG SECTION                                                 */}
      {/* ============================================================== */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Global Alignment & Credibility"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-left"
            >
              Our Work and the Sustainable Development Goals
            </AnimatedHeading>
            <p className="text-sm text-slate-600 mt-2">
              Inspire STEM Girls Initiative aligns its programmatic targets with the United Nations 2030 Agenda for Sustainable Development, focusing on systemic educational equity and gender inclusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SDG 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-6 sm:p-8 rounded-2xl border-2 border-red-100 bg-red-50/30 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#c5192d] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      SDG 4 – Quality Education
                    </h3>
                    <span className="text-xs text-slate-500">United Nations Sustainable Development Goal</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  We work to increase access to quality education and STEM learning opportunities for underserved girls.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5192d] mt-1.5 flex-shrink-0" />
                    <span>Hands-on practical laboratory science and computing workshops for under-resourced public schools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c5192d] mt-1.5 flex-shrink-0" />
                    <span>Removing financial barriers to examination registration fees and STEM textbooks.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* SDG 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border-2 border-orange-100 bg-orange-50/30 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#ff3a21] text-white flex items-center justify-center font-bold text-xl shadow-xs">
                    5
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      SDG 5 – Gender Equality
                    </h3>
                    <span className="text-xs text-slate-500">United Nations Sustainable Development Goal</span>
                  </div>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  We support girls in accessing opportunities and pathways in fields where women remain underrepresented.
                </p>
                <ul className="mt-4 space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3a21] mt-1.5 flex-shrink-0" />
                    <span>Demystifying STEM careers through female professional role models and 1-on-1 mentorship.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3a21] mt-1.5 flex-shrink-0" />
                    <span>Empowering girls to become technical problem solvers and leaders in their communities.</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all duration-200 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              Support Our Mission
            </button>
            <button
              onClick={() => {
                onNavigate('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#41175E] hover:bg-[#58247C] text-white border border-[#F0C747]/40 hover:border-[#F0C747] transition-all duration-200 hover:-translate-y-1 hover:shadow-md active:scale-95 cursor-pointer"
            >
              Get Involved as a Partner or Mentor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
