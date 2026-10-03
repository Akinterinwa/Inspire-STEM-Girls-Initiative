import React, { useState } from 'react';
import { PageId, ProgramCategory, ProgramItem } from '../../types';
import { programCategories, programsData } from '../../data/siteData';
import { AnimatedHeading } from '../AnimatedHeading';
import { SmartCounter } from '../CountUp';
import {
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Building,
  ArrowRight,
  Filter,
  PlusCircle,
  Camera,
} from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgram: (program: ProgramItem) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onSelectProgram,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPrograms =
    selectedCategory === 'all'
      ? programsData
      : programsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="py-12 sm:py-16 bg-white space-y-16 selection:bg-[#2C0E40] selection:text-[#F0C747]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedHeading
            as="h1"
            accent
            subtitle="Our Interventions & Delivery"
            subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight text-left"
          >
            Programs & Projects
          </AnimatedHeading>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Every program has a distinct purpose: to demystify science, dismantle financial barriers, pair girls with role models, and establish enduring academic pathways.
          </p>
        </div>

        {/* The 4 Category Cards Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {programCategories.slice(1).map((cat) => {
            const isCurrent = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-6 rounded-2xl text-left border transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 cursor-pointer ${
                  isCurrent
                    ? 'border-[#2C0E40] bg-[#EFEFF0] shadow-md ring-1 ring-[#2C0E40]'
                    : 'border-[#E3E3E5] bg-[#EFEFF0]/40 hover:bg-[#EFEFF0] hover:border-[#2C0E40]/40'
                }`}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2C0E40] block mb-2">
                    Core Category
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {cat.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E3E3E5] flex items-center justify-between text-xs font-bold text-[#2C0E40]">
                  <span>Filter by category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar & Program Projects Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E3E3E5] mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#2C0E40]" />
            <span className="text-sm font-bold text-slate-800">
              Showing {filteredPrograms.length} {filteredPrograms.length === 1 ? 'Project' : 'Projects'}
            </span>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#EFEFF0] rounded-xl border border-[#E3E3E5]">
            {programCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#2C0E40] text-[#F0C747] shadow-xs'
                    : 'text-slate-600 hover:text-[#2C0E40] hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl border border-[#E3E3E5] overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-[#2C0E40]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Photo & Badge */}
                <div
                  onClick={() => onSelectProgram(program)}
                  className="h-64 overflow-hidden relative group cursor-pointer"
                >
                  <img
                    src={program.image}
                    alt={program.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#150520]/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#2C0E40] text-[#F0C747] text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                      {program.categoryLabel}
                    </span>
                  </div>

                  {program.images && program.images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-[#150520]/85 backdrop-blur-xs text-[#F0C747] px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 shadow-sm border border-[#F0C747]/30">
                      <Camera className="w-3.5 h-3.5 text-[#F0C747]" />
                      <span>{program.images.length} Photos (Auto-Slider)</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-xs text-[#F0C747] font-semibold block mb-0.5">
                      {program.status}
                    </span>
                    <h3 className="text-xl font-bold leading-snug drop-shadow-sm group-hover:text-[#F0C747] transition-colors">
                      {program.name}
                    </h3>
                  </div>
                </div>

                {/* Project Details Grid */}
                <div className="p-6 space-y-5">
                  {/* Meta items */}
                  <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#EFEFF0]/60 border border-[#E3E3E5] text-xs">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Date</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0" />
                        {program.date}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Location</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0" />
                        <span className="truncate">{program.location}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Girls Reached</span>
                      <span className="font-bold text-[#2C0E40] flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0" />
                        <SmartCounter value={`${program.girlsReached}`} /> Girls
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[11px]">Age Group</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
                        <Award className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0" />
                        <span className="truncate">{program.ageGroup.split('(')[0]}</span>
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {program.shortDescription}
                  </p>

                  {/* Outcomes List */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                      Key Outcomes
                    </span>
                    <ul className="space-y-1.5">
                      {program.outcomes.slice(0, 2).map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2C0E40] flex-shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Partners */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Partners
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {program.partners.map((partner, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-[#EFEFF0] text-[#2C0E40] font-medium px-2 py-0.5 rounded border border-[#E3E3E5]"
                        >
                          {partner}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 pt-0 border-t border-[#EFEFF0] mt-2 flex items-center justify-between">
                <button
                  onClick={() => onSelectProgram(program)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#F0C747]" />
                  <span>View Project Dossier & Photo Slideshow ({program.images?.length || 1} Photos)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bring ISG to your school / community CTA */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-[#2C0E40] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Request a STEM Workshop for Your School or Community
            </h3>
            <p className="text-[#EFEFF0]/85 text-sm mt-1 max-w-2xl">
              We collaborate directly with public secondary school principals and community organizations to bring hands-on experiments, mobile labs, and mentors to girls.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigate('get-involved');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#F0C747] hover:bg-[#DCB132] text-[#2C0E40] transition-all flex-shrink-0 shadow-md hover:shadow-lg hover:shadow-amber-500/25 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
          >
            Apply for School Partnership
          </button>
        </div>
      </section>
    </div>
  );
};
