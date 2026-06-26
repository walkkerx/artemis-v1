'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import SubPageFooter from '@/components/artemis/SubPageFooter';
import OnThisPageNav, { useActiveSection } from '@/components/artemis/OnThisPageNav';
import {
  Users, GitBranch, FlaskConical, Globe, Network, Rocket,
  BookOpen, Layers, Award, ArrowRight, ArrowLeft,
  Sparkles, Target, Briefcase, Zap, TrendingUp, Shield,
  DollarSign, Clock, CheckCircle2, AlertTriangle
} from 'lucide-react';

interface FlagshipInitiativesProps {
  goToPage: (page: string, program?: string) => void;
  initiativeId?: string;
}

/* ═══════════════════════════════════════════════════════════
   FLAGSHIP INITIATIVE TYPE — rich, expanded structure
   ═══════════════════════════════════════════════════════════ */
interface FlagshipInitiative {
  id: string;
  num: string;
  name: string;
  category: string;
  tagline: string;
  vision: string;
  overview: string;
  howItWorks: { title: string; detail: string }[];
  economics: {
    model: string;
    revenueSource: string;
    ubiTrigger: string;
    costStructure: string;
  };
  partnerships: { role: string; contribution: string }[];
  studentExperience: string;
  pioneerExperience: string;
  milestones: { phase: string; target: string; metric: string }[];
  timeline: { period: string; goal: string }[];
  risks: { risk: string; mitigation: string }[];
  keyMetrics: { value: string; label: string }[];
  image: string;
  icon: React.ElementType;
  status: string;
}

/* ═══════════════════════════════════════════════════════════
   THE 9 FLAGSHIP INITIATIVES — fully expanded
   Each is interpreted beyond the source document and built
   out as a real, substantive Artemis program.
   ═══════════════════════════════════════════════════════════ */
