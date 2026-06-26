'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';

interface GraduateProgramsProps {
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

/* ─── Types ─── */
type ProgramFormat = 'MPhil' | 'MSt' | 'MPP' | 'BCL' | 'MBA' | 'PhD' | 'PhD Academy' | 'Graduate Seminar' | 'Summer School' | 'Professional Master';
type ProgramMode = 'Full-time' | 'Part-time' | 'Intensive' | 'Residential';

interface GradProgram {
  id: string;
  name: string;
  award: string; // "Master of Philosophy (MPhil)"
  format: ProgramFormat;
  duration: string;
  mode: ProgramMode;
  school: string; // "School of Law"
  location: string; // "Venice Node"
  tagline: string;
  overview: string;
  highlights: string[];
  entryRequirements: string[];
  director: string;
  image: string;
  flagship?: boolean; // Oxford-inspired flagship
  viu?: boolean; // VIU-inspired interdisciplinary
  credits?: string;
  tuition?: string;
}

/* ─── Oxford-inspired flagship programs ─── */
const flagshipPrograms: GradProgram[] = [
  {
    id: 'bcl',
    name: 'Bachelor of Civil Law (BCL)',
    award: 'Bachelor of Civil Law',
    format: 'BCL',
    duration: '1 year (3 terms)',
    mode: 'Full-time',
    school: 'School of Law & Governance',
    location: 'Venice Node — San Servolo',
    tagline: 'The world\'s premier graduate law degree, reimagined for a comparative, global era.',
    overview: 'The Artemis BCL is a one-year, intensive graduate law degree modeled on the historic Oxford BCL but reimagined for the comparative, transnational challenges of the 21st century. Students engage with common law, civil law, and customary legal traditions side by side, drawing on the Venice node\'s position at the intersection of European, Mediterranean, and global legal orders.',
    highlights: [
      'Comparative jurisprudence across common, civil, and religious legal traditions',
      'Specialization streams in Technology Law, Climate Law, and Rights of Future Generations',
      'Mentorship from sitting judges at the International Court of Justice and European Court of Human Rights',
      'Optional term at the Oxford, Cambridge, or Yale law faculty via the Collegium Exchange',
      'Capstone: a publishable case comment or reform proposal for a partner jurisdiction',
    ],
    entryRequirements: [
      'First-class or strong upper-second undergraduate law degree (or equivalent civil-law qualification)',
      'Demonstrated research writing sample (5,000–8,000 words)',
      'Two academic references',
      'English proficiency (IELTS 7.5 or equivalent) for non-native speakers',
    ],
    director: 'Prof. Elena Marchetti',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=1600',
    flagship: true,
    credits: '90 ECTS',
    tuition: '€38,000 (full programme)',
  },
  {
    id: 'mpp',
    name: 'Master of Public Policy (MPP)',
    award: 'Master of Public Policy',
    format: 'MPP',
    duration: '1 year (intensive)',
    mode: 'Full-time',
    school: 'School of Social Sciences',
    location: 'Venice Node — San Servolo',
    tagline: 'A one-year, intensive policy degree for the next generation of public leaders.',
    overview: 'The Artemis MPP is a one-year, intensive taught degree that prepares students for senior roles in government, international organizations, and civil society. Built on the Oxford MPP model and the global network of Artemis nodes, the program combines rigorous policy analysis with hands-on engagement with real policy problems in partner governments and multilateral institutions.',
    highlights: [
      'Core curriculum in economics, quantitative methods, political philosophy, and policy implementation',
      'Three policy specialization tracks: Climate & Energy, AI & Digital Governance, Global Health',
      'Required summer placement at a partner government, multilateral institution, or major NGO',
      'Weekly policy labs with sitting ministers, central bankers, and senior civil servants',
      'Capstone: a commissioned policy brief delivered to a real client government or organization',
    ],
    entryRequirements: [
      'Undergraduate degree in any discipline (minimum upper-second or equivalent)',
      'Minimum 2 years of professional experience preferred (public sector, NGO, or relevant private sector)',
      'Personal statement (1,000 words) articulating policy interests and career goals',
      'Two professional or academic references',
      'English proficiency (IELTS 7.5 or equivalent) for non-native speakers',
    ],
    director: 'Prof. Hiroshi Tanaka',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&q=80&w=1600',
    flagship: true,
    credits: '90 ECTS',
    tuition: '€42,000 (full programme)',
  },
  {
    id: 'mphil-philosophy',
    name: 'MPhil in Philosophy',
    award: 'Master of Philosophy',
    format: 'MPhil',
    duration: '2 years (6 terms)',
    mode: 'Full-time',
    school: 'School of Arts & Humanities',
    location: 'Venice Node — San Servolo',
    tagline: 'A two-year research master\'s at the frontier of contemporary philosophy.',
    overview: 'The Artemis MPhil in Philosophy is a two-year research-intensive degree modeled on the Oxford BPhil/MPhil tradition. It combines a structured first-year curriculum in core analytic and continental philosophy with a second year dedicated entirely to original research and thesis writing. The program is the standard preparation for doctoral study at leading philosophy departments worldwide.',
    highlights: [
      'First-year structured curriculum: Logic, Metaphysics, Epistemology, Ethics, Philosophy of Mind, Philosophy of Language',
      'Second-year thesis (30,000–40,000 words) under individual supervision',
      'Specialization streams in AI Ethics, Phenomenology, Political Philosophy, and Comparative Philosophy',
      'Weekly graduate seminar with visiting philosophers from Oxford, Princeton, Heidelberg, and Kyoto',
      'Automatic consideration for the Artemis PhD in Philosophy for students achieving Distinction',
    ],
    entryRequirements: [
      'Strong undergraduate degree in Philosophy (minimum upper-second or equivalent)',
      'Substantial philosophy writing sample (3,000–5,000 words)',
      'Two academic references, at least one from a philosopher',
      'Research proposal (1,500 words) outlining intended thesis area',
      'English proficiency (IELTS 7.5 or equivalent) for non-native speakers',
    ],
    director: 'Prof. Marcus Aurelius-Vance',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1600',
    flagship: true,
    credits: '120 ECTS',
    tuition: '€28,000 per year',
  },
  {
    id: 'mphil-development',
    name: 'MPhil in Development Studies',
    award: 'Master of Philosophy',
    format: 'MPhil',
    duration: '2 years (6 terms)',
    mode: 'Full-time',
    school: 'School of Social Sciences',
    location: 'Kigali Node',
    tagline: 'A two-year field-integrated master\'s on the political economy of development.',
    overview: 'The Artemis MPhil in Development Studies is a two-year degree that combines rigorous political-economy training with sustained field engagement at the Kigali Node. Students spend the first year in coursework at Venice, the second year in field research across East Africa, and graduate with both a thesis and a portfolio of practical work with partner organizations.',
    highlights: [
      'First-year coursework: Political Economy of Development, Agrarian Studies, Anthropology of Development, Quantitative Methods',
      'Second-year field research in East Africa, hosted at the Kigali Node with partner organizations',
      'Specialization in: Conflict & State-building, Agrarian Transformation, Climate Adaptation, or Industrial Policy',
      'Mentorship from senior practitioners at the African Development Bank, UNECA, and partner governments',
      'Thesis (40,000–50,000 words) based on original field research',
    ],
    entryRequirements: [
      'Undergraduate degree in social sciences, humanities, or relevant field (minimum upper-second or equivalent)',
      'Demonstrated interest in development through prior study, work, or volunteering',
      'Two academic or professional references',
      'Research proposal (2,000 words) outlining intended field research area',
      'English proficiency (IELTS 7.0 or equivalent) for non-native speakers',
    ],
    director: 'Prof. Aisha Mwangi',
    image: 'https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&q=80&w=1600',
    flagship: true,
    credits: '120 ECTS',
    tuition: '€24,000 per year',
  },
];

/* ─── VIU-inspired interdisciplinary programs ─── */
const viuPrograms: GradProgram[] = [
  {
    id: 'phd-academy',
    name: 'International PhD Academy',
    award: 'PhD Academy Certificate',
    format: 'PhD Academy',
    duration: '4–6 weeks (intensive)',
    mode: 'Intensive',
    school: 'Cross-School (Interdisciplinary)',
    location: 'Venice Node — San Servolo',
    tagline: 'Intensive interdisciplinary training for advanced PhDs and junior researchers.',
    overview: 'Inspired by Venice International University\'s PhD Academy model, the Artemis International PhD Academy is a 4–6 week intensive residential program that brings together advanced PhD students and junior researchers from across the global network. Each Academy focuses on a major societal challenge and combines disciplinary depth with transversal skills training in research communication, ethics, and collaboration.',
    highlights: [
      'Annual theme rotates: AI & Society, Climate Adaptation, Democratic Resilience, Longevity & Ageing',
      'Daily seminars led by faculty from across the Artemis Collegium and partner universities',
      'Parallel transversal skills track: research communication, ethics, grant writing, cross-disciplinary collaboration',
      'Fellows present their own research in weekly peer workshops',
      'Alumni network of 2,000+ Academy fellows across 60+ countries',
    ],
    entryRequirements: [
      'Current enrollment in a PhD program, or recent PhD (within 3 years)',
      'Research abstract (500 words) and CV',
      'Letter of support from PhD supervisor or department',
      'Demonstrated relevance of research to the annual theme',
    ],
    director: 'Prof. Elena Marchetti',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '8 ECTS',
    tuition: '€3,500 (includes accommodation; scholarships available)',
  },
  {
    id: 'ageing-society',
    name: 'MSt in Ageing, Longevity & Society',
    award: 'Master of Studies (MSt)',
    format: 'Professional Master',
    duration: '2 years (part-time)',
    mode: 'Part-time',
    school: 'School of Health & Medicine',
    location: 'Venice Node — San Servolo',
    tagline: 'A part-time master\'s on the science, policy, and ethics of an ageing world.',
    overview: 'Inspired by VIU\'s Program on Ageing and Summer Institute on Ageing, the Artemis MSt in Ageing, Longevity & Society is a two-year part-time master\'s for clinicians, policymakers, and researchers working in ageing-related fields. The program integrates the biology of ageing, the economics of longevity, the ethics of care, and the design of age-friendly systems.',
    highlights: [
      'Six intensive residential modules (2 weeks each, twice per year) at the Venice Node',
      'Biology of ageing, geroscience, and longevity medicine',
      'Health economics of ageing populations and pension/fiscal sustainability',
      'Ethics of care, end-of-life, and intergenerational justice',
      'Design of age-friendly cities, technologies, and institutions',
      'Capstone: a policy brief or research project applied to the student\'s own context',
    ],
    entryRequirements: [
      'Undergraduate degree in medicine, health sciences, social sciences, or relevant field',
      '3+ years professional experience in ageing-related field (clinical, policy, research, or industry)',
      'Two professional references',
      'Personal statement (1,000 words) articulating motivation and intended capstone area',
    ],
    director: 'Prof. Lars Lindqvist',
    image: 'https://images.unsplash.com/photo-1581579438747-104c53e7cb71?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '90 ECTS',
    tuition: '€18,000 per year',
  },
  {
    id: 'environmental-sustainability',
    name: 'MSc in Environmental Sustainability & Governance',
    award: 'Master of Science (MSc)',
    format: 'Professional Master',
    duration: '1.5 years (3 terms + field placement)',
    mode: 'Residential',
    school: 'School of Natural Sciences',
    location: 'Reykjavik Node',
    tagline: 'Where ecological science meets the politics of planetary boundaries.',
    overview: 'Inspired by VIU\'s TEN (Tower of Environmental Sciences) Program, the Artemis MSc in Environmental Sustainability & Governance trains students to operate at the interface of ecological science and policy. The program is residential at the Reykjavik Node, with a required field placement at one of Artemis\'s climate research stations (Cape Town, San Joaquin, or Svalbard).',
    highlights: [
      'Core science: climate systems, biodiversity, biogeochemical cycles, earth observation',
      'Core governance: international environmental law, climate policy, environmental economics',
      'Required 3-month field placement at an Artemis climate research station',
      'Specialization in: Climate Adaptation, Biodiversity Governance, or Just Transition',
      'Capstone: a co-authored policy brief or research paper submitted to a partner body (UNEP, IPBES, or national government)',
    ],
    entryRequirements: [
      'Undergraduate degree in environmental science, biology, chemistry, economics, political science, or law',
      'Demonstrated quantitative aptitude (calculus and statistics preferred)',
      'Two academic or professional references',
      'Personal statement (1,000 words)',
    ],
    director: 'Prof. Hana Yamato',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '90 ECTS',
    tuition: '€26,000 (full programme)',
  },
  {
    id: 'heritage-memory',
    name: 'MSt in Heritage, Memory & Cultural Memory',
    award: 'Master of Studies (MSt)',
    format: 'Professional Master',
    duration: '1 year (3 terms)',
    mode: 'Full-time',
    school: 'School of Arts & Humanities',
    location: 'Venice Node — San Servolo',
    tagline: 'A year in Venice studying how civilizations remember, restore, and forget.',
    overview: 'Set in Venice — a city that has spent a millennium negotiating between memory and the sea — the Artemis MSt in Heritage, Memory & Cultural Memory is a one-year full-time master\'s for future curators, conservationists, and cultural policymakers. The program combines seminars in critical heritage studies with hands-on engagement with Venice\'s museums, archives, and conservation laboratories.',
    highlights: [
      'Critical heritage studies: intangible heritage, contested heritage, post-colonial restitution',
      'Conservation science: traditional materials, climate-driven deterioration, digital documentation',
      'Cultural policy: UNESCO frameworks, EU cultural policy, national heritage law',
      'Weekly site visits to Venetian museums, archives, and conservation labs',
      'Capstone: a conservation project, exhibition proposal, or policy brief',
    ],
    entryRequirements: [
      'Undergraduate degree in art history, history, archaeology, architecture, or related field',
      'Reading knowledge of at least one European language other than English (Italian, French, or German preferred)',
      'Two academic references',
      'Personal statement (1,000 words)',
    ],
    director: 'Prof. Isabella Contarini',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '90 ECTS',
    tuition: '€22,000 (full programme)',
  },
];

/* ─── Short-form VIU-inspired activities ─── */
const intensiveActivities: GradProgram[] = [
  {
    id: 'summer-school-ageing',
    name: 'Summer Institute on Ageing',
    award: 'Summer School Certificate',
    format: 'Summer School',
    duration: '2 weeks (June)',
    mode: 'Intensive',
    school: 'School of Health & Medicine',
    location: 'Venice Node — San Servolo',
    tagline: 'A two-week state-of-the-art immersion in ageing research.',
    overview: 'The Artemis Summer Institute on Ageing is a two-week intensive program that brings together advanced PhDs, post-docs, and early-career clinicians and policymakers for a rigorous survey of contemporary ageing research. Directly modeled on VIU\'s long-running Summer Institute on Ageing, the program is the flagship short-form offering of the Ageing & Longevity research node.',
    highlights: [
      'Daily lectures from leading geroscience and ageing-policy researchers',
      'Multidisciplinary cohort spanning biology, medicine, economics, and ethics',
      'Poster sessions and short talks by participants',
      'Network-building dinners and site visits',
    ],
    entryRequirements: [
      'Current PhD student, post-doc, or equivalent professional experience',
      'Research abstract (300 words)',
    ],
    director: 'Prof. Lars Lindqvist',
    image: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '4 ECTS',
    tuition: '€1,800 (includes accommodation)',
  },
  {
    id: 'graduate-seminar-logic',
    name: 'Graduate Seminar in Logic & Foundations',
    award: 'Seminar Certificate',
    format: 'Graduate Seminar',
    duration: '1 week (intensive)',
    mode: 'Intensive',
    school: 'School of Natural Sciences',
    location: 'Venice Node — San Servolo',
    tagline: 'A week-long intensive seminar at the frontier of logic.',
    overview: 'Inspired by VIU\'s Graduate Seminar format (such as the Seminar on Epistemic Logic), the Artemis Graduate Seminar in Logic & Foundations is a one-week intensive residential seminar for advanced graduate students and researchers. Each iteration focuses on a single topic at the frontier of mathematical or philosophical logic.',
    highlights: [
      'Single-topic deep dive, rotating annually (modal logic, set theory, type theory, etc.)',
      'Limited to 20 participants for intensive discussion',
      'Daily lectures and problem sessions led by two visiting experts',
      'Optional project presentation by participants',
    ],
    entryRequirements: [
      'Advanced graduate standing in mathematics, philosophy, or computer science',
      'Letter of support from supervisor',
    ],
    director: 'Prof. Marcus Aurelius-Vance',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1600',
    viu: true,
    credits: '2 ECTS',
    tuition: '€800 (includes accommodation)',
  },
];

/* ─── On This Page tabs ─── */
const pageSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'flagship', label: 'Flagship Programs' },
  { id: 'interdisciplinary', label: 'Interdisciplinary Programs' },
  { id: 'intensive', label: 'Intensive Activities' },
  { id: 'how-to-apply', label: 'How to Apply' },
  { id: 'funding', label: 'Funding & Fees' },
];

