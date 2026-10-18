import React, { useState, useRef } from 'react';
import { PageId, PartnerCategory, PartnerItem } from '../../types';
import { partnerCategories } from '../../data/siteData';
import { PartnerLogo } from '../PartnerLogo';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  Building2,
  School,
  Users2,
  Sparkles,
  ArrowRight,
  Handshake,
  CheckCircle2,
  Mail,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface CategorySectionProps {
  category: PartnerCategory;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  const [partnerIndex, setPartnerIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const clamped = Math.max(0, Math.min(category.partners.length - 1, idx));
    const firstChild = scrollRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    scrollRef.current.scrollTo({
      left: clamped * (cardWidth + 14),
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    const newIdx = Math.round(scrollRef.current.scrollLeft / (cardWidth + 14));
    setPartnerIndex(newIdx);
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-[#EFEFF0]/40 border border-[#E3E3E5] space-y-5 sm:space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E3E3E5] pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block">
            Category
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {category.title}
          </h2>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3">
          <p className="text-xs text-slate-500 max-w-md sm:text-right">
            {category.description}
          </p>
          {/* Mobile Carousel Controls for this Category */}
          <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
            <span className="text-xs font-semibold text-slate-500 mr-1">
              {partnerIndex + 1}/{category.partners.length}
            </span>
            <button
              onClick={() => scrollToIndex(partnerIndex - 1)}
              disabled={partnerIndex === 0}
              aria-label="Previous partner"
              className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToIndex(partnerIndex + 1)}
              disabled={partnerIndex >= category.partners.length - 1}
              aria-label="Next partner"
              className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP GRID (md and above: untouched) */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-5">
        {category.partners.map((partner, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-[#E3E3E5] hover:border-[#2C0E40]/40 hover:shadow-md transition-all duration-200 flex items-start gap-4"
          >
            {/* Dedicated Logo next to partner */}
            <PartnerLogo
              type={partner.logoType}
              name={partner.name}
              badgeText={partner.badgeText}
            />

            {/* Partner Info */}
            <div className="space-y-1 flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  {partner.name}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EFEFF0] text-[#2C0E40] border border-[#2C0E40]/20 flex-shrink-0">
                  {partner.nature || partner.type}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {partner.role || partner.description}
              </p>

              <div className="pt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2C0E40]" />
                <span>{partner.location || 'Operations across Nigeria'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE CAROUSEL FOR PARTNERS (Visible ONLY on mobile < md) */}
      <div className="block md:hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-3.5 pb-2 -mx-2 px-2"
        >
          {category.partners.map((partner, idx) => (
            <div
              key={idx}
              className="w-[84vw] max-w-[310px] flex-shrink-0 snap-center p-4 rounded-2xl bg-white border border-[#E3E3E5] shadow-xs flex items-start gap-3.5"
            >
              <PartnerLogo
                type={partner.logoType}
                name={partner.name}
                badgeText={partner.badgeText}
              />
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {partner.name}
                  </h4>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#EFEFF0] text-[#2C0E40] border border-[#2C0E40]/15 flex-shrink-0">
                    {partner.nature || partner.type}
                  </span>
                </div>

                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {partner.role || partner.description}
                </p>

                <div className="pt-1.5 text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2C0E40]" />
                  <span className="truncate">{partner.location || 'Across Nigeria'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-3">
          {category.partners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              aria-label={`Go to partner ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                partnerIndex === idx ? 'w-5 bg-[#2C0E40]' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PartnersPageProps {
  onNavigate: (page: PageId) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    partnerCategory: 'School Partners',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#FFBD59]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Collaborative Ecosystem"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Partners & Collaborators
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Sustainable impact is achieved through deep, trust-based collaboration with educators, grassroots leaders, technology companies, and professional networks across Nigeria.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PARTNERS CATEGORIES LISTING WITH DISTINCT LOGOS                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {partnerCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </section>

      {/* ============================================================== */}
      {/* PARTNER WITH US INTAKE FORM                                    */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EFEFF0]/50 rounded-3xl p-8 sm:p-12 border border-[#E3E3E5] max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40]">
              Strategic Alliances
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Partner With Inspire STEM Girls
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Whether you are a public school principal, corporate social responsibility lead, or philanthropic foundation, we welcome co-created programs.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-white border border-[#2C0E40]/30 text-center space-y-3 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#2C0E40] text-[#FFBD59] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Partnership Proposal Received</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for your commitment to expanding STEM opportunities. Our Executive & Programs team will review your details and reach out within 48 business hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold text-[#2C0E40] hover:text-[#41175E] pt-2 block mx-auto transition-colors cursor-pointer"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Organization / School / Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    placeholder="e.g. Lagos Secondary District / Enterprise Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Person Name & Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    placeholder="e.g. Dr. Ngozi Okafor, Principal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="partner@organization.org"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Partnership Category *
                  </label>
                  <select
                    value={formData.partnerCategory}
                    onChange={(e) => setFormData({ ...formData, partnerCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none bg-white font-medium cursor-pointer"
                  >
                    <option value="School Partners">School Partners (Public or Community School)</option>
                    <option value="Community Partners">Community Partners (Civic / Youth Org)</option>
                    <option value="Corporate Partners">Corporate Partners (CSR / Equipment / Tech)</option>
                    <option value="STEM Professionals">STEM Professionals (Volunteers / Network)</option>
                    <option value="Education Partners">Education Partners (Curriculum / NGO)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  How Would You Like to Collaborate?
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your school/organization, target location in Nigeria, and preferred engagement (workshops, mentorship, equipment donation, etc.)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-[#2C0E40] hover:bg-[#41175E] text-[#FFBD59] hover:text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:shadow-purple-950/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Partnership Proposal</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