const INITIATIVES: FlagshipInitiative[] = [
  {
    id: 'guest-to-guild',
    num: '01',
    name: 'The Guest-to-Guild Talent Funnel',
    category: 'Talent Acquisition',
    tagline: 'How Artemis identifies, engages, and converts 500+ global academics into founding Pioneers — without upfront capital.',
    vision: 'The Guest-to-Guild funnel is Artemis\'s primary academic talent acquisition engine. Traditional universities hire faculty through a slow, expensive, bureaucratic process: search committees, job postings, interviews, negotiations, tenure tracks. Artemis inverts this. We begin by inviting academics to do what they already do — give a lecture. From that single act of intellectual generosity, we create a structured, meritocratic pathway from guest lecturer to founding Pioneer Fellow. The funnel is designed to activate the MAP-UBI flywheel: each stage of engagement triggers increasing UBI eligibility, so that the academics who contribute the most are rewarded the most — not through salaries, but through milestone-based universal basic income tied to student outcomes.',
    overview: 'The funnel operates in four stages. Stage 1: 500+ academics are invited to deliver a single guest lecture (live or pre-recorded) on a topic of their expertise. The lecture becomes Artemis Commons content with a DOI, and the academic receives "Guild Affiliate" status — a title that signals belonging without obligation. Stage 2: Affiliates who engage further (mentoring a student, contributing a syllabus module, participating in a Syllabus Jam) become "Contributing Pioneers." Stage 3: Contributing Pioneers who co-design a capstone or lead a Guild module become "Full Pioneers" with MAP-UBI eligibility. Stage 4: The most committed Pioneers are curated into the "Founding Fellows" — the 200 academics who form Artemis\'s founding faculty body. The entire funnel is proof-of-work based: no one is hired, everyone is earned in.',
    howItWorks: [
      { title: 'Stage 1 — The Guest Lecture (500+ academics)', detail: 'Artemis sends personalized invitations to 500+ academics worldwide — professors, postdocs, independent scholars, industry researchers. Each is asked to contribute ONE guest lecture (45 minutes, live or pre-recorded) on their area of expertise. The lecture is published on Artemis Commons with a DOI, credited to the academic. Upon delivery, the academic receives "Guild Affiliate" status — a public credential on the Artemis network that signals their involvement. No further commitment is required. The lecture itself becomes a marketing asset (MOOC content) and a quality signal (we can evaluate teaching ability).' },
      { title: 'Stage 2 — The Affiliate Engagement (200 expected)', detail: 'Guild Affiliates are invited to deepen their engagement through low-friction activities: mentoring a student on a capstone, contributing a module to a Syllabus Jam, participating in a virtual residency, or reviewing a student\'s work. Each act of engagement is logged on the Artemis credit ledger. After three verified engagements, the Affiliate becomes a "Contributing Pioneer." This stage is designed to filter for genuine interest — the academics who return after the lecture are the ones who want to be part of something bigger.' },
      { title: 'Stage 3 — The Pioneer Conversion (50 expected)', detail: 'Contributing Pioneers who take on a sustained role — co-designing a capstone, leading a 12-week Guild module, or becoming a tutorial leader — are elevated to "Full Pioneer" status. This is the threshold where MAP-UBI eligibility activates: the Pioneer\'s future UBI payouts are tied to the milestones of the students they mentor. The Pioneer is now part of Artemis\'s academic core, with voting rights on curriculum and Guild governance.' },
      { title: 'Stage 4 — The Founding Fellows (20 expected)', detail: 'The most committed Pioneers — those who have demonstrated sustained contribution over 12+ months, mentored multiple students to capstone completion, and shaped Guild curriculum — are curated into the "Founding Fellows." These 20 academics form Artemis\'s founding faculty body, with permanent governance rights, equity in the Artemis Trust, and the highest MAP-UBI vesting schedule. They are the academic spine of the university.' },
    ],
    economics: {
      model: 'Zero-upfront-cost talent acquisition. No salaries paid until MAP-UBI triggers (student milestones reached). The funnel is self-funding: guest lectures become MOOCs (marketing), MOOCs attract students (revenue), student capstones trigger UBI (Pioneer compensation).',
      revenueSource: 'Student capstone enrollment fees + MOOC-to-capstone conversion revenue + ACN partner contributions',
      ubiTrigger: 'MAP-UBI activates at Stage 3 (Full Pioneer) when a Pioneer\'s mentored student completes a capstone milestone. UBI vests over 4 years based on student outcome metrics.',
      costStructure: 'Platform costs (Commons hosting, video production) ~$50K/year. No salary costs until UBI triggers. The funnel is designed to be cash-flow positive by Year 2.',
    },
    partnerships: [
      { role: 'Guest Lecturers (500+)', contribution: 'One 45-minute lecture each. No further commitment. IP retained by lecturer, publication rights granted to Artemis Commons.' },
      { role: 'Guild Affiliates (200)', contribution: '3+ verified engagements (mentoring, module contribution, review). Time investment: ~2 hours/week.' },
      { role: 'Contributing Pioneers (50)', contribution: 'Sustained role: co-design capstone, lead module, or tutor. Time: ~5 hours/week. MAP-UBI eligible.' },
      { role: 'Founding Fellows (20)', contribution: '12+ months sustained contribution, multiple capstone completions, curriculum shaping. Governance rights + equity.' },
    ],
    studentExperience: 'Students benefit from the funnel in two ways. First, they get access to 500+ guest lectures — a broader intellectual exposure than any single university can provide. Second, as they progress through their own Artemis journey, they are mentored by increasingly committed Pioneers. A first-year student might watch a Guild Affiliate\'s lecture; a third-year student might be mentored by a Contributing Pioneer; a capstone student works directly with a Full Pioneer. The funnel creates a natural matching mechanism — the academics who care the most end up closest to the students who need them most.',
    pioneerExperience: 'For the academic, the funnel removes the binary choice of "leave my job or don\'t." An academic can begin with a single lecture — no resignation, no risk, no commitment beyond 45 minutes. If the experience resonates, they deepen. If it doesn\'t, they walk away with a DOI and a credential. The funnel respects the reality that most academics are disillusioned but risk-averse: they want impact without gambling their career. The Guest-to-Guild pathway lets them test the water before diving in.',
    milestones: [
      { phase: 'Months 0-3', target: '500 invitations sent', metric: '50 guest lectures delivered (10% conversion)' },
      { phase: 'Months 3-6', target: '200 Guild Affiliates activated', metric: '30 Contributing Pioneers (15% conversion)' },
      { phase: 'Months 6-12', target: '50 Full Pioneers with UBI eligibility', metric: '10 capstones co-designed by Pioneers' },
      { phase: 'Months 12-24', target: '20 Founding Fellows curated', metric: 'First UBI payouts triggered by student milestones' },
    ],
    timeline: [
      { period: 'Days 0-30', goal: 'Build the invitation list (500+ academics). Design the Guild Affiliate credential. Set up the Artemis Commons publishing pipeline.' },
      { period: 'Days 30-90', goal: 'Send invitations. Host first 50 guest lectures. Publish first 20 on Commons with DOIs.' },
      { period: 'Months 3-6', goal: 'Activate the engagement funnel. Run first Syllabus Jam. Convert 30 Affiliates to Contributing Pioneers.' },
      { period: 'Months 6-12', goal: 'First capstones co-designed by Pioneers. First MAP-UBI eligibility triggered. Curate Founding Fellows.' },
      { period: 'Months 12-24', goal: 'First UBI payouts. Founding Fellows form governance council. Funnel becomes self-sustaining.' },
    ],
    risks: [
      { risk: 'Low lecture-to-affiliate conversion (<10%)', mitigation: 'The invitation is zero-cost and zero-obligation. Even at 5% conversion, 25 affiliates from 500 lectures is a strong founding base. Iterate on invitation quality and targeting.' },
      { risk: 'Affiliates don\'t deepen engagement', mitigation: 'Design engagement opportunities that are genuinely valuable to the academic (publication, network, IP rights) rather than extractive. The MAP-UBI promise is the long-term incentive.' },
      { risk: 'Quality variation in guest lectures', mitigation: 'Every lecture is peer-reviewed before Commons publication. Lectures that don\'t meet quality standards are not published — the academic is invited to revise.' },
      { risk: 'MAP-UBI doesn\'t trigger (no student milestones)', mitigation: 'The funnel is designed so that UBI only activates when there\'s proof of student outcome. If UBI doesn\'t trigger, it means the model isn\'t working — which is the right signal to iterate, not a reason to pay Pioneers anyway.' },
    ],
    keyMetrics: [
      { value: '500+', label: 'Academics invited' },
      { value: '20', label: 'Founding Fellows' },
      { value: '0$', label: 'Upfront salary cost' },
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
    icon: Users,
    status: 'Talent Acquisition Engine',
  },
  {
    id: 'syllabus-jam',
    num: '02',
    name: 'The Open Syllabus Co-Creation Engine',
    category: 'Curriculum Development',
    tagline: 'A 14-day collaborative sprint that produces Artemis\'s entire curriculum — open-source, peer-reviewed, and MAP-UBI-eligible.',
    vision: 'The Syllabus Jam is Artemis\'s curriculum development methodology. Traditional universities spend 2-3 years designing a single degree program through committees, approvals, and accreditation reviews. Artemis compresses this into a 14-day open sprint where 5-10 Pioneers co-create modular course units using GitHub, Notion, and shared rubrics. The Jam produces not a degree program but a portfolio of modular, stackable, credit-mapped units that can be assembled into any degree path. Each unit is peer-reviewed, published on Artemis Commons with a DOI, and its authors earn MAP-UBI eligibility. The Jam is the engine that makes Artemis\'s curriculum radically faster to build, higher quality (through open peer review), and more adaptable (modules can be swapped, updated, or replaced without redesigning the whole degree).',
    overview: 'A Syllabus Jam runs for 14 days. Five to ten Pioneers are invited to contribute modular course units on a shared theme (e.g., "Foundations of Synthetic Biology" or "Climate Systems Thinking"). Each Pioneer writes 2-3 modules — a module is a 2-week learning unit with learning outcomes, reading list, lecture notes, tutorial questions, assessment rubric, and capstone prompt. Modules are submitted as pull requests on a shared GitHub repository. A quality gate (peer review by 2 other Pioneers + an external reviewer) determines which modules are merged. Merged modules are published on Artemis Commons with a DOI, mapped to ECTS credits, and become available for any Artemis degree path that needs them. Authors of merged modules earn MAP-UBI eligibility and potential course-lead status.',
    howItWorks: [
      { title: 'Day 0 — The Theme & Team', detail: 'Artemis announces a Jam theme (e.g., "Six Core Courses for Year 1"). 5-10 Pioneers are invited based on their Guild affiliation and proof-of-work. Each Pioneer commits to producing 2-3 modules over 14 days. A Jam facilitator is appointed to manage the sprint, resolve conflicts, and ensure quality.' },
      { title: 'Days 1-7 — Module Drafting', detail: 'Pioneers draft modules on a shared GitHub repository. Each module follows the Artemis module template: learning outcomes (3-5), reading list (10-15 sources), lecture notes (8-10 pages), tutorial questions (10-15), assessment rubric, and capstone prompt. Pioneers can see each other\'s work in progress, comment, and cross-reference.' },
      { title: 'Days 8-12 — Peer Review', detail: 'Each module is reviewed by 2 other Pioneers + 1 external reviewer (an academic from a consortium partner). Reviewers assess: intellectual rigor, pedagogical soundness, assessment validity, and alignment with Artemis\'s four-pillar foundation. Modules are either approved, returned for revision, or rejected.' },
      { title: 'Days 13-14 — Merge & Publish', detail: 'Approved modules are merged into the main repository. Each merged module is published on Artemis Commons with a DOI, mapped to ECTS credits (typically 5 ECTS per module), and tagged with Guild affiliation, degree-path relevance, and prerequisite modules. Authors earn MAP-UBI eligibility. The module becomes available for any Artemis student or degree path.' },
    ],
    economics: {
      model: 'Module authors earn MAP-UBI eligibility upon merge. UBI vests when students complete the module and demonstrate mastery. The Jam itself costs ~$5K (facilitator stipend + external reviewer honoraria + platform costs).',
      revenueSource: 'Modules generate revenue when students enroll in degree paths that include them. Per-student-per-module revenue flows to the author via MAP-UBI.',
      ubiTrigger: 'MAP-UBI activates when a student who took the module completes a capstone milestone. The module author receives a percentage of the UBI payout, proportional to the module\'s contribution to the student\'s learning path.',
      costStructure: 'Per-Jam: ~$5K (facilitator + reviewers + platform). Per-module: $0 (author is compensated via MAP-UBI, not salary). Annual: ~$50K for 10 Jams producing 60+ modules.',
    },
    partnerships: [
      { role: 'Pioneer Authors (5-10 per Jam)', contribution: '2-3 modules each over 14 days. ~20 hours/week commitment. Earn MAP-UBI eligibility on merge.' },
      { role: 'Peer Reviewers (2 per module)', contribution: '2-3 hours per module review. Quality gate for the Commons.' },
      { role: 'External Reviewers (1 per module)', contribution: 'Academic from consortium partner. 2 hours per review. Validates rigor to external standards.' },
      { role: 'Jam Facilitator (1 per Jam)', contribution: 'Manages the sprint, resolves conflicts, ensures quality. ~$2K stipend.' },
    ],
    studentExperience: 'Students never see the Jam directly — they see its output: a library of high-quality, peer-reviewed modules on Artemis Commons. When a student designs their custom path (Years 2-3 in the Open Core model), they browse the module library, read the learning outcomes and assessment rubrics, and choose modules that serve their mission. The student benefits from curriculum that was built by multiple minds, reviewed by external experts, and is continuously updated — not a syllabus written by one professor in 2015 and never revised.',
    pioneerExperience: 'For the academic, the Jam transforms curriculum design from a solitary, bureaucratic exercise into a collaborative, fast-paced sprint. Instead of spending a semester writing a syllabus alone, the Pioneer spends 14 days co-creating with peers, getting real-time feedback, and producing work that is immediately published with a DOI. The Jam appeals to academics who value creation, collaboration, and recognition — and who are frustrated by the slow, political curriculum processes at traditional institutions.',
    milestones: [
      { phase: 'Jam 1 (Month 2)', target: '6 Core modules produced', metric: '4 merged to Commons (67% approval rate)' },
      { phase: 'Jams 2-5 (Months 3-6)', target: '20 Guild-specific modules', metric: '15 merged (75% approval rate)' },
      { phase: 'Jams 6-10 (Months 6-12)', target: '40 specialized modules', metric: '30 merged, 200 ECTS credits mapped' },
      { phase: 'Year 2', target: '60+ module library', metric: 'First students designing custom paths from the library' },
    ],
    timeline: [
      { period: 'Month 1', goal: 'Design the module template. Build the GitHub repository. Recruit the first Jam facilitator.' },
      { period: 'Month 2', goal: 'Run Jam 1: the 6 Core courses. 5 Pioneers, 14 days, 6 modules.' },
      { period: 'Months 3-6', goal: 'Run 4 more Jams (one per Guild priority). Build the module library to 20+ modules.' },
      { period: 'Months 6-12', goal: 'Run 5 more Jams. External reviewers from consortium partners. 60+ modules on Commons.' },
      { period: 'Year 2', goal: 'Module library is sufficient for full degree paths. First students assemble custom paths. MAP-UBI triggers on module completion.' },
    ],
    risks: [
      { risk: 'Module quality varies significantly', mitigation: 'The peer review + external reviewer gate ensures only quality modules are merged. Rejected modules are returned for revision — the author can resubmit at the next Jam.' },
      { risk: 'Pioneers don\'t show up for the sprint', mitigation: 'The Jam is 14 days, not a semester. The time commitment is bounded. Pioneers who commit are expected to deliver — non-delivery affects their Pioneer standing.' },
      { risk: 'Modules don\'t map cleanly to ECTS', mitigation: 'An ECTS mapping rubric is part of the module template. External reviewers validate the credit mapping before merge.' },
      { risk: 'Module library becomes stale', mitigation: 'Modules are versioned on GitHub. Any Pioneer can submit a pull request to update a module. Updated modules go through a lightweight re-review. Stale modules (no updates in 24 months) are flagged.' },
    ],
    keyMetrics: [
      { value: '14', label: 'Days per Jam' },
      { value: '60+', label: 'Modules target (Year 2)' },
      { value: '5 ECTS', label: 'Per module' },
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
    icon: GitBranch,
    status: 'Curriculum Development Engine',
  },
  {
    id: 'guild-miniversity',
    num: '03',
    name: 'Guild-as-Miniversity',
    category: 'Decentralized Faculty',
    tagline: 'Each of Artemis\'s 10 Guilds operates as a self-governing miniversity — with its own credentialing power, faculty, and student body.',
    vision: 'The Guild-as-Miniversity model is Artemis\'s answer to the department. Traditional universities organize faculty into departments (Biology, History, Computer Science) — silos defined by 19th-century disciplines. Artemis organizes faculty into Guilds — interdisciplinary problem-focused communities defined by the 21st century\'s Grand Challenges. Each Guild is not just a research cluster but a self-governing miniversity: it can issue its own credentials (certificates, diplomas), run its own 12-week programs, admit its own students, and manage its own P&L. The Guild is the atomic unit of Artemis — small enough to be agile, large enough to be credible, and connected enough to compound. Ten Guilds, each operating independently but sharing the Artemis Commons, the MAP-UBI pool, and the credit ledger.',
    overview: 'Each of the 10 Guilds operates as a standalone miniversity. A Guild offers 12-week micro-degrees (e.g., "Certificate in Synthetic Biology & Systems Design" from the Biolife Futures Guild). Each Guild has 20 Pioneers (faculty), 50 students per cohort, and a Guild Master who serves as the academic lead. The 12-week program is structured as: 6 weeks of core Guild content (from the module library), 4 weeks of specialization (student-chosen), and 2 weeks of capstone deployment (real-world project via Artemis Guilds). Certificates are stackable: 4 certificates = a diploma, 8 certificates + a full capstone = a BSc. Each Guild manages its own admissions, assessment (using Artemis\'s mastery-based standards), and MAP-UBI triggers. The Guild is the unit at which revenue is recognized and UBI is paid.',
    howItWorks: [
      { title: 'The 10 Guilds', detail: 'Each Guild is organized around a Grand Challenge, not a discipline. The founding 10: (1) Synthetic Intelligence, (2) Bio-Regenerative Arts, (3) Cosmological Humanities, (4) Planetary Systems, (5) Civilization Architecture, (6) Neo-Economics, (7) Space & Frontier Science, (8) Human Augmentation, (9) Media & Consciousness, (10) Conflict & Cooperation. Faculty belong to Guilds, not departments. Students affiliate with the Guild whose mission aligns with theirs.' },
      { title: 'The 12-Week Micro-Degree', detail: 'Each Guild offers 12-week programs structured as: Weeks 1-6: Core Guild content (4 modules from the Commons library, taught by Guild Pioneers in tutorial format). Weeks 7-10: Specialization (student chooses 2 advanced modules aligned with their mission). Weeks 11-12: Capstone deployment (a real-world project with a partner organization, assessed by external examiner). On completion, the student receives a Guild Certificate — a standalone credential.' },
      { title: 'Stackable Credentials', detail: 'Guild Certificates are stackable toward a full degree. 4 certificates (across at least 2 Guilds) = an Artemis Diploma. 8 certificates + a year-long capstone = a BSc. The stackability means a student can build their degree over time, across Guilds, and at their own pace. A student might complete 2 certificates in Year 1, take a break, return for 2 more in Year 3, and finish the BSc in Year 5. The credential accumulates; it doesn\'t expire.' },
      { title: 'Guild Governance', detail: 'Each Guild is self-governing. The Guild Master (elected by the Guild\'s Pioneers) serves a 2-year term and chairs the Guild Council (all Pioneers + 2 student representatives). The Guild Council decides: which modules to teach, which capstone projects to approve, which students to admit, and how to allocate the Guild\'s MAP-UBI pool. The Guild is autonomous in academic matters; Artemis central provides shared infrastructure (Commons, credit ledger, MAP-UBI spec) but does not dictate curriculum.' },
    ],
    economics: {
      model: 'Per-Guild P&L. Each Guild generates revenue from student enrollment (capstone fees) and distributes UBI to its Pioneers based on student milestone achievement. The Guild is the unit at which the MAP-UBI flywheel is tested.',
      revenueSource: 'Student capstone fees (~$2K per 12-week program). Partner organization fees for capstone projects. ACN member contributions for shared Guild access.',
      ubiTrigger: 'MAP-UBI activates when a student in the Guild completes a capstone milestone. The Guild\'s UBI pool is distributed to Pioneers based on their contribution (modules taught, students mentored, capstones supervised).',
      costStructure: 'Per-Guild: ~$100K/year (Pioneer UBI + platform + assessment). Per-student: ~$2K revenue vs. ~$500 marginal cost. Break-even at 25 students per cohort. 50 students = healthy surplus.',
    },
    partnerships: [
      { role: 'Guild Pioneers (20 per Guild)', contribution: 'Teach modules, mentor students, supervise capstones. ~10 hours/week. MAP-UBI eligible.' },
      { role: 'Guild Master (1 per Guild)', contribution: 'Academic lead, chairs Guild Council, 2-year term. ~20 hours/week. Elevated UBI vesting.' },
      { role: 'Capstone Partner Organizations', contribution: 'Provide real-world projects for student capstones. Pay fee for capstone delivery (~$5K per project).' },
      { role: 'External Examiners', contribution: 'Assess capstone quality. From consortium universities. ~$500 per examination.' },
    ],
    studentExperience: 'A student in the Guild-as-Miniversity model experiences Artemis as a series of focused, intensive 12-week programs — not a 4-year marathon. Each 12-week block is a deep dive into a problem domain, taught by Pioneers who are actively working on that problem. The student builds a portfolio of certificates, each representing a real capability. By the time they complete a BSc, they have 8 certificates, each with a capstone project, each externally examined. The transcript doesn\'t say "took 40 courses." It says "can do these 8 things, here is the proof."',
    pioneerExperience: 'For the Pioneer, the Guild is a home. It\'s a community of 20 scholars working on the same Grand Challenge, sharing students, sharing modules, sharing capstones. The Pioneer teaches what they\'re best at (their modules), mentors students whose mission aligns with theirs, and supervises capstones that advance the Guild\'s research agenda. The Guild gives the Pioneer something traditional departments don\'t: a community of purpose, not just a community of proximity.',
    milestones: [
      { phase: 'Guild Launch (Month 6)', target: '3 founding Guilds operational', metric: '60 students across 3 Guilds (20 each)' },
      { phase: 'Year 1', target: '5 Guilds operational', metric: '100 students, 20 capstones completed, first UBI payouts' },
      { phase: 'Year 2', target: '10 Guilds operational', metric: '250 students, 50 capstones, stackable credentials live' },
      { phase: 'Year 3', target: 'First BSc degrees issued', metric: '500 students, 10 Guilds, self-sustaining UBI' },
    ],
    timeline: [
      { period: 'Months 1-3', goal: 'Define the 10 Guilds. Recruit Guild Masters. Design the 12-week structure.' },
      { period: 'Months 3-6', goal: 'Launch 3 founding Guilds. Admit first 60 students. Run first 12-week programs.' },
      { period: 'Months 6-12', goal: 'Launch 2 more Guilds. First capstones. First UBI triggers. External examiner sign-off.' },
      { period: 'Year 2', goal: 'All 10 Guilds operational. Stackable credentials live. First Diplomas issued.' },
      { period: 'Year 3', goal: 'First BSc degrees. 500 students. Guilds self-governing. UBI self-sustaining.' },
    ],
    risks: [
      { risk: 'Guilds can\'t recruit 20 Pioneers each', mitigation: 'Start with 3 Guilds (not 10). The Guest-to-Guild funnel feeds Pioneers into Guilds. A Guild can launch with 10 Pioneers and grow.' },
      { risk: '12-week programs are too short for deep learning', mitigation: 'The 12-week program is a certificate, not a degree. Depth comes from stacking multiple certificates. The capstone (2 weeks) is intensive — equivalent to a thesis sprint.' },
      { risk: 'Guild quality varies', mitigation: 'All Guilds use the same module library, the same assessment standards, and the same external examiner system. The Guild Council + Guild Master are accountable for quality.' },
      { risk: 'Students don\'t stack certificates into degrees', mitigation: 'The stackability is designed to be flexible — students can pause, return, and accumulate. The BSc is the destination, but each certificate is a valuable standalone credential.' },
    ],
    keyMetrics: [
      { value: '10', label: 'Guilds (Year 2)' },
      { value: '12 wk', label: 'Per micro-degree' },
      { value: '8→BSc', label: 'Stackable' },
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200',
    icon: FlaskConical,
    status: 'Decentralized Faculty Model',
  },
  {
    id: 'artemis-collegium-network',
    num: '04',
    name: 'The Artemis Collegium Network (ACN)',
    category: 'Federated Infrastructure',
    tagline: 'A federated network of autonomous colleges that co-issue globally recognized Artemis degrees — scaling legitimacy through partnership, not capital.',
    vision: 'The Artemis Collegium Network is the "federated university of universities" — a network where each partner retains full autonomy while co-issuing globally accredited Artemis degrees. The ACN solves the hardest problem in higher education: how to build global legitimacy without spending a billion dollars on campuses, accreditation, and faculty. The answer is federation. Each ACN node is an existing institution (a micro-college, a research lab, an experimental university) that already has local legitimacy, physical space, and students. Artemis provides the shared layer: the Guild framework, the MAP-UBI system, the Commons publishing platform, and the accreditation pathway (via ECTS credit mapping and consortium partnerships). Together, the ACN is stronger than any single node — and each node is stronger for being part of it.',
    overview: 'The ACN launches with 3-5 pilot nodes across different regions. Each node is an existing institution that contributes: physical/virtual space for residencies, 1-2 faculty who become Artemis Pioneers, and local student recruitment. Artemis provides: the Guild framework (10 interdisciplinary Guilds), the MAP-UBI system (milestone-based UBI for Pioneers), the Commons (open publishing with DOI), and the accreditation pathway (credit mapping to ECTS, partnerships with open universities like UoPeople and OERu for recognition). Degrees are co-branded: "BSc Computer Science — Artemis & [Partner Node]." Students can rotate between nodes (the Darwin Voyage model), accumulating credits across the network. Governance is federated: each node has a seat on the ACN Council, which sets shared standards and resolves disputes.',
    howItWorks: [
      { title: 'Pilot Nodes (3-5 to start)', detail: 'Target: Nairobi (African Leadership Academy or local tech hub), Berlin (existing experimental university or research lab), Cape Town (University of Cape Town partnership for Pop-Up Guild), Toronto (existing micro-college). Each node signs an MOU (not an LOI) specifying: co-sign credentials, send visiting faculty, host residencies, contribute local students. The MOU is the legal foundation.' },
      { title: 'Shared Curriculum', detail: 'All ACN nodes use the Artemis module library (built via Syllabus Jams). Nodes can adapt modules to local context (e.g., Nairobi node adds East African case studies to the Climate Systems module) but the core learning outcomes and assessment rubrics are shared. This ensures a BSc from Nairobi is equivalent to a BSc from Berlin.' },
      { title: 'Dual-Degree Issuance', detail: 'Degrees are co-branded and co-signed: "BSc Computer Science — Artemis & [Partner Node]." The transcript includes: modules taken (from the Commons library), nodes attended (which physical/virtual locations), capstone project (with DOI and external examiner report), and mastery designations (not grades). The credential is portable globally because it maps to ECTS credits and is co-signed by a local institution.' },
      { title: 'Federated Governance', detail: 'The ACN Council consists of: 1 representative per node + the Artemis Guild Council chair + 2 student representatives. The Council meets quarterly (virtual) and annually (rotating physical host). Decisions: shared curriculum standards, accreditation strategy, MAP-UBI pool allocation, new node admissions. Each node retains autonomy in: local admissions, local faculty hiring, local operations, and local capstone partnerships.' },
    ],
    economics: {
      model: 'Shared infrastructure, distributed cost. Artemis central provides the digital layer (Commons, credit ledger, MAP-UBI spec). Nodes provide the physical layer (space, local faculty, local students). Revenue is split: student fees flow to the node, capstone partner fees flow to the Guild, UBI flows to Pioneers from the shared pool.',
      revenueSource: 'Student enrollment fees (per-node), capstone partner fees (per-Guild), ACN membership dues (sliding scale by node capacity)',
      ubiTrigger: 'MAP-UBI triggers when a student at any node completes a capstone milestone. The UBI pool is funded by all nodes proportionally. Pioneers receive UBI regardless of which node their students attend — the credit ledger tracks contribution, not location.',
      costStructure: 'Artemis central: ~$200K/year (platform, accreditation, Guild coordination). Per-node: ~$50K/year (local operations, faculty support). Total for 5 nodes: ~$450K/year. Break-even at 250 students across the network.',
    },
    partnerships: [
      { role: 'Pilot Nodes (3-5)', contribution: 'Physical/virtual space, 1-2 faculty (who become Pioneers), local student recruitment, local capstone partners. Sign MOU.' },
      { role: 'Accreditation Partners', contribution: 'Open universities (UoPeople, OERu) provide credit recognition. ECTS mapping ensures European portability. Malta MFHEA provides the regulatory pathway.' },
      { role: 'Artemis Central', contribution: 'Guild framework, MAP-UBI system, Commons platform, credit ledger, accreditation coordination. ~$200K/year.' },
      { role: 'External Examiners', contribution: 'Academics from consortium universities assess capstones. Ensures cross-institutional credibility.' },
    ],
    studentExperience: 'An ACN student experiences Artemis as a global network, not a single campus. They might start in Nairobi (Year 1 Core), move to Berlin for a Guild specialization (Year 2), take a summer residency in Cape Town, and complete their capstone with a partner in Toronto. Their transcript shows modules, nodes, and capstones — a global portfolio. The student gets the legitimacy of a local institution (the co-signed degree) plus the reach of a global network (10 Guilds, multiple nodes, 500+ Pioneers). They are not a student of one university; they are a student of the network.',
    pioneerExperience: 'For the Pioneer, the ACN means their teaching reaches students across the world. A Pioneer based in Berlin can mentor a student in Nairobi, co-design a capstone with a partner in Cape Town, and have their module taken by students at 5 different nodes. The Pioneer\'s MAP-UBI is network-wide: every student who benefits from their work, anywhere in the ACN, contributes to their UBI vesting. The ACN turns the Pioneer\'s local expertise into global impact.',
    milestones: [
      { phase: 'Months 0-6', target: '3 pilot nodes signed (MOUs)', metric: 'First 50 students across 3 nodes' },
      { phase: 'Year 1', target: '5 nodes operational', metric: '150 students, first dual-degrees issued' },
      { phase: 'Year 2', target: '8 nodes, first new region', metric: '300 students, 50 capstones, UBI self-sustaining' },
      { phase: 'Year 3', target: '12 nodes across 4 continents', metric: '500 students, full accreditation, ACN Council self-governing' },
    ],
    timeline: [
      { period: 'Days 0-90', goal: 'Sign 3 MOUs with pilot nodes. Design the credit mapping. File for Malta MFHEA accreditation.' },
      { period: 'Months 3-6', goal: 'Launch first 3 nodes. Admit first 50 students. Run first ACN-wide courses.' },
      { period: 'Months 6-12', goal: 'Sign 2 more nodes. First capstones. First dual-degrees. First UBI triggers.' },
      { period: 'Year 2', goal: '8 nodes. First student rotations between nodes. First ACN Council meeting.' },
      { period: 'Year 3', goal: '12 nodes. Full accreditation. 500 students. ACN is self-governing.' },
    ],
    risks: [
      { risk: 'Nodes don\'t sign MOUs (prefer LOIs)', mitigation: 'Only sign MOUs — LOIs are meaningless. Start with the most likely yes: Venice International University (already a federation), University of Malta (Malta MFHEA pathway), UoPeople (already global online).' },
      { risk: 'Accreditation takes longer than expected', mitigation: 'Start the Malta MFHEA clock immediately (12-24 month process). In the interim, use ECTS credit mapping + UoPeople/OERu recognition to provide portability.' },
      { risk: 'Nodes don\'t contribute as promised', mitigation: 'The MOU specifies minimum contributions (faculty, students, space). Nodes that don\'t deliver are reviewed by the ACN Council and can lose membership.' },
      { risk: 'Quality varies across nodes', mitigation: 'Shared curriculum + shared assessment + external examiners ensure consistency. The ACN Council sets minimum standards. Nodes that consistently fail quality reviews are placed on probation.' },
    ],
    keyMetrics: [
      { value: '3-5', label: 'Pilot nodes' },
      { value: '4', label: 'Continents' },
      { value: 'ECTS', label: 'Credit mapped' },
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    icon: Globe,
    status: 'Federated Network Model',
  },
  {
    id: 'collegiate-alliance',
    num: '05',
    name: 'The Collegiate Alliance',
    category: 'Founding Coalition',
    tagline: 'A coalition of 5-10 innovative micro-colleges that co-create, co-brand, and co-accredit shared Artemis programs — distributing cost and risk across the founding circle.',
    vision: 'The Collegiate Alliance is the founding coalition — the first circle of institutions that commit to building Artemis together. Unlike the ACN (which is a broad network of nodes), the Alliance is a small, tight-knit group of 5-10 innovative education ventures that have already proven alternative models and are ready to federate. These are not traditional universities; they are micro-colleges, experimental schools, research labs, and bootcamps that have been running niche programs, often for years, without global recognition. Artemis gives them the global brand, the shared infrastructure, and the accreditation pathway. They give Artemis their students, their faculty, and their hard-won local legitimacy. Together, the Alliance is the founding proof that the federated model works.',
    overview: 'The Alliance recruits 5-10 founding members. Target profiles: Venice International University (already a federation, Mediterranean node), African Leadership Academy (African leadership education, Johannesburg node), Eco-Organic Agrarian College (sustainable agriculture, rural node), a European experimental university (Berlin or Amsterdam node), and a tech-focused bootcamp (Singapore or San Francisco node). Each member contributes: 10-20 Pioneers (their existing faculty who join Artemis Guilds), a small student pool (their existing students who can enroll in Artemis programs), and access to teaching space (physical or virtual). Artemis provides: the Guild framework, MAP-UBI, Commons publishing, and the co-branding scaffold. Degrees are co-branded: "BA in Environmental Science — Artemis & Eco-Organic Agrarian College." The Alliance operates under a shared governance council with rotating chairmanship.',
    howItWorks: [
      { title: 'Founding Member Recruitment', detail: 'Target 5-10 institutions that are: (a) already running alternative education programs, (b) frustrated by lack of global recognition, (c) willing to co-create rather than just consume. The pitch: "Keep your autonomy, your brand, your students. Add Artemis\'s global degree, Guild framework, and UBI system. Co-create something neither of us could build alone."' },
      { title: 'The Contribution Model', detail: 'Each member contributes: 10-20 Pioneers (their faculty join Artemis Guilds, teach modules, mentor students), 20-50 students (their existing students can enroll in Artemis degree paths), and physical/virtual space (for residencies, tutorials, capstone presentations). In return, members get: co-branded degrees, access to the Artemis module library, MAP-UBI for their faculty, and the credibility of the Artemis brand.' },
      { title: 'Co-Created Programs', detail: 'Alliance members co-create shared degree programs. For example: Artemis + VIU co-create "MA in Mediterranean Sustainability." Artemis + ALA co-create "BA in African Leadership." Artemis + Eco-Organic co-create "BSc in Regenerative Agriculture." Each program draws modules from the Artemis Commons, is taught by Pioneers from both institutions, and is co-signed by both.' },
      { title: 'Shared MAP-UBI Pool', detail: 'All Alliance members contribute to a shared MAP-UBI pool. When any student in the Alliance completes a capstone milestone, UBI is paid to the Pioneers who mentored them — regardless of which member institution the student is enrolled at. The pool is funded by: student fees (all members), capstone partner fees, and Alliance membership dues (sliding scale by institution size).' },
    ],
    economics: {
      model: 'Distributed cost, shared UBI. Each member contributes to the MAP-UBI pool proportionally. Revenue from co-branded programs is split between Artemis and the member institution (typically 60/40 in favor of the member, since they provide the students and space).',
      revenueSource: 'Co-branded program fees (per-student), capstone partner fees, Alliance membership dues, ACN expansion (new nodes pay an onboarding fee to the Alliance)',
      ubiTrigger: 'MAP-UBI triggers when any Alliance student completes a capstone. The shared pool distributes UBI to Pioneers across all member institutions, proportional to their contribution to the student\'s learning path.',
      costStructure: 'Artemis central: ~$150K/year (platform + coordination). Per-member: ~$30K/year (Pioneer support + local ops). Total for 5 members: ~$300K/year. Break-even at 200 students across the Alliance.',
    },
    partnerships: [
      { role: 'Founding Members (5-10)', contribution: '10-20 Pioneers each, 20-50 students each, physical/virtual space. Co-create programs. Sign the Alliance charter.' },
      { role: 'Artemis Central', contribution: 'Guild framework, MAP-UBI pool, Commons platform, accreditation pathway, brand. ~$150K/year.' },
      { role: 'Capstone Partner Organizations', contribution: 'Real-world projects for student capstones. Pay fee per project. Shared across all Alliance members.' },
      { role: 'Alliance Council', contribution: '1 representative per member + Artemis chair. Meets quarterly. Sets shared standards, approves new programs, allocates UBI pool.' },
    ],
    studentExperience: 'An Alliance student gets the best of both worlds: the local, intimate, mission-driven experience of their home institution, plus the global, interdisciplinary, credentialed reach of Artemis. A student at the Eco-Organic Agrarian College might be working on a regenerative agriculture capstone with a local farm, while taking Artemis modules in Climate Systems and Neo-Economics, and being mentored by a Pioneer at VIU. Their degree says "BSc in Regenerative Agriculture — Artemis & Eco-Organic Agrarian College" — a credential that carries both local credibility and global recognition.',
    pioneerExperience: 'For the Pioneer (a faculty member at a member institution), the Alliance transforms their work from local to global. Their modules are published on Commons with a DOI, available to students across the Alliance. Their capstone supervision can involve students from any member institution. Their MAP-UBI is funded by a pool that includes contributions from all members — so their impact is network-wide, not just local. The Pioneer gains: global colleagues (other Alliance Pioneers), global students, global publishing, and global UBI — without leaving their home institution.',
    milestones: [
      { phase: 'Months 0-3', target: '3 founding members signed', metric: 'Alliance charter ratified' },
      { phase: 'Months 3-6', target: '5 members, first co-created programs', metric: '100 students across the Alliance' },
      { phase: 'Year 1', target: '7 members, first co-branded degrees', metric: '200 students, 30 capstones, first UBI payouts' },
      { phase: 'Year 2', target: '10 members, Alliance self-governing', metric: '400 students, full degree paths, UBI self-sustaining' },
    ],
    timeline: [
      { period: 'Days 0-90', goal: 'Recruit 3 founding members. Draft the Alliance charter. Design the co-branding framework.' },
      { period: 'Months 3-6', goal: 'Sign 2 more members. Launch first co-created programs. Admit first 100 students.' },
      { period: 'Months 6-12', goal: 'First capstones. First co-branded degrees. First MAP-UBI payouts from the shared pool.' },
      { period: 'Year 2', goal: '10 members. Alliance Council self-governing. New programs being co-created by members directly.' },
    ],
    risks: [
      { risk: 'Members don\'t contribute as promised', mitigation: 'The Alliance charter specifies minimum contributions. Members that don\'t deliver are reviewed by the Council and can be removed.' },
      { risk: 'Co-branded degrees confuse students/employers', mitigation: 'The degree format is clear: "BSc in [Field] — Artemis & [Member]." Both brands appear. The transcript explains the collaboration. Employer education materials are provided.' },
      { risk: 'Members want to keep their curriculum private', mitigation: 'The Alliance is built on open sharing. Members who don\'t contribute to the Commons don\'t receive Commons access. The value proposition is: share your best, get everyone else\'s best.' },
      { risk: 'Alliance members compete with each other', mitigation: 'The Alliance is designed for complementary, not competing, institutions. Each member brings a different geography, discipline, or pedagogy. The Council resolves overlaps.' },
    ],
    keyMetrics: [
      { value: '5-10', label: 'Founding members' },
      { value: '10-20', label: 'Pioneers per member' },
      { value: 'Joint', label: 'Co-branded degrees' },
    ],
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200',
    icon: Network,
    status: 'Founding Coalition Model',
  },
  {
    id: 'pop-up-satellite',
    num: '06',
    name: 'Pop-Up Satellite Guilds',
    category: 'Embedded Expansion',
    tagline: 'Embed Artemis Guilds as experimental tracks inside existing universities worldwide — zero infrastructure cost, maximum credibility transfer.',
    vision: 'The Pop-Up Satellite Guild is Artemis\'s Trojan horse. Instead of building a competing university, Artemis embeds its pedagogy inside existing universities as "experimental tracks." A university that offers a traditional BSc in Engineering can add an "Artemis Track in Sustainable Engineering" — a co-branded specialization that uses Artemis modules, Artemis Pioneers, and the Artemis capstone model. The host university gets cutting-edge content and global affiliation at zero cost. Artemis gets credibility transfer (the host university\'s reputation rubs off), Pioneer recruitment (host faculty become Artemis Pioneers), and student access (host students experience Artemis without transferring). The Pop-Up is the lowest-risk, highest-leverage expansion model: it costs Artemis almost nothing, and it places Artemis pedagogy inside the very institutions it aims to complement.',
    overview: 'A Pop-Up Satellite Guild is a co-branded track inside an existing university. Example: "Artemis Track in Sustainable Engineering" at the University of Cape Town. Local faculty teach capstones under Artemis rubrics, becoming Artemis Pioneers. Students who complete the track receive dual recognition: their home university\'s degree + an Artemis Guild Certificate. The Pop-Up uses the host university\'s infrastructure (classrooms, labs, dorms) at zero marginal cost to Artemis. The host university gets: cutting-edge interdisciplinary content, global affiliation, and a differentiated offering for prospective students. Artemis gets: credibility transfer, faculty recruitment, student pipeline, and a live test of its pedagogy in a traditional setting.',
    howItWorks: [
      { title: 'The Partnership MOU', detail: 'Artemis signs an MOU with a host university specifying: (1) the track name (e.g., "Artemis Track in Sustainable Engineering"), (2) the modules to be taught (from the Artemis Commons), (3) the faculty who will teach (host faculty become Artemis Pioneers), (4) the capstone requirements (Artemis rubric, external examiner), and (5) the recognition (dual: home degree + Artemis certificate). The MOU is for a 3-year pilot, renewable.' },
      { title: 'Faculty Conversion', detail: 'Host university faculty who teach the Artemis track become Artemis Pioneers. They gain: Commons publishing rights, MAP-UBI eligibility, global network access, and curriculum freedom (Artemis modules are interdisciplinary, not constrained by department). The conversion is the key asset: each Pop-Up converts 2-5 local faculty into Artemis Pioneers at zero recruitment cost.' },
      { title: 'Student Experience', detail: 'Students in the Artemis track take their home university\'s core courses PLUS Artemis modules (taught by their own faculty using Artemis rubrics) PLUS an Artemis capstone (externally examined). They graduate with: their home university\'s degree + an Artemis Guild Certificate. The certificate is stackable — if the student later enrolls in a full Artemis degree, the certificate counts toward it.' },
      { title: 'The Exit Strategy', detail: 'After 3 years, the Pop-Up is evaluated: (a) convert to a full ACN member (if the partnership is strong and the host wants deeper integration), (b) continue as a Pop-Up (if the model works but the host wants to stay light-touch), or (c) wind down (if the model didn\'t work at this institution). The exit strategy ensures Artemis doesn\'t get trapped in failed partnerships.' },
    ],
    economics: {
      model: 'Zero marginal cost. Artemis provides modules (already built, zero cost to deploy) and the capstone framework. The host university provides everything else (space, faculty, students). Revenue: Artemis receives a per-student fee for the certificate (~$500) and capstone partner fees.',
      revenueSource: 'Per-student certificate fee (~$500), capstone partner fees, Pioneer UBI from the shared pool (triggered by capstone milestones)',
      ubiTrigger: 'MAP-UBI triggers when a Pop-Up student completes their capstone. The host faculty (now Pioneers) receive UBI from the shared pool, just like any other Pioneer.',
      costStructure: 'Per-Pop-Up: ~$5K/year (coordination + external examiner fees). Artemis central overhead is already covered by other initiatives. The Pop-Up is nearly pure margin.',
    },
    partnerships: [
      { role: 'Host University', contribution: 'Physical space, faculty (who become Pioneers), students, local accreditation. Signs 3-year MOU.' },
      { role: 'Host Faculty (2-5 per Pop-Up)', contribution: 'Teach Artemis modules, supervise capstones. Become Artemis Pioneers. ~5 hours/week additional commitment.' },
      { role: 'Artemis Central', contribution: 'Module library, capstone framework, external examiners, Commons platform. ~$5K/year per Pop-Up.' },
      { role: 'External Examiners', contribution: 'Assess capstones. From consortium or partner universities. Ensures the Artemis certificate is credible.' },
    ],
    studentExperience: 'The Pop-Up student gets a traditional degree with an Artemis edge. They stay at their home university (no transfer, no visa issues, no disruption) but experience Artemis pedagogy: interdisciplinary modules, tutorial-style teaching, a real-world capstone, and external examination. The Artemis Guild Certificate on their transcript signals to employers and graduate schools that they\'ve done something beyond the standard curriculum. If they later want to pursue a full Artemis degree, the certificate counts — they\'re already partway there.',
    pioneerExperience: 'For the host faculty member, the Pop-Up is a low-risk way to experience Artemis without leaving their job. They teach their existing subject but with Artemis modules, Artemis rubrics, and Artemis students. They become a Pioneer — gaining Commons publishing, MAP-UBI eligibility, and a global network. If they love it, they can deepen (join a Guild full-time, co-create new modules). If they don\'t, they return to their regular teaching with no harm done. The Pop-Up respects the reality that most academics won\'t leave their tenure track — but they\'ll contribute 5 hours/week to something exciting.',
    milestones: [
      { phase: 'Months 0-3', target: '2 Pop-Up MOUs signed', metric: '5 host faculty converted to Pioneers' },
      { phase: 'Year 1', target: '5 Pop-Ups operational', metric: '100 students in Artemis tracks, 10 capstones' },
      { phase: 'Year 2', target: '10 Pop-Ups, first conversions to ACN', metric: '200 students, 30 capstones, first UBI payouts to host faculty' },
      { phase: 'Year 3', target: '15 Pop-Ups, 3 converted to ACN members', metric: '300 students, network of converted Pioneers' },
    ],
    timeline: [
      { period: 'Days 0-90', goal: 'Identify 5 target universities. Design the Pop-Up MOU template. Recruit the first host faculty.' },
      { period: 'Months 3-6', goal: 'Sign 2 MOUs. Launch first Pop-Up tracks. Convert first host faculty to Pioneers.' },
      { period: 'Months 6-12', goal: '5 Pop-Ups operational. First capstones. First certificates issued.' },
      { period: 'Year 2', goal: '10 Pop-Ups. First conversions to ACN membership. First UBI payouts to host faculty.' },
      { period: 'Year 3', goal: 'Evaluate all Pop-Ups. Convert successful ones to ACN. Wind down unsuccessful ones.' },
    ],
    risks: [
      { risk: 'Host universities resist co-branding', mitigation: 'Start with universities that are already experimental or seeking differentiation. The Artemis brand adds value — position it as an upgrade, not a replacement.' },
      { risk: 'Host faculty don\'t convert to Pioneers', mitigation: 'The Pioneer benefits (Commons, UBI, network) are genuinely valuable. If faculty don\'t convert, the Pop-Up isn\'t working — wind it down and try elsewhere.' },
      { risk: 'Capstone quality varies by institution', mitigation: 'External examiners from Artemis\'s consortium ensure consistent assessment. The capstone rubric is shared. Institutions that consistently fail quality reviews lose their Pop-Up status.' },
      { risk: 'Host university competes with Artemis after seeing the model', mitigation: 'The Artemis modules are open-source (they can be copied), but the Artemis brand, Guild framework, MAP-UBI, and global network cannot. The value is in the network, not the content.' },
    ],
    keyMetrics: [
      { value: '0$', label: 'Marginal cost' },
      { value: 'Dual', label: 'Recognition' },
      { value: '3 yr', label: 'Pilot per Pop-Up' },
    ],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
    icon: Rocket,
    status: 'Embedded Expansion Model',
  },
  {
    id: 'mooc-to-capstone',
    num: '07',
    name: 'The MOOC-to-Capstone Funnel',
    category: 'Attention Engine',
    tagline: 'Free MOOCs attract 10,000+ learners globally. The top 10% convert to capstone enrollment — funding UBI for the Pioneers who built the MOOCs.',
    vision: 'The MOOC-to-Capstone Funnel is Artemis\'s marketing engine and primary revenue driver. Traditional universities spend millions on marketing and admissions. Artemis spends nothing on ads — it spends on MOOCs. Pioneers build free, high-quality MOOCs (10-week courses on YouTube, GitHub, and open platforms) that attract learners globally. The MOOCs are genuinely valuable — not infomercials but real courses with real content. The top 10% of engaged learners (those who complete the MOOC, demonstrate skills, and want more) are invited to enroll in a paid capstone track. The capstone is where revenue is generated and MAP-UBI is triggered. The Pioneer who built the MOOC earns UBI when their MOOC students convert to capstone enrollment. The funnel is self-sustaining: better MOOCs attract more learners, more learners mean more capstone conversions, more conversions fund more UBI, more UBI attracts more Pioneers, more Pioneers build more MOOCs.',
    overview: 'The funnel operates in three stages. Stage 1: A Pioneer builds a 10-week MOOC on a topic aligned with their Guild. The MOOC includes: video lectures (10-15 hours), reading materials, weekly exercises, and a final project. It\'s published free on YouTube + GitHub, with no enrollment gate. Stage 2: Artemis tracks engagement (video views, exercise completion, project submission). The top 10% of engaged learners (those who complete the final project) are invited to a capstone track. Stage 3: The capstone track is a 12-week intensive where the learner works with the Pioneer on a real-world project, is assessed by an external examiner, and receives an Artemis Guild Certificate. The capstone costs ~$2K. The Pioneer who built the MOOC receives MAP-UBI when their students convert. The economics: 10,000 MOOC learners → 1,000 complete → 100 capstone applicants → 50 enroll → $100K revenue → funds the Pioneer\'s UBI.',
    howItWorks: [
      { title: 'Stage 1 — MOOC Production (Pioneer builds)', detail: 'A Pioneer designs and records a 10-week MOOC. Artemis provides: video production support (if needed), the Commons platform for hosting materials, and a MOOC template (learning outcomes, weekly structure, assessment rubric). The MOOC is published free on YouTube (for video), GitHub (for materials), and Artemis Commons (for the DOI and credit). The Pioneer retains IP; Artemis gets publication rights.' },
      { title: 'Stage 2 — Engagement Tracking (Artemis monitors)', detail: 'Artemis tracks: video completion rates, exercise submission rates, final project submission rates. Learners who submit a final project are flagged as "engaged." The top 10% of engaged learners (by quality of final project) receive a personalized invitation to the capstone track. The invitation includes: the capstone topic, the Pioneer who will mentor, the 12-week schedule, and the fee ($2K, with need-based aid available).' },
      { title: 'Stage 3 — Capstone Conversion (Student enrolls)', detail: 'The capstone track is a 12-week intensive: weekly tutorials with the Pioneer (3:1 ratio), independent project work, and a final presentation to an external examiner. On completion, the student receives an Artemis Guild Certificate (stackable toward a degree) and their capstone is published on Commons with a DOI. The Pioneer receives MAP-UBI based on the student\'s capstone milestone. The capstone partner organization (if the project is real-world) pays a project fee.' },
      { title: 'The Flywheel', detail: 'The Pioneer who built the MOOC earns UBI when students convert. UBI vesting incentivizes the Pioneer to improve the MOOC (better MOOC = more learners = more conversions = more UBI). The MOOC library grows over time, attracting more learners. The funnel compounds: 1 MOOC in Month 1 → 5 MOOCs in Month 6 → 20 MOOCs in Year 2. Each MOOC is a permanent marketing asset that works 24/7.' },
    ],
    economics: {
      model: 'MOOCs are free (marketing cost). Capstones are paid ($2K per student). The Pioneer who built the MOOC receives MAP-UBI when their students convert. The funnel is the primary revenue engine for Artemis.',
      revenueSource: 'Capstone enrollment fees ($2K per student), capstone partner fees ($5K per project), certificate issuance fees',
      ubiTrigger: 'MAP-UBI triggers when a MOOC student converts to capstone and completes a milestone. The Pioneer receives a percentage of the capstone fee + ongoing UBI vesting tied to student outcomes.',
      costStructure: 'Per-MOOC: ~$2K (video production + platform). Per-capstone: ~$500 marginal cost (examiner + platform). Per-student: $2K revenue - $500 cost = $1,500 contribution margin. 50 capstone students per MOOC per year = $75K revenue per MOOC.',
    },
    partnerships: [
      { role: 'MOOC-Building Pioneers', contribution: 'Design and record 10-week MOOCs. ~40 hours of work upfront. Earn MAP-UBI on student conversion.' },
      { role: 'Capstone Students', contribution: 'Enroll in 12-week capstone ($2K). Complete real-world project. Receive Guild Certificate.' },
      { role: 'Capstone Partner Organizations', contribution: 'Provide real-world projects. Pay $5K per project. Receive the capstone output.' },
      { role: 'External Examiners', contribution: 'Assess capstone quality. ~$500 per examination. Ensure credibility.' },
    ],
    studentExperience: 'The MOOC learner starts free — they watch videos, do exercises, submit a final project. If they\'re in the top 10%, they get invited to something more: a 12-week capstone with the Pioneer who taught the MOOC. The transition from free to paid is natural — the learner has already experienced the Pioneer\'s teaching, they know the topic, and they want to go deeper. The capstone is intensive, personal (3:1 ratio), and results in a real credential. The student doesn\'t feel like they\'re being marketed to; they feel like they\'re being invited to level up.',
    pioneerExperience: 'For the Pioneer, the MOOC is a 40-hour upfront investment that pays dividends for years. Every MOOC learner who converts to a capstone generates UBI. Every capstone student who completes a milestone adds to the Pioneer\'s UBI vesting. The Pioneer is incentivized to make the MOOC as good as possible — because better MOOCs mean more learners, more conversions, and more UBI. The MOOC also builds the Pioneer\'s global reputation: thousands of learners watch their lectures, know their name, and associate them with Artemis.',
    milestones: [
      { phase: 'Month 3', target: '1 MOOC published', metric: '1,000 learners, 100 final projects submitted' },
      { phase: 'Month 6', target: '5 MOOCs, first capstone cohort', metric: '5,000 learners, 50 capstone students enrolled' },
      { phase: 'Year 1', target: '15 MOOCs, 10 capstone cohorts', metric: '15,000 learners, 150 capstone students, first UBI payouts' },
      { phase: 'Year 2', target: '40 MOOCs, self-sustaining funnel', metric: '50,000 learners, 500 capstone students/year, $750K revenue' },
    ],
    timeline: [
      { period: 'Month 1', goal: 'Design the MOOC template. Recruit first 3 MOOC-building Pioneers. Set up the Commons hosting.' },
      { period: 'Month 2-3', goal: 'Produce first 3 MOOCs. Publish on YouTube + Commons. Begin engagement tracking.' },
      { period: 'Month 4-6', goal: '5 MOOCs live. First capstone invitations. First capstone cohort starts.' },
      { period: 'Months 6-12', goal: '15 MOOCs. 10 capstone cohorts. First UBI payouts to MOOC Pioneers.' },
      { period: 'Year 2', goal: '40 MOOCs. Funnel is self-sustaining. Pioneers are building MOOCs without being asked (UBI incentive).' },
    ],
    risks: [
      { risk: 'MOOC engagement is low (< 5% completion)', mitigation: 'Industry average for MOOC completion is 5-10%. Artemis targets the top 10% of completers, not all enrollees. Even at 3% completion of 10,000 learners = 300 completers = 30 capstone students.' },
      { risk: 'Capstone conversion rate is low (< 10%)', mitigation: 'The invitation is personalized and comes from the Pioneer (not a marketing email). The learner has already demonstrated interest by completing the MOOC. A 10% conversion of completers is conservative.' },
      { risk: 'MOOC quality is inconsistent', mitigation: 'The MOOC template + peer review (by other Pioneers) ensures minimum quality. MOOCs that don\'t attract learners are revised or retired. The UBI incentive naturally rewards better MOOCs.' },
      { risk: 'Capstone capacity can\'t meet demand', mitigation: 'Capstone capacity scales with Pioneer recruitment (Guest-to-Guild funnel). Each Pioneer can mentor ~5 capstone students per cohort. 50 Pioneers = 250 capstone students per cohort.' },
    ],
    keyMetrics: [
      { value: '10K', label: 'Learners per MOOC' },
      { value: '10%', label: 'Top learners funnel' },
      { value: '$2K', label: 'Per capstone' },
    ],
    image: 'https://images.unsplash.com/photo-1634947101456-d40e5122b048?auto=format&fit=crop&q=80&w=1200',
    icon: BookOpen,
    status: 'Attention & Revenue Engine',
  },
  {
    id: 'open-core-capstone',
    num: '08',
    name: 'The Open Core + Capstone Degree',
    category: 'Lean Degree Structure',
    tagline: 'Artemis teaches only Year 1 (Core) and Year 4 (Capstone). Students design Years 2-3 via MOOCs, local universities, or self-directed Guild projects.',
    vision: 'The Open Core + Capstone model is Artemis\'s answer to the four-year degree — radically lean, radically flexible, and radically credible. Traditional universities teach all four years themselves: 40 courses, 120 credits, 4 years on campus. Artemis teaches only 12 courses (Year 1 Core + Year 4 Capstone) and lets students design the middle two years themselves — using approved MOOCs, local university courses, or self-directed Guild projects. The result: Artemis needs 20-30 Pioneers (not 200 faculty) to run a full degree. Students get structure (the Core) + freedom (the custom path) + credibility (the externally-examined Capstone). The credential: "Artemis Core + [Custom Path] + Capstone in [Guild]" — a degree that describes what the student can do, not where they sat for four years.',
    overview: 'The degree has three components. Component 1: The Artemis Core (Year 1) — 6 interdisciplinary courses taught by Artemis Pioneers in tutorial format (3:1 ratio). The Core covers: Epistemology (how we know), Computational Thinking (how we compute), Global Systems (how we see systems), Creative Expression (how we make), Ethics & Society (how we decide), and Mission Design (what we work toward). Every Artemis graduate completes the same Core — it\'s the shared intellectual substrate. Component 2: The Custom Path (Years 2-3) — the student designs their own middle years. They can: take approved MOOCs (from the Artemis library or external), take courses at a local university (transferred in via ECTS mapping), or design self-directed Guild projects (with Pioneer mentorship). The Custom Path is not unstructured — it must be approved by the student\'s Guild Council and aligned with their declared mission. Component 3: The Capstone (Year 4) — a year-long real-world deployment via an Artemis Guild, with an external examiner from a consortium university. The capstone is the credibility test: if a skeptic can look at the capstone and say "this is indistinguishable from a top-50 university graduate\'s work," the model is proven.',
    howItWorks: [
      { title: 'Year 1 — The Artemis Core (6 courses)', detail: 'Every Artemis student completes the same 6 Core courses, taught by Pioneers in tutorial format (3 students, 1 Pioneer, 75 minutes/week). The Core is the shared foundation: Epistemology, Computational Thinking, Global Systems, Creative Expression, Ethics & Society, Mission Design. The Core is delivered at an Artemis node (physical or virtual) — students attend in person or via synchronous virtual tutorials. The Core is 30 ECTS credits.' },
      { title: 'Years 2-3 — The Custom Path (student-designed)', detail: 'The student designs their own middle years, choosing from: (a) approved MOOCs from the Artemis Commons library (each MOOC maps to 5 ECTS), (b) courses at a local university (transferred in via ECTS mapping, up to 60 ECTS), (c) self-directed Guild projects (designed with a Pioneer mentor, assessed by portfolio, up to 30 ECTS). The Custom Path must total 60 ECTS and be approved by the student\'s Guild Council. The student declares a mission (not a major) at the start of Year 2 — the Custom Path must serve that mission.' },
      { title: 'Year 4 — The Capstone (real-world deployment)', detail: 'The student spends Year 4 on a single capstone project: a real-world deployment via an Artemis Guild. The capstone is: 12 months of work on a real problem with a real partner organization, supervised by a Pioneer, assessed by an external examiner from a consortium university. The capstone must produce: a publicly verifiable output (with DOI, raw data, and reviewer history), an oral defense (recorded, public, questioned by people who didn\'t teach the student), and a written thesis. The capstone is 30 ECTS.' },
      { title: 'The Credential', detail: 'On completion, the student receives: "Artemis Core + [Custom Path Description] + Capstone in [Guild]" — a BSc from the University of Artemis, co-signed by the student\'s node (if ACN) or the Alliance member. The transcript includes: Core courses (with mastery designations), Custom Path modules (with ECTS credits and sources), and the Capstone (with DOI, examiner report, and defense recording). The credential describes what the student can do — not where they sat.' },
    ],
    economics: {
      model: 'Lean faculty model. 20-30 Pioneers teach the Core + mentor Capstones. The Custom Path costs Artemis nothing (students use external resources). Revenue: per-student degree fees (~$15K for the full 4-year program, heavily need-based-aided).',
      revenueSource: 'Degree program fees (~$15K per student, 4 years), capstone partner fees ($5K per project), ACN/Alliance member contributions',
      ubiTrigger: 'MAP-UBI triggers when a student completes their capstone. The Pioneers who taught the Core and supervised the Capstone receive UBI from the shared pool, proportional to their contribution.',
      costStructure: 'Per-student: ~$3K (Core delivery + Capstone supervision + assessment). Revenue: ~$15K. Contribution margin: ~$12K per student. At 50 students: $600K revenue, $150K cost, $450K surplus (funds UBI + operations). At 500 students: $6M revenue, $1.5M cost.',
    },
    partnerships: [
      { role: 'Core Pioneers (20-30)', contribution: 'Teach the 6 Core courses (tutorial format, 3:1). ~15 hours/week. MAP-UBI eligible on student capstone completion.' },
      { role: 'Capstone Supervisors (from Guild Pioneers)', contribution: 'Supervise Year 4 capstones. ~5 hours/week per student. Elevated UBI vesting.' },
      { role: 'External Examiners', contribution: 'Assess capstones. From consortium universities. Ensure the credential is credible to skeptics. ~$500 per examination.' },
      { role: 'Custom Path Providers', contribution: 'MOOC platforms (YouTube, GitHub), local universities (ECTS transfer), Guild mentors (project supervision). External to Artemis.' },
    ],
    studentExperience: 'The student experiences Artemis as: one intense year of shared foundation (the Core), two years of self-directed exploration (the Custom Path), and one year of real-world impact (the Capstone). The Core gives them the tools to think. The Custom Path gives them the freedom to explore. The Capstone gives them the proof that they can do. By graduation, they have: a shared intellectual foundation with every Artemis graduate, a custom-built skill set aligned with their mission, and a publicly verifiable capstone that demonstrates their capability to any skeptic. They are not a standardized product. They are a unique thinker and maker.',
    pioneerExperience: 'For the Pioneer, the Open Core model means they teach what matters most (the Core, where foundational thinking is built) and mentor where it matters most (the Capstone, where real-world impact is proven). They don\'t teach the middle years — those are the student\'s responsibility. The Pioneer\'s time is spent on high-value interactions: tutorials, capstone supervision, and curriculum design (via Syllabus Jams). The model is lean and dignified — the Pioneer is a mentor and a thinker, not a lecturer repeating the same course 8 semeters in a row.',
    milestones: [
      { phase: 'Year 1', target: 'First 50 students enrolled in the Core', metric: '50 students complete Year 1 Core, 100% mastery on at least 4 of 6 courses' },
      { phase: 'Year 2', target: '50 students in Custom Path, 50 new students in Core', metric: '100 total students, first Custom Path approvals' },
      { phase: 'Year 3', target: 'First capstone cohort starts', metric: '50 students in Capstone, 50 in Custom Path, 50 in Core = 150 total' },
      { phase: 'Year 4', target: 'First BSc degrees issued', metric: '50 capstones completed, 50 externally examined, first BSc credentials issued' },
    ],
    timeline: [
      { period: 'Months 0-6', goal: 'Design the 6 Core courses (via Syllabus Jam). Recruit 20 Core Pioneers. Design the Custom Path approval process.' },
      { period: 'Months 6-12', goal: 'Admit first 50 students. Run Year 1 Core. Set up the Custom Path framework.' },
      { period: 'Year 2', goal: 'First students enter Custom Path. Admit second cohort (50 more). Refine the Core based on feedback.' },
      { period: 'Year 3', goal: 'First students enter Capstone. Secure capstone partner organizations. Recruit external examiners.' },
      { period: 'Year 4', goal: 'First capstones completed. First BSc degrees issued. Publish outcomes report. Prove the model.' },
    ],
    risks: [
      { risk: 'Custom Path quality is inconsistent', mitigation: 'The Guild Council approves each Custom Path. MOOCs are pre-approved. Local university courses are ECTS-mapped. Self-directed projects require a Pioneer mentor and portfolio assessment.' },
      { risk: 'Students can\'t design their own path', mitigation: 'The Mission Design course (part of the Core) teaches students how to design a learning path. Pioneer mentors guide the design. The path is reviewed and approved before the student begins.' },
      { risk: 'Capstone quality doesn\'t meet top-50 standards', mitigation: 'This is the existential risk. External examiners from consortium universities are the quality gate. If the first 12 capstones don\'t meet the standard, the model needs iteration — not excuses. The outcomes report must be honest.' },
      { risk: 'Employers don\'t recognize the credential', mitigation: 'The credential is co-signed by an ACN/Alliance member (borrowed legitimacy). The capstone is publicly verifiable (DOI, data, defense recording). The transcript describes competencies, not courses. Employer education is part of the launch strategy.' },
    ],
    keyMetrics: [
      { value: '20-30', label: 'Pioneers needed' },
      { value: '6', label: 'Core courses' },
      { value: '120', label: 'ECTS credits' },
    ],
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1200',
    icon: Layers,
    status: 'Lean Degree Structure',
  },
  {
    id: 'pioneer-fellowship',
    num: '09',
    name: 'The Pioneer Fellowship',
    category: 'Founding Academy',
    tagline: '200+ Fellows recruited via open call — no pay upfront, but influence, IP rights, and future UBI. The founding academic body of Artemis.',
    vision: 'The Pioneer Fellowship is Artemis\'s founding academy — the 200 academics who form the university\'s first faculty body. Traditional universities hire faculty through a slow, expensive, exclusive process. Artemis opens the doors. The Fellowship is a global, meritocratic open call: any academic — professor, postdoc, independent scholar, industry researcher — can apply by submitting proof-of-work (a course module, a lab design, a capstone rubric). The best 200 are curated into the "Founding Fellows" — the academic spine of Artemis. Fellows receive no salary upfront. They receive: early influence on Artemis curricula and Guild design, a publication platform (Artemis Commons) with DOI and IP rights, a global collaboration network (private forum, virtual residencies), and a pathway to MAP-UBI once student milestones trigger. The Fellowship targets disillusioned academics — the ones who value impact over income, who are frustrated by bureaucracy, and who want to build something new without gambling their career.',
    overview: 'The Fellowship launches with a global open call. Any academic can apply by submitting proof-of-work: a course module (following the Artemis template), a lab design, a capstone rubric, or a syllabus for a 12-week program. Submissions are reviewed by the Founding Council (initially: the Artemis founders + 3-5 recruited senior academics). The top 200 submissions become "Founding Fellows." Each Fellow is assigned to a Guild (based on their submission and stated mission). Fellows receive: (1) governance rights (vote on curriculum, Guild design, and MAP-UBI spec), (2) Commons publishing rights (DOI + IP retention), (3) network access (private forum, virtual residencies, cross-Guild collaboration), (4) MAP-UBI eligibility (vests when their students complete milestones), and (5) founding status (permanent recognition as a Founding Fellow of the University of Artemis). The Fellowship is the talent pool from which Guild Masters, Core Pioneers, and Capstone Supervisors are drawn.',
    howItWorks: [
      { title: 'The Open Call', detail: 'Artemis announces a global open call for Pioneer Fellows. The call is distributed through: academic networks (Twitter, academic blogs, university mailing lists), the Guest-to-Guild funnel (500+ academics already engaged), and partner institutions (ACN/Alliance members). The call is clear: "Submit proof-of-work. No resume, no cover letter, no interview. Show us what you can teach."' },
      { title: 'Proof-of-Work Submission', detail: 'Each applicant submits ONE of: (a) a course module (following the Artemis template: learning outcomes, reading list, lecture notes, tutorial questions, assessment rubric — ~15 pages), (b) a lab design (for a practical/experiential learning unit), (c) a capstone rubric (for assessing a real-world student project), or (d) a 12-week syllabus for a Guild micro-degree. Submissions are in English (or translated). The submission is the application — nothing else is required.' },
      { title: 'Review & Curation', detail: 'The Founding Council (Artemis founders + 3-5 recruited senior academics) reviews all submissions against: intellectual rigor, pedagogical soundness, alignment with Artemis\'s mission (problems not disciplines), and originality. The top 200 are selected as "Founding Fellows." The review is blind to: institutional affiliation, academic rank, age, geography, and credentials. Only the work matters.' },
      { title: 'Fellow Benefits & Commitments', detail: 'Founding Fellows receive: governance rights (vote on curriculum and Guild design), Commons publishing (DOI + IP retention), network access (private forum, virtual residencies), MAP-UBI eligibility (vests on student milestones), and founding status. Fellows commit to: 10 hours/week for 12 months (teaching, mentoring, or curriculum design), participation in at least one Syllabus Jam, and attendance at the annual Fellows Assembly (virtual or physical). Fellows who don\'t meet the commitment are reviewed and can lose active status (but retain founding recognition).' },
    ],
    economics: {
      model: 'No upfront salary. Fellows are compensated through MAP-UBI (vests on student outcomes) + influence + IP rights + network. The Fellowship is the talent pool — it doesn\'t cost Artemis anything until UBI triggers (which only happens when students succeed).',
      revenueSource: 'Student fees (from degree programs and capstones) fund the MAP-UBI pool. The Fellowship is the mechanism that connects Pioneers to students — it doesn\'t generate revenue directly, it enables it.',
      ubiTrigger: 'MAP-UBI vests when a Fellow\'s students complete capstone milestones. The vesting schedule: 25% on first student milestone, 50% on capstone completion, 100% on student outcomes report (12 months post-capstone). UBI is paid from the shared pool, proportional to the Fellow\'s contribution.',
      costStructure: 'Per-Fellow: ~$500/year (platform + forum + virtual residency hosting). For 200 Fellows: ~$100K/year. No salary costs until UBI triggers. The Fellowship is the leanest possible founding faculty model.',
    },
    partnerships: [
      { role: 'Founding Fellows (200)', contribution: 'Proof-of-work submission. 10 hours/week for 12 months. Assigned to a Guild. Governance + teaching + mentoring.' },
      { role: 'Founding Council (5-7)', contribution: 'Reviews submissions. Curates the 200. Sets standards for the Fellowship. Initially: Artemis founders + recruited seniors.' },
      { role: 'Guild Masters (10)', contribution: 'Elected by Fellows in each Guild. 2-year term. Academic lead for the Guild. Drawn from the Fellowship.' },
      { role: 'Fellows Assembly (annual)', contribution: 'All Fellows meet (virtual or physical). Vote on governance, curriculum, MAP-UBI spec. The democratic body of Artemis.' },
    ],
    studentExperience: 'Students benefit from the Fellowship because they are taught by the 200 academics who were selected purely on the quality of their work — not their institutional rank, their publications count, or their connections. Every Fellow earned their place by demonstrating they can teach. Students in the Core are taught by Fellows. Students in capstones are supervised by Fellows. Students in Guilds are mentored by Fellows. The Fellowship ensures that every student-faculty interaction at Artemis is with someone who has proven their capability — not just their credentials.',
    pioneerExperience: 'For the Fellow, the Fellowship is a community of purpose. They are surrounded by 199 other academics who were selected for the same reason: they can teach, they care about impact, and they want to build something new. The private forum is where ideas cross-pollinate (a biologist in the Bio-Regenerative Arts Guild meets a philosopher in the Cosmological Humanities Guild; they co-design a module on the ethics of synthetic biology). The virtual residencies are where deeper collaboration happens (2-week focused sprints with 3-4 other Fellows on a shared project). The annual Assembly is where the Fellowship exercises its governance power — voting on the curriculum, the Guilds, and the MAP-UBI spec. The Fellow is not an employee. They are a founding member of a new kind of university.',
    milestones: [
      { phase: 'Months 0-3', target: 'Open call launched', metric: '500+ applications received' },
      { phase: 'Months 3-6', target: '200 Founding Fellows curated', metric: '10 Guilds populated with 20 Fellows each' },
      { phase: 'Months 6-12', target: 'First Syllabus Jams run by Fellows', metric: '60+ modules on Commons, first courses taught' },
      { phase: 'Year 2', target: 'First Fellows Assembly', metric: 'Governance vote on curriculum + MAP-UBI spec, first UBI vesting' },
    ],
    timeline: [
      { period: 'Days 0-30', goal: 'Design the open call. Build the submission platform. Recruit the Founding Council (3-5 senior academics).' },
      { period: 'Days 30-90', goal: 'Launch the open call. Distribute through academic networks + Guest-to-Guild funnel. Collect submissions.' },
      { period: 'Months 3-4', goal: 'Founding Council reviews submissions. Curate the 200. Assign to Guilds.' },
      { period: 'Months 4-6', goal: 'Fellows onboarded. Private forum launched. First Guild meetings. First Syllabus Jam.' },
      { period: 'Months 6-12', goal: 'Fellows teaching Core, mentoring students, building modules. First MAP-UBI vesting.' },
      { period: 'Year 2', goal: 'First Fellows Assembly. Governance vote. Fellows elect Guild Masters. Fellowship is self-governing.' },
    ],
    risks: [
      { risk: 'Fewer than 200 quality applications', mitigation: 'The Guest-to-Guild funnel (500+ academics) feeds the Fellowship. Even at 20% conversion from Affiliate to Fellow, that\'s 100 Fellows. Start with 100 and grow.' },
      { risk: 'Fellows don\'t meet the 10 hours/week commitment', mitigation: 'The commitment is bounded (12 months) and flexible (teaching, mentoring, or curriculum design). Fellows who don\'t meet it are reviewed — they retain founding recognition but lose active status (and UBI eligibility).' },
      { risk: 'Fellows are concentrated in one discipline', mitigation: 'The open call targets all disciplines. The Founding Council ensures disciplinary diversity in the curation. The 10 Guilds span sciences, humanities, social sciences, and arts.' },
      { risk: 'MAP-UBI doesn\'t vest (no student milestones)', mitigation: 'UBI only vests when students succeed — which is the right incentive. If UBI doesn\'t vest, it means the model isn\'t working. The Fellowship is the talent pool; the degree programs (Open Core, Guild-as-Miniversity) are the student-facing programs that trigger UBI.' },
    ],
    keyMetrics: [
      { value: '200+', label: 'Founding Fellows' },
      { value: '0$', label: 'Upfront pay' },
      { value: '10 hr', label: 'Per week commitment' },
    ],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
    icon: Award,
    status: 'Founding Academy Model',
  },
];

/* ─── Hook ─── */
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
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
export default function FlagshipInitiatives({ goToPage, initiativeId }: FlagshipInitiativesProps) {
  if (initiativeId) {
    const initiative = INITIATIVES.find(i => i.id === initiativeId);
    if (initiative) {
      return <InitiativeDetail initiative={initiative} goToPage={goToPage} />;
    }
  }
  return <InitiativeList goToPage={goToPage} />;
}

/* ═══════════════════════════════════════════════════════════
   LIST VIEW
   ═══════════════════════════════════════════════════════════ */
function InitiativeList({ goToPage }: { goToPage: (page: string, program?: string) => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const introAnim = useInView();
  const cardsAnim = useInView();

  const categories = ['All', 'Talent Acquisition', 'Curriculum Development', 'Decentralized Faculty', 'Federated Infrastructure', 'Founding Coalition', 'Embedded Expansion', 'Attention Engine', 'Lean Degree Structure', 'Founding Academy'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? INITIATIVES : INITIATIVES.filter(i => i.category === activeCategory);

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[52vh] min-h-[400px] overflow-hidden">
          <motion.img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1800"
            style={{ y: heroY }}
            className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale"
            alt="Flagship Initiatives"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 pb-16">
            <div className="mb-6 flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#8A0000]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">10th Path to Mastery</span>
            </div>
            <h1 className="text-[36px] sm:text-[48px] md:text-[60px] font-extrabold leading-[1.02] tracking-tighter text-white mb-6">
              Flagship Initiatives
            </h1>
            <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">
              Nine foundational programs that define how Artemis enters the world — the talent engine, the curriculum engine, the federated network, and the lean degree. Each is a self-contained pathway to building the university.
            </p>
          </div>
        </div>
      </section>

      <OnThisPageNav sections={[{ id: 'overview', label: 'Overview' }, { id: 'initiatives', label: 'Initiatives' }]} activeSection="initiatives" />

      {/* Overview */}
      <section id="overview" className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-16 lg:py-24 scroll-mt-32">
        <div ref={introAnim.ref} className={`transition-all duration-700 ${introAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="mb-6 flex items-center space-x-3">
                <span className="w-8 h-[1px] bg-[#8A0000]"></span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Starting Point</span>
              </div>
              <h2 className="text-[36px] md:text-[42px] font-extrabold leading-[1.05] tracking-tighter text-[#141414] mb-8">
                How Artemis is built.
              </h2>
              <p className="text-[16px] text-gray-600 leading-relaxed mb-4">
                These nine initiatives are not ideas or proposals. They are the operating programs that Artemis uses to build itself — the talent funnel that recruits faculty, the curriculum engine that builds courses, the federated network that scales legitimacy, and the lean degree that proves the model. Each can be launched independently; together, they form a self-reinforcing system where talent creates curriculum, curriculum attracts students, students trigger UBI, and UBI attracts more talent.
              </p>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                The source document described these as prototypes. We have interpreted each one fully — expanding it from a sketch into a real, substantive Artemis program with detailed mechanics, economics, partnerships, student experience, milestones, timeline, and honest risks. This is what Artemis looks like when it actually does these things.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { stat: '9', label: 'Flagship initiatives' },
                { stat: '3', label: 'Core engines (talent, curriculum, revenue)' },
                { stat: '200+', label: 'Founding Fellows targeted' },
                { stat: '0$', label: 'Upfront capital needed' },
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

      {/* Filter */}
      <section id="initiatives" className="bg-white border-b border-gray-200 sticky top-[102px] z-20 scroll-mt-32">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 py-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-[12px] font-bold uppercase tracking-wider rounded-lg border transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-[#8A0000] text-white border-[#8A0000]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#8A0000] hover:text-[#8A0000]'}`}>
                {cat === 'All' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Initiative cards */}
      <section className="py-16 lg:py-24">
        <div ref={cardsAnim.ref} className={`max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 transition-all duration-700 ${cardsAnim.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((init) => {
              const Icon = init.icon;
              return (
                <div key={init.id} onClick={() => goToPage('flagship-detail', init.id)} className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#8A0000]/40 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-gray-100 shrink-0">
                    <img src={init.image} alt={init.name} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out" loading="lazy" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">{init.num}</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 text-[#141414]">{init.category}</span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-[#D4A853]" />
                        <span className="text-[10px] font-mono uppercase tracking-wider opacity-80">{init.status}</span>
                      </div>
                      <h3 className="text-[18px] font-bold leading-tight tracking-tight">{init.name}</h3>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-[13px] text-gray-600 leading-relaxed mb-4 flex-1 line-clamp-3">{init.tagline}</p>
                    <div className="border-t border-gray-100 pt-3 grid grid-cols-3 gap-2">
                      {init.keyMetrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-[14px] font-black text-[#8A0000] leading-none">{m.value}</div>
                          <div className="text-[9px] text-gray-400 uppercase tracking-wider mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-[11px] font-bold uppercase tracking-widest text-[#8A0000] group-hover:underline text-left flex items-center gap-1">
                      Explore Initiative <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="bg-[#141414] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-3"><span className="w-8 h-[1px] bg-[#8A0000]"></span><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Get Involved</span></div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter mb-3">Which initiative will you build?</h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">Every initiative above is an open invitation. Whether you're an academic, a partner institution, or a student — there's a pathway into Artemis designed for you.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button onClick={() => goToPage('apply')} className="px-6 py-3 bg-white text-[#141414] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors">Apply Now</button>
            <button onClick={() => goToPage('contact-us')} className="px-6 py-3 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Partner With Us</button>
          </div>
        </div>
      </section>
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   DETAIL VIEW — fully expanded individual initiative page
   ═══════════════════════════════════════════════════════════ */
function InitiativeDetail({ initiative, goToPage }: { initiative: FlagshipInitiative; goToPage: (page: string, program?: string) => void }) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const Icon = initiative.icon;

  const tabs = [
    { id: 'vision', label: 'Vision' },
    { id: 'how', label: 'How It Works' },
    { id: 'economics', label: 'Economics' },
    { id: 'partnerships', label: 'Partnerships' },
    { id: 'experience', label: 'Experience' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'risks', label: 'Risks' },
  ];
  const activeSection = useActiveSection(tabs.map(t => t.id));

  return (
    <div className="flex flex-col bg-white">
      {/* Hero */}
      <div className="relative w-full h-[45vh] min-h-[360px] overflow-hidden">
        <motion.img src={initiative.image} alt={initiative.name} style={{ y: heroY }} className="absolute inset-x-0 -top-[20%] w-full h-[140%] object-cover grayscale" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col justify-end h-full max-w-[1400px] mx-auto w-full px-8 lg:px-20 pb-16">
          <button onClick={() => goToPage('flagship-initiatives')} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-3 h-3" /> Back to Flagship Initiatives
          </button>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-[#8A0000] text-white">Initiative {initiative.num}</span>
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/20 text-white backdrop-blur-sm">{initiative.category}</span>
          </div>
          <h1 className="text-[36px] md:text-[48px] font-extrabold leading-[1.05] tracking-tighter text-white mb-4">{initiative.name}</h1>
          <p className="text-[18px] text-white/70 max-w-2xl leading-relaxed font-light">{initiative.tagline}</p>
        </div>
      </div>

      <OnThisPageNav sections={tabs} activeSection={activeSection} />

      <div className="flex flex-col md:flex-row max-w-[1400px] w-full mx-auto border-l border-r border-gray-200 relative">
        {/* Sidebar */}
        <aside className="hidden md:block w-[300px] shrink-0 border-r border-gray-200 bg-white">
          <div className="sticky top-[110px] max-h-[calc(100vh-130px)] overflow-y-auto py-8 px-6">
            <div className="mb-6 pb-5 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                <div><div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</div><div className="text-[12px] font-bold text-[#141414]">{initiative.status}</div></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {initiative.keyMetrics.map((m, i) => (
                  <div key={i}><div className="text-[14px] font-black text-[#8A0000] leading-none">{m.value}</div><div className="text-[8px] text-gray-400 uppercase tracking-wider mt-0.5">{m.label}</div></div>
                ))}
              </div>
            </div>
            <div className="mb-7">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">On This Page</div>
              <ul className="space-y-0">
                {tabs.map((tab) => {
                  const isActive = activeSection === tab.id;
                  return (
                    <li key={tab.id}>
                      <a href={`#${tab.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(tab.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className={`block py-2.5 text-[13px] border-l-2 pl-3 -ml-3 transition-all ${isActive ? 'text-[#8A0000] font-bold border-[#8A0000]' : 'text-gray-600 border-transparent hover:text-[#8A0000] hover:border-[#8A0000]/30'}`}>{tab.label}</a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="pt-5 border-t border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 mb-3">Other Initiatives</div>
              <ul className="space-y-1">
                {INITIATIVES.filter(i => i.id !== initiative.id).slice(0, 6).map((i) => (
                  <li key={i.id}><button onClick={() => goToPage('flagship-detail', i.id)} className="block w-full text-left py-1.5 text-[12px] text-gray-600 hover:text-[#8A0000] transition-colors leading-tight">{i.num} — {i.name}</button></li>
                ))}
              </ul>
              <button onClick={() => goToPage('flagship-initiatives')} className="mt-3 text-[11px] font-bold uppercase tracking-wider text-[#8A0000] hover:underline">View All Initiatives →</button>
            </div>
            <div className="mt-7 pt-5 border-t border-gray-100 space-y-2">
              <button onClick={() => goToPage('apply')} className="w-full px-4 py-3 bg-[#8A0000] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#6B0000] transition-colors">Get Involved</button>
              <button onClick={() => goToPage('contact-us')} className="w-full px-4 py-3 border border-[#8A0000] text-[#8A0000] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors">Contact Us</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-6 sm:px-8 lg:px-16 py-12 lg:py-16 bg-white min-w-0">
          <div className="max-w-3xl space-y-24">
            {/* Vision */}
            <section id="vision" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Vision</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-6">What this means for Artemis</h3>
              <p className="text-[15px] leading-relaxed text-[#141414] mb-6">{initiative.vision}</p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Overview</div>
                <p className="text-[14px] text-gray-700 leading-relaxed">{initiative.overview}</p>
              </div>
            </section>

            {/* How It Works */}
            <section id="how" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">How It Works</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">The Mechanics</h3>
              <p className="text-gray-500 text-[14px] mb-10">{initiative.howItWorks.length} stages to activation</p>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 hidden sm:block"></div>
                <div className="space-y-6">
                  {initiative.howItWorks.map((step, i) => (
                    <div key={i} className="relative flex items-start gap-5 sm:gap-8">
                      <div className="relative z-10 w-12 h-12 rounded-full bg-[#8A0000] text-white flex items-center justify-center font-bold text-[14px] shrink-0 shadow-md">{i + 1}</div>
                      <div className="flex-1 bg-white border border-gray-200 rounded-xl p-5 hover:border-[#8A0000]/30 hover:shadow-md transition-all">
                        <h4 className="text-[15px] font-bold text-[#141414] mb-2">{step.title}</h4>
                        <p className="text-[14px] text-gray-600 leading-relaxed">{step.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Economics */}
            <section id="economics" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Economics</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-10">How it funds itself</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-xl p-6"><div className="flex items-center gap-2 mb-3"><DollarSign className="w-4 h-4 text-[#8A0000]" /><span className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">Model</span></div><p className="text-[13px] text-gray-600 leading-relaxed">{initiative.economics.model}</p></div>
                <div className="bg-white border border-gray-200 rounded-xl p-6"><div className="flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-[#8A0000]" /><span className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">Revenue Source</span></div><p className="text-[13px] text-gray-600 leading-relaxed">{initiative.economics.revenueSource}</p></div>
                <div className="bg-white border border-gray-200 rounded-xl p-6"><div className="flex items-center gap-2 mb-3"><Zap className="w-4 h-4 text-[#8A0000]" /><span className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">MAP-UBI Trigger</span></div><p className="text-[13px] text-gray-600 leading-relaxed">{initiative.economics.ubiTrigger}</p></div>
                <div className="bg-white border border-gray-200 rounded-xl p-6"><div className="flex items-center gap-2 mb-3"><Briefcase className="w-4 h-4 text-[#8A0000]" /><span className="text-[11px] font-bold uppercase tracking-widest text-[#141414]">Cost Structure</span></div><p className="text-[13px] text-gray-600 leading-relaxed">{initiative.economics.costStructure}</p></div>
              </div>
            </section>

            {/* Partnerships */}
            <section id="partnerships" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Partnerships</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-10">Who's involved</h3>
              <div className="space-y-3">
                {initiative.partnerships.map((p, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl hover:border-[#8A0000]/20 transition-colors">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center text-[11px] font-bold">{i + 1}</div>
                    <div className="flex-1"><div className="text-[14px] font-bold text-[#141414] mb-1">{p.role}</div><p className="text-[13px] text-gray-600 leading-relaxed">{p.contribution}</p></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section id="experience" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">The Experience</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-10">What it feels like</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3"><Users className="w-4 h-4 text-blue-600" /><span className="text-[12px] font-bold uppercase tracking-widest text-blue-700">Student Experience</span></div>
                  <p className="text-[14px] text-gray-700 leading-relaxed">{initiative.studentExperience}</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-3"><Sparkles className="w-4 h-4 text-emerald-600" /><span className="text-[12px] font-bold uppercase tracking-widest text-emerald-700">Pioneer Experience</span></div>
                  <p className="text-[14px] text-gray-700 leading-relaxed">{initiative.pioneerExperience}</p>
                </div>
              </div>
            </section>

            {/* Milestones */}
            <section id="milestones" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Milestones</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">How we know it's working</h3>
              <p className="text-gray-500 text-[14px] mb-10">{initiative.milestones.length} phases with concrete targets</p>
              <div className="space-y-4">
                {initiative.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-white border border-gray-200 rounded-xl">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#8A0000]/10 text-[#8A0000] flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
                    <div className="flex-1"><div className="text-[11px] font-mono text-gray-400 uppercase tracking-wider mb-1">{m.phase}</div><div className="text-[15px] font-bold text-[#141414] mb-1">{m.target}</div><div className="text-[12px] text-gray-500">{m.metric}</div></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline */}
            <section id="timeline" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Timeline</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">Phased rollout</h3>
              <p className="text-gray-500 text-[14px] mb-10">{initiative.timeline.length} phases from start to self-sustaining</p>
              <div className="space-y-3">
                {initiative.timeline.map((t, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border-l-2 border-[#8A0000]/30 hover:border-[#8A0000] transition-colors">
                    <div className="shrink-0 w-28"><div className="text-[11px] font-mono text-[#8A0000] font-bold uppercase tracking-wider">{t.period}</div></div>
                    <div className="flex-1"><p className="text-[13px] text-gray-700 leading-relaxed">{t.goal}</p></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Risks */}
            <section id="risks" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6"><div className="w-8 h-[1px] bg-[#8A0000]"></div><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Risks & Mitigations</span></div>
              <h3 className="text-[24px] font-bold text-[#141414] mb-2">What could go wrong</h3>
              <p className="text-gray-500 text-[14px] mb-10">Honest assessment — and how we address each risk</p>
              <div className="space-y-3">
                {initiative.risks.map((r, i) => (
                  <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl">
                    <div className="flex items-start gap-3 mb-3"><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /><div><div className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-1">Risk</div><p className="text-[13px] text-gray-700 leading-relaxed">{r.risk}</p></div></div>
                    <div className="flex items-start gap-3 pl-7"><Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><div><div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">Mitigation</div><p className="text-[13px] text-gray-700 leading-relaxed">{r.mitigation}</p></div></div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Dark CTA */}
      <section className="bg-[#141414] text-white py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center space-x-3"><span className="w-8 h-[1px] bg-[#8A0000]"></span><span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A0000]">Next Steps</span></div>
            <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.05] tracking-tighter mb-3">Ready to build this?</h2>
            <p className="text-[15px] text-gray-400 leading-relaxed">{initiative.name} is one of nine flagship initiatives for building Artemis. If this one resonates, let's talk — or explore the others.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button onClick={() => goToPage('flagship-initiatives')} className="px-6 py-3 bg-white text-[#141414] text-[11px] font-bold uppercase tracking-widest hover:bg-[#8A0000] hover:text-white transition-colors">All Initiatives</button>
            <button onClick={() => goToPage('contact-us')} className="px-6 py-3 border border-white/30 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">Get in Touch</button>
          </div>
        </div>
      </section>
      <SubPageFooter goToPage={goToPage} />
    </div>
  );
}
