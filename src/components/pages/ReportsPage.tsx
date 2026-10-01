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
    setTimeout(() => {
      // simulate auto dismissal or user can close
    }, 4000);
  };

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Governance & Accountability"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0e4b3c]"
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
        <div className="border-b border-stone-200 pb-4 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1">
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
              className={`p-8 rounded-2xl border transition-all ${
                report.featured
                  ? 'bg-gradient-to-br from-emerald-950 to-stone-900 text-white border-emerald-800 shadow-xl'
                  : 'bg-stone-50 border-stone-200 text-slate-900'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                        report.featured
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-stone-200 text-slate-700'
                      }`}
                    >
                      {report.year} Edition
                    </span>
                    <span
                      className={`text-xs flex items-center gap-1 ${
                        report.featured ? 'text-emerald-300' : 'text-slate-500'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      Published {report.publishedDate}
                    </span>
                    <span
                      className={`text-xs ${
                        report.featured ? 'text-stone-400' : 'text-slate-400'
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
                      report.featured ? 'text-emerald-100/90' : 'text-slate-600'
                    }`}
                  >
                    {report.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-2 pt-2">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider block ${
                        report.featured ? 'text-amber-300' : 'text-slate-500'
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
                              report.featured ? 'text-amber-400' : 'text-emerald-600'
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
                    className={`px-6 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                      report.featured
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold'
                        : 'bg-[#0e4b3c] hover:bg-[#155e4b] text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Report (PDF)</span>
                  </button>
                  <button
                    onClick={() => handleDownload(report.title)}
                    className={`px-6 py-3 rounded-lg text-xs font-medium flex items-center justify-center gap-2 border transition-colors ${
                      report.featured
                        ? 'border-emerald-700 hover:bg-emerald-900/50 text-emerald-200'
                        : 'border-stone-300 hover:bg-stone-100 text-slate-700'
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
        <div className="p-8 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">
              Annual Publication Cycle
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              Our comprehensive Annual Impact Reports are published at the conclusion of each academic cycle. We adhere to open non-profit financial disclosures for all institutional partners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3.5 py-2 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Audited Stewardship & Open Governance</span>
          </div>
        </div>
      </section>

      {/* Download Notification Modal / Toast */}
      {downloadModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0e4b3c] flex items-center justify-center mx-auto">
              <Download className="w-6 h-6 animate-bounce" />
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
                className="w-full py-2.5 rounded-lg bg-[#0e4b3c] text-white text-xs font-semibold hover:bg-[#155e4b]"
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
