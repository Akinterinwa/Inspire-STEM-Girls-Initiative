import React, { useState } from 'react';
import { PageId } from '../../types';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  School,
  Lock,
  ArrowRight,
  Gift,
  HelpCircle,
} from 'lucide-react';

interface DonatePageProps {
  onNavigate: (page: PageId) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ onNavigate }) => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
  const [designation, setDesignation] = useState<'general' | 'school-fund'>('general');
  const [selectedAmount, setSelectedAmount] = useState<number>(60);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorName, setDonorName] = useState<string>('');
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);

  const usdLevels = [
    {
      amount: 25,
      impact: 'STEM Discovery Kit',
      description: 'Provides hands-on electronic components and circuit breadboard for 1 girl.',
    },
    {
      amount: 60,
      impact: '1 Term of Mentorship',
      description: 'Pairs 1 girl with a female tech/science professional for 3 months with learning guides.',
    },
    {
      amount: 120,
      impact: 'Examination Sponsorship',
      description: 'Fully covers WAEC / NECO science subject registration fees for a girl in senior secondary.',
    },
    {
      amount: 300,
      impact: 'School Outreach Clinic',
      description: 'Equips a mobile practical science demonstration clinic for 30 girls in an underserved public school.',
    },
    {
      amount: 1000,
      impact: 'ISG Science School Pioneer',
      description: 'Founding contribution dedicated to the capital feasibility and laboratory design fund.',
    },
  ];

  const ngnLevels = [
    {
      amount: 35000,
      impact: 'STEM Discovery Kit',
      description: 'Hands-on electronic kit and workshop materials for one secondary school student.',
    },
    {
      amount: 85000,
      impact: '1 Term of Mentorship',
      description: 'Structured 1-on-1 mentorship, career counseling, and digital resources for 1 girl.',
    },
    {
      amount: 170000,
      impact: 'Examination Sponsorship',
      description: 'Eliminates examination fee barriers for WAEC/NECO STEM registration.',
    },
    {
      amount: 420000,
      impact: 'School Outreach Clinic',
      description: 'Funds an immersive practical laboratory day for 30 public school students.',
    },
    {
      amount: 1400000,
      impact: 'ISG Science School Pioneer',
      description: 'Capital development gift advancing our future tuition-free school campus.',
    },
  ];

  const currentTiers = currency === 'USD' ? usdLevels : ngnLevels;

  const currentAmountValue = customAmount ? parseFloat(customAmount) || 0 : selectedAmount;

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationSuccess(true);
  };

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Philanthropic Partnership"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-left"
          >
            Invest in Her Future
          </AnimatedHeading>

          {/* Exact Copy */}
          <div className="mt-4 space-y-3 text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
            <p>
              Your support helps expand access to STEM education, mentorship and educational opportunities for girls from underserved communities in Nigeria.
            </p>
            <p className="font-medium text-[#2C0E40]">
              Every contribution moves us closer to a future where a girl&rsquo;s financial circumstances do not limit her access to quality science education.
            </p>
          </div>
        </div>
      </div>

      {/* Main Donation Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Donation Form */}
          <div className="lg:col-span-7 bg-[#EFEFF0]/40 rounded-3xl p-6 sm:p-10 border border-[#E3E3E5] shadow-sm">
            {donationSuccess ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Thank You for Your Generous Support!
                </h3>
                <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-900">{donorName || 'Champion for Girls'}</strong>. Your gift of{' '}
                  <span className="font-bold text-[#2C0E40]">
                    {currency === 'USD' ? `$${currentAmountValue}` : `₦${currentAmountValue.toLocaleString()}`}
                  </span>{' '}
                  to the{' '}
                  <strong className="text-slate-900">
                    {designation === 'school-fund' ? 'ISG Science School Fund' : 'STEM Education & Access Fund'}
                  </strong>{' '}
                  directly removes educational barriers for girls in Nigeria.
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#E3E3E5] max-w-sm mx-auto text-xs text-slate-500">
                  A receipt and impact confirmation has been dispatched to {donorEmail || 'your email'}.
                </div>
                <button
                  onClick={() => setDonationSuccess(false)}
                  className="px-6 py-3 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white text-xs font-bold transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  Make another contribution
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonateSubmit} className="space-y-8">
                {/* 1. Designation Selector (Giving Fund) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    1. Choose Giving Designation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDesignation('general')}
                      className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                        designation === 'general'
                          ? 'bg-white border-[#2C0E40] ring-2 ring-[#2C0E40]/30 shadow-xs'
                          : 'bg-[#EFEFF0]/70 border-[#E3E3E5] text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className="font-bold text-sm text-slate-900">Current Programs Fund</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Workshops, mentorship pairing, mobile school kits & exam fee support today.
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDesignation('school-fund')}
                      className={`p-4 rounded-2xl text-left border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                        designation === 'school-fund'
                          ? 'bg-[#2C0E40] text-white border-[#F0C747] ring-2 ring-[#F0C747]/40 shadow-md'
                          : 'bg-[#EFEFF0]/70 border-[#E3E3E5] text-slate-600 hover:bg-white'
                      }`}
                    >
                      <div className={`font-bold text-sm ${designation === 'school-fund' ? 'text-[#F0C747]' : 'text-slate-900'}`}>
                        ISG Science School Fund
                      </div>
                      <div className={`text-xs mt-1 ${designation === 'school-fund' ? 'text-[#EFEFF0]/85' : 'text-slate-500'}`}>
                        Capital fund toward establishing our future tuition-free science school campus.
                      </div>
                    </button>
                  </div>
                </div>

                {/* 2. Frequency & Currency Toggle */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-3 bg-[#EFEFF0] rounded-2xl border border-[#E3E3E5]">
                  {/* Frequency */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFrequency('once')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        frequency === 'once'
                          ? 'bg-white text-[#2C0E40] shadow-xs'
                          : 'text-slate-600 hover:text-[#2C0E40] hover:bg-white/60'
                      }`}
                    >
                      One-Time Gift
                    </button>
                    <button
                      type="button"
                      onClick={() => setFrequency('monthly')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                        frequency === 'monthly'
                          ? 'bg-[#2C0E40] text-[#F0C747] shadow-xs'
                          : 'text-slate-600 hover:text-[#2C0E40] hover:bg-white/60'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F0C747]" />
                      <span>Monthly Champion</span>
                    </button>
                  </div>

                  {/* Currency */}
                  <div className="flex items-center gap-1 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('USD');
                        setSelectedAmount(60);
                        setCustomAmount('');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === 'USD' ? 'bg-[#2C0E40] text-[#F0C747] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrency('NGN');
                        setSelectedAmount(85000);
                        setCustomAmount('');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currency === 'NGN' ? 'bg-[#2C0E40] text-[#F0C747] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      NGN (₦)
                    </button>
                  </div>
                </div>

                {/* 3. Giving Levels */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    2. Select Contribution Level
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {currentTiers.map((tier) => {
                      const isSelected = selectedAmount === tier.amount && !customAmount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(tier.amount);
                            setCustomAmount('');
                          }}
                          className={`p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 ${
                            isSelected
                              ? 'bg-white border-[#2C0E40] ring-2 ring-[#2C0E40]/30 shadow-xs'
                              : 'bg-white border-[#E3E3E5] hover:border-[#2C0E40]/40'
                          }`}
                        >
                          <div className="text-lg font-extrabold text-[#2C0E40]">
                            {currency === 'USD' ? `$${tier.amount}` : `₦${tier.amount.toLocaleString()}`}
                          </div>
                          <div className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                            {tier.impact}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount */}
                  <div className="mt-3">
                    <div className="relative">
                      <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">
                        {currency === 'USD' ? '$' : '₦'}
                      </span>
                      <input
                        type="number"
                        placeholder="Enter other custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#2C0E40] focus:ring-1 focus:ring-[#2C0E40] outline-none bg-white font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Donor Information */}
                <div className="space-y-3 pt-2 border-t border-[#E3E3E5]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    3. Donor Information
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name or Organization *"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#2C0E40] outline-none bg-white"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address (for official receipt) *"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:border-[#2C0E40] outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Submit Button with high-engagement hover */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl text-base font-bold bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white transition-all shadow-md hover:shadow-lg hover:shadow-purple-950/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5 fill-current text-[#F0C747]" />
                    <span>
                      Complete Donation of{' '}
                      {currency === 'USD' ? `$${currentAmountValue}` : `₦${currentAmountValue.toLocaleString()}`}
                    </span>
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-[#2C0E40]" />
                    <span>Bank-grade 256-bit encrypted giving flow · Tax deductible receipt issued</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Transparent Impact Breakdown & School Fund spotlight */}
          <div className="lg:col-span-5 space-y-6">
            {/* Spotlight: ISG Science School Fund */}
            <div className="p-8 rounded-3xl bg-[#2C0E40] text-white border border-[#41175E] shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F0C747]">
                <School className="w-4 h-4 text-[#F0C747]" />
                <span>Flagship Endowment</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white">
                The ISG Science School Fund
              </h3>
              <p className="text-[#EFEFF0]/85 text-sm leading-relaxed">
                By contributing to the Science School Fund, you are supporting the long-term establishment of a tuition-free science and STEM academy for girls from underserved communities in Nigeria.
              </p>
              <div className="p-4 rounded-xl bg-[#1E082C]/80 border border-[#41175E] text-xs text-[#EFEFF0] space-y-1.5">
                <div className="font-semibold text-[#F0C747]">Fund Allocations:</div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F0C747]" />
                  <span>Laboratories & scientific equipment acquisition</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F0C747]" />
                  <span>Full tuition & residential boarding endowments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F0C747]" />
                  <span>Curriculum excellence & STEM faculty chairs</span>
                </div>
              </div>
            </div>

            {/* What Your Current Giving Powers */}
            <div className="p-6 rounded-3xl bg-[#EFEFF0]/40 border border-[#E3E3E5] space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                How Your Giving Is Deployed
              </h4>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2C0E40] flex-shrink-0">85%</span>
                  <span>Direct programmatic delivery (hands-on workshops, kits, student exam fees, mentor pairings)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2C0E40] flex-shrink-0">10%</span>
                  <span>Monitoring, evaluation, student tracking, and community teacher training</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#2C0E40] flex-shrink-0">5%</span>
                  <span>Operational administration and institutional audit compliance</span>
                </li>
              </ul>
            </div>

            {/* Wire & Institutional Grants Box */}
            <div className="p-6 rounded-2xl border border-[#E3E3E5] text-xs text-slate-600 space-y-2 bg-white">
              <span className="font-bold text-slate-900 block">
                Wire Transfers & Institutional Grants
              </span>
              <p>
                For foundation grants, corporate matching gifts, donor-advised funds (DAFs), or direct wire transfers to our Nigerian non-profit bank account, please contact our finance desk directly at{' '}
                <a href="mailto:finance@inspirestemgirls.org" className="text-[#2C0E40] font-bold underline hover:text-[#41175E]">
                  finance@inspirestemgirls.org
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
