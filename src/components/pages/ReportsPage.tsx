import React, { useState } from 'react';
import { PageId } from '../../types';
import { reportsData } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  FileText,
  Download,
  Eye,
  CheckCircle2,
  Calendar,
  Lock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ReportsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onNavigate }) => {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  const handleDownload = (reportTitle: string) => {
    setDownloadModal(reportTitle);
  };

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Governance & Accountability"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Reports & Publications
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            We are dedicated to radical transparency, programmatic rigor, and meticulous stewardship of all donor and partner resources. Download our annual impact briefs and audited disclosures.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* FEATURED / 2026 ANNUAL IMPACT REPORT                           */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#E3E3E5] pb-4 mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1">
            Current Publication
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Annual Impact Briefs
          </h2>
        </div>

        <div className="space-y-8">
          {reportsData.map((report) => (
            <div
              key={report.id}
              className={`p-8 rounded-3xl border transition-all ${
                report.featured
                  ? 'bg-gradient-to-br from-[#2C0E40] via-[#1E082C] to-[#150520] text-white border-[#41175E] shadow-xl'
                  : 'bg-[#EFEFF0]/40 border-[#E3E3E5] text-slate-900'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-lg ${
                        report.featured
                          ? 'bg-[#F0C747] text-[#2C0E40]'
                          : 'bg-[#EFEFF0] text-[#2C0E40] border border-[#2C0E40]/20'
                      }`}
                    >
                      {report.year} Edition
                    </span>
                    <span
                      className={`text-xs flex items-center gap-1 font-medium ${
                        report.featured ? 'text-[#F0C747]' : 'text-slate-500'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Published {report.publishedDate}
                    </span>
                    <span
                      className={`text-xs ${
                        report.featured ? 'text-stone-300' : 'text-slate-400'
                      }`}
                    >
                      · {report.fileSize}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl sm:text-3xl font-bold leading-tight ${
                      report.featured ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {report.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      report.featured ? 'text-[#EFEFF0]/85' : 'text-slate-600'
                    }`}
                  >
                    {report.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block ${
                        report.featured ? 'text-[#F0C747]' : 'text-[#2C0E40]'
                      }`}
                    >
                      Report Highlights & Verified Outcomes:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {report.highlights.map((h, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2 ${
                            report.featured ? 'text-stone-200' : 'text-slate-700'
                          }`}
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                              report.featured ? 'text-[#F0C747]' : 'text-[#2C0E40]'
                            }`}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleDownload(report.title)}
                    className={`px-6 py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                      report.featured
                        ? 'bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] hover:shadow-amber-500/25'
                        : 'bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white hover:shadow-purple-950/20'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report (PDF)</span>
                  </button>
                  <button
                    onClick={() => handleDownload(report.title)}
                    className={`px-6 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                      report.featured
                        ? 'border-[#41175E] hover:bg-[#41175E] text-[#EFEFF0]'
                        : 'border-[#2C0E40]/30 hover:bg-[#EFEFF0] text-[#2C0E40]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Executive Summary</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* ANNUAL ARCHIVE / EXPANSION DESIGN                              */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-[#EFEFF0]/50 border border-[#E3E3E5] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Annual Publication Cycle
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Our comprehensive Annual Impact Reports are published at the conclusion of each academic cycle. We adhere to open non-profit financial disclosures for all institutional partners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2C0E40] font-bold bg-[#EFEFF0] px-4 py-2.5 rounded-xl border border-[#2C0E40]/20">
            <ShieldCheck className="w-4 h-4 text-[#2C0E40]" />
            <span>Audited Stewardship & Open Governance</span>
          </div>
        </div>
      </section>

      {/* Download Notification Modal / Toast */}
      {downloadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs"
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E3E3E5] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center mx-auto shadow-md">
              <Download className="w-7 h-7 animate-bounce" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              Accessing {downloadModal}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your official copy of the Inspire STEM Girls Initiative publication is being retrieved. You may also contact our governance desk for custom grant documentation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setDownloadModal(null)}
                className="w-full py-3 rounded-xl bg-[#2C0E40] text-[#F0C747] hover:bg-[#41175E] hover:text-white text-xs font-bold transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
