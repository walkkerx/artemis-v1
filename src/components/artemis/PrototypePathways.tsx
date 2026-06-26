'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import {
  Users, GitBranch, FlaskConical, Globe, Network, Rocket,
  BookOpen, Layers, Award, ArrowRight, ArrowLeft, Check,
  Sparkles, Target, Briefcase, Zap
} from 'lucide-react';

interface PrototypePathwaysProps {
  goToPage: (page: string, program?: string) => void;
}

interface Prototype {
  id: string;
  num: string;
  name: string;
  category: string;
  tagline: string;
  overview: string;
  howItWorks: string[];
  whyItWorks: string;
  keyMetrics: { value: string; label: string }[];
  image: string;
  icon: React.ElementType;
  status: string;
  timeline: string;
}

/* ─── The 9 Prototype Pathways from the source document ─── */
const PROTOTYPES: Prototype[] = [
  {
    id: 'guest-to-guild',
    num: '01',
    name: 'Guest-to-Guild Pathway',
    category: 'Recruiting',
    tagline: 'Transform one-off guest lectures into a recruitment funnel for long-term Pioneer engagement.',
    overview: 'Invite 500+ global academics — from professors to postdocs — to contribute a single guest lecture (live or pre-recorded). Afterward, offer them an elevated role as "Guild Affiliates," granting a direct pathway to full Pioneer status if they later co-design a capstone, mentor students, or contribute a curriculum unit. This approach leverages pre-existing intellectual capital and networks — no financial or technical barrier required.',
    howItWorks: [
      'Invite 500+ academics to deliver one guest lecture (live or pre-recorded)',
      'Offer "Guild Affiliate" status to all contributors — a title that signals belonging without obligation',
      'Convert top contributors into full Pioneers through capstone co-design or mentorship',
      'Proof-of-work (co-mentoring) triggers MAP-UBI eligibility',
    ],
    whyItWorks: 'Academics give talks anyway — this channels existing behavior into a structured on-ramp. The title signals belonging without obligation, and the transition to full Pioneer is meritocratic, not transactional. It lowers the entry barrier, uses existing teaching materials, and lets scholars "test the water" before deeper engagement.',
    keyMetrics: [
      { value: '500+', label: 'Academics invited' },
      { value: '1', label: 'Lecture to start' },
      { value: '0', label: 'Upfront cost' },
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    icon: Users,
    status: 'Early-Stage Prototype',
    timeline: '24–72 hours to activate',
  },
  {
    id: 'syllabus-jam',
    num: '02',
    name: 'Open Syllabus Co-Creation Jam',
    category: 'Recruiting',
    tagline: 'Transform curriculum design into an open, collaborative event — part hackathon, part creative sprint.',
    overview: 'Over two weeks, Pioneers co-write modular course units using free digital collaboration tools like GitHub, Notion, or Google Docs. Each contributor merges their ideas into shared repositories, with merged modules earning MAP-UBI eligibility and potential course-lead status. This taps into academics\' intrinsic motivation to create and share, producing high-quality syllabi rapidly while validating the MAP-UBI system as an incentive engine.',
    howItWorks: [
      'Launch a 14-day co-creation sprint using GitHub, Notion, or Google Docs',
      'Pioneers contribute modular course units to shared repositories',
      'Merged modules earn MAP-UBI eligibility and potential course-lead status',
      'Contributors earn proof-of-work recognition toward Pioneer status',
    ],
    whyItWorks: 'It taps into academics\' intrinsic motivation to create and share, producing high-quality syllabi rapidly while validating the MAP-UBI system as an incentive engine. The collaborative format attracts academics who value open-source "contribute first, monetize later" ethos.',
    keyMetrics: [
      { value: '14', label: 'Days to sprint' },
      { value: '20+', label: 'Modules target' },
      { value: '100%', label: 'Open source' },
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    icon: GitBranch,
    status: 'Early-Stage Prototype',
    timeline: '2 weeks per sprint',
  },
  {
    id: 'guild-miniversity',
    num: '03',
    name: 'Guild-as-Miniversity',
    category: 'Guild-Centric',
    tagline: 'Each Guild functions as a mini-university, delivering its own short, stackable credentials.',
    overview: 'Each Guild functions as a mini-university, delivering its own short, stackable credentials. For example, the Biolife Futures Guild might run a 12-week "Certificate in Synthetic Biology & Systems Design," while the Sustainable Futures Guild hosts a Climate Innovation Studio. With 20 Pioneers per Guild and 50 students to start, each program triggers MAP-UBI payouts once learners reach specific milestones.',
    howItWorks: [
      'Each of the 10 Guilds operates as a standalone "miniversity"',
      'Offers 12-week micro-degrees (e.g., "Certificate in Biolife Futures")',
      '20 Pioneers per Guild → 50 students → capstone deployment',
      'Micro-degrees are stackable toward a full BSc degree',
      'MAP-UBI triggers when students reach milestones',
    ],
    whyItWorks: 'Fast time-to-value for students; clear revenue per Guild to trigger MAP-UBI. Pioneers get focused collaboration + real-world deployment — no abstract curriculum design. Allows Artemis to scale organically, test pedagogical models quickly, and showcase early results without waiting for full degree accreditation.',
    keyMetrics: [
      { value: '10', label: 'Guilds as miniversities' },
      { value: '12 wk', label: 'Per micro-degree' },
      { value: '50', label: 'Students per Guild' },
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=800',
    icon: FlaskConical,
    status: 'Guild-Centric Prototype',
    timeline: '12 weeks per cohort',
  },
  {
    id: 'artemis-collegium-network',
    num: '04',
    name: 'Artemis Collegium Network (ACN)',
    category: 'Networked',
    tagline: 'A federated network of autonomous colleges that co-issue globally recognized degrees.',
    overview: 'The ACN is the "federated university of universities" model — each partner retains its autonomy while co-issuing globally accredited programs under the University of Artemis banner. Starting with 3–5 pilot nodes (e.g., Nairobi, Berlin, Cape Town, Toronto), ACN delivers high-demand programs such as BSc Computer Science, Sustainable Futures, and Entrepreneurial Systems. Accreditation is achieved through credit recognition partnerships with existing open universities (ECTS, OERu, UoPeople).',
    howItWorks: [
      'Start with 3–5 pilot nodes (Nairobi, Berlin, Cape Town, Toronto)',
      'Each partner retains autonomy while co-issuing Artemis degrees',
      'Deliver high-demand programs: BSc CS, Sustainable Futures, Entrepreneurial Systems',
      'Accreditation via credit recognition (ECTS, OERu, UoPeople)',
      'Federated governance → shared curricula → dual-branded degrees',
    ],
    whyItWorks: 'Leverages existing accreditation pipelines, reduces cost, and instantly scales legitimacy through partnerships rather than starting from scratch. Students get globally portable credentials; Pioneers get cross-border impact with minimal risk.',
    keyMetrics: [
      { value: '3–5', label: 'Pilot nodes' },
      { value: '4', label: 'Continents' },
      { value: 'ECTS', label: 'Credit mapping' },
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    icon: Globe,
    status: 'Networked Prototype',
    timeline: '6–12 months to launch',
  },
  {
    id: 'collegiate-alliance',
    num: '05',
    name: 'Collegiate Alliance MVP',
    category: 'Networked',
    tagline: 'A coalition of founding micro-colleges that co-create and co-accredit shared Artemis programs.',
    overview: 'The Collegiate Alliance MVP builds on the ACN but functions as a coalition of founding micro-colleges. The aim is to recruit 5–10 innovative education ventures (e.g., Venice International University, African Leadership Schools, Eco-Organic Agrarian Colleges) that co-create and co-accredit shared Artemis programs. Each member contributes 10–20 Pioneers, a small student pool, and access to teaching space, while Artemis provides the Guilds, MAP-UBI system, and Commons framework.',
    howItWorks: [
      'Recruit 5–10 innovative education ventures as founding members',
      'Target: Venice International University, African Leadership Schools, Eco-Organic Agrarian Colleges',
      'Each member contributes 10–20 Pioneers + small student pool + teaching space',
      'Artemis provides: Guilds, MAP-UBI, Commons publishing, accreditation pathway',
      'Degrees co-branded: "BA in Environmental Science — Artemis & [Partner]"',
    ],
    whyItWorks: 'Distributes both cost and risk, attracts alternative educators already running niche programs, and achieves instant credibility by building on the strengths of existing academic ecosystems. Aligns perfectly with frustrated innovators already running alternative programs — they gain global reach without surrendering autonomy.',
    keyMetrics: [
      { value: '5–10', label: 'Founding members' },
      { value: '10–20', label: 'Pioneers per member' },
      { value: 'Joint', label: 'Co-branded degrees' },
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    icon: Network,
    status: 'Networked Prototype',
    timeline: '3–6 months to first alliance',
  },
  {
    id: 'pop-up-satellite',
    num: '06',
    name: 'Pop-Up Satellite Guilds',
    category: 'Networked',
    tagline: 'Embed Artemis tracks inside existing universities as experimental learning hubs.',
    overview: 'The Pop-Up Guild prototype embeds Artemis tracks inside existing universities as "experimental learning hubs." For example, "Artemis Track in Sustainable Engineering" could be hosted at the University of Cape Town or Technical University of Berlin. Local faculty become Pioneers, co-teaching Artemis capstones and testing the Guild pedagogy with their students.',
    howItWorks: [
      'Embed Artemis Guilds as "experimental tracks" inside partner universities',
      'Example: "Artemis Track in Sustainable Engineering" at UCT or TU Berlin',
      'Local faculty teach capstones under Artemis rubrics → become Pioneers',
      'Students earn dual recognition (home institution + Artemis)',
      'Zero marginal cost — uses partner infrastructure',
    ],
    whyItWorks: 'Zero marginal cost (uses partner infrastructure). Faculty gain curriculum freedom and global affiliation; students access frontier content without transferring institutions. A low-risk collaboration model that validates Artemis pedagogy within existing institutions, building cross-institutional credibility.',
    keyMetrics: [
      { value: '0', label: 'Marginal cost' },
      { value: 'Dual', label: 'Recognition' },
      { value: '1', label: 'Course to start' },
    ],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
    icon: Rocket,
    status: 'Networked Prototype',
    timeline: '1 semester to launch',
  },
  {
    id: 'mooc-to-capstone',
    num: '07',
    name: 'MOOC-to-Capstone Funnel',
    category: 'Market Entry',
    tagline: 'Release free, high-quality MOOCs that funnel top learners into capstone tracks.',
    overview: 'Release free, high-quality MOOCs on open platforms (YouTube, GitHub) → funnel top 10% of engaged learners into capstone tracks. Pioneers build MOOCs → earn MAP-UBI once students convert to capstone enrollment → capstones feed into Guild deployments. This leverages attention economics — MOOCs attract learners globally, while capstone conversion creates revenue to fund UBI.',
    howItWorks: [
      'Pioneers build free, high-quality MOOCs on YouTube, GitHub, and open platforms',
      'Top 10% of engaged learners are funneled into capstone tracks',
      'Pioneers earn MAP-UBI once students convert to capstone enrollment',
      'Capstones feed into Guild deployments for real-world impact',
    ],
    whyItWorks: 'Leverages attention economics — MOOCs attract learners globally, while capstone conversion creates revenue to fund UBI. Pioneers get wide reach + tangible impact. The MOOC is the marketing; the capstone is the product.',
    keyMetrics: [
      { value: '10%', label: 'Top learners funnel' },
      { value: 'Free', label: 'MOOC access' },
      { value: 'UBI', label: 'On conversion' },
    ],
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=800',
    icon: BookOpen,
    status: 'Market Entry Prototype',
    timeline: 'Ongoing funnel',
  },
  {
    id: 'open-core-capstone',
    num: '08',
    name: 'Open Core + Capstone Model',
    category: 'Market Entry',
    tagline: 'Artemis teaches only Year 1 (Core) and Year 4 (Capstone); students design Years 2–3.',
    overview: 'Artemis teaches only Year 1 ("Core") and Year 4 ("Capstone"); students design Years 2–3 via MOOCs, local unis, or self-directed Guild projects. Hire 20–30 Pioneers to teach the Core (6 interdisciplinary courses) and mentor Capstones. The credential: "Artemis Core + [Custom Path] + Capstone in [Guild]."',
    howItWorks: [
      'Hire 20–30 Pioneers to teach the Core (6 interdisciplinary courses) and mentor Capstones',
      'Students complete Years 2–3 via: approved MOOCs, local university courses (transferred in), or self-designed Guild projects',
      'Capstone = real-world deployment via Artemis Guilds (triggering UBI for mentors)',
      'Credential: "Artemis Core + [Student\'s Custom Path] + Capstone in [Guild]"',
    ],
    whyItWorks: 'Radically reduces faculty need while appealing to Homo Eruditus — autonomous learners who want structure without rigidity. Capstone deployment validates MAP-UBI organically. The model is lean: 20–30 Pioneers can serve thousands of students.',
    keyMetrics: [
      { value: '20–30', label: 'Pioneers needed' },
      { value: '6', label: 'Core courses' },
      { value: 'Custom', label: 'Years 2–3' },
    ],
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=800',
    icon: Layers,
    status: 'Market Entry Prototype',
    timeline: '4-year degree cycle',
  },
  {
    id: 'pioneer-fellowship',
    num: '09',
    name: 'Pioneer Fellowship',
    category: 'Recruiting',
    tagline: 'Recruit 200+ Pioneers as Fellows via open call — no pay upfront, but influence and future UBI.',
    overview: 'Recruit 200+ Pioneers as Fellows via open call — no pay upfront, but offer influence, IP rights, and future UBI tied to milestones. Fellows submit proof-of-work (e.g., course module, lab design) → top 200 become "Founding Fellows" → assigned to Guilds/Colleges. This targets disillusioned academics who value impact over income.',
    howItWorks: [
      'Launch a "Pioneer Fellowship" with early influence on curricula and Guild design',
      'Benefits: publication platform (Artemis Commons) with DOI/IP rights, global collaboration network, pathway to paid roles once MAP-UBI triggers',
      'Require proof-of-work: submit a course module, lab design, or capstone rubric',
      'Curate the best 200 into "Founding Fellows", assign to Guilds/Colleges',
    ],
    whyItWorks: 'Targets disillusioned academics who value impact over income. Builds a vetted, committed talent pool before student enrollment — and aligns with open-source "contribute first, monetize later" ethos. The fellowship creates a sense of exclusivity and mission without financial commitment.',
    keyMetrics: [
      { value: '200+', label: 'Founding Fellows' },
      { value: '0', label: 'Upfront pay' },
      { value: 'UBI', label: 'Future tied to milestones' },
    ],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800',
    icon: Award,
    status: 'Recruiting Prototype',
    timeline: 'Rolling recruitment',
  },
];

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

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT — handles both list view and detail view
   ═══════════════════════════════════════════════════════════ */
export default function PrototypePathways({ goToPage, prototypeId }: PrototypePathwaysProps & { prototypeId?: string }) {
  if (prototypeId) {
    const prototype = PROTOTYPES.find(p => p.id === prototypeId);
    if (prototype) {
      return <PrototypeDetail prototype={prototype} goToPage={goToPage} />;
    }
  }
  return <PrototypeList goToPage={goToPage} />;
}

/* ═══════════════════════════════════════════════════════════
   LIST VIEW — all 9 prototypes as overlay-image cards
   ═══════════════════════════════════════════════════════════ */
function PrototypeList({ goToPage }: { goToPage: (page: string, program?: string) => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const introAnim = useInView();
  const cardsAnim = useInView();

  const categories = ['All', 'Recruiting', 'Guild-Centric', 'Networked', 'Market Entry'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPrototypes = activeCategory === 'All'
    ? PROTOTYPES
    : PROTOTYPES.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col bg-white">
      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[52vh] min-h-[400px] overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1800"
            style={{ y: heroY }}
            className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
            alt="Prototype Pathways"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">10th Path to Mastery</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-extrabold leading-[1.02] tracking-tighter text-white mb-6">
              Prototype Pathways
            </h1>
            <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">
              Nine market-entry prototypes for building the University of Artemis — modular, stackable, and incentive-aligned strategies to activate the MAP-UBI flywheel without upfront capital.
            </p>
          </div>
        </div>
      </section>

      <OnThisPageNav
        sections={[
          { id: 'overview', label: 'Overview' },
          { id: 'prototypes', label: 'Prototypes' },
        ]}
        activeSection="prototypes"
      />

      {/* ── Overview ── */}
      <section id="overview" className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24 scroll-mt-32">
        <div ref={introAnim.ref} className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The 10th Path</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                How Artemis enters the market.
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                Traditional universities build campuses, hire faculty, and wait for accreditation. Artemis builds prototypes — low-commitment, high-velocity experiments that test the model, recruit Pioneers, and validate the MAP-UBI flywheel before scaling.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                Each prototype below is a self-contained pathway to market entry. Some recruit talent (Guest-to-Guild, Pioneer Fellowship). Others build infrastructure (Guild-as-Miniversity, Open Core). Others still leverage existing institutions (ACN, Collegiate Alliance, Pop-Up Satellites). Together, they form a portfolio approach to building the university.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '9', label: 'Prototype pathways' },
                { stat: '3', label: 'Categories' },
                { stat: '0', label: 'Upfront capital needed' },
                { stat: '24h', label: 'Fastest to activate' },
              ].map((s) => (
                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5">
                  <div className="text-[28px] font-black text-[#8A0000] leading-none mb-2">{s.stat}</div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <section id="prototypes" className="bg-white border-b border-gray-200 sticky top-[102px] z-20 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[12px] font-bold uppercase tracking-wider rounded-lg border transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#8A0000] text-white border-[#8A0000]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prototype Cards ── */}
      <section className="py-16 lg:py-24">
        <div ref={cardsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPrototypes.map((proto) => {
              const Icon = proto.icon;
              return (
                <div
                  key={proto.id}
                  onClick={() => goToPage('prototype-detail', proto.id)}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#8A0000]/40 hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                    <img
                      src={proto.image}
                      alt={proto.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">
                        {proto.num}
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 text-[#141414]">
                        {proto.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#D4A853]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-80">{proto.status}</span>
                      </div>
                      <h3 className="text-[18px] font-bold leading-tight tracking-tight">{proto.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">{proto.tagline}</p>
                    <div className="border-t border-gray-100 pt-3 grid grid-cols-3 gap-2">
                      {proto.keyMetrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-[14px] font-black text-[#8A0000] leading-none">{m.value}</div>
                          <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] group-hover:underline text-left flex items-center gap-1">
                      Explore Prototype <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DARK CTA BAND ── */}
      <section className="bg-[#141414] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Get Involved</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter mb-3">
              Which pathway will you build?
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              Every prototype above is an open invitation. Whether you're an academic, a partner institution, or a student — there's a pathway into Artemis designed for you.
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
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DETAIL VIEW — individual prototype page
   ═══════════════════════════════════════════════════════════ */
function PrototypeDetail({ prototype, goToPage }: { prototype: Prototype; goToPage: (page: string, program?: string) => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const Icon = prototype.icon;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'how', label: 'How It Works' },
    { id: 'why', label: 'Why It Works' },
    { id: 'metrics', label: 'Key Metrics' },
  ];
  const activeSection = useActiveSection(tabs.map(t => t.id));

  return (
    <div className="flex flex-col bg-white">
      {/* ── Hero ── */}
      <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img
          src={prototype.image}
          alt={prototype.name}
          style={{ y: heroY }}
          className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => goToPage('prototype-pathways')}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Pathways
            </button>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">
              Prototype {prototype.num}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/20 text-white backdrop-blur-sm">
              {prototype.category}
            </span>
          </div>
          <h1 className="text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4">
            {prototype.name}
          </h1>
          <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">
            {prototype.tagline}
          </p>
        </div>
      </div>

      <OnThisPageNav sections={tabs} activeSection={activeSection} />

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto border-l border-r border-gray-200 relative">
        {/* ── Sidebar ── */}
        <aside className="hidden md:block w-[300px] shrink-0 border-r border-gray-200 bg-white">
          <div className="sticky top-[110px] max-h-[calc(100vh-130px)] overflow-y-auto py-8 px-6">
            {/* Prototype info */}
            <div className="mb-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</div>
                  <div className="text-[12px] font-bold text-[#141414]">{prototype.status}</div>
                </div>
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Timeline</div>
              <div className="text-[13px] text-[#141414]">{prototype.timeline}</div>
            </div>

            {/* On This Page */}
            <div className="mb-7">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">On This Page</div>
              <ul className="space-y-0">
                {tabs.map((tab) => {
                  const isActive = activeSection === tab.id;
                  return (
                    <li key={tab.id}>
                      <a
                        href={`#${tab.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                        className={`block py-2.5 text-[13px] border-l-2 pl-3 -ml-3 transition-all ${
                          isActive
                            ? 'text-[#8A0000] font-bold border-[#8A0000]'
                            : 'text-gray-600 border-transparent hover:text-[#8A0000] hover:border-[#8A0000]/30'
                        }`}
                      >
                        {tab.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Other Prototypes */}
            <div className="pt-5 border-t border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Other Prototypes</div>
              <ul className="space-y-1">
                {PROTOTYPES.filter(p => p.id !== prototype.id).slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => goToPage('prototype-detail', p.id)}
                      className="block w-full text-left py-1.5 text-[12px] text-gray-600 hover:text-[#8A0000] transition-colors leading-tight"
                    >
                      {p.num} — {p.name}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => goToPage('prototype-pathways')}
                className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#8A0000] hover:underline"
              >
                View All Prototypes →
              </button>
            </div>

            {/* CTAs */}
            <div className="mt-7 pt-5 border-t border-gray-100 space-y-2">
              <button
                onClick={() => goToPage('apply')}
                className="w-full px-4 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors"
              >
                Get Involved
              </button>
              <button
                onClick={() => goToPage('contact-us')}
                className="w-full px-4 py-3 border border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 px-6 sm:px-8 lg:px-16 py-12 lg:py-16 bg-white min-w-0">
          <div className="max-w-3xl space-y-20">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-6">Overview</h3>
              <p className="text-[15px] leading-relaxed text-[#141414]">{prototype.overview}</p>
            </section>

            {/* How It Works */}
            <section id="how" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">How It Works</h3>
              <p className="text-gray-500 text-[14px] mb-10">{prototype.howItWorks.length} steps to activation</p>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block"></div>
                <div className="space-y-6">
                  {prototype.howItWorks.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-5 sm:gap-8">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#8A0000] text-white flex items-center justify-center font-bold text-[14px] shrink-0 shadow-md">
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#8A0000]/30 hover:shadow-md transition-all">
                        <p className="text-[14px] text-gray-600 leading-relaxed">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why It Works */}
            <section id="why" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-6">Why It Works</h3>
              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-[15px] text-gray-700 leading-relaxed">{prototype.whyItWorks}</p>
                </div>
              </div>
            </section>

            {/* Key Metrics */}
            <section id="metrics" className="scroll-mt-32">
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">Key Metrics</h3>
              <p className="text-gray-500 text-[14px] mb-10">Targets for this prototype</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {prototype.keyMetrics.map((m, i) => (
                  <div key={i} className="bg-[#8A0000]/[0.04] border border-[#8A0000]/10 rounded-xl p-6">
                    <div className="text-[28px] font-black text-[#8A0000] leading-none mb-2">{m.value}</div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">{m.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* ── DARK CTA BAND ── */}
      <section className="bg-[#141414] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Next Steps</span>
            </div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter mb-3">
              Ready to build this pathway?
            </h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">
              {prototype.name} is one of nine prototypes for building Artemis. If this one resonates, let's talk — or explore the other pathways.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={() => goToPage('prototype-pathways')}
              className="px-6 py-3 bg-white text-[#141414] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors"
            >
              All Prototypes
            </button>
            <button
              onClick={() => goToPage('contact-us')}
              className="px-6 py-3 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
