'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import { schoolSections } from '@/lib/programs-data';
import {
  Atom, Cpu, Palette, Users, HeartPulse, GraduationCap, Briefcase,
  Search, X, ArrowRight, Layers, Sparkles, TrendingUp
} from 'lucide-react';

interface ProgramsOfStudyProps {
  goToPage: (page: string, program?: string) => void;
}

/* ─── Hook: animate on scroll ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── School icons ─── */
const SCHOOL_ICONS: Record<string, React.ElementType> = {
  'school-natural-sciences': Atom,
  'school-engineering-technology': Cpu,
  'school-arts-humanities': Palette,
  'school-social-sciences': Users,
  'school-health-medicine': HeartPulse,
  'school-education-human-development': GraduationCap,
  'school-business': Briefcase,
};

const TOTAL_MAJORS = schoolSections.reduce((sum, s) => sum + s.majors.length, 0);

/* Degree type colors */
const DEGREE_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  'B.S.': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  'B.A.': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'B.F.A.': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
};

function getDegree(major: string): string {
  if (major.includes('B.S.')) return 'B.S.';
  if (major.includes('B.F.A.')) return 'B.F.A.';
  if (major.includes('B.A.')) return 'B.A.';
  return 'Degree';
}

function cleanMajor(major: string): string {
  return major.replace(' (B.S.)', '').replace(' (B.A.)', '').replace(' (B.F.A.)', '');
}

