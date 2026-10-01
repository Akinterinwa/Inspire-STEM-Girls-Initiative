import React, { useState } from 'react';
import { PageId } from '../../types';
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
} from 'lucide-react';

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
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Collaborative Ecosystem"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0e4b3c]"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Partners & Collaborators
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Sustainable impact is achieved through deep, trust-based collaboration with educators, grassroots leaders, technology companies, and professional networks across Nigeria.
          </p>
          <div className="mt-4 text-xs text-slate-500 italic">
            * Note: Only officially confirmed partners and operational partner alliances are displayed.
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* PARTNERS CATEGORIES LISTING WITH DISTINCT LOGOS                */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {partnerCategories.map((category) => (
          <div
            key={category.id}
            className="p-8 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-6 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200/80 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0e4b3c] block">
                  Category
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {category.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-md sm:text-right">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {category.partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600/50 hover:shadow-md transition-all duration-200 flex items-start gap-4"
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
                      <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex-shrink-0">
                        Confirmed
                      </span>
                    </div>

                    <p className="text-xs text-[#0e4b3c] font-semibold">
                      {partner.type}
                    </p>

                    {partner.description && (
                      <p className="text-xs text-slate-600 pt-1 leading-relaxed">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============================================================== */}
      {/* PARTNER INQUIRY FORM                                           */}
      {/* ============================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-white border-2 border-stone-200 shadow-xl">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
              Join Our Coalition
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Partner With Inspire STEM Girls
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              Whether you represent a secondary school, a corporation seeking CSR alignment with SDG 4 & 5, or a foundation, we would love to discuss collaborative possibilities.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Partnership Inquiry Received
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for your commitment to expanding STEM opportunities. Our Executive & Programs team will review your details and reach out within 48 business hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-xs font-bold text-[#0e4b3c] hover:underline pt-2 block mx-auto"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#0e4b3c] focus:ring-1 focus:ring-[#0e4b3c] outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#0e4b3c] focus:ring-1 focus:ring-[#0e4b3c] outline-none"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#0e4b3c] focus:ring-1 focus:ring-[#0e4b3c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Partnership Category *
                  </label>
                  <select
                    value={formData.partnerCategory}
                    onChange={(e) => setFormData({ ...formData, partnerCategory: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#0e4b3c] focus:ring-1 focus:ring-[#0e4b3c] outline-none bg-white font-medium"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#0e4b3c] focus:ring-1 focus:ring-[#0e4b3c] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold bg-[#0e4b3c] hover:bg-[#155e4b] text-white transition-all flex items-center justify-center gap-2 shadow-md"
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
