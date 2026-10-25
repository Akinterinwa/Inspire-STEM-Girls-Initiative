import React, { useState, useRef } from 'react';
import { PageId } from '../../types';
import { staffMembers, boardMembers } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import { AnimatedImage } from '../AnimatedImage';
import { Mail, Linkedin, ShieldCheck, UserCheck, PlusCircle, ArrowRight, Award, ChevronLeft, ChevronRight } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: PageId) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const [teamIndex, setTeamIndex] = useState(0);
  const teamScrollRef = useRef<HTMLDivElement>(null);

  const [boardIndex, setBoardIndex] = useState(0);
  const boardScrollRef = useRef<HTMLDivElement>(null);

  const scrollContainerTo = (container: HTMLDivElement | null, targetIndex: number, totalItems: number) => {
    if (!container) return;
    const clamped = Math.max(0, Math.min(totalItems - 1, targetIndex));
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    container.scrollTo({
      left: clamped * (cardWidth + 16),
      behavior: 'smooth',
    });
  };

  const handleContainerScroll = (container: HTMLDivElement | null, setIndex: (idx: number) => void) => {
    if (!container) return;
    const firstChild = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 280;
    const newIdx = Math.round(container.scrollLeft / (cardWidth + 16));
    setIndex(newIdx);
  };
  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 sm:space-y-20 selection:bg-[#2C0E40] selection:text-[#FFBD59]">
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
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <p className="text-xs text-slate-500 max-w-sm">
              Core operational staff directing ground programs, school partnerships, and institutional growth.
            </p>
            {/* Mobile Carousel Controls for Team */}
            <div className="flex md:hidden items-center gap-1.5 flex-shrink-0">
              <span className="text-xs font-semibold text-slate-500 mr-1">
                {teamIndex + 1}/{staffMembers.length}
              </span>
              <button
                onClick={() => scrollContainerTo(teamScrollRef.current, teamIndex - 1, staffMembers.length)}
                disabled={teamIndex === 0}
                aria-label="Previous team member"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainerTo(teamScrollRef.current, teamIndex + 1, staffMembers.length)}
                disabled={teamIndex >= staffMembers.length - 1}
                aria-label="Next team member"
                className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP GRID (md and above: untouched) */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <div className="absolute top-3 left-3 bg-[#2C0E40] text-[#FFBD59] px-2.5 py-1 rounded-md text-[11px] font-bold shadow-xs">
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
        </div>

        {/* MOBILE CAROUSEL FOR TEAM (Visible ONLY on mobile < md) */}
        <div className="block md:hidden">
          <div
            ref={teamScrollRef}
            onScroll={() => handleContainerScroll(teamScrollRef.current, setTeamIndex)}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
          >
            {staffMembers.map((member) => (
              <div
                key={member.id}
                className="w-[84vw] max-w-[310px] flex-shrink-0 snap-center bg-[#EFEFF0]/50 rounded-2xl overflow-hidden border border-[#E3E3E5] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/11] overflow-hidden bg-[#150520] relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#2C0E40] text-[#FFBD59] px-2 py-0.5 rounded-md text-[10px] font-bold shadow-xs">
                      Leadership
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-slate-900 mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-[#2C0E40] uppercase tracking-wider mb-2.5">
                      {member.role}
                    </p>

                    <p className="text-slate-600 text-xs leading-relaxed line-clamp">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-[#E3E3E5] mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="text-[11px]">{member.location}</span>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[#2C0E40] hover:text-[#41175E] font-bold inline-flex items-center gap-1 text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {staffMembers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollContainerTo(teamScrollRef.current, idx, staffMembers.length)}
                aria-label={`Go to team member ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  teamIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. BOARD / GOVERNANCE                                          */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-[#2C0E40] text-white rounded-3xl p-8 sm:p-12 border border-[#41175E] shadow-xl">
          <div className="max-w-3xl mb-8">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Institutional Oversight & Stewardship"
              subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FFBD59] mb-1"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white text-left"
            >
              Board / Governance
            </AnimatedHeading>
            <p className="mt-3 text-[#EFEFF0]/85 text-xs sm:text-base leading-relaxed">
              In accordance with international non-profit best practices, our Board of Directors and Advisory Council operates independently from staff, providing strategic governance and fiduciary stewardship.
            </p>
          </div>

          {/* Mobile Carousel Controls for Board */}
          <div className="flex md:hidden items-center justify-between gap-2 pb-4 pt-1 border-b border-[#41175E]/60 mb-6">
            <span className="text-xs font-semibold text-[#FFBD59]">
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollContainerTo(boardScrollRef.current, boardIndex - 1, boardMembers.length)}
                disabled={boardIndex === 0}
                aria-label="Previous board member"
                className="w-8 h-8 rounded-full border border-purple-800 bg-[#1E082C] flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#41175E] transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollContainerTo(boardScrollRef.current, boardIndex + 1, boardMembers.length)}
                disabled={boardIndex >= boardMembers.length - 1}
                aria-label="Next board member"
                className="w-8 h-8 rounded-full border border-purple-800 bg-[#1E082C] flex items-center justify-center text-white disabled:opacity-30 hover:bg-[#41175E] transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* DESKTOP GRID (md and above: untouched) */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8">
            {boardMembers.map((seat) => (
              <div
                key={seat.id}
                className="bg-[#1E082C]/90 border border-[#41175E] rounded-3xl overflow-hidden hover:border-[#FFBD59]/60 transition-all duration-300 hover:-translate-y-1 flex flex-col sm:flex-row items-stretch"
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
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#FFBD59] text-[#2C0E40] uppercase">
                      Governance
                    </span>
                  </div>
                </div>

                {/* Member Bio & Information */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-bold text-[#FFBD59] uppercase tracking-wider">
                        {seat.role}
                      </span>
                      <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold rounded bg-[#2C0E40] text-[#EFEFF0] border border-[#41175E]">
                        Advisory
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {seat.name}
                    </h3>

                    <p className="text-xs text-[#FFBD59] mb-3 font-medium">
                      {seat.affiliation}
                    </p>

                    <p className="text-xs text-[#EFEFF0]/80 leading-relaxed font-normal">
                      {seat.bio}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#41175E]/70 flex items-center justify-between text-[11px] text-[#EFEFF0]/60">
                    <span>Advisory Board Member</span>
                    <span className="text-[#FFBD59] font-semibold">Active Fiduciary</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE CAROUSEL FOR BOARD (Visible ONLY on mobile < md) */}
          <div className="block md:hidden">
            <div
              ref={boardScrollRef}
              onScroll={() => handleContainerScroll(boardScrollRef.current, setBoardIndex)}
              className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
            >
              {boardMembers.map((seat) => (
                <div
                  key={seat.id}
                  className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center bg-[#1E082C]/95 border border-[#41175E] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div className="h-48 overflow-hidden bg-[#150520] relative">
                    <img
                      src={seat.image}
                      alt={seat.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FFBD59] text-[#2C0E40] px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shadow-xs">
                      {seat.role}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-base font-bold text-white mb-0.5">
                        {seat.name}
                      </h3>
                      <p className="text-xs text-[#FFBD59] mb-2 font-medium">
                        {seat.affiliation}
                      </p>
                      <p className="text-xs text-[#EFEFF0]/80 leading-relaxed line-clamp-3">
                        {seat.bio}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#41175E]/70 flex items-center justify-between text-[10px] text-[#EFEFF0]/60">
                      <span>Governance Board</span>
                      <span className="text-[#FFBD59] font-semibold"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Dots */}
            <div className="flex items-center justify-center gap-2 pt-4">
              {boardMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollContainerTo(boardScrollRef.current, idx, boardMembers.length)}
                  aria-label={`Go to board member ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    boardIndex === idx ? 'w-6 bg-[#FFBD59]' : 'w-2 bg-purple-900'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[#41175E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#EFEFF0]/70 gap-4">
            <a
              href="mailto:inspirestemgirl@gmail.com?subject=Board%20Governance%20Inquiry"
              className="text-[#FFBD59] hover:text-white font-bold inline-flex items-center gap-1 flex-shrink-0 hover:translate-x-1 transition-all cursor-pointer"
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
