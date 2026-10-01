import React, { useState } from 'react';
import { PageId } from '../../types';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  Handshake,
  Users,
  HeartHandshake,
  Heart,
  CheckCircle2,
  ArrowRight,
  Send,
  Building2,
  Sparkles,
  School,
} from 'lucide-react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'partner' | 'mentor' | 'volunteer' | 'support'>('mentor');
  const [submittedForm, setSubmittedForm] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fieldOfWork, setFieldOfWork] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    setSubmittedForm(formType);
  };

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Collaborative Action"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0e4b3c]"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Get Involved
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every breakthrough begins with opportunity. Whether through professional mentorship, institutional partnership, hands-on volunteering, or philanthropic investment, you can directly shape the future of a girl in Nigeria.
          </p>
        </div>

        {/* The 4 Focus Areas Segmented Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {/* 1. Partner With Us */}
          <button
            onClick={() => {
              setActiveTab('partner');
              setSubmittedForm(null);
            }}
            className={`p-6 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              activeTab === 'partner'
                ? 'border-[#0e4b3c] bg-emerald-50/60 shadow-sm ring-1 ring-[#0e4b3c]'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100/60'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0e4b3c] flex items-center justify-center mb-4">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Partner With Us
              </h3>
              <p className="text-xs text-slate-600">
                For companies, foundations, schools and organizations.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0e4b3c] mt-4 flex items-center gap-1">
              Select option <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* 2. Mentor a Girl */}
          <button
            onClick={() => {
              setActiveTab('mentor');
              setSubmittedForm(null);
            }}
            className={`p-6 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              activeTab === 'mentor'
                ? 'border-[#0e4b3c] bg-emerald-50/60 shadow-sm ring-1 ring-[#0e4b3c]'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100/60'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#0e4b3c] flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Mentor a Girl
              </h3>
              <p className="text-xs text-slate-600">
                For STEM professionals interested in mentorship.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0e4b3c] mt-4 flex items-center gap-1">
              Select option <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* 3. Volunteer */}
          <button
            onClick={() => {
              setActiveTab('volunteer');
              setSubmittedForm(null);
            }}
            className={`p-6 rounded-2xl text-left border transition-all flex flex-col justify-between ${
              activeTab === 'volunteer'
                ? 'border-[#0e4b3c] bg-emerald-50/60 shadow-sm ring-1 ring-[#0e4b3c]'
                : 'border-stone-200 bg-stone-50 hover:bg-stone-100/60'
            }`}
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-[#0e4b3c] flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Volunteer
              </h3>
              <p className="text-xs text-slate-600">
                For individuals interested in supporting programs.
              </p>
            </div>
            <span className="text-xs font-semibold text-[#0e4b3c] mt-4 flex items-center gap-1">
              Select option <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>

          {/* 4. Support Our Mission */}
          <button
            onClick={() => {
              onNavigate('donate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="p-6 rounded-2xl text-left border border-amber-300 bg-amber-50/60 hover:bg-amber-100/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Support Our Mission
              </h3>
              <p className="text-xs text-slate-600">
                For donors who want to financially support our programs and long-term vision.
              </p>
            </div>
            <span className="text-xs font-bold text-amber-900 mt-4 flex items-center gap-1">
              Go to Donation Page <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* DETAILED ACTIVE SECTION / FORM                                 */}
      {/* ============================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200">
          {submittedForm ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Application Received!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you for applying to get involved with Inspire STEM Girls Initiative. Our volunteer coordinator will connect with you via email with orientation materials.
              </p>
              <button
                onClick={() => setSubmittedForm(null)}
                className="mt-4 px-6 py-2.5 rounded-lg bg-[#0e4b3c] text-white text-xs font-semibold hover:bg-[#155e4b]"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div>
              {/* Tab 1: Partner With Us */}
              {activeTab === 'partner' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
                      Institutional Collaboration
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Partner With Us
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      For companies, foundations, schools, and civic organizations seeking to sponsor cohorts, provide laboratory kits, or host school workshops.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'partner')} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Organization / School Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Lagos State Secondary / Global Foundation"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Official Contact Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="partnerships@org.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Partnership Goals & Location in Nigeria
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Describe your organization's focus and how you would like to collaborate with Inspire STEM Girls."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#0e4b3c] hover:bg-[#155e4b] text-white flex items-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Partnership Application</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 2: Mentor a Girl */}
              {activeTab === 'mentor' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
                      Professional Mentorship
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Mentor a Girl
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      For female STEM professionals (software engineers, doctors, data scientists, research chemists, etc.) passionate about guiding secondary school girls.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'mentor')} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Dr. Folashade Adeyemi"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="folashade@example.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          STEM Discipline / Current Role *
                        </label>
                        <input
                          type="text"
                          required
                          value={fieldOfWork}
                          onChange={(e) => setFieldOfWork(e.target.value)}
                          placeholder="e.g. Software Engineer / Biomedical Researcher"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Phone Number (WhatsApp friendly)
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mentorship Availability & Background
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Tell us about your experience and whether you prefer 1-on-1 virtual mentoring or participating in weekend group clinics in Nigeria."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#0e4b3c] hover:bg-[#155e4b] text-white flex items-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Mentor Application</span>
                    </button>
                  </form>
                </div>
              )}

              {/* Tab 3: Volunteer */}
              {activeTab === 'volunteer' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
                      Hands-On Program Support
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Volunteer With Us
                    </h2>
                    <p className="text-sm text-slate-600 mt-1">
                      For individuals interested in supporting school visits, workshop kit packaging, event coordination, logistics, or photography across Nigeria.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleSubmit(e, 'volunteer')} className="space-y-4 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@email.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Areas of Interest & City of Residence
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="e.g. Lagos Mainland; interested in workshop kit logistics, student registration, or science demonstration assistance."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-sm focus:border-[#0e4b3c] outline-none bg-white resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg text-sm font-semibold bg-[#0e4b3c] hover:bg-[#155e4b] text-white flex items-center gap-2 shadow-xs"
                    >
                      <Send className="w-4 h-4" />
                      <span>Join Volunteer Network</span>
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Support Our Mission Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 block mb-1">
              Support Our Mission
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              Want to Support Financially?
            </h3>
            <p className="text-stone-300 text-sm sm:text-base mt-2 max-w-xl">
              Donations directly fund STEM workshop supplies, examination registrations, and our future science school endowment fund.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('donate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex-shrink-0 transition-colors shadow-sm flex items-center gap-2"
          >
            <Heart className="w-4 h-4 fill-current text-amber-300" />
            <span>Make a Contribution</span>
          </button>
        </div>
      </section>
    </div>
  );
};