export default function ProgramsOfStudy({ goToPage }: ProgramsOfStudyProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroAnim = useInView();
  const introAnim = useInView();

  const [activeSchoolId, setActiveSchoolId] = useState(schoolSections[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'mosaic' | 'list'>('mosaic');

  const activeSchool = schoolSections.find(s => s.id === activeSchoolId) || schoolSections[0];
  const ActiveIcon = SCHOOL_ICONS[activeSchoolId] || Sparkles;

  /* Filtered majors for the active school */
  const filteredMajors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return activeSchool.majors.filter(major => {
      const matchesSearch = !q || major.toLowerCase().includes(q);
      const matchesDegree = degreeFilter === 'all' || major.includes(degreeFilter);
      return matchesSearch && matchesDegree;
    });
  }, [activeSchool, searchQuery, degreeFilter]);

  /* Global search results (when searching across all schools) */
  const globalResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();
    return schoolSections.map(s => ({
      ...s,
      matches: s.majors.filter(m => m.toLowerCase().includes(q) && (degreeFilter === 'all' || m.includes(degreeFilter))),
    })).filter(s => s.matches.length > 0);
  }, [searchQuery, degreeFilter]);

  /* Degree distribution for the constellation */
  const degreeStats = useMemo(() => {
    const counts: Record<string, number> = { 'B.S.': 0, 'B.A.': 0, 'B.F.A.': 0 };
    schoolSections.forEach(s => s.majors.forEach(m => {
      const d = getDegree(m);
      if (counts[d] !== undefined) counts[d]++;
    }));
    return counts;
  }, []);

  const totalFiltered = globalResults?.reduce((sum, s) => sum + s.matches.length, 0) || filteredMajors.length;

  return (
    <div className="flex flex-col bg-white">
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[52vh] min-h-[400px] overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1594750852563-5ed8e0421d40?auto=format&fit=crop&q=80&w=1800"
            alt="Programs of Study"
            style={{ y: heroY }}
            className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
            <div ref={heroAnim.ref} className={`transition-all duration-700 ${heroAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-8 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Academic Catalogue 2026–2027</span>
              </div>
              <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-extrabold leading-[1.02] tracking-tighter text-white mb-6">
                Programs of Study
              </h1>
              <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">
                Seven schools. Sixty-plus degree programmes. One unified standard of excellence. Explore the full Artemis College catalogue — browse by school, filter by degree, or search across everything.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'explorer', label: 'Explorer' },
          { id: 'constellation', label: 'Degree Breakdown' },
        ]}
        activeSection="explorer"
      />

      {/* ── Degree Constellation ── */}
      <section id="constellation" className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-12 lg:py-16 scroll-mt-32">
        <div ref={introAnim.ref} className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-8">
            <div>
              <div className="mb-3 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Catalogue at a Glance</span>
              </div>
              <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter text-[#141414]">
                {TOTAL_MAJORS} programs across 7 schools
              </h2>
            </div>
            {/* Quick stats */}
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-[28px] font-black text-[#8A0000] leading-none">{schoolSections.length}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Schools</div>
              </div>
              <div className="text-center">
                <div className="text-[28px] font-black text-[#8A0000] leading-none">3</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Degree Types</div>
              </div>
              <div className="text-center">
                <div className="text-[28px] font-black text-[#8A0000] leading-none">35+</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Countries</div>
              </div>
            </div>
          </div>

          {/* Degree type bars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(degreeStats).map(([degree, count]) => {
              const colors = DEGREE_COLORS[degree];
              const pct = Math.round((count / TOTAL_MAJORS) * 100);
              return (
                <div key={degree} className={`rounded-xl border p-5 ${colors.bg} ${colors.border}`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`}></span>
                      <span className={`text-[14px] font-bold ${colors.text}`}>{degree}</span>
                    </div>
                    <span className={`text-[24px] font-black ${colors.text}`}>{count}</span>
                  </div>
                  <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${colors.dot}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 mt-1.5">{pct}% of all programs</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Search & Filter Bar ── */}
      <section id="explorer" className="bg-white border-y border-gray-200 sticky top-[102px] z-20 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search all programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-[14px] focus:outline-none focus:ring-2 focus:ring-[#8A0000]/20 focus:border-[#8A0000] transition-all bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Degree filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDegreeFilter('all')}
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-all ${degreeFilter === 'all' ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000]'}`}
              >
                All
              </button>
              {Object.entries(DEGREE_COLORS).map(([degree, colors]) => (
                <button
                  key={degree}
                  onClick={() => setDegreeFilter(degree)}
                  className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-lg border transition-all flex items-center gap-1.5 ${degreeFilter === degree ? `${colors.bg} ${colors.text} ${colors.border}` : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`}></span>
                  {degree}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('mosaic')}
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${viewMode === 'mosaic' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                Mosaic
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Results count */}
          {(searchQuery || degreeFilter !== 'all') && (
            <div className="mt-2 text-[12px] font-medium text-gray-500">
              {totalFiltered} program{totalFiltered !== 1 ? 's' : ''} found
            </div>
          )}
        </div>
      </section>

      {/* ── Main Explorer: School tabs + Program display ── */}
      <section className="py-8 lg:py-12">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20">
          {globalResults ? (
            /* ── Global search results ── */
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-2">
                <Search className="w-5 h-5 text-[#8A0000]" />
                <h2 className="text-[20px] font-bold text-[#141414]">Search Results</h2>
              </div>
              {globalResults.map(school => {
                const Icon = SCHOOL_ICONS[school.id] || Sparkles;
                return (
                  <div key={school.id}>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveSchoolId(school.id); }}
                      className="flex items-center gap-2 mb-4 group"
                    >
                      <Icon className="w-4 h-4 text-[#8A0000]" />
                      <span className="text-[14px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors">{school.heading}</span>
                      <span className="text-[11px] text-gray-400">({school.matches.length})</span>
                    </button>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {school.matches.map((major, i) => (
                        <ProgramTile key={i} major={major} index={i} onClick={() => goToPage('program_detail', major)} compact />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ── Two-panel explorer ── */
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8">
              {/* ── Left: School selector (vertical tabs) ── */}
              <aside className="lg:sticky lg:top-[180px] lg:self-start">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3 px-2">Schools</div>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible hide-scrollbar pb-2 lg:pb-0">
                  {schoolSections.map((school, i) => {
                    const Icon = SCHOOL_ICONS[school.id] || Sparkles;
                    const isActive = activeSchoolId === school.id;
                    return (
                      <button
                        key={school.id}
                        onClick={() => setActiveSchoolId(school.id)}
                        className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all whitespace-nowrap lg:whitespace-normal text-left ${
                          isActive
                            ? 'bg-[#8A0000] text-white border-[#8A0000] shadow-lg shadow-[#8A0000]/20'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#8A0000]/40 hover:shadow-sm'
                        }`}
                      >
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#8A0000]'}`} />
                        <div className="min-w-0">
                          <div className="text-[13px] font-bold leading-tight truncate">{school.label}</div>
                          <div className={`text-[10px] font-mono ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                            {school.majors.length} programs
                          </div>
                        </div>
                        {isActive && (
                          <span className="hidden lg:block ml-auto text-[10px] font-mono text-white/40">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Apply CTA */}
                <div className="hidden lg:block mt-6 p-5 bg-[#141414] text-white rounded-xl">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Ready?</div>
                  <p className="text-[13px] text-gray-300 leading-relaxed mb-4">Apply to {activeSchool.label} and join the next cohort.</p>
                  <button
                    onClick={() => goToPage('apply')}
                    className="w-full px-4 py-2.5 bg-white text-[#141414] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </aside>

              {/* ── Right: Active school's programs ── */}
              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSchoolId + viewMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* School header */}
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center">
                          <ActiveIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">
                            School {String(schoolSections.findIndex(s => s.id === activeSchoolId) + 1).padStart(2, '0')}
                          </div>
                          <h2 className="text-[24px] md:text-[28px] font-extrabold tracking-tighter text-[#141414] leading-tight">
                            {activeSchool.heading}
                          </h2>
                        </div>
                      </div>
                      <p className="text-[14px] text-gray-600 leading-relaxed max-w-3xl">{activeSchool.desc}</p>
                    </div>

                    {/* Programs display */}
                    {filteredMajors.length === 0 ? (
                      <div className="py-16 text-center">
                        <p className="text-[14px] text-gray-400">No programs match your filters in this school.</p>
                        <button
                          onClick={() => { setSearchQuery(''); setDegreeFilter('all'); }}
                          className="mt-4 text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:underline"
                        >
                          Clear Filters
                        </button>
                      </div>
                    ) : viewMode === 'mosaic' ? (
                      /* ── Mosaic view: featured first program + grid ── */
                      <div className="space-y-4">
                        {/* Featured program */}
                        {filteredMajors[0] && (
                          <div
                            onClick={() => goToPage('program_detail', filteredMajors[0])}
                            className="group cursor-pointer relative h-44 sm:h-52 rounded-2xl overflow-hidden border border-gray-200 hover:border-[#8A0000]/40 hover:shadow-xl transition-all"
                          >
                            <img
                              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200"
                              alt={cleanMajor(filteredMajors[0])}
                              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                            <div className="relative z-10 h-full flex flex-col justify-center p-6 sm:p-8 max-w-md">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#8A0000] text-white">
                                  Featured
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20 text-white backdrop-blur-sm">
                                  {getDegree(filteredMajors[0])}
                                </span>
                              </div>
                              <h3 className="text-[22px] sm:text-[26px] font-extrabold text-white leading-tight mb-2">
                                {cleanMajor(filteredMajors[0])}
                              </h3>
                              <p className="text-[12px] text-white/70 leading-relaxed mb-3 line-clamp-2">
                                The study and application of {cleanMajor(filteredMajors[0]).toLowerCase()} to solve global challenges through interdisciplinary research and practice.
                              </p>
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-white group-hover:text-[#D4A853] transition-colors">
                                Explore Program <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Remaining programs as tiles */}
                        {filteredMajors.length > 1 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {filteredMajors.slice(1).map((major, i) => (
                              <ProgramTile
                                key={i}
                                major={major}
                                index={i + 1}
                                onClick={() => goToPage('program_detail', major)}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      /* ── List view ── */
                      <div className="space-y-0">
                        {filteredMajors.map((major, i) => {
                          const degree = getDegree(major);
                          const colors = DEGREE_COLORS[degree];
                          return (
                            <button
                              key={i}
                              onClick={() => goToPage('program_detail', major)}
                              className="group w-full flex items-center gap-4 py-4 border-b border-gray-100 hover:border-[#8A0000]/30 transition-colors text-left"
                            >
                              <span className="text-[10px] font-mono text-gray-300 w-6 shrink-0">
                                {String(i + 1).padStart(2, '0')}
                              </span>
                              <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
                              <span className="flex-1 text-[15px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors truncate">
                                {cleanMajor(major)}
                              </span>
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.bg} ${colors.text} shrink-0`}>
                                {degree}
                              </span>
                              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-1 transition-all shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* School footer */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-[12px] text-gray-400 font-mono">
                        {filteredMajors.length} of {activeSchool.majors.length} programs shown
                      </span>
                      <button
                        onClick={() => goToPage('apply')}
                        className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-[#8A0000] hover:underline transition-all"
                      >
                        Apply to {activeSchool.label}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── DARK CTA BAND ── */}
      <section className="bg-[#141414] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Can't Decide?</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter mb-3">
              Browse all programs. Find your field.
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Every program comes with a full 4-year curriculum, learning outcomes, faculty, and career paths. Start exploring — or apply and decide later.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => goToPage('apply')}
              className="px-6 py-3 bg-white text-[#141414] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              Apply Now
            </button>
            <button
              onClick={() => goToPage('prototype-pathways')}
              className="px-6 py-3 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Prototype Pathways
            </button>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}

/* ─── Program Tile (compact card for mosaic view) ─── */
function ProgramTile({ major, index, onClick, compact }: { major: string; index: number; onClick: () => void; compact?: boolean }) {
  const degree = getDegree(major);
  const colors = DEGREE_COLORS[degree];
  const name = cleanMajor(major);

  const images = [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400',
  ];
  const image = images[index % images.length];

  if (compact) {
    return (
      <button
        onClick={onClick}
        className="group flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-[#8A0000]/40 hover:shadow-md transition-all text-left"
      >
        <span className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`}></span>
        <span className="flex-1 text-[13px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors truncate">{name}</span>
        <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} shrink-0`}>{degree}</span>
        <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#8A0000] transition-colors shrink-0" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#8A0000]/40 hover:shadow-lg transition-all text-left flex flex-col"
    >
      {/* Image */}
      <div className="relative h-24 overflow-hidden bg-gray-100 shrink-0">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <span className={`absolute top-2 left-2 text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${colors.bg} ${colors.text} backdrop-blur-sm`}>
          {degree}
        </span>
      </div>
      {/* Body */}
      <div className="p-3 flex-1 flex flex-col">
        <span className="text-[12px] font-bold text-gray-900 group-hover:text-[#8A0000] transition-colors leading-tight line-clamp-2 min-h-[30px]">
          {name}
        </span>
      </div>
    </button>
  );
}
