import React from 'react';
import { PageId } from '../../types';
import { staffMembers, boardMembers } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import { Mail, Linkedin, ShieldCheck, UserCheck, PlusCircle, ArrowRight, Award } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Leadership & Governance"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0e4b3c]"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Our Team & Governance
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Passionate educators, engineers, and operational leaders working collaboratively to expand STEM access for girls from underserved communities in Nigeria.
          </p>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. OUR TEAM (Executive & Staff Members)                        */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-stone-200 pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <AnimatedHeading
            as="h2"
            accent
            subtitle="Operations & Execution"
            subtitleClassName="text-xs font-semibold uppercase tracking-wider text-[#0e4b3c] block mb-1"
            className="text-2xl sm:text-3xl font-bold text-slate-900 text-left"
          >
            Our Team
          </AnimatedHeading>
          <p className="text-xs text-slate-500 max-w-sm">
            Core operational staff directing ground programs, school partnerships, and institutional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staffMembers.map((member) => (
            <div
              key={member.id}
              className="bg-stone-50 rounded-3xl overflow-hidden border border-stone-200 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-stone-200 relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-bold text-[#0e4b3c]">
                    Operational Leadership
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
                    {member.role}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-200/60 mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{member.location}</span>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#0e4b3c] hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Designed for future staff member additions */}
          <div className="bg-stone-50/50 rounded-3xl border-2 border-dashed border-stone-300 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-600 transition-colors">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#0e4b3c] flex items-center justify-center shadow-xs">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Expanding Our Program Staff
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                As our outreach extends across additional Nigerian states and school districts, we are adding regional program coordinators and STEM workshop leads.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-bold text-[#0e4b3c] hover:underline inline-flex items-center gap-1"
            >
              <span>Join our volunteer & instructor network</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BOARD / GOVERNANCE (Includes Images as requested)            */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl">
          <div className="max-w-3xl mb-12">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Institutional Oversight & Stewardship"
              subtitleClassName="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-left"
            >
              Board / Governance
            </AnimatedHeading>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed">
              In accordance with international non-profit best practices, our Board of Directors and Advisory Council operates independently from staff. The Board provides strategic governance, fiduciary stewardship, legal compliance, and long-term capital oversight for the future ISG Science School.
            </p>
          </div>

          {/* Board Members with Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boardMembers.map((seat) => (
              <div
                key={seat.id}
                className="bg-stone-800/80 border border-stone-700 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row items-stretch"
              >
                {/* Member Portrait */}
                <div className="sm:w-48 sm:min-w-[12rem] bg-stone-950 relative overflow-hidden flex-shrink-0">
                  <img
                    src={seat.image}
                    alt={seat.name}
                    className="w-full h-56 sm:h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 sm:hidden">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-400 text-slate-950 uppercase">
                      Governance
                    </span>
                  </div>
                </div>

                {/* Member Bio & Information */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        {seat.role}
                      </span>
                      <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-stone-700 text-stone-300 border border-stone-600">
                        Advisory
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-100">
                      {seat.name}
                    </h3>

                    <p className="text-xs text-emerald-400 mb-3 font-medium">
                      {seat.affiliation}
                    </p>

                    <p className="text-xs text-stone-300 leading-relaxed font-normal">
                      {seat.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-700/60 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Advisory Board Member</span>
                    <span className="text-emerald-400 font-semibold">Active Fiduciary</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
            <p>
              * Board appointments and committee assignments are maintained in full compliance with non-profit statutory regulations.
            </p>
            <a
              href="mailto:contact@inspirestemgirls.org?subject=Board%20Governance%20Inquiry"
              className="text-amber-400 hover:text-amber-300 font-bold inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Governance inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
