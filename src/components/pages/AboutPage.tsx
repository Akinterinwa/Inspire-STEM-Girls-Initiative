import React from 'react';
import { motion } from 'motion/react';
import { PageId } from '../../types';
import { siteImages } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import {
  Compass,
  Target,
  Sparkles,
  School,
  ArrowRight,
  Heart,
  Linkedin,
  Mail,
  CheckCircle2,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20">
      {/* Top Banner / Breadcrumb with Animated H1 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="About Inspire STEM Girls Initiative"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0e4b3c]"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Expanding STEM Access & Unlocking Potential in Nigeria
          </AnimatedHeading>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-lg text-slate-600 leading-relaxed font-normal"
          >
            Founded on the conviction that socioeconomic background should never dictate a girl’s educational future, we are systematically bridging the divide in STEM education across Nigeria.
          </motion.p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. WHO WE ARE (Animated heading and photography)               */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              subtitle="Our Identity"
              subtitleClassName="text-xs font-semibold uppercase tracking-wider text-emerald-800 block mb-1"
              className="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
            >
              Who We Are
            </AnimatedHeading>

            <div className="p-5 rounded-2xl bg-stone-50 border-l-4 border-[#0e4b3c] text-slate-800 font-medium text-base sm:text-lg leading-relaxed shadow-xs">
              Inspire STEM Girls Initiative is a nonprofit organization committed to expanding access to STEM education and opportunities for girls from underserved communities in Nigeria.
            </div>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Through mentorship, educational support, STEM programs and community outreach, we help girls develop the skills, confidence, exposure and support they need to pursue futures in science and technology.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <span className="text-xs font-bold text-slate-900 block mb-1">Hands-On & Practical</span>
                <span className="text-xs text-slate-600">Bringing real scientific equipment and coding out of theory into concrete physical creation.</span>
              </div>
              <div className="p-4 rounded-xl border border-stone-200 bg-white">
                <span className="text-xs font-bold text-slate-900 block mb-1">Rooted in Underserved Communities</span>
                <span className="text-xs text-slate-600">Reaching girls in public secondary schools and grassroots neighborhoods where resources are scarcest.</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-3xl overflow-hidden shadow-xl border border-stone-200 aspect-[4/3] group relative">
              <img
                src={siteImages.mentorship}
                alt="Mentorship session connecting female STEM mentors with Nigerian students"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                <span className="font-bold text-amber-300 block text-[10px] uppercase">Mentorship in Action</span>
                <span>Female software engineers & scientists mentoring Nigerian secondary students</span>
              </div>
            </div>

            {/* Additional photo pair */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] relative group">
                <img
                  src={siteImages.galleryRobotics}
                  alt="Students assembling robotics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold">
                  Practical Robotics
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-sm aspect-[4/3] relative group">
                <img
                  src={siteImages.galleryChemistry}
                  alt="Girls conducting chemistry experiment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40" />
                <span className="absolute bottom-2 left-2 right-2 text-white text-[10px] font-bold">
                  Experimental Science
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. CORE STATEMENT (Belief banner)                              */}
      {/* ============================================================== */}
      <section className="bg-stone-900 text-white py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Our Foundational Belief
          </span>
          <p className="text-2xl sm:text-3xl font-serif-display text-stone-100 leading-snug">
            &ldquo;We believe talent is everywhere, but access and opportunity are not. A girl&rsquo;s potential should never be limited by her gender or socioeconomic background.&rdquo;
          </p>
          <p className="text-xs text-stone-400 max-w-xl mx-auto pt-2">
            We reject the idea that girls need to prove their innate intelligence; our mandate is removing the structural, financial, and institutional barriers that stand between talented young women and their ambitions.
          </p>
        </motion.div>
      </section>

      {/* ============================================================== */}
      {/* 3. MISSION, VISION & LONG-TERM VISION                          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0e4b3c] flex items-center justify-center mb-6 shadow-xs">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
                Our Purpose
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Our Mission
              </h3>
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                To expand access to STEM education, mentorship and opportunity for girls from underserved communities in Nigeria, empowering them to pursue education and careers in science, technology, engineering and mathematics.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-slate-500">
              Guidance · Practical Skills · Academic Support
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-3xl bg-stone-50 border border-stone-200 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#0e4b3c] flex items-center justify-center mb-6 shadow-xs">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
                Our Horizon
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Our Vision
              </h3>
              <p className="text-slate-700 font-medium text-sm sm:text-base leading-relaxed">
                A future where every girl, regardless of socioeconomic background, has access to quality STEM education and the opportunity to reach her full potential.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-stone-200 text-xs text-slate-500">
              Inclusivity · Equal Opportunity · Excellence
            </div>
          </motion.div>

          {/* Long-Term Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-3xl bg-emerald-950 text-white border border-emerald-900 flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-6 shadow-md">
                <School className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 block mb-1">
                Institutional Horizon
              </span>
              <h3 className="text-xl font-bold text-white mb-3">
                Our Long-Term Vision
              </h3>
              <p className="text-emerald-100 font-medium text-sm sm:text-base leading-relaxed">
                To establish a tuition-free science/STEM school for girls from underserved communities in Nigeria.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-800 text-xs text-emerald-300 flex items-center justify-between">
              <span>Future ISG Science School</span>
              <button
                onClick={() => {
                  onNavigate('vision');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-amber-300 hover:text-white font-bold inline-flex items-center gap-1"
              >
                <span>Explore roadmap →</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. OUR STORY / FOUNDER SECTION (Animated with Portrait)        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xs">
          <div className="max-w-3xl mb-10">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Leadership & Origins"
              subtitleClassName="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1"
              className="text-3xl sm:text-4xl font-bold text-slate-900 text-left"
            >
              Our Founder
            </AnimatedHeading>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Founder Photograph space with AnimatedImage */}
            <div className="lg:col-span-5">
              <AnimatedImage
                src={siteImages.founder}
                alt="Oluwaseyi Adelusi - Founder & Executive Director of Inspire STEM Girls Initiative"
                containerClassName="rounded-3xl shadow-lg border border-stone-300/80 bg-white"
                className="w-full aspect-[4/5] object-cover object-top"
              >
                <div className="p-4 bg-white border-t border-stone-200">
                  <p className="font-bold text-slate-900 text-base">Oluwaseyi Adelusi</p>
                  <p className="text-xs text-emerald-800 font-semibold">Founder & Executive Director</p>
                  <p className="text-[11px] text-slate-500 mt-1">Software Engineer · STEM Education Advocate</p>
                </div>
              </AnimatedImage>
            </div>

            {/* Founder Biography & Exact Copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="border-b border-stone-200 pb-4">
                <h3 className="text-2xl font-bold text-slate-900">
                  Oluwaseyi Adelusi
                </h3>
                <p className="text-sm font-semibold text-emerald-800">
                  Founder & Executive Director
                </p>
              </div>

              {/* Exact Copy Requested */}
              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <p>
                  Oluwaseyi Adelusi is a software engineer and the Founder and Executive Director of Inspire STEM Girls Initiative.
                </p>
                <p>
                  Her experience in technology and passion for education inspired her to create an organization focused on increasing access to STEM opportunities for girls who may otherwise lack the exposure, resources and support needed to pursue STEM pathways.
                </p>
                <div className="p-4 rounded-xl bg-white border-l-4 border-amber-500 shadow-xs">
                  <p className="text-sm sm:text-base font-medium text-slate-900">
                    Her long-term vision is to build a tuition-free science/STEM school in Nigeria where girls from underserved communities can access quality education regardless of their financial circumstances.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <button
                  onClick={() => {
                    onNavigate('team');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#0e4b3c] text-white hover:bg-[#155e4b] transition-all shadow-sm active:scale-95"
                >
                  <span>Meet Our Leadership Team</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href="mailto:contact@inspirestemgirls.org"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-stone-300 text-slate-700 hover:bg-stone-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Contact Executive Office</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#0e4b3c] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div>
            <h3 className="text-2xl font-bold">Collaborate With Our Organization</h3>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              We welcome partnerships with educational boards, corporate organizations, foundations, and individuals committed to STEM equity.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl text-sm font-bold bg-white text-[#0e4b3c] hover:bg-stone-100 transition-all shadow-sm active:scale-95"
            >
              Partner With Us
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};
