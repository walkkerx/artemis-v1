'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { schoolSections } from '@/lib/programs-data';
import { blogArticles } from '@/lib/artemis-data';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  goToPage: (page: string, program?: string) => void;
}

interface SearchResult {
  title: string;
  page: string;
  program?: string;
  category: string;
}

const searchIndex: SearchResult[] = [
  // Education
  { title: 'Education', page: 'education', category: 'Education' },
  { title: 'Undergraduate Study', page: 'undergraduate', category: 'Education' },
  { title: 'Undergraduate Curriculum', page: 'undergraduate_curriculum', category: 'Education' },
  { title: 'Programs of Study', page: 'programs', category: 'Education' },
  // Research
  { title: 'Research', page: 'research', category: 'Research' },
  { title: 'Centers of Inquiry', page: 'centers-of-inquiry', category: 'Research' },
  { title: 'Collegium Alliance', page: 'collegium-alliance', category: 'Research' },
  // Innovation
  { title: 'Innovation', page: 'innovation', category: 'Innovation' },
  // Admissions
  { title: 'Admissions + Aid', page: 'admissions', category: 'Admissions' },
  { title: 'Tuition & Expenses', page: 'tuition-expenses', category: 'Admissions' },
  { title: 'International Students', page: 'international-students', category: 'Admissions' },
  { title: 'Transfer Students', page: 'transfer-students', category: 'Admissions' },
  { title: 'Application Deadlines', page: 'application-deadlines', category: 'Admissions' },
  { title: 'Visit Campus', page: 'visit-campus', category: 'Admissions' },
  { title: 'Apply Now', page: 'apply', category: 'Admissions' },
  // Campus
  { title: 'Campus Life', page: 'campus', category: 'Campus' },
  // Colleges
  { title: 'Colleges', page: 'colleges', category: 'Colleges' },
  // About
  { title: 'About Artemis', page: 'about', category: 'About' },
  { title: 'The University', page: 'the-university', category: 'About' },
  { title: 'How We Are Run', page: 'how-we-are-run', category: 'About' },
  { title: 'Our People', page: 'our-people', category: 'About' },
  { title: 'Our History', page: 'history', category: 'About' },
  { title: 'Access at Artemis', page: 'access-at-artemis', category: 'About' },
  { title: 'Artemis in the World', page: 'artemis-in-the-world', category: 'About' },
  { title: 'Visit Us', page: 'visit-us', category: 'About' },
  { title: 'Careers', page: 'jobs', category: 'About' },
  { title: 'Contact Us', page: 'contact-us', category: 'About' },
  { title: 'Facts and Figures', page: 'facts', category: 'About' },
  { title: 'Artemis Glossary', page: 'glossary', category: 'About' },
  { title: 'Our Estate', page: 'estate', category: 'About' },
  { title: 'Brand', page: 'brand', category: 'About' },
  // Other
  { title: 'Journal / Blog', page: 'blog', category: 'Other' },
  { title: 'Give / Fundraising', page: 'fundraising', category: 'Other' },
  { title: 'Governance & Finance', page: 'governance-finance', category: 'About' },
  { title: 'Policies', page: 'policies', category: 'About' },
  { title: 'Strategic Plan', page: 'strategic-plan', category: 'About' },
  { title: 'Sustainability', page: 'sustainability', category: 'About' },
  { title: 'Equality and Diversity', page: 'equality', category: 'About' },
  // Experience
  { title: 'Artemis 2100 — Future of Education', page: 't1', category: 'Experience' },
];

/* ─── Graduate programmes ───
   GraduatePrograms.tsx keeps its programme list module-internal, so we mirror
   the canonical programme names here purely for search indexing. All ten map
   to the `graduate-coming-soon` route. */
const graduateProgramNames: string[] = [
  'Bachelor of Civil Law (BCL)',
  'Master of Public Policy (MPP)',
  'MPhil in Philosophy',
  'MPhil in Development Studies',
  'International PhD Academy',
  'MSt in Ageing, Longevity & Society',
  'MSc in Environmental Sustainability & Governance',
  'MSt in Heritage, Memory & Cultural Memory',
  'Summer Institute on Ageing',
  'Graduate Seminar in Logic & Foundations',
];

/* ─── Full search index ───
   Combines the static page index above with every undergraduate major (drawn
   from `schoolSections`), every blog/Journal article, and every graduate
   programme. Built once at module load. */
