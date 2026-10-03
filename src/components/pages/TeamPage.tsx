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
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Leadership & Governance"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
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
        <div className="border-b border-[#E3E3E5] pb-6 mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <AnimatedHeading
            as="h2"
            accent
            subtitle="Operations & Execution"
            subtitleClassName="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-1"
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
              className="bg-[#EFEFF0]/40 rounded-3xl overflow-hidden border border-[#E3E3E5] flex flex-col justify-between hover:shadow-xl hover:border-[#2C0E40]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#150520] relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#2C0E40] text-[#F0C747] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
                    Operational Leadership
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-[#2C0E40] uppercase tracking-wider mb-4">
                    {member.role}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#E3E3E5] mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{member.location}</span>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#2C0E40] hover:text-[#41175E] font-bold inline-flex items-center gap-1 hover:translate-x-0.5 transition-all cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* Designed for future staff member additions */}
          <div className="bg-[#EFEFF0]/30 rounded-3xl border-2 border-dashed border-[#2C0E40]/30 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-[#2C0E40] transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#EFEFF0] flex items-center justify-center text-[#2C0E40]">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Join Our Dedicated Team
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                We periodically recruit program facilitators, volunteer mentors, curriculum designers, and logistical coordinators across Nigeria.
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('get-involved');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#2C0E40] text-white hover:bg-[#41175E] hover:text-[#F0C747] transition-all inline-flex items-center gap-1.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <span>Join our volunteer & instructor network</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BOARD / GOVERNANCE                                          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#2C0E40] text-white rounded-3xl p-8 sm:p-12 border border-[#41175E] shadow-xl">
          <div className="max-w-3xl mb-12">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Institutional Oversight & Stewardship"
              subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F0C747] mb-1"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-left"
            >
              Board / Governance
            </AnimatedHeading>
            <p className="mt-3 text-[#EFEFF0]/85 text-sm sm:text-base leading-relaxed">
              In accordance with international non-profit best practices, our Board of Directors and Advisory Council operates independently from staff. The Board provides strategic governance, fiduciary stewardship, legal compliance, and long-term capital oversight for the future ISG Science School.
            </p>
          </div>

          {/* Board Members with Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {boardMembers.map((seat) => (
              <div
                key={seat.id}
                className="bg-[#1E082C]/90 border border-[#41175E] rounded-3xl overflow-hidden hover:border-[#F0C747]/60 transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row items-stretch"
              >
                {/* Member Portrait */}
                <div className="sm:w-48 sm:min-w-[12rem] bg-[#150520] relative overflow-hidden flex-shrink-0">
                  <img
                    src={seat.image}
                    alt={seat.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-56 sm:h-full object-cover object-top"
                  />
                  <div className="absolute top-3 left-3 sm:hidden">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#F0C747] text-[#2C0E40] uppercase">
                      Governance
                    </span>
                  </div>
                </div>

                {/* Member Bio & Information */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#F0C747] uppercase tracking-wider">
                        {seat.role}
                      </span>
                      <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-[#2C0E40] text-[#EFEFF0] border border-[#41175E]">
                        Advisory
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {seat.name}
                    </h3>

                    <p className="text-xs text-[#F0C747] mb-3 font-medium">
                      {seat.affiliation}
                    </p>

                    <p className="text-xs text-[#EFEFF0]/80 leading-relaxed font-normal">
                      {seat.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#41175E]/70 flex items-center justify-between text-[11px] text-[#EFEFF0]/60">
                    <span>Advisory Board Member</span>
                    <span className="text-[#F0C747] font-semibold">Active Fiduciary</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-[#41175E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFEFF0]/70 gap-4">
            <p>
              * Board appointments and committee assignments are maintained in full compliance with non-profit statutory regulations.
            </p>
            <a
              href="mailto:contact@inspirestemgirls.org?subject=Board%20Governance%20Inquiry"
              className="text-[#F0C747] hover:text-white font-bold inline-flex items-center gap-1 flex-shrink-0 hover:translate-x-1 transition-all cursor-pointer"
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
