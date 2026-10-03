import React, { useState } from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
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
    <footer className="bg-[#150520] text-stone-300 pt-16 pb-12 border-t border-[#2C0E40]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Mission Statement Banner in Footer with Brand Purple and Radiant Gold */}
        <div className="bg-[#2C0E40] rounded-3xl p-6 sm:p-8 mb-12 border border-[#41175E] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-wider uppercase text-[#F0C747]">
              Our Guiding Conviction
            </span>
            <p className="text-lg sm:text-xl text-white font-serif-display mt-2 leading-relaxed">
              &ldquo;We believe talent is everywhere, but access and opportunity are not. A girl&rsquo;s potential should never be limited by her gender or socioeconomic background.&rdquo;
            </p>
          </div>
          <div className="flex-shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                onNavigate('donate');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-[#2C0E40]" />
              <span>Invest in Her Future</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* NEWSLETTER SUBSCRIPTION FORM                                   */}
        {/* ============================================================== */}
        <div className="bg-gradient-to-r from-[#2C0E40] via-[#1E082C] to-[#150520] rounded-3xl p-6 sm:p-10 mb-14 border border-[#41175E]/70 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F0C747]">
                <Sparkles className="w-4 h-4 text-[#F0C747]" />
                <span>Stay Informed</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Subscribe to Our Newsletter & Updates
              </h3>
              <p className="text-[#EFEFF0]/80 text-sm leading-relaxed max-w-xl">
                Receive our quarterly impact briefs, inspirational student stories, upcoming school workshop schedules, and major milestones toward our future tuition-free science school.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-5 rounded-2xl bg-[#2C0E40] border border-[#F0C747] flex items-center gap-4 text-white animate-in fade-in duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#F0C747] text-[#2C0E40] flex items-center justify-center flex-shrink-0 font-bold">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Thank You for Subscribing!</h4>
                    <p className="text-xs text-[#EFEFF0] mt-0.5">
                      You are now subscribed with <strong className="text-[#F0C747]">{email}</strong>. We look forward to keeping you updated on our girls&rsquo; journey.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2.5">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-[#F0C747] absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#150520]/90 border border-[#41175E] text-white placeholder-stone-400 text-sm focus:border-[#F0C747] focus:ring-1 focus:ring-[#F0C747] outline-none transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all flex items-center justify-center gap-2 flex-shrink-0 shadow-md hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2C0E40]">
          {/* Column 1: Organization Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div>
                <span className="block text-base font-bold text-white tracking-tight">
                  Inspire STEM Girls Initiative
                </span>
                <span className="block text-xs text-[#F0C747]">
                  Nonprofit Organization · Nigeria
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed max-w-md font-normal">
              Inspire STEM Girls Initiative expands access to STEM education, mentorship, and educational opportunities for girls from underserved communities in Nigeria, with the long-term vision of establishing a tuition-free science/STEM school.
            </p>

            <div className="pt-2 space-y-2 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F0C747] flex-shrink-0" />
                <span>Headquartered in Lagos, Nigeria · Operations across Southwest & beyond</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#F0C747] flex-shrink-0" />
                <a href="mailto:contact@inspirestemgirls.org" className="hover:text-[#F0C747] transition-colors">
                  contact@inspirestemgirls.org
                </a>
              </div>
            </div>

            {/* Social Media Presence with tactile hover states */}
            <div className="pt-4 border-t border-[#2C0E40]">
              <span className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://twitter.com/inspirestemgirls"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on Twitter / X"
                  className="w-10 h-10 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] border border-[#41175E] hover:border-[#F0C747] text-[#F0C747] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/40 cursor-pointer"
                  title="Follow us on Twitter / X (@inspirestemgirls)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/inspire-stem-girls-initiative"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on LinkedIn"
                  className="w-10 h-10 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] border border-[#41175E] hover:border-[#F0C747] text-[#F0C747] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/40 cursor-pointer"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com/inspirestemgirls"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Inspire STEM Girls on Instagram"
                  className="w-10 h-10 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] border border-[#41175E] hover:border-[#F0C747] text-[#F0C747] flex items-center justify-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/40 cursor-pointer"
                  title="Follow us on Instagram (@inspirestemgirls)"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  About Our Mission
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('programs'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Programs & Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('impact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Our Impact
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('vision'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Our Vision</span>
                  <span className="text-[10px] text-[#F0C747] font-semibold bg-[#2C0E40] px-1.5 py-0.5 rounded">Science School</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Organization & Governance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Organization
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onNavigate('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Our Team & Founder
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('team'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Board & Governance
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('partners'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Partners & Collaborators
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('reports'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Reports & Publications
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('get-involved'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-stone-300 hover:text-[#F0C747] hover:translate-x-1 transition-all cursor-pointer"
                >
                  Get Involved (Mentor/Volunteer)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Global Goals Alignment */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              UN SDG Alignment
            </h4>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#2C0E40] border border-[#41175E]">
                <span className="text-xs font-bold text-[#F0C747] block">SDG 4: Quality Education</span>
                <span className="text-xs text-[#EFEFF0]/80 block mt-1">
                  Expanding STEM access & practical learning for underserved girls.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2C0E40] border border-[#41175E]">
                <span className="text-xs font-bold text-[#F0C747] block">SDG 5: Gender Equality</span>
                <span className="text-xs text-[#EFEFF0]/80 block mt-1">
                  Dismantling barriers and building pathways in underrepresented fields.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Socials & Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
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
                className="text-stone-400 hover:text-[#F0C747] hover:-translate-y-0.5 transition-all p-1"
                title="Twitter / X"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/inspire-stem-girls-initiative"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-stone-400 hover:text-[#F0C747] hover:-translate-y-0.5 transition-all p-1"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://instagram.com/inspirestemgirls"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-stone-400 hover:text-[#F0C747] hover:-translate-y-0.5 transition-all p-1"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span>Built with dedication for girls across Nigeria</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <a href="mailto:contact@inspirestemgirls.org" className="hover:text-[#F0C747] transition-colors">
              contact@inspirestemgirls.org
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