const formatBadgeColors: Record<ProgramFormat, string> = {
  'MPhil': 'bg-[#8A0000]/10 text-[#8A0000] border-[#8A0000]/20',
  'MSt': 'bg-blue-50 text-blue-700 border-blue-200',
  'MPP': 'bg-purple-50 text-purple-700 border-purple-200',
  'BCL': 'bg-amber-50 text-amber-700 border-amber-200',
  'MBA': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'PhD': 'bg-[#141414] text-white border-[#141414]',
  'PhD Academy': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Graduate Seminar': 'bg-pink-50 text-pink-700 border-pink-200',
  'Summer School': 'bg-orange-50 text-orange-700 border-orange-200',
  'Professional Master': 'bg-teal-50 text-teal-700 border-teal-200',
};

function ProgramCard({ program, onSelect }: { program: GradProgram; onSelect: (p: GradProgram) => void }) {
  return (
    <div
      onClick={() => onSelect(program)}
      className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#8A0000]/40 hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-44 overflow-hidden bg-gray-50 shrink-0">
        <img src={program.image}
          alt={program.name}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          referrerPolicy="no-referrer" loading="lazy"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${formatBadgeColors[program.format]}`}>
            {program.format}
          </span>
          {program.flagship && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">
              Flagship
            </span>
          )}
          {program.viu && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 text-[#141414] border border-white">
              Interdisciplinary
            </span>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="text-[10px] font-mono uppercase tracking-wider opacity-80 mb-1">{program.school}</div>
          <h3 className="text-[17px] font-bold leading-tight tracking-tight">{program.name}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-[13px] text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">{program.tagline}</p>
        <div className="border-t border-gray-100 pt-3 grid grid-cols-2 gap-2 text-[10px] font-mono uppercase tracking-wider text-gray-400">
          <div>
            <div className="opacity-60">Duration</div>
            <div className="text-[#141414] font-semibold normal-case tracking-normal text-[11px]">{program.duration}</div>
          </div>
          <div>
            <div className="opacity-60">Location</div>
            <div className="text-[#141414] font-semibold normal-case tracking-normal text-[11px]">{program.location}</div>
          </div>
        </div>
        <button className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] group-hover:underline text-left">
          View programme details →
        </button>
      </div>
    </div>
  );
}

function ProgramDetailModal({ program, onClose }: { program: GradProgram; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 z-[200] flex items-center justify-center p-4 lg:p-10 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors z-10" aria-label="Close">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Hero */}
        <div className="relative h-56 overflow-hidden">
          <img src={program.image} alt={program.name} className="absolute inset-0 w-full h-full object-cover grayscale" referrerPolicy="no-referrer" loading="lazy"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${formatBadgeColors[program.format]}`}>{program.format}</span>
              {program.flagship && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">Flagship</span>}
              {program.viu && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 text-[#141414]">Interdisciplinary</span>}
            </div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-white/70 mb-1">{program.school}</div>
            <h2 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">{program.name}</h2>
            <p className="text-[14px] text-white/80 mt-1">{program.award}</p>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-8">
          {/* Quick facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-gray-100">
            {[
              { label: 'Duration', value: program.duration },
              { label: 'Mode', value: program.mode },
              { label: 'Credits', value: program.credits || '—' },
              { label: 'Tuition', value: program.tuition || '—' },
            ].map((f) => (
              <div key={f.label}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{f.label}</div>
                <div className="text-[13px] font-semibold text-[#141414] leading-tight">{f.value}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Tagline</div>
            <p className="text-[17px] font-semibold text-[#141414] leading-snug italic">{program.tagline}</p>
          </div>

          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-widest text-gray-400 mb-3">Programme Overview</h3>
            <p className="text-[14px] text-gray-700 leading-relaxed">{program.overview}</p>
          </div>

          <div>
            <h3 className="text-[14px] font-bold uppercase tracking-widest text-gray-400 mb-3">Programme Highlights</h3>
            <ul className="space-y-2.5">
              {program.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] text-gray-700 leading-relaxed">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center text-[10px] font-bold mt-0.5">{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-gray-400 mb-3">Entry Requirements</h3>
              <ul className="space-y-2">
                {program.entryRequirements.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700 leading-relaxed">
                    <span className="text-[#8A0000] mt-1">▸</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[14px] font-bold uppercase tracking-widest text-gray-400 mb-3">Programme Director</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3">
                  <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(program.director)}&background=random&size=80`}
                    alt={program.director}
                    className="w-12 h-12 rounded-full" loading="lazy"/>
                  <div>
                    <div className="text-[14px] font-bold text-[#141414]">{program.director}</div>
                    <div className="text-[11px] text-gray-500 uppercase tracking-wider">Programme Director</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Location</div>
                  <div className="text-[13px] text-[#141414]">{program.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <button
              onClick={() => { onClose(); setTimeout(() => { window.dispatchEvent(new CustomEvent('artemis-go-to-page', { detail: 'apply' })); }, 100); }}
              className="px-6 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors"
            >
              Apply Now
            </button>
            <button
              onClick={() => { onClose(); setTimeout(() => { window.dispatchEvent(new CustomEvent('artemis-go-to-page', { detail: 'contact-us' })); }, 100); }}
              className="px-6 py-3 border-2 border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              Request Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GraduatePrograms({ goToPage }: GraduateProgramsProps) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const [selectedProgram, setSelectedProgram] = useState<GradProgram | null>(null);

  const activeSection = useActiveSection(pageSections.map(s => s.id));
  const overviewAnim = useInView();
  const flagshipAnim = useInView();
  const interdisciplinaryAnim = useInView();
  const intensiveAnim = useInView();

  return (
    <div className="flex flex-col bg-white">
      {/* ─── Hero ─── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[52vh] min-h-[400px] overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1800"
            alt="Graduate Programs"
            style={{ y: heroY }}
            className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Advanced Study & Research</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-extrabold leading-[1.02] tracking-tighter text-white mb-6">
              Graduate Programmes
            </h1>
            <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">
              Master\'s degrees, PhD Academies, and intensive graduate activities across the Artemis Collegium — combining the rigor of the Oxbridge tutorial tradition with the interdisciplinary, networked model of Venice International University.
            </p>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={pageSections}
        activeSection={activeSection}
      />

      {/* ─── Overview ─── */}
      <section id="overview" className="max-w-[1400px] mx-auto w-full px-8 lg:px-20 py-16 lg:py-24 scroll-mt-32">
        <div ref={overviewAnim.ref} className={`transition-all duration-700 ${overviewAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Why Artemis for Graduate Study</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                Two traditions, one network.
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Artemis graduate programmes combine two of the world\'s most distinctive models of advanced study. From the Oxbridge tradition, we inherit the tutorial, the small seminar, and the expectation that every student produces original research under individual supervision. From Venice International University, we inherit the interdisciplinary PhD Academy, the intensive residential format, and the conviction that the hardest problems cannot be solved within a single discipline.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Across our Venice, Kigali, Reykjavik, and San Joaquin nodes, we offer one-year and two-year master\'s degrees, a PhD Academy, summer schools, and graduate seminars — all residential, all small-cohort, and all built around face-to-face engagement with faculty and peers.
              </p>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-4">
              {[
                { stat: '10', label: 'Graduate programmes' },
                { stat: '4', label: 'Residential nodes' },
                { stat: '60+', label: 'Countries represented' },
                { stat: '8:1', label: 'Faculty-student ratio' },
                { stat: '€4.2M', label: 'Annual scholarships' },
                { stat: '94%', label: 'Career placement within 6 months' },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-[26px] font-black text-[#8A0000] leading-none mb-2">{s.stat}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Flagship Programs (Oxford-inspired) ─── */}
      <section id="flagship" className="bg-gray-50 border-y border-gray-100 py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div ref={flagshipAnim.ref} className={`transition-all duration-700 ${flagshipAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12">
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Oxbridge-Inspired Flagships</span>
              </div>
              <h2 className="text-[34px] md:text-[40px] font-extrabold text-[#141414] uppercase tracking-tight leading-none mb-3">
                Flagship Master\'s Programmes
              </h2>
              <p className="text-[14px] text-gray-500 font-mono uppercase tracking-wider">
                One-year and two-year research degrees modeled on the Oxford BCL, MPP, and MPhil.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {flagshipPrograms.map((p) => (
                <ProgramCard key={p.id} program={p} onSelect={setSelectedProgram} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interdisciplinary Programs (VIU-inspired) ─── */}
      <section id="interdisciplinary" className="py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div ref={interdisciplinaryAnim.ref} className={`transition-all duration-700 ${interdisciplinaryAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12">
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">VIU-Inspired Interdisciplinary</span>
              </div>
              <h2 className="text-[34px] md:text-[40px] font-extrabold text-[#141414] uppercase tracking-tight leading-none mb-3">
                Interdisciplinary Master\'s & Academy Programmes
              </h2>
              <p className="text-[14px] text-gray-500 font-mono uppercase tracking-wider">
                Inspired by Venice International University\'s PhD Academy and thematic programs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {viuPrograms.map((p) => (
                <ProgramCard key={p.id} program={p} onSelect={setSelectedProgram} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Intensive Activities ─── */}
      <section id="intensive" className="bg-gray-50 border-y border-gray-100 py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div ref={intensiveAnim.ref} className={`transition-all duration-700 ${intensiveAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-12">
              <div className="mb-4 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">VIU-Inspired Short-Form</span>
              </div>
              <h2 className="text-[34px] md:text-[40px] font-extrabold text-[#141414] uppercase tracking-tight leading-none mb-3">
                Intensive Graduate Activities
              </h2>
              <p className="text-[14px] text-gray-500 font-mono uppercase tracking-wider">
                Summer schools and graduate seminars for PhDs, post-docs, and professionals.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {intensiveActivities.map((p) => (
                <ProgramCard key={p.id} program={p} onSelect={setSelectedProgram} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── How to Apply ─── */}
      <section id="how-to-apply" className="py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Application Process</span>
              </div>
              <h2 className="text-[34px] md:text-[40px] font-extrabold text-[#141414] uppercase tracking-tight leading-none mb-8">
                How to Apply
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-6">
                Applications are reviewed on a rolling basis with three main deadlines per year. We strongly recommend applying early — competitive programmes such as the BCL and MPP typically fill by the first deadline.
              </p>
              <button
                onClick={() => goToPage('apply')}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#8A0000] text-white text-[12px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors shadow-lg shadow-[#8A0000]/20"
              >
                Begin Application →
              </button>
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Choose your programme', detail: 'Review the flagship, interdisciplinary, and intensive offerings above. Most applicants apply to one programme; joint-degree applicants may apply to two.' },
                { step: '02', title: 'Prepare your materials', detail: 'Most programmes require: transcripts, CV, personal statement, writing sample, research proposal (for research degrees), and two references.' },
                { step: '03', title: 'Submit by the deadline', detail: 'Three deadlines per year: early (15 November), standard (15 January), late (15 March). Late applications are considered only if places remain.' },
                { step: '04', title: 'Interview & decision', detail: 'Shortlisted applicants for research degrees are invited to interview (in person at Venice or via video). Decisions are released within 6–8 weeks of each deadline.' },
                { step: '05', title: 'Accept & enrol', detail: 'Offers must be accepted within 4 weeks. Visa support, accommodation at the relevant node, and orientation begin in August for autumn-start programmes.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-5 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#8A0000]/30 transition-colors">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#8A0000] text-white flex items-center justify-center font-bold text-[14px]">{s.step}</div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#141414] mb-1">{s.title}</h4>
                    <p className="text-[13px] text-gray-600 leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Funding & Fees ─── */}
      <section id="funding" className="bg-[#141414] text-white py-16 lg:py-24 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-8 lg:px-20">
          <div className="mb-12">
            <div className="mb-4 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Access & Affordability</span>
            </div>
            <h2 className="text-[34px] md:text-[40px] font-extrabold uppercase tracking-tight leading-none mb-3">
              Funding & Fees
            </h2>
            <p className="text-[14px] text-gray-400 font-mono uppercase tracking-wider max-w-2xl">
              Artemis is committed to need-blind graduate admissions wherever possible. Over 60% of graduate students receive some form of financial support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'Collegium Graduate Scholarship', amount: 'Full tuition + €18,000 stipend', eligibility: 'All programmes; need-based; renewable for the duration of the programme', desc: 'The flagship graduate scholarship, awarded to approximately 25 students per year across all programmes. Covers full tuition plus a living stipend.' },
              { name: 'Venice Node Bursary', amount: '€10,000–€20,000', eligibility: 'All programmes hosted at the Venice Node; need-based', desc: 'A needs-based bursary for students attending programmes at the Venice Node, with preference for students from underrepresented regions.' },
              { name: 'Kigali Node Field Bursary', amount: '€12,000 + field costs', eligibility: 'MPhil Development Studies and related field-based programmes', desc: 'Covers field research costs and a living stipend for students conducting fieldwork in East Africa via the Kigali Node.' },
            ].map((s) => (
              <div key={s.name} className="bg-white/[0.04] border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] transition-colors">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#8A0000] mb-2">Scholarship</div>
                <h3 className="text-[16px] font-bold mb-2">{s.name}</h3>
                <div className="text-[14px] font-mono text-white/80 mb-3">{s.amount}</div>
                <p className="text-[13px] text-gray-400 leading-relaxed mb-3">{s.desc}</p>
                <div className="text-[11px] text-gray-500 border-t border-white/10 pt-3">
                  <span className="font-bold uppercase tracking-wider">Eligibility: </span>{s.eligibility}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[14px] text-gray-400 leading-relaxed max-w-xl">
                Programme-specific tuition is listed on each programme\'s detail page. All fees include accommodation at the relevant node, library and lab access, and the annual Collegium retreat.
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
                onClick={() => goToPage('contact-us')}
                className="px-6 py-3 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Contact Admissions
              </button>
            </div>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />

      {/* Program detail modal */}
      {selectedProgram && (
        <ProgramDetailModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />
      )}
    </div>
  );
}
