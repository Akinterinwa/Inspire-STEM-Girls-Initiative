import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../../types';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  CheckCircle2,
  School,
} from 'lucide-react';

interface DonatePageProps {
  onNavigate: (page: PageId) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ onNavigate }) => {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [embedFailed, setEmbedFailed] = useState(false);

  useEffect(() => {
    const container = embedContainerRef.current;
    if (!container) return;

    let isMounted = true;
    const script = document.createElement('script');
    script.src = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';
    script.async = true;
    script.onerror = () => {
      if (isMounted) setEmbedFailed(true);
    };
    container.appendChild(script);

    return () => {
      isMounted = false;
      script.remove();
    };
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#FFBD59]">
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
          {/* Left Column: Zeffy Donation Form */}
          <div className="lg:col-span-7 bg-[#EFEFF0]/40 rounded-3xl p-6 sm:p-10 border border-[#E3E3E5] shadow-sm">
            <div ref={embedContainerRef} className="min-h-[450px]">
              <div
                data-zeffy-embed
                data-form-url="/embed/donation-form/donate-to-change-lives-4200"
              />
              <div
                data-zeffy-embed-fallback
                style={{ display: embedFailed ? 'block' : 'none' }}
              >
                <div className="relative h-[450px] w-full overflow-hidden">
                  <iframe
                    title="Donation form powered by Zeffy"
                    src={
                      embedFailed
                        ? 'https://www.zeffy.com/embed/donation-form/donate-to-change-lives-4200'
                        : undefined
                    }
                    data-zeffy-embed-src="https://www.zeffy.com/embed/donation-form/donate-to-change-lives-4200"
                    className="absolute inset-0 h-full w-full border-0"
                    allow="payment"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Transparent Impact Breakdown & School Fund spotlight */}
          <div className="lg:col-span-5 space-y-6">
            {/* Spotlight: ISG Science School Fund */}
            <div className="p-8 rounded-3xl bg-[#2C0E40] text-white border border-[#41175E] shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFBD59]">
                <School className="w-4 h-4 text-[#FFBD59]" />
                <span>Flagship Endowment</span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-white">
                The ISG Science School Fund
              </h3>
              <p className="text-[#EFEFF0]/85 text-sm leading-relaxed">
                By contributing to the Science School Fund, you are supporting the long-term establishment of a tuition-free science and STEM academy for girls from underserved communities in Nigeria.
              </p>
              <div className="p-4 rounded-xl bg-[#1E082C]/80 border border-[#41175E] text-xs text-[#EFEFF0] space-y-1.5">
                <div className="font-semibold text-[#FFBD59]">Fund Allocations:</div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBD59]" />
                  <span>Laboratories & scientific equipment acquisition</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBD59]" />
                  <span>Full tuition & residential boarding endowments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FFBD59]" />
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
