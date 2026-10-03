import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { siteImages } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import { SmartCounter } from '../CountUp';
import {
  School,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Compass,
  Building,
  Cpu,
  Microscope,
  BookOpen,
  Heart,
} from 'lucide-react';

interface VisionPageProps {
  onNavigate: (page: PageId) => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* Header Banner with Animated H1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Our Institutional Horizon"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] text-left"
          >
            Our Vision for the Future
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 leading-relaxed font-normal"
          >
            Building durable educational infrastructure that ensures an underserved girl&rsquo;s potential in science, technology, and engineering is fully realized.
          </motion.p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. MAIN VISION HERO & EXACT COPY (Animated heading + image)    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Transparency / Long-term vision disclosure note in brand palette */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-[#FBF2D5] border border-[#F0C747] flex items-start gap-3.5 text-xs text-[#2C0E40]">
          <ShieldAlert className="w-5 h-5 text-[#2C0E40] flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-bold block mb-0.5 text-slate-900">A Strategic Long-Term Institutional Vision:</strong>
            The ISG Science School is our long-term institutional goal currently in strategic research and feasibility development. The school is not yet currently operational; all of our active grassroots outreach, mentorship, and educational access initiatives build the empirical foundation and community trust for this future campus.
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Flagship Institutional Goal"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
            >
              Building a Tuition-Free Science School for Girls
            </AnimatedHeading>

            {/* Exact Copy */}
            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              <p className="font-medium text-slate-900">
                Our long-term vision is to establish a tuition-free science/STEM school in Nigeria for girls from underserved communities.
              </p>
              <p>
                We envision a school where financial circumstances do not determine access to excellent education.
              </p>
              <p>
                The future ISG Science School will aim to provide girls with access to quality science education, modern laboratories, technology, mentorship, innovation opportunities and pathways into higher education and STEM careers.
              </p>
              <div className="p-4 rounded-xl bg-[#EFEFF0] border-l-4 border-[#2C0E40]">
                <p className="text-sm sm:text-base font-semibold text-[#2C0E40]">
                  Our current programs in mentorship, educational access, STEM exposure and school outreach are building the foundation for this long-term vision.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => {
                  onNavigate('donate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] transition-all shadow-md hover:shadow-lg hover:shadow-purple-950/20 hover:-translate-y-0.5 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#F0C747] fill-current" />
                <span>Support ISG Science School Fund</span>
              </button>
              <button
                onClick={() => {
                  onNavigate('get-involved');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold border border-[#2C0E40]/30 text-[#2C0E40] hover:bg-[#EFEFF0] transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Partner on Campus Planning</span>
              </button>
            </div>
          </motion.div>

          {/* Architectural Rendering with Motion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#41175E] bg-[#150520] group">
              <img
                src={siteImages.schoolVision}
                alt="Architectural vision concept for the future ISG tuition-free Science & STEM school for girls in Nigeria"
                loading="lazy"
                decoding="async"
                className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 bg-[#150520] text-white border-t border-[#41175E]">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F0C747] block mb-1">
                  Architectural Campus Concept
                </span>
                <h4 className="text-base font-bold text-white">
                  Sustainable STEM Learning Environment
                </h4>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  Envisioned with dedicated biology, chemistry, and physics labs, robotics maker hubs, solar-powered infrastructure, and student collaborative study courtyards.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. THE THREE HORIZONS ROADMAP                                  */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFEFF0]/40 rounded-3xl p-8 sm:p-12 border border-[#E3E3E5]">
          <div className="max-w-3xl mb-12">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Structured Strategic Trajectory"
              subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
              className="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
            >
              The Three Horizons: From Grassroots to Campus
            </AnimatedHeading>
            <p className="text-sm text-slate-600 mt-2">
              Our clear, phased roadmap ensuring grassroots community delivery directly enables long-term institutional permanence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1: Active Now */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="p-8 rounded-3xl bg-white border border-[#E3E3E5] shadow-xs flex flex-col justify-between hover:border-[#2C0E40]/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C0E40] text-[#F0C747] text-xs font-bold mb-4 shadow-xs">
                  Active Now
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Phase 1: Foundation
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Delivering hands-on workshops, school mobile labs, and mentorship across underserved communities.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C0E40] mt-1.5 flex-shrink-0" />
                    <span>Reaching 1,250+ girls across 28 communities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C0E40] mt-1.5 flex-shrink-0" />
                    <span>65+ active female professional STEM mentors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2C0E40] mt-1.5 flex-shrink-0" />
                    <span>Full exam sponsorships & resource kits</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] text-xs font-semibold text-[#2C0E40]">
                Status: Operational & Scaling
              </div>
            </motion.div>

            {/* Step 2: Intermediate Expansion */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-3xl bg-white border border-[#E3E3E5] shadow-xs flex flex-col justify-between hover:border-[#2C0E40]/30 hover:shadow-md transition-all"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFEFF0] text-[#2C0E40] text-xs font-bold mb-4 border border-[#2C0E40]/20">
                  Phase 2: Scale
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Expansion & Feasibility
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Formalizing university pathway alliances, establishing regional STEM resource centers, and securing campus endowment reserves.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0C747] mt-1.5 flex-shrink-0" />
                    <span>Establishing 5 regional mobile laboratory clusters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0C747] mt-1.5 flex-shrink-0" />
                    <span>Deepening corporate and international donor alliances</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F0C747] mt-1.5 flex-shrink-0" />
                    <span>Commencing campus land acquisition and architectural design studies</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E3E3E5] text-xs text-slate-500">
                Target: 10,000+ girls reached & institutional readiness
              </div>
            </motion.div>

            {/* Step 3: Future */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="p-8 rounded-3xl bg-[#2C0E40] text-white border border-[#41175E] shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0C747] text-[#2C0E40] text-xs font-bold mb-4 shadow-sm">
                  Ultimate Milestone
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Future
                </h3>
                <p className="text-[#F0C747] font-semibold text-base mb-4 leading-snug">
                  Establish a tuition-free science/STEM school for girls from underserved communities in Nigeria.
                </p>
                <ul className="space-y-2 text-xs text-stone-200">
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#F0C747] flex-shrink-0 mt-0.5" />
                    <span>Full-tuition scholarships for all admitted students</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#F0C747] flex-shrink-0 mt-0.5" />
                    <span>Advanced physics, chemistry, biology & computer labs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-[#F0C747] flex-shrink-0 mt-0.5" />
                    <span>Direct university & international scholarship articulation</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#41175E] text-xs text-[#F0C747] font-semibold">
                Pioneering tuition-free excellence in West Africa
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Planned Campus Facilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1">
            Envisioned Academic Pillars
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            What the ISG Science School Will Provide
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Designed from the ground up to nurture future scientists, engineers, data leaders, and healthcare innovators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Microscope,
              title: 'Advanced Wet & Dry Labs',
              desc: 'Equipped with modern microscopes, chemistry stations, and experimental apparatus so every lesson is empirical.',
            },
            {
              icon: Cpu,
              title: 'Computing & Robotics Studio',
              desc: 'High-speed connectivity, micro-controllers, software development suites, and automation workstations.',
            },
            {
              icon: BookOpen,
              title: 'Digital Resource Library',
              desc: 'Open-access scientific journals, global textbooks, and personalized self-paced learning software.',
            },
            {
              icon: School,
              title: 'Holistic Pastoral Care',
              desc: 'Safe residential boarding, nutrition, mental wellness support, and leadership development.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 rounded-3xl border border-[#E3E3E5] bg-[#EFEFF0]/40 hover:border-[#2C0E40]/30 hover:bg-[#EFEFF0] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mb-4 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Support the Vision Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#2C0E40] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F0C747] block mb-1">
              Founding Capital Campaign
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Join the ISG Science School Pioneer Circle
            </h3>
            <p className="text-[#EFEFF0]/85 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              We are seeking forward-thinking philanthropists, foundations, and corporate visionaries to join our advisory planning committee and support early campus feasibility.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('donate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-7 py-4 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all flex-shrink-0 shadow-lg hover:shadow-amber-500/25 hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            Contribute to the School Fund
          </button>
        </motion.div>
      </section>
    </div>
  );
};
