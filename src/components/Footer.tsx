import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Heart,
  ArrowUpRight,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  Send,
  CheckCircle2,
  Twitter,
  Linkedin,
  Instagram,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Mission Statement Banner in Footer */}
        <div className="bg-stone-800/80 rounded-3xl p-6 sm:p-8 mb-12 border border-stone-700/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
              Our Guiding Conviction
            </span>
            <p className="text-lg sm:text-xl text-stone-100 font-serif-display mt-2 leading-relaxed">
              &ldquo;We believe talent is everywhere, but access and opportunity are not. A girl&rsquo;s potential should never be limited by her gender or socioeconomic background.&rdquo;
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('donate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm active:scale-95"
            >
              <Heart className="w-4 h-4 fill-current text-amber-300" />
              <span>Invest in Her Future</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* NEWSLETTER SUBSCRIPTION FORM                                   */}
        {/* ============================================================== */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-stone-850 to-stone-900 rounded-3xl p-6 sm:p-10 mb-14 border border-emerald-900/60 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>Stay Informed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Subscribe to Our Newsletter & Updates
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed max-w-xl">
                Receive our quarterly impact briefs, inspirational student stories, upcoming school workshop schedules, and major milestones toward our future tuition-free science school.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-5 rounded-2xl bg-emerald-900/60 border border-emerald-500/50 flex items-center gap-4 text-emerald-100 animate-in fade-in duration-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0 font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Thank You for Subscribing!</h4>
                    <p className="text-xs text-emerald-200 mt-0.5">
                      You are now subscribed with <strong className="text-white">{email}</strong>. We look forward to keeping you updated on our girls&rsquo; journey.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-stone-800 border border-stone-700 text-white placeholder-stone-400 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-md active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Subscribe</span>
                    </button>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    We value your privacy. We never share your email. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* FOOTER DIRECTORY & SDG GRID                                    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-stone-800">
          {/* Column 1: Organization Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold font-serif-display text-lg shadow-md">
                ISG
              </div>
              <div>
                <span className="block text-base font-bold text-white tracking-tight">
                  Inspire STEM Girls Initiative
                </span>
                <span className="block text-xs text-stone-400">
                  Nonprofit Organization · Nigeria
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-md font-normal">
              Inspire STEM Girls Initiative expands access to STEM education, mentorship, and educational opportunities for girls from underserved communities in Nigeria, with the long-term vision of establishing a tuition-free science/STEM school.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Headquartered in Lagos, Nigeria · Operations across Southwest & beyond</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <a href="mailto:contact@inspirestemgirls.org" className="hover:text-white transition-colors">
                  contact@inspirestemgirls.org
                </a>
              </div>
            </div>

            {/* Social Media Presence */}
            <div className="pt-4 border-t border-stone-800">
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://twitter.com/inspirestemgirls"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on Twitter / X"
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[#1DA1F2]/20 border border-stone-700 hover:border-[#1DA1F2]/50 text-stone-400 hover:text-[#1DA1F2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  title="Follow us on Twitter / X (@inspirestemgirls)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/inspire-stem-girls-initiative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on LinkedIn"
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[#0A66C2]/20 border border-stone-700 hover:border-[#0A66C2]/50 text-stone-400 hover:text-[#0A66C2] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/inspirestemgirls"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on Instagram"
                  className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-[#E4405F]/20 border border-stone-700 hover:border-[#E4405F]/50 text-stone-400 hover:text-[#E4405F] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  title="Follow us on Instagram (@inspirestemgirls)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('programs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Programs & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('vision'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Our Vision</span>
                  <span className="text-[10px] text-amber-400 font-medium">Science School</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Organization & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Our Team & Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Board & Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Partners & Collaborators
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Reports & Publications
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('get-involved'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-400 hover:text-white transition-colors"
                >
                  Get Involved (Mentor/Volunteer)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Goals Alignment */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-200 mb-4">
              UN SDG Alignment
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-stone-800 border border-stone-700">
                <span className="text-xs font-bold text-red-400 block">SDG 4: Quality Education</span>
                <span className="text-xs text-stone-400 block mt-1">
                  Expanding STEM access & practical learning for underserved girls.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-800 border border-stone-700">
                <span className="text-xs font-bold text-orange-400 block">SDG 5: Gender Equality</span>
                <span className="text-xs text-stone-400 block mt-1">
                  Dismantling barriers and building pathways in underrepresented fields.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials & Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>
            © {new Date().getFullYear()} Inspire STEM Girls Initiative. All rights reserved.
          </p>
          
          <div className="flex items-center gap-3">
            <span className="text-stone-400">Social:</span>
            <div className="flex items-center gap-2">
              <a
                href="https://twitter.com/inspirestemgirls"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="text-stone-400 hover:text-[#1DA1F2] transition-colors p-1"
                title="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/inspire-stem-girls-initiative"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-stone-400 hover:text-[#0A66C2] transition-colors p-1"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/inspirestemgirls"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-[#E4405F] transition-colors p-1"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>Built with dedication for girls across Nigeria</span>
            <span aria-hidden="true">·</span>
            <a href="mailto:contact@inspirestemgirls.org" className="hover:text-stone-300 transition-colors">
              contact@inspirestemgirls.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