const fullSearchIndex: SearchResult[] = [
  ...searchIndex,
  // Undergraduate programs — one entry per major across all seven schools
  ...schoolSections.flatMap(section =>
    section.majors.map(major => ({
      title: major,
      page: 'program_detail',
      program: major,
      category: 'Programs',
    }))
  ),
  // Blog / Journal articles — `program` carries the slug so BlogArticlePage
  // (which looks up by slug) can resolve the article on navigation.
  ...blogArticles.map(article => ({
    title: article.title,
    page: 'blog_article',
    program: String(article.slug),
    category: 'Journal',
  })),
  // Graduate programmes — all route to the graduate-coming-soon page
  ...graduateProgramNames.map(name => ({
    title: name,
    page: 'graduate-coming-soon',
    program: name,
    category: 'Graduate',
  })),
];

export default function SearchOverlay({ isOpen, onClose, goToPage }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Ranked, fuzzy search across the full index.
  //   • exact title match  → 1000
  //   • title starts with  → 800
  //   • title contains     → 600
  //   • all query words in title (any order, partial) → 400
  //   • any query word in title → 200
  //   • category contains  → 100
  // Capped at 15 results, sorted by score descending.
  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);

    return fullSearchIndex
      .map(r => {
        const titleLower = r.title.toLowerCase();
        const catLower = r.category.toLowerCase();
        let score = 0;
        if (titleLower === q) score = 1000;
        else if (titleLower.startsWith(q)) score = 800;
        else if (titleLower.includes(q)) score = 600;
        else if (words.length > 1 && words.every(w => titleLower.includes(w))) score = 400;
        else if (words.some(w => titleLower.includes(w))) score = 200;
        else if (catLower.includes(q)) score = 100;
        return { r, score };
      })
      .filter(x => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15)
      .map(x => x.r);
  }, [query]);

  // Group ranked results by category (preserving rank order within each group
  // and the order in which categories first appear).
  const groupedResults = useMemo(() => {
    const groups: { category: string; items: SearchResult[] }[] = [];
    for (const r of filteredResults) {
      const last = groups[groups.length - 1];
      if (last && last.category === r.category) last.items.push(r);
      else groups.push({ category: r.category, items: [r] });
    }
    return groups;
  }, [filteredResults]);

  const handleSelect = useCallback((result: SearchResult) => {
    goToPage(result.page, result.program);
    onClose();
  }, [goToPage, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-start justify-center pt-[15vh] animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="bg-white w-full max-w-[640px] mx-4 shadow-2xl rounded-lg overflow-hidden border border-gray-200">
        {/* Search input */}
        <div className="flex items-center px-5 py-4 border-b border-gray-100 gap-3">
          <Search size={20} className="text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, programs, and resources..."
            className="flex-1 text-[15px] text-[#141414] placeholder-gray-400 outline-none bg-transparent"
            suppressHydrationWarning
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors" suppressHydrationWarning>
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        {query.trim().length > 0 && (
          <div className="max-h-[400px] overflow-y-auto py-2">
            {filteredResults.length > 0 ? (
              <>
                <div className="px-5 pb-1">
                  <p className="text-[11px] text-gray-400">
                    {filteredResults.length} {filteredResults.length === 1 ? 'result' : 'results'}
                  </p>
                </div>
                {groupedResults.map((group, gi) => (
                  <div key={gi}>
                    <div className="px-5 pt-2 pb-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        {group.category}
                      </p>
                    </div>
                    {group.items.map((result, ri) => (
                      <button
                        key={ri}
                        onClick={() => handleSelect(result)}
                        className="w-full flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors text-left group"
                        suppressHydrationWarning
                      >
                        <span className="text-[14px] font-medium text-[#141414] truncate">
                          {result.title}
                        </span>
                        <ArrowRight size={14} className="text-gray-300 group-hover:text-[#8A0000] group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                      </button>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-[14px] text-gray-400">No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}
          </div>
        )}

        {/* Quick links when empty */}
        {query.trim().length === 0 && (
          <div className="py-4 px-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Quick Links</p>
            <div className="flex flex-wrap gap-2">
              {['Programs', 'Admissions', 'Research', 'Campus Life', 'Colleges', 'Apply'].map((label) => {
                const pageMap: Record<string, string> = {
                  'Programs': 'programs',
                  'Admissions': 'admissions',
                  'Research': 'research',
                  'Campus Life': 'campus',
                  'Colleges': 'colleges',
                  'Apply': 'apply',
                };
                return (
                  <button
                    key={label}
                    onClick={() => { goToPage(pageMap[label]); onClose(); }}
                    className="px-3 py-1.5 text-[12px] font-medium text-gray-600 bg-gray-50 hover:bg-[#8A0000]/5 hover:text-[#8A0000] rounded transition-colors"
                    suppressHydrationWarning
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer hint */}
        <div className="px-5 py-2.5 border-t border-gray-100 bg-gray-50">
          <p className="text-[11px] text-gray-400">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[10px] font-mono">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
