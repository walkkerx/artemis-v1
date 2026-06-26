export interface CourseLink {
  label: string;
}

export interface ProgramRequirement {
  name: string;
  detail: string;
}

/* ─── Curriculum types ─── */
export type CourseType = 'foundation' | 'core' | 'elective' | 'lab' | 'seminar' | 'capstone' | 'fieldwork';

export interface Course {
  code: string;
  title: string;
  credits: number;
  type: CourseType;
  description?: string;
}

export interface Semester {
  name: string; // "Fall" | "Spring"
  courses: Course[];
}

export interface CurriculumYear {
  year: number;
  label: string; // "Year 1 — Foundations"
  semesters: Semester[];
}

export interface LearningOutcome {
  outcome: string;
  detail: string;
}

export interface CareerOutcome {
  role: string;
  sector: string;
  description: string;
}

export interface ProgramData {
  title: string;
  image?: string;
  directorName: string;
  directorLocation: string;
  coDirectorTitle?: string;
  coDirectorName?: string;
  coDirectorLocation?: string;
  website: string;
  overviewParagraphs: string[];
  requirementsParagraphs: string[];
  seniorRequirement: string;
  advising: string;
  requirementsArray: ProgramRequirement[];
  summaryDistribution: string;
  firstYearParagraphs: string[];
  certificateText?: string;
  certificateRequirements?: string;
  facultyProfessors?: string;
  facultyAssociate?: string;
  facultyAssistant?: string;
  facultyLecturers?: string;
  coursesLinks: CourseLink[];
  /* ─── New: full 4-year curriculum + outcomes ─── */
  curriculum: CurriculumYear[];
  totalCredits: number;
  programLength: string;
  learningOutcomes: LearningOutcome[];
  careerOutcomes: CareerOutcome[];
}

/* ─────────────────────────────────────────────────────────────────
   School sections — single source of truth for the Programs catalogue
   ───────────────────────────────────────────────────────────────── */
export interface SchoolSection {
  id: string;
  label: string;
  heading: string;
  desc: string;
  majors: string[];
}

export const schoolSections: SchoolSection[] = [
  {
    id: 'school-natural-sciences',
    label: 'Natural Sciences',
    heading: 'School of Natural Sciences',
    desc: 'From the quantum to the cosmological — rigorous training in the fundamental laws governing matter, energy, and life. Students work alongside research faculty from their first year, with access to laboratories and observatories across the global network.',
    majors: [
      "Biology (B.S.)",
      "Chemistry (B.S.)",
      "Physics (B.S.)",
      "Astronomy (B.S.)",
      "Applied Physics (B.S.)",
      "Environmental Science (B.S.)",
      "Geology (B.S.)",
      "Mathematics (B.S.)",
      "Agricultural Sciences (B.S.)",
      "Planetary Science (B.S.)",
      "Quantum Information Science (B.S.)",
      "Climate Science (B.S.)",
    ]
  },
  {
    id: 'school-engineering-technology',
    label: 'Engineering & Technology',
    heading: 'School of Engineering & Technology',
    desc: 'Designing and building the systems that shape the future. Artemis engineering graduates combine deep technical expertise with ethical reasoning and cross-disciplinary fluency — prepared not just to write code or build structures, but to ask why and for whom.',
    majors: [
      "Mechanical Engineering (B.S.)",
      "Civil Engineering (B.S.)",
      "Chemical Engineering (B.S.)",
      "Software Engineering (B.S.)",
      "Computer Science (B.S.)",
      "Data Science (B.S.)",
      "Robotics (B.S.)",
      "Mechatronics (B.S.)",
      "Nanotechnology (B.S.)",
      "Architecture (B.S.)",
      "Design (B.A.)",
      "AI Engineering (B.S.)",
    ]
  },
  {
    id: 'school-arts-humanities',
    label: 'Arts & Humanities',
    heading: 'School of Arts & Humanities',
    desc: 'The interpretive disciplines that give meaning to knowledge and beauty to expression. Artemis humanities students engage with canonical texts, contemporary media, and creative practice across cultures — developing the critical imagination that leadership demands.',
    majors: [
      "Philosophy (B.A.)",
      "Comparative Literature (B.A.)",
      "Media & Communication Design (B.A.)",
      "History (B.A.)",
      "Art History (B.A.)",
      "Linguistics (B.A.)",
      "Theater & Performance (B.A.)",
      "Film & Media Studies (B.A.)",
      "Archaeology (B.A.)",
      "Art Practice (B.F.A.)",
      "Dance (B.F.A.)",
      "Classics (B.A.)",
      "Music (B.A.)",
      "Theater and Performance Studies (B.F.A.)",
    ]
  },
  {
    id: 'school-social-sciences',
    label: 'Social Sciences',
    heading: 'School of Social Sciences',
    desc: 'Understanding the structures that govern human societies — from local communities to global institutions. Artemis social scientists combine quantitative rigour with qualitative depth, preparing to shape policy, drive innovation, and challenge orthodoxies.',
    majors: [
      "Anthropology (B.A.)",
      "Political Science (B.A.)",
      "Urban Studies (B.A.)",
      "Economics (B.A.)",
      "Global Governance & Systems (B.A.)",
      "Social Innovation & Design (B.A.)",
    ]
  },
  {
    id: 'school-health-medicine',
    label: 'Health & Medicine',
    heading: 'School of Health & Medicine',
    desc: 'Advancing human health through biological insight, computational power, and clinical precision. Artemis health science students train in cross-continental research environments that span genomics labs, public health field stations, and biomedical computation clusters.',
    majors: [
      "Neuroscience (B.S.)",
      "Public Health (B.S.)",
      "Biomedical Engineering (B.S.)",
      "Nutrition Science (B.S.)",
      "Genetics (B.S.)",
      "Immunobiology (B.S.)",
      "Biomedical Computation (B.S.)",
      "Food Systems (B.S.)",
      "Bioinformatics (B.S.)",
      "Synthetic Biology (B.S.)",
    ]
  },
  {
    id: 'school-education-human-development',
    label: 'Education & Human Development',
    heading: 'School of Education & Human Development',
    desc: 'Studying how people learn, grow, and flourish — and designing the systems that help them do so. From cognitive science to learning technology, Artemis education students work at the intersection of research, practice, and innovation.',
    majors: [
      "Education (B.A.)",
      "Learning Design & Technology (B.A.)",
      "Cognitive Science (B.A.)",
      "Developmental Psychology (B.A.)",
      "Educational Leadership (B.A.)",
      "Childhood & Human Development (B.A.)",
    ]
  },
  {
    id: 'school-business',
    label: 'Business',
    heading: 'School of Business',
    desc: 'Training leaders who understand that commerce is a tool, not an end. Artemis business students combine analytical sharpness with ethical grounding and global perspective — prepared to build enterprises that create lasting value beyond profit.',
    majors: [
      "International Business (B.S.)",
      "Finance (B.S.)",
      "Business Analytics (B.S.)",
      "Supply Chain & Logistics (B.S.)",
      "Consulting & Strategy (B.S.)",
      "Entrepreneurship (B.S.)",
    ]
  },
];

/* Helper: find which school a given major belongs to */
export function findSchoolForMajor(major: string): SchoolSection | undefined {
  return schoolSections.find(s => s.majors.includes(major));
}

/* Helper: get sibling programs in the same school as a major */
export function getSiblingPrograms(major: string, limit = 8): string[] {
  const school = findSchoolForMajor(major);
  if (!school) return [];
  return school.majors.filter(m => m !== major).slice(0, limit);
}

/* ─── School → course-code prefix map ─── */
const SCHOOL_PREFIXES: Record<string, string> = {
  'school-natural-sciences': 'NSC',
  'school-engineering-technology': 'ENG',
  'school-arts-humanities': 'HUM',
  'school-social-sciences': 'SSC',
  'school-health-medicine': 'MED',
  'school-education-human-development': 'EDU',
  'school-business': 'BUS',
};

/* ─── School → school-specific foundation courses ─── */
const SCHOOL_FOUNDATIONS: Record<string, Course[]> = {
  'school-natural-sciences': [
    { code: 'NSC-110', title: 'Calculus I', credits: 4, type: 'foundation' },
    { code: 'NSC-111', title: 'Calculus II', credits: 4, type: 'foundation' },
    { code: 'NSC-120', title: 'General Physics I', credits: 4, type: 'foundation' },
    { code: 'NSC-121', title: 'General Physics II', credits: 4, type: 'foundation' },
    { code: 'NSC-130', title: 'General Chemistry I', credits: 4, type: 'foundation' },
  ],
  'school-engineering-technology': [
    { code: 'ENG-110', title: 'Calculus I for Engineers', credits: 4, type: 'foundation' },
    { code: 'ENG-111', title: 'Calculus II for Engineers', credits: 4, type: 'foundation' },
    { code: 'ENG-120', title: 'Linear Algebra & Differential Equations', credits: 4, type: 'foundation' },
    { code: 'ENG-130', title: 'Programming Fundamentals', credits: 3, type: 'foundation' },
    { code: 'ENG-131', title: 'Data Structures & Algorithms', credits: 3, type: 'foundation' },
  ],
  'school-arts-humanities': [
    { code: 'HUM-110', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
    { code: 'HUM-111', title: 'Critical Theory Foundations', credits: 3, type: 'foundation' },
    { code: 'HUM-120', title: 'World History to 1500', credits: 3, type: 'foundation' },
    { code: 'HUM-121', title: 'World History since 1500', credits: 3, type: 'foundation' },
    { code: 'HUM-130', title: 'Foundations of Aesthetics', credits: 3, type: 'foundation' },
  ],
  'school-social-sciences': [
    { code: 'SSC-110', title: 'Statistics for Social Science', credits: 4, type: 'foundation' },
    { code: 'SSC-111', title: 'Research Methods in Social Science', credits: 3, type: 'foundation' },
    { code: 'SSC-120', title: 'Microeconomics', credits: 3, type: 'foundation' },
    { code: 'SSC-121', title: 'Macroeconomics', credits: 3, type: 'foundation' },
    { code: 'SSC-130', title: 'Classical Social Theory', credits: 3, type: 'foundation' },
  ],
  'school-health-medicine': [
    { code: 'MED-110', title: 'General Biology I', credits: 4, type: 'foundation' },
    { code: 'MED-111', title: 'General Biology II', credits: 4, type: 'foundation' },
    { code: 'MED-120', title: 'General Chemistry I', credits: 4, type: 'foundation' },
    { code: 'MED-121', title: 'Organic Chemistry I', credits: 4, type: 'foundation' },
    { code: 'MED-130', title: 'Biostatistics', credits: 3, type: 'foundation' },
  ],
  'school-education-human-development': [
    { code: 'EDU-110', title: 'Foundations of Education', credits: 3, type: 'foundation' },
    { code: 'EDU-120', title: 'Developmental Psychology', credits: 3, type: 'foundation' },
    { code: 'EDU-130', title: 'Statistics for Behavioral Sciences', credits: 3, type: 'foundation' },
    { code: 'EDU-140', title: 'Cognitive Psychology', credits: 3, type: 'foundation' },
  ],
  'school-business': [
    { code: 'BUS-110', title: 'Financial Accounting', credits: 3, type: 'foundation' },
    { code: 'BUS-111', title: 'Managerial Accounting', credits: 3, type: 'foundation' },
    { code: 'BUS-120', title: 'Microeconomics for Business', credits: 3, type: 'foundation' },
    { code: 'BUS-130', title: 'Statistics for Business', credits: 3, type: 'foundation' },
    { code: 'BUS-140', title: 'Principles of Management', credits: 3, type: 'foundation' },
  ],
};

/* ─── Common Artemis core (taken by all students) ─── */
const ARTEMIS_CORE: Course[] = [
  { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
  { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
  { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
  { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
];

/* ─── Procedural curriculum generator ─── */
function generateCurriculum(programName: string, schoolId: string): CurriculumYear[] {
  const cleanTitle = programName.replace(/\(B\.A\.\)|\(B\.S\.\)|\(B\.F\.A\.\)/g, '').trim();
  const prefix = SCHOOL_PREFIXES[schoolId] || 'ART';
  const schoolFoundations = SCHOOL_FOUNDATIONS[schoolId] || [];

  // Program-specific course templates
  const introCourses: Course[] = [
    { code: `${prefix}-101`, title: `Introduction to ${cleanTitle}`, credits: 3, type: 'core' },
    { code: `${prefix}-102`, title: `Foundations of ${cleanTitle}`, credits: 3, type: 'core' },
  ];
  const intermediateCourses: Course[] = [
    { code: `${prefix}-201`, title: `Intermediate ${cleanTitle}`, credits: 3, type: 'core' },
    { code: `${prefix}-210`, title: `${cleanTitle} Methods`, credits: 4, type: 'core' },
    { code: `${prefix}-220`, title: `${cleanTitle} Lab`, credits: 3, type: 'lab' },
    { code: `${prefix}-230`, title: `${cleanTitle} Seminar`, credits: 3, type: 'seminar' },
  ];
  const advancedCourses: Course[] = [
    { code: `${prefix}-301`, title: `Advanced ${cleanTitle}`, credits: 3, type: 'core' },
    { code: `${prefix}-310`, title: `Topics in ${cleanTitle}`, credits: 3, type: 'elective' },
    { code: `${prefix}-320`, title: `${cleanTitle} Research Methods`, credits: 4, type: 'core' },
    { code: `${prefix}-330`, title: `Junior Seminar in ${cleanTitle}`, credits: 3, type: 'seminar' },
    { code: `${prefix}-340`, title: `${cleanTitle} Specialization I`, credits: 3, type: 'elective' },
    { code: `${prefix}-350`, title: `${cleanTitle} Specialization II`, credits: 3, type: 'elective' },
  ];
  const capstoneCourses: Course[] = [
    { code: `${prefix}-401`, title: `Senior Thesis in ${cleanTitle} I`, credits: 4, type: 'capstone' },
    { code: `${prefix}-402`, title: `Senior Thesis in ${cleanTitle} II`, credits: 4, type: 'capstone' },
    { code: `${prefix}-410`, title: `Advanced Topics in ${cleanTitle}`, credits: 3, type: 'elective' },
    { code: `${prefix}-420`, title: `${cleanTitle} Fieldwork / Internship`, credits: 3, type: 'fieldwork' },
    { code: `${prefix}-430`, title: `${cleanTitle} Capstone Presentation`, credits: 2, type: 'capstone' },
  ];

  // Electives pool
  const electives: Course[] = [
    { code: `ELE-210`, title: 'Open Elective I', credits: 3, type: 'elective' },
    { code: `ELE-211`, title: 'Open Elective II', credits: 3, type: 'elective' },
    { code: `ELE-310`, title: 'Open Elective III', credits: 3, type: 'elective' },
    { code: `ELE-311`, title: 'Open Elective IV', credits: 3, type: 'elective' },
    { code: `ELE-410`, title: 'Open Elective V', credits: 3, type: 'elective' },
  ];

  return [
    {
      year: 1,
      label: 'Year 1 — Foundations',
      semesters: [
        {
          name: 'Fall',
          courses: [
            introCourses[0],
            schoolFoundations[0] || ARTEMIS_CORE[0],
            ARTEMIS_CORE[0],
            electives[0],
            { code: `${prefix}-103`, title: `${cleanTitle} Lab I`, credits: 1, type: 'lab' },
          ],
        },
        {
          name: 'Spring',
          courses: [
            introCourses[1],
            schoolFoundations[1] || ARTEMIS_CORE[1],
            ARTEMIS_CORE[1],
            electives[1],
            { code: `${prefix}-104`, title: `${cleanTitle} Lab II`, credits: 1, type: 'lab' },
          ],
        },
      ],
    },
    {
      year: 2,
      label: 'Year 2 — Intermediate',
      semesters: [
        {
          name: 'Fall',
          courses: [
            intermediateCourses[0],
            intermediateCourses[1],
            schoolFoundations[2] || ARTEMIS_CORE[2],
            electives[2],
          ],
        },
        {
          name: 'Spring',
          courses: [
            intermediateCourses[2],
            intermediateCourses[3],
            schoolFoundations[3] || ARTEMIS_CORE[2],
            electives[3],
          ],
        },
      ],
    },
    {
      year: 3,
      label: 'Year 3 — Advanced',
      semesters: [
        {
          name: 'Fall',
          courses: [
            advancedCourses[0],
            advancedCourses[1],
            advancedCourses[2],
            advancedCourses[3],
          ],
        },
        {
          name: 'Spring',
          courses: [
            advancedCourses[4],
            advancedCourses[5],
            ARTEMIS_CORE[3],
            electives[4],
            { code: `${prefix}-360`, title: `${cleanTitle} Field Preparation`, credits: 1, type: 'fieldwork' },
          ],
        },
      ],
    },
    {
      year: 4,
      label: 'Year 4 — Capstone',
      semesters: [
        {
          name: 'Fall',
          courses: [
            capstoneCourses[0],
            capstoneCourses[2],
            capstoneCourses[3],
            { code: `${prefix}-411`, title: `Senior Elective I`, credits: 3, type: 'elective' },
          ],
        },
        {
          name: 'Spring',
          courses: [
            capstoneCourses[1],
            capstoneCourses[4],
            { code: `${prefix}-412`, title: `Senior Elective II`, credits: 3, type: 'elective' },
            { code: `${prefix}-413`, title: `Senior Elective III`, credits: 3, type: 'elective' },
          ],
        },
      ],
    },
  ];
}

/* ─── Procedural learning outcomes generator ─── */
function generateLearningOutcomes(programName: string): LearningOutcome[] {
  const cleanTitle = programName.replace(/\(B\.A\.\)|\(B\.S\.\)|\(B\.F\.A\.\)/g, '').trim();
  return [
    { outcome: 'Foundational Knowledge', detail: `Demonstrate mastery of the foundational concepts, theories, and methods of ${cleanTitle}.` },
    { outcome: 'Analytical Thinking', detail: `Apply quantitative and qualitative analytical methods to solve complex problems in ${cleanTitle}.` },
    { outcome: 'Research Competence', detail: 'Design, execute, and present independent research using primary sources, lab methods, or fieldwork appropriate to the discipline.' },
    { outcome: 'Effective Communication', detail: 'Communicate complex ideas clearly and persuasively in writing, speech, and visual form to specialist and general audiences.' },
    { outcome: 'Ethical Reasoning', detail: 'Engage critically with the ethical, social, and political dimensions of practice in the field.' },
    { outcome: 'Global Perspective', detail: 'Situate the discipline within global contexts and articulate the cross-cultural implications of its applications.' },
    { outcome: 'Capstone Mastery', detail: 'Complete a senior thesis or capstone project that demonstrates original thinking and methodological rigor.' },
  ];
}

/* ─── Procedural career outcomes generator ─── */
function generateCareerOutcomes(programName: string): CareerOutcome[] {
  const cleanTitle = programName.replace(/\(B\.A\.\)|\(B\.S\.\)|\(B\.F\.A\.\)/g, '').trim();
  return [
    { role: `${cleanTitle} Analyst`, sector: 'Industry', description: `Apply ${cleanTitle.toLowerCase()} expertise to solve applied problems in industry settings — typically in a research, product, or strategy team.` },
    { role: 'Research Associate', sector: 'Academia & Research', description: 'Support research programs at universities, institutes, or government labs, often as preparation for graduate study.' },
    { role: 'Policy Advisor', sector: 'Government & Public Sector', description: 'Translate disciplinary expertise into policy recommendations for government agencies, regulators, or multilateral institutions.' },
    { role: 'Program Officer', sector: 'NGO & Nonprofit', description: 'Design and manage programs at foundations, NGOs, and international organizations working on issues adjacent to the field.' },
    { role: 'Consultant', sector: 'Professional Services', description: 'Advise clients across sectors on challenges requiring deep methodological and subject-matter expertise.' },
    { role: 'Founder / Entrepreneur', sector: 'Startup', description: 'Launch ventures that apply the methods and insights of the discipline to new problems and markets.' },
  ];
}

export function generateProgramData(title: string): ProgramData {
  const cleanTitle = title.replace(/\(B\.A\.\)|\(B\.S\.\)|\(B\.F\.A\.\)/g, '').trim();
  const seed = cleanTitle.length + cleanTitle.charCodeAt(0);
  const images = [
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600"
  ];

  // Find the school for this program so we can use school-aware curriculum generation
  const school = findSchoolForMajor(title);
  const schoolId = school?.id || 'school-natural-sciences';

  return {
    title: title,
    image: images[seed % images.length],
    directorName: "Prof. Alistair Sterling",
    directorLocation: "Hall of Scholars, Room 304",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Evelyn Vance",
    coDirectorLocation: "Research Annex, Room 112",
    website: `https://artemis.collegium.edu/${cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    overviewParagraphs: [
      `The ${cleanTitle} program at Artemis Collegium offers students a rigorous, intellectual environment for exploring the deep structural paradigms of the field. Students analyze complex global frameworks, using qualitative and quantitative models developed across the Artemis network.`,
      `By participating in core seminars and independent labs, majors gain a deep grasp of structural historical developments as well as state-of-the-art contemporary techniques. The curriculum balances classical foundational courses with dynamic experimental inquiries.`
    ],
    requirementsParagraphs: [
      `Majors are required to successfully complete twelve term courses or equivalent research credits. There are four foundation courses covering historical paradigms, followed by six intermediate specialization courses of the student's choosing.`,
      `In addition to coursework, majors participate in seasonal symposia and complete a rigorous senior essay or graduation thesis.`
    ],
    seniorRequirement: `A one-term senior essay or a comprehensive deep-space model portfolio representing original research, completed under the close guidance of a faculty supervisor.`,
    advising: `Students are matched with a dedicated academic mentor in their sophomore year, aiding track selection and post-graduate positioning.`,
    requirementsArray: [
      { name: "Foundational Seminars", detail: "4 core research credits exploring key theoretical texts and conceptual benchmarks." },
      { name: "Distribution Electives", detail: "6 advanced courses within the chosen sub-disciplines or planetary hubs." },
      { name: "Senior Essay / Graduation Project", detail: "A capstone project demonstrating rigorous methodologies and original contributions." }
    ],
    summaryDistribution: "12 term credits total: 4 foundations, 6 intermediate/advanced tracks, 1 capstone seminar, 1 senior project.",
    firstYearParagraphs: [
      "First-year students are encouraged to enroll in introductory survey lectures and the seasonal interdisciplinary seminars.",
      "No prior background in the field is required, though strong analytical habits and intellectual curiosity are highly recommended."
    ],
    certificateText: `The Special Certificate in Advanced ${cleanTitle} Research is awarded to students who complete an additional three research courses and participate in the annual summer workshop at our residency hubs.`,
    certificateRequirements: "Requires three courses at or above the 300-level, a summer research project, and a presentation before the Collegium Council.",
    facultyProfessors: "Elena Rostova (Structural Harmonics), Dr. Marcus Vance (Analytical Mechanics), Prof. Aris Thorne (Seismology & Quantum Dynamics)",
    facultyAssociate: "Dr. Clara Oswald (Tectonic Geometries), Dr. Jack Harkness (Cosmic Archeology)",
    facultyAssistant: "Dr. Martha Jones (Anomalous Fields), Dr. Amy Pond (Spatial Anomalies)",
    facultyLecturers: "Rory Williams (Clinical Metrics), Donna Noble (Administrative Economics)",
    coursesLinks: [
      { label: `View Catalog for ${cleanTitle}` },
      { label: "Upcoming Seminars (2026-2027)" },
      { label: "Intermediate Specialized Seminars" },
      { label: "Independent Study Registries" }
    ],
    curriculum: generateCurriculum(title, schoolId),
    totalCredits: 120,
    programLength: '4 years (8 semesters)',
    learningOutcomes: generateLearningOutcomes(title),
    careerOutcomes: generateCareerOutcomes(title),
  };
}

export const programsData: Record<string, ProgramData> = {
  "African Studies (B.A.)": {
    ...generateProgramData("African Studies (B.A.)"),
    directorName: "Prof. Kofi Mensah",
    directorLocation: "Ames Hall, Room 205",
    website: "https://artemis.collegium.edu/african-studies",
    overviewParagraphs: [
      "The African Studies program explores the history, culture, politics, and economic paradigms of the African continent with premium academic depth.",
      "Combining linguistic study, post-colonial geopolitical theory, and active collaborative fieldwork, students gain an invaluable, multi-layered perspective on African contributions to global systems."
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'HUM-151', title: 'Introduction to African Studies', credits: 3, type: 'core' },
            { code: 'HUM-110', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'HUM-160', title: 'Pre-Colonial African History', credits: 3, type: 'core' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'HUM-152', title: 'African Languages I (Swahili)', credits: 3, type: 'core' },
          ]},
          { name: 'Spring', courses: [
            { code: 'HUM-153', title: 'Foundations of African Studies', credits: 3, type: 'core' },
            { code: 'HUM-111', title: 'Critical Theory Foundations', credits: 3, type: 'foundation' },
            { code: 'HUM-161', title: 'Colonial & Post-Colonial African History', credits: 3, type: 'core' },
            { code: 'HUM-154', title: 'African Languages II (Swahili)', credits: 3, type: 'core' },
            { code: 'ELE-110', title: 'Open Elective I', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'HUM-250', title: 'African Political Theory', credits: 3, type: 'core' },
            { code: 'HUM-251', title: 'African Literature', credits: 3, type: 'core' },
            { code: 'SSC-110', title: 'Statistics for Social Science', credits: 4, type: 'foundation' },
            { code: 'HUM-252', title: 'African Art & Visual Culture', credits: 3, type: 'elective' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
          ]},
          { name: 'Spring', courses: [
            { code: 'HUM-260', title: 'African Economic History', credits: 3, type: 'core' },
            { code: 'HUM-261', title: 'Pan-Africanism & Diaspora Studies', credits: 3, type: 'core' },
            { code: 'HUM-262', title: 'African Music & Performance', credits: 3, type: 'elective' },
            { code: 'HUM-270', title: 'Intermediate Seminar', credits: 3, type: 'seminar' },
            { code: 'ELE-211', title: 'Open Elective II', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'HUM-350', title: 'Advanced African Studies', credits: 3, type: 'core' },
            { code: 'HUM-351', title: 'Research Methods in African Studies', credits: 4, type: 'core' },
            { code: 'HUM-352', title: 'African Philosophy', credits: 3, type: 'elective' },
            { code: 'HUM-353', title: 'Gender in African Societies', credits: 3, type: 'elective' },
            { code: 'HUM-330', title: 'Junior Seminar', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'HUM-360', title: 'African Cinema & Media', credits: 3, type: 'elective' },
            { code: 'HUM-361', title: 'Conflict & Peacebuilding in Africa', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'HUM-390', title: 'Field Study Preparation', credits: 1, type: 'fieldwork' },
            { code: 'HUM-391', title: 'Field Study Residency (Africa)', credits: 4, type: 'fieldwork' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'HUM-401', title: 'Senior Thesis in African Studies I', credits: 4, type: 'capstone' },
            { code: 'HUM-410', title: 'African Diaspora in the Americas', credits: 3, type: 'elective' },
            { code: 'HUM-411', title: 'Contemporary African Politics', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'HUM-402', title: 'Senior Thesis in African Studies II', credits: 4, type: 'capstone' },
            { code: 'HUM-420', title: 'African Futures', credits: 3, type: 'elective' },
            { code: 'HUM-430', title: 'Capstone Presentation', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Disciplinary Mastery', detail: 'Demonstrate mastery of the historical, cultural, political, and economic paradigms of the African continent.' },
      { outcome: 'Language Competence', detail: 'Achieve intermediate proficiency in an African language (Swahili, Yoruba, or Arabic).' },
      { outcome: 'Critical Theory', detail: 'Apply post-colonial and decolonial theory to analyze African and diasporic texts, institutions, and movements.' },
      { outcome: 'Field Research', detail: 'Design and execute a field-based research project in an African context, working ethically with local partners.' },
      { outcome: 'Comparative Analysis', detail: 'Situate African experiences within global systems of trade, migration, governance, and cultural exchange.' },
      { outcome: 'Capstone Mastery', detail: 'Complete a senior thesis based on original research, defended before a faculty committee.' },
    ],
    careerOutcomes: [
      { role: 'Foreign Service Officer', sector: 'Government & Diplomacy', description: 'Work with foreign ministries, embassies, and multilateral institutions focused on African affairs.' },
      { role: 'Program Manager', sector: 'NGO & Nonprofit', description: 'Design and manage development, humanitarian, or cultural programs across African countries.' },
      { role: 'Policy Analyst', sector: 'Think Tank', description: 'Produce research on African political, economic, or security issues for think tanks and research institutes.' },
      { role: 'University Professor', sector: 'Academia', description: 'Pursue graduate study and a research career in African Studies or a related discipline.' },
      { role: 'Cultural Curator', sector: 'Arts & Culture', description: 'Curate exhibitions, films, and cultural programming on African and diasporic arts.' },
      { role: 'International Consultant', sector: 'Private Sector', description: 'Advise companies investing or operating in African markets on context, risk, and partnerships.' },
    ],
  },

  "Computer Science (B.S.)": {
    ...generateProgramData("Computer Science (B.S.)"),
    directorName: "Dr. Evelyn Vance",
    directorLocation: "Turing Pavilion, Room 402",
    website: "https://artemis.collegium.edu/computer-science",
    overviewParagraphs: [
      "Our Computer Science program is rooted in computational foundations, complex algorithms, and human-computer symbiosis.",
      "Majors develop scalable soft-goods systems, participate in decentralized machine-learning research, and explore computational structures that empower human creative capacity."
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-151', title: 'Introduction to Computer Science', credits: 3, type: 'core' },
            { code: 'ENG-110', title: 'Calculus I for Engineers', credits: 4, type: 'foundation' },
            { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'ENG-130', title: 'Programming Fundamentals', credits: 3, type: 'foundation' },
            { code: 'ENG-152', title: 'CS Lab I', credits: 1, type: 'lab' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-153', title: 'Data Structures & Algorithms', credits: 3, type: 'core' },
            { code: 'ENG-111', title: 'Calculus II for Engineers', credits: 4, type: 'foundation' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'ENG-131', title: 'Discrete Mathematics', credits: 3, type: 'foundation' },
            { code: 'ENG-154', title: 'CS Lab II', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-250', title: 'Algorithms & Complexity', credits: 3, type: 'core' },
            { code: 'ENG-251', title: 'Computer Systems Organization', credits: 4, type: 'core' },
            { code: 'ENG-120', title: 'Linear Algebra & Differential Equations', credits: 4, type: 'foundation' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-260', title: 'Operating Systems', credits: 4, type: 'core' },
            { code: 'ENG-261', title: 'Probability & Statistics for CS', credits: 3, type: 'core' },
            { code: 'ENG-262', title: 'Software Engineering', credits: 3, type: 'core' },
            { code: 'ELE-210', title: 'Open Elective I', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-350', title: 'Database Systems', credits: 4, type: 'core' },
            { code: 'ENG-351', title: 'Machine Learning Foundations', credits: 3, type: 'core' },
            { code: 'ENG-352', title: 'Distributed Systems', credits: 3, type: 'elective' },
            { code: 'ENG-330', title: 'Junior Seminar in CS', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-360', title: 'Computer Networks', credits: 4, type: 'core' },
            { code: 'ENG-361', title: 'Artificial Intelligence', credits: 3, type: 'elective' },
            { code: 'ENG-362', title: 'Human-Computer Interaction', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'ENG-390', title: 'Internship Preparation', credits: 1, type: 'fieldwork' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-401', title: 'Senior Capstone Project I', credits: 4, type: 'capstone' },
            { code: 'ENG-410', title: 'Cryptography & Security', credits: 3, type: 'elective' },
            { code: 'ENG-411', title: 'Compilers', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-402', title: 'Senior Capstone Project II', credits: 4, type: 'capstone' },
            { code: 'ENG-420', title: 'CS Ethics & Professional Practice', credits: 3, type: 'seminar' },
            { code: 'ENG-430', title: 'Capstone Presentation', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Algorithmic Thinking', detail: 'Design, analyze, and implement efficient algorithms and data structures for complex computational problems.' },
      { outcome: 'Systems Mastery', detail: 'Understand the layered architecture of computer systems from hardware to applications, and build software that interacts correctly with each layer.' },
      { outcome: 'Software Engineering', detail: 'Engineer robust, scalable, maintainable software in teams using modern development practices and tools.' },
      { outcome: 'AI & ML Foundations', detail: 'Apply core machine-learning and AI techniques to real-world problems and reason about their limits and risks.' },
      { outcome: 'Ethical Practice', detail: 'Identify and address the ethical, social, and political implications of computing systems, including privacy, bias, and sustainability.' },
      { outcome: 'Capstone Mastery', detail: 'Design, build, and defend a substantial software system as a senior capstone project.' },
    ],
    careerOutcomes: [
      { role: 'Software Engineer', sector: 'Tech Industry', description: 'Build and ship software at scale at large tech companies or high-growth startups.' },
      { role: 'Machine Learning Engineer', sector: 'AI/ML', description: 'Develop and deploy ML systems for products in search, vision, language, or recommendation.' },
      { role: 'Systems Engineer', sector: 'Infrastructure', description: 'Design and operate distributed systems, databases, and cloud infrastructure.' },
      { role: 'Research Scientist', sector: 'Academia & Industry Labs', description: 'Pursue graduate study and a research career in CS, AI, or related fields.' },
      { role: 'Product Manager (Technical)', sector: 'Tech Industry', description: 'Lead product strategy and execution at the intersection of technology and user needs.' },
      { role: 'Founder / CTO', sector: 'Startup', description: 'Launch technology ventures, often leveraging Artemis network resources and alumni.' },
    ],
  },

  /* ─── Featured emerging programs — rich, hand-written entries ─── */

  "Food Systems (B.S.)": {
    ...generateProgramData("Food Systems (B.S.)"),
    image: "https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&q=80&w=1600",
    directorName: "Prof. Amara Okafor",
    directorLocation: "Sustainable Agriculture Lab, Wing B",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Lars Lindqvist",
    coDirectorLocation: "Food Policy Institute, Room 207",
    website: "https://artemis.collegium.edu/food-systems",
    overviewParagraphs: [
      "The Food Systems program examines the full chain of human nourishment — from soil microbiomes and smallholder agriculture to global supply networks, nutrition security, and the politics of food access. Students combine fieldwork at Artemis-owned farms in Kigali, Valletta, and the San Joaquin Valley with computational modeling of agricultural ecosystems and policy analysis.",
      "Majors graduate equipped to redesign the systems that feed nine billion people — balancing yield, equity, climate resilience, and cultural appropriateness. The program is closely linked to the Artemis Climate Node and the School of Public Health."
    ],
    requirementsParagraphs: [
      "Majors complete twelve term courses spanning agroecology, food policy, supply chain analytics, and nutrition science. Foundation courses cover soil science, agricultural economics, and the ethics of food access.",
      "All students complete a residency at one of three Artemis food labs — Kigali (tropical agriculture), Valletta (Mediterranean aquaculture), or San Joaquin (industrial-scale regenerative farming). A capstone senior project addresses a real-world food-systems challenge identified by a partner community."
    ],
    seniorRequirement: "A year-long senior capstone: either a community-embedded intervention pilot, a published policy brief, or a peer-reviewed research paper on a food-systems question.",
    advising: "Each major is paired with a faculty advisor and an external practitioner mentor from a partner NGO, government agency, or food-tech firm.",
    requirementsArray: [
      { name: "Agroecology Foundations", detail: "3 courses covering soil science, crop biology, and regenerative farming practices." },
      { name: "Food Policy & Economics", detail: "2 courses in agricultural economics, food policy, and global trade." },
      { name: "Nutrition & Public Health", detail: "2 courses linking food systems to human health outcomes." },
      { name: "Supply Chain & Logistics", detail: "2 courses on global food distribution, cold chains, and waste reduction." },
      { name: "Field Residency", detail: "One full term at an Artemis food lab (Kigali, Valletta, or San Joaquin)." },
      { name: "Senior Capstone", detail: "Year-long intervention, policy brief, or research project with external partner." }
    ],
    summaryDistribution: "12 term credits: 3 agroecology, 2 policy, 2 nutrition, 2 supply chain, 1 field residency, 2 capstone.",
    firstYearParagraphs: [
      "First-year students take an introductory Food Systems seminar, basic biology, and a writing-intensive course on the ethics of nourishment.",
      "No prior agricultural background is expected; many of our strongest majors arrive from urban high schools with no farming experience."
    ],
    certificateText: "The Certificate in Regenerative Agriculture is available to students who complete three additional advanced courses in soil health, agroforestry, and carbon farming.",
    certificateRequirements: "Three courses at the 300-level or above, a summer residency at an Artemis farm, and a presentation before the Collegium Agriculture Council.",
    facultyProfessors: "Prof. Amara Okafor (Agroecology), Dr. Lars Lindqvist (Food Policy), Prof. Maya Singh (Nutrition Security)",
    facultyAssociate: "Dr. Tomás Reyes (Supply Chain), Dr. Priya Nair (Soil Microbiome)",
    facultyAssistant: "Dr. Kenji Watanabe (Aquaponics), Dr. Aisha Mwangi (Smallholder Economics)",
    facultyLecturers: "Carla Bianchi (Cold-Chain Logistics), Sven Eriksson (Permaculture Practice)",
    coursesLinks: [
      { label: "View Catalog for Food Systems" },
      { label: "Upcoming Agroecology Seminars (2026-2027)" },
      { label: "Field Residency Application" },
      { label: "Senior Capstone Archive" }
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'MED-151', title: 'Introduction to Food Systems', credits: 3, type: 'core' },
            { code: 'MED-110', title: 'General Biology I', credits: 4, type: 'foundation' },
            { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'SSC-120', title: 'Microeconomics', credits: 3, type: 'foundation' },
            { code: 'MED-152', title: 'Food & Society Seminar', credits: 1, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'MED-153', title: 'Agroecology Foundations', credits: 3, type: 'core' },
            { code: 'MED-111', title: 'General Biology II', credits: 4, type: 'foundation' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'MED-130', title: 'Biostatistics', credits: 3, type: 'foundation' },
            { code: 'MED-154', title: 'Soil Science Lab', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'MED-250', title: 'Crop Biology & Genetics', credits: 4, type: 'core' },
            { code: 'MED-251', title: 'Food Policy & Governance', credits: 3, type: 'core' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
            { code: 'MED-252', title: 'World Food History', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'MED-260', title: 'Food Supply Chain Analytics', credits: 4, type: 'core' },
            { code: 'MED-261', title: 'Nutrition Fundamentals', credits: 3, type: 'core' },
            { code: 'MED-262', title: 'Agricultural Economics', credits: 3, type: 'core' },
            { code: 'ELE-210', title: 'Open Elective I', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'MED-350', title: 'Sustainable Agriculture Practices', credits: 4, type: 'core' },
            { code: 'MED-351', title: 'Food Systems Modeling', credits: 3, type: 'core' },
            { code: 'MED-352', title: 'Research Methods in Food Systems', credits: 3, type: 'core' },
            { code: 'MED-353', title: 'Climate & Agriculture', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'MED-360', title: 'Global Food Politics', credits: 3, type: 'elective' },
            { code: 'MED-361', title: 'Food Justice & Sovereignty', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'MED-390', title: 'Field Residency Preparation', credits: 1, type: 'fieldwork' },
            { code: 'MED-391', title: 'Field Residency (Kigali/Valletta/San Joaquin)', credits: 4, type: 'fieldwork' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'MED-401', title: 'Senior Capstone in Food Systems I', credits: 4, type: 'capstone' },
            { code: 'MED-410', title: 'Advanced Agroecology', credits: 3, type: 'elective' },
            { code: 'MED-411', title: 'Food Systems Entrepreneurship', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'MED-402', title: 'Senior Capstone in Food Systems II', credits: 4, type: 'capstone' },
            { code: 'MED-420', title: 'Food Policy Brief Workshop', credits: 3, type: 'seminar' },
            { code: 'MED-430', title: 'Capstone Presentation', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Systems Thinking', detail: 'Analyze food systems as coupled human-ecological systems, integrating biological, economic, political, and cultural dimensions.' },
      { outcome: 'Agroecological Competence', detail: 'Apply principles of soil science, crop biology, and regenerative practice to design sustainable agricultural systems.' },
      { outcome: 'Quantitative Analysis', detail: 'Use statistical and computational models to evaluate food system outcomes — yield, nutrition, equity, climate impact.' },
      { outcome: 'Policy Literacy', detail: 'Navigate food policy at local, national, and international scales, and author clear policy briefs.' },
      { outcome: 'Field Practice', detail: 'Demonstrate practical competence through a term-long residency at an Artemis food lab.' },
      { outcome: 'Capstone Mastery', detail: 'Complete a year-long capstone that delivers value to an external partner community.' },
    ],
    careerOutcomes: [
      { role: 'Food Systems Analyst', sector: 'Government & NGO', description: 'Analyze agricultural, nutrition, or supply-chain data for ministries, FAO, WFP, or major NGOs.' },
      { role: 'Regenerative Farm Manager', sector: 'Agriculture', description: 'Manage sustainable farming operations at Artemis partner farms or independent regenerative enterprises.' },
      { role: 'Food Policy Advisor', sector: 'Public Sector', description: 'Advise governments and multilateral institutions on agricultural, nutrition, and trade policy.' },
      { role: 'Supply Chain Manager', sector: 'Food Industry', description: 'Design and operate ethical, resilient supply chains for food companies and retailers.' },
      { role: 'Food-Tech Founder', sector: 'Startup', description: 'Launch ventures in alternative protein, vertical farming, food traceability, or waste reduction.' },
      { role: 'Researcher', sector: 'Academia', description: 'Pursue graduate study in agroecology, nutrition, food policy, or related fields.' },
    ],
  },

  "Cognitive Science (B.A.)": {
    ...generateProgramData("Cognitive Science (B.A.)"),
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1600",
    directorName: "Prof. Daniel Kahneman-Reeves",
    directorLocation: "Mind & Brain Pavilion, Room 510",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Hana Yamato",
    coDirectorLocation: "Cognition Lab, Room 312",
    website: "https://artemis.collegium.edu/cognitive-science",
    overviewParagraphs: [
      "Cognitive Science at Artemis is a genuinely interdisciplinary investigation of the mind — drawing on philosophy, psychology, neuroscience, linguistics, computer science, and anthropology to ask how humans, animals, and machines think, perceive, decide, and create.",
      "Majors work in research labs from their second year, design their own behavioral experiments, and engage with current debates about consciousness, AI cognition, and the limits of rationality. The program is a flagship of the School of Education & Human Development and is closely allied with the AI Engineering program."
    ],
    requirementsParagraphs: [
      "Majors complete twelve term courses distributed across four cognitive-science pillars: Philosophy of Mind, Cognitive Psychology, Computational Modeling, and Cognitive Neuroscience. At least one course must be taken from each pillar.",
      "All majors complete an empirical research project in a faculty lab, typically beginning in the junior year. A senior thesis may be either empirical or theoretical, but must engage with primary literature from at least two of the four pillars."
    ],
    seniorRequirement: "A senior thesis (one or two terms) representing original research or synthesis across at least two cognitive-science pillars, defended before a faculty committee.",
    advising: "Sophomores are matched with a faculty advisor based on pillar interests; juniors join a research lab whose director becomes their thesis advisor.",
    requirementsArray: [
      { name: "Philosophy of Mind", detail: "2 courses on consciousness, intentionality, and the mind-body problem." },
      { name: "Cognitive Psychology", detail: "2 courses on memory, attention, reasoning, and decision-making." },
      { name: "Computational Modeling", detail: "2 courses in machine learning, neural networks, or symbolic AI." },
      { name: "Cognitive Neuroscience", detail: "2 courses covering brain imaging, neuropsychology, and neural computation." },
      { name: "Lab Research", detail: "Two terms of supervised empirical research in a faculty lab." },
      { name: "Senior Thesis", detail: "Original empirical or theoretical thesis, defended before a committee." }
    ],
    summaryDistribution: "12 term credits: 2 per pillar × 4 pillars, 2 lab research, plus senior thesis.",
    firstYearParagraphs: [
      "First-year students take Introduction to Cognitive Science, a writing-intensive philosophy seminar, and either intro psychology or intro computer science.",
      "Strong quantitative preparation is recommended but not required — students without calculus take a quantitative methods course in their first year."
    ],
    certificateText: "The Certificate in Computational Cognitive Science is available to students who complete three additional advanced courses in AI/ML and cognition, plus a computational thesis.",
    certificateRequirements: "Three 300-level+ courses in computational modeling, machine learning, or neural computation, plus a senior thesis with significant computational component.",
    facultyProfessors: "Prof. Daniel Kahneman-Reeves (Decision Theory), Dr. Hana Yamato (Language & Cognition), Prof. Imani Walker (Consciousness Studies)",
    facultyAssociate: "Dr. Felix Brandt (Computational Psych), Dr. Olivia Chen (Cognitive Neuroscience)",
    facultyAssistant: "Dr. Raj Patel (Visual Perception), Dr. Sofia Marquez (Developmental Cognition)",
    facultyLecturers: "Martin Halford (Logic & Reasoning), Yuki Tanaka (Experimental Methods)",
    coursesLinks: [
      { label: "View Catalog for Cognitive Science" },
      { label: "Faculty Research Labs" },
      { label: "Senior Thesis Archive" },
      { label: "Cognition Colloquium Schedule" }
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'EDU-151', title: 'Introduction to Cognitive Science', credits: 3, type: 'core' },
            { code: 'HUM-110', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'EDU-140', title: 'Cognitive Psychology', credits: 3, type: 'foundation' },
            { code: 'PHL-110', title: 'Introduction to Philosophy of Mind', credits: 3, type: 'core' },
            { code: 'EDU-152', title: 'Cognition Lab I', credits: 1, type: 'lab' },
          ]},
          { name: 'Spring', courses: [
            { code: 'EDU-153', title: 'Foundations of Cognitive Science', credits: 3, type: 'core' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'ENG-130', title: 'Programming Fundamentals', credits: 3, type: 'foundation' },
            { code: 'EDU-130', title: 'Statistics for Behavioral Sciences', credits: 3, type: 'foundation' },
            { code: 'EDU-154', title: 'Cognition Lab II', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'EDU-250', title: 'Memory & Attention', credits: 3, type: 'core' },
            { code: 'EDU-251', title: 'Cognitive Neuroscience', credits: 4, type: 'core' },
            { code: 'PHL-210', title: 'Consciousness & The Self', credits: 3, type: 'core' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
          ]},
          { name: 'Spring', courses: [
            { code: 'EDU-260', title: 'Language & Cognition', credits: 3, type: 'core' },
            { code: 'EDU-261', title: 'Computational Models of Cognition', credits: 4, type: 'core' },
            { code: 'EDU-262', title: 'Decision Theory & Rational Choice', credits: 3, type: 'core' },
            { code: 'ELE-210', title: 'Open Elective I', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'EDU-350', title: 'Advanced Cognitive Neuroscience', credits: 4, type: 'core' },
            { code: 'EDU-351', title: 'Machine Learning for Cognition', credits: 3, type: 'core' },
            { code: 'EDU-352', title: 'Perception & Action', credits: 3, type: 'elective' },
            { code: 'EDU-330', title: 'Junior Seminar in Cognition', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'EDU-360', title: 'Lab Research Practicum', credits: 4, type: 'lab' },
            { code: 'EDU-361', title: 'Developmental Cognition', credits: 3, type: 'elective' },
            { code: 'EDU-362', title: 'AI & Cognition', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'EDU-401', title: 'Senior Thesis in Cognitive Science I', credits: 4, type: 'capstone' },
            { code: 'EDU-410', title: 'Topics in Consciousness Studies', credits: 3, type: 'elective' },
            { code: 'EDU-411', title: 'Cognitive Anthropology', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'EDU-402', title: 'Senior Thesis in Cognitive Science II', credits: 4, type: 'capstone' },
            { code: 'EDU-420', title: 'Cognition & Society', credits: 3, type: 'seminar' },
            { code: 'EDU-430', title: 'Thesis Defense & Presentation', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Interdisciplinary Synthesis', detail: 'Integrate methods and findings across philosophy, psychology, neuroscience, linguistics, and computer science to analyze cognitive phenomena.' },
      { outcome: 'Empirical Research', detail: 'Design, execute, and analyze behavioral or neuroimaging experiments to test cognitive hypotheses.' },
      { outcome: 'Computational Modeling', detail: 'Build and evaluate computational models of cognitive processes, from symbolic AI to neural networks.' },
      { outcome: 'Philosophical Rigor', detail: 'Engage carefully with foundational questions about mind, consciousness, and intentionality.' },
      { outcome: 'Critical Engagement with AI', detail: 'Reason about the relationships between human and machine cognition, and the ethical implications of AI systems.' },
      { outcome: 'Capstone Mastery', detail: 'Complete a senior thesis that makes an original contribution, defended before a faculty committee.' },
    ],
    careerOutcomes: [
      { role: 'UX Researcher', sector: 'Tech Industry', description: 'Apply cognitive and behavioral methods to study how people use technology, and inform product design.' },
      { role: 'AI Researcher', sector: 'AI Labs', description: 'Work on cognitive AI, alignment, or human-AI interaction at major AI labs.' },
      { role: 'Behavioral Scientist', sector: 'Government & NGO', description: 'Apply behavioral insights to public policy, healthcare, or development programs.' },
      { role: 'Research Coordinator', sector: 'Academia & Medicine', description: 'Coordinate cognitive neuroscience or psychology research at universities and hospitals.' },
      { role: 'Product Manager (AI/ML)', sector: 'Tech Industry', description: 'Lead product strategy for AI-powered products, leveraging cognitive expertise.' },
      { role: 'Professor / Researcher', sector: 'Academia', description: 'Pursue graduate study and a research career in cognitive science, neuroscience, or AI.' },
    ],
  },

  "Data Science (B.S.)": {
    ...generateProgramData("Data Science (B.S.)"),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    directorName: "Prof. Rafael Costa",
    directorLocation: "Turing Pavilion, Room 601",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Mei Lin Zhao",
    coDirectorLocation: "Data Ethics Institute, Room 220",
    website: "https://artemis.collegium.edu/data-science",
    overviewParagraphs: [
      "Data Science at Artemis trains students to extract meaning from data at scale — combining statistical rigor, computational engineering, domain expertise, and ethical reasoning. Unlike purely technical data-science programs, Artemis requires every major to declare a Domain Concentration (e.g. health, climate, finance, urban systems, humanities) where they apply their toolkit to real problems.",
      "Majors work with live datasets from Artemis partner organizations — public health ministries, climate observatories, central banks, and human-rights NGOs — and graduate with a portfolio of three substantive data projects that they can defend technically and ethically."
    ],
    requirementsParagraphs: [
      "Majors complete twelve term courses: four foundations (statistics, programming, machine learning, data ethics), four advanced methods courses, three courses in a declared Domain Concentration, and a year-long capstone project with an external partner.",
      "Every major must complete the Data Ethics seminar in their first year and revisit ethics questions in each subsequent project. The program refuses to graduate students who cannot articulate the social implications of their technical work."
    ],
    seniorRequirement: "A year-long senior capstone with an external partner organization, producing a deployable data product, a published technical report, and a public ethics defense.",
    advising: "Each major has two advisors: a methods advisor (faculty) and a domain advisor (faculty or external practitioner).",
    requirementsArray: [
      { name: "Statistical Foundations", detail: "2 courses in probability, statistical inference, and experimental design." },
      { name: "Computational Foundations", detail: "2 courses in Python/R programming, data structures, and databases." },
      { name: "Machine Learning", detail: "2 courses covering classical ML, deep learning, and modern methods." },
      { name: "Data Ethics", detail: "1 required first-year seminar plus integration into all subsequent projects." },
      { name: "Domain Concentration", detail: "3 courses in a declared domain (health, climate, finance, urban, humanities)." },
      { name: "Senior Capstone", detail: "Year-long project with an external partner, defended technically and ethically." }
    ],
    summaryDistribution: "12 term credits: 4 foundations, 4 advanced methods, 3 domain concentration, plus capstone.",
    firstYearParagraphs: [
      "First-year students take Data Science Foundations, Statistical Reasoning, the Data Ethics seminar, and an introductory course in their likely Domain Concentration.",
      "Programming experience is helpful but not required — a 4-week intensive programming bootcamp is offered before the fall term."
    ],
    certificateText: "The Certificate in Data Ethics & Policy is available to students who complete three additional courses in philosophy of technology, technology law, and policy analysis.",
    certificateRequirements: "Three 300-level+ courses in ethics, law, or policy of data and AI, plus a policy-focused capstone.",
    facultyProfessors: "Prof. Rafael Costa (Statistical Learning), Dr. Mei Lin Zhao (Data Ethics), Prof. Hassan El-Sayed (Causal Inference)",
    facultyAssociate: "Dr. Anika Schmidt (Deep Learning), Dr. Jorge Vargas (Spatial Data)",
    facultyAssistant: "Dr. Lena Bergström (NLP), Dr. Tomás Cabral (Reinforcement Learning)",
    facultyLecturers: "Priya Desai (Data Visualization), Marcus Feld (Database Engineering)",
    coursesLinks: [
      { label: "View Catalog for Data Science" },
      { label: "Domain Concentration List" },
      { label: "Capstone Partner Organizations" },
      { label: "Data Ethics Case Studies" }
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-161', title: 'Data Science Foundations', credits: 3, type: 'core' },
            { code: 'SSC-110', title: 'Statistics for Social Science', credits: 4, type: 'foundation' },
            { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'ENG-130', title: 'Programming Fundamentals (Python)', credits: 3, type: 'foundation' },
            { code: 'ENG-162', title: 'Data Ethics Seminar I', credits: 1, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-163', title: 'Data Structures for Data Science', credits: 3, type: 'core' },
            { code: 'ENG-164', title: 'Probability & Statistical Inference', credits: 4, type: 'foundation' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'ELE-110', title: 'Domain Concentration Intro', credits: 3, type: 'elective' },
            { code: 'ENG-165', title: 'Data Lab I', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-260', title: 'Machine Learning Foundations', credits: 4, type: 'core' },
            { code: 'ENG-261', title: 'Databases & Data Engineering', credits: 3, type: 'core' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
            { code: 'ELE-210', title: 'Domain Concentration I', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-270', title: 'Data Visualization', credits: 3, type: 'core' },
            { code: 'ENG-271', title: 'Causal Inference & Experimental Design', credits: 3, type: 'core' },
            { code: 'ELE-211', title: 'Domain Concentration II', credits: 3, type: 'elective' },
            { code: 'ENG-272', title: 'Data Lab II', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-360', title: 'Deep Learning', credits: 4, type: 'core' },
            { code: 'ENG-361', title: 'Big Data Systems', credits: 3, type: 'core' },
            { code: 'ENG-362', title: 'NLP or Computer Vision', credits: 3, type: 'elective' },
            { code: 'ENG-330', title: 'Junior Seminar in Data Science', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-370', title: 'Advanced ML Methods', credits: 3, type: 'elective' },
            { code: 'ELE-310', title: 'Domain Concentration III', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'ENG-390', title: 'Capstone Partner Matching', credits: 1, type: 'fieldwork' },
            { code: 'ENG-371', title: 'Data Ethics Case Studies', credits: 3, type: 'seminar' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-401', title: 'Senior Capstone in Data Science I', credits: 4, type: 'capstone' },
            { code: 'ENG-410', title: 'MLOps & Production Systems', credits: 3, type: 'elective' },
            { code: 'ENG-411', title: 'Statistical Computing', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-402', title: 'Senior Capstone in Data Science II', credits: 4, type: 'capstone' },
            { code: 'ENG-420', title: 'Ethics & Society Defense', credits: 3, type: 'capstone' },
            { code: 'ENG-430', title: 'Capstone Presentation & Report', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Statistical Rigor', detail: 'Apply probability, statistical inference, and experimental design to draw valid conclusions from data.' },
      { outcome: 'Computational Engineering', detail: 'Build data pipelines, databases, and ML systems that scale to production.' },
      { outcome: 'Machine Learning Mastery', detail: 'Select, train, evaluate, and deploy appropriate ML models for real problems.' },
      { outcome: 'Domain Expertise', detail: 'Apply data-science methods to a substantive domain (health, climate, finance, urban, humanities) with real datasets.' },
      { outcome: 'Ethical Reasoning', detail: 'Identify and address the ethical, legal, and social implications of data work, and defend decisions publicly.' },
      { outcome: 'Capstone Mastery', detail: 'Ship a deployable data product with an external partner, with a technical report and ethics defense.' },
    ],
    careerOutcomes: [
      { role: 'Data Scientist', sector: 'Tech Industry', description: 'Build models and insights from large datasets at tech companies and startups.' },
      { role: 'ML Engineer', sector: 'AI/ML', description: 'Deploy and operate ML systems in production at scale.' },
      { role: 'Data Analyst', sector: 'Government & NGO', description: 'Analyze data for ministries, central banks, and international organizations.' },
      { role: 'Research Data Scientist', sector: 'Academia & Labs', description: 'Support research programs at universities, institutes, or industry labs.' },
      { role: 'Data Ethics Consultant', sector: 'Consulting', description: 'Advise organizations on responsible data and AI practices.' },
      { role: 'Founder / Data Lead', sector: 'Startup', description: 'Launch data-driven ventures or lead data at early-stage startups.' },
    ],
  },

  "Robotics (B.S.)": {
    ...generateProgramData("Robotics (B.S.)"),
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1600",
    directorName: "Prof. Yuki Tanaka-Morimoto",
    directorLocation: "Robotics Bay, Building 7",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Andrei Volkov",
    coDirectorLocation: "Control Systems Lab, Room 410",
    website: "https://artemis.collegium.edu/robotics",
    overviewParagraphs: [
      "The Robotics program at Artemis trains students to design, build, and deploy physical intelligent systems — from surgical micro-robots to autonomous agricultural harvesters to deep-sea exploration drones. The program is hardware-intensive: every major spends at least 12 hours per week in the Robotics Bay from their second year onward, building, testing, breaking, and rebuilding real machines.",
      "Coursework spans mechanical design, embedded systems, computer vision, control theory, machine learning, and the ethics of autonomy. Every senior ships a working robotic system as their capstone — not a paper, not a simulation, but a physical artifact that performs a useful task in the world."
    ],
    requirementsParagraphs: [
      "Majors complete twelve term courses spanning mechanical engineering, electrical systems, computer vision, control theory, machine learning, and robot ethics. The curriculum is front-loaded with hands-on lab work — students build their first working robot in their second term.",
      "All majors complete a year-long senior capstone in which they design, build, and deploy a physical robotic system. Capstones are presented at the annual Artemis Robotics Expo and judged by industry partners."
    ],
    seniorRequirement: "A year-long senior capstone: a fully working robotic system, presented at the Artemis Robotics Expo and judged by industry partners.",
    advising: "Sophomores are matched with a lab advisor; juniors join a research group (manipulation, mobility, perception, or human-robot interaction).",
    requirementsArray: [
      { name: "Mechanical Design", detail: "2 courses in kinematics, dynamics, and mechatronic design." },
      { name: "Embedded Systems", detail: "2 courses in microcontrollers, real-time systems, and sensors." },
      { name: "Perception & Vision", detail: "2 courses in computer vision, point clouds, and sensor fusion." },
      { name: "Control & Planning", detail: "2 courses in control theory, motion planning, and SLAM." },
      { name: "Robot Ethics & Society", detail: "1 required course on autonomy, labor, and the ethics of deployment." },
      { name: "Senior Capstone", detail: "Year-long design, build, and deployment of a working robotic system." }
    ],
    summaryDistribution: "12 term credits: 9 technical, 1 ethics, 2 capstone.",
    firstYearParagraphs: [
      "First-year students take Introduction to Robotics, Programming for Embedded Systems, Calculus, and Physics I.",
      "No prior robotics experience is required — but students should be prepared to spend significant time in the lab from week one."
    ],
    certificateText: "The Certificate in Autonomous Field Robotics is available to students who complete three additional courses in field deployment, plus a summer residency at an Artemis deployment site (farm, mine, ocean, or polar station).",
    certificateRequirements: "Three 300-level+ courses in field robotics, a summer residency, and a field deployment report.",
    facultyProfessors: "Prof. Yuki Tanaka-Morimoto (Manipulation), Dr. Andrei Volkov (Control Systems), Prof. Nia Williams (Human-Robot Interaction)",
    facultyAssociate: "Dr. Klaus Bauer (Computer Vision), Dr. Aisha Okonkwo (Field Robotics)",
    facultyAssistant: "Dr. Rohan Mehta (SLAM), Dr. Eva Lindqvist (Soft Robotics)",
    facultyLecturers: "Devon Harris (Embedded Systems), Sara Ibrahim (Mechanical Design Practice)",
    coursesLinks: [
      { label: "View Catalog for Robotics" },
      { label: "Robotics Bay Schedule" },
      { label: "Senior Capstone Archive" },
      { label: "Artemis Robotics Expo" }
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-171', title: 'Introduction to Robotics', credits: 3, type: 'core' },
            { code: 'ENG-110', title: 'Calculus I for Engineers', credits: 4, type: 'foundation' },
            { code: 'NSC-120', title: 'General Physics I (Mechanics)', credits: 4, type: 'foundation' },
            { code: 'ENG-130', title: 'Programming for Embedded Systems', credits: 3, type: 'foundation' },
            { code: 'ENG-172', title: 'Robotics Build Lab I', credits: 1, type: 'lab' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-173', title: 'Mechanical Design for Robotics', credits: 3, type: 'core' },
            { code: 'ENG-111', title: 'Calculus II for Engineers', credits: 4, type: 'foundation' },
            { code: 'NSC-121', title: 'General Physics II (E&M)', credits: 4, type: 'foundation' },
            { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'ENG-174', title: 'Robotics Build Lab II', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-270', title: 'Embedded Systems & Microcontrollers', credits: 4, type: 'core' },
            { code: 'ENG-271', title: 'Kinematics & Dynamics', credits: 3, type: 'core' },
            { code: 'ENG-120', title: 'Linear Algebra & Differential Equations', credits: 4, type: 'foundation' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-280', title: 'Control Systems I', credits: 4, type: 'core' },
            { code: 'ENG-281', title: 'Computer Vision for Robotics', credits: 3, type: 'core' },
            { code: 'ENG-282', title: 'Sensor Fusion & Perception', credits: 3, type: 'core' },
            { code: 'ENG-283', title: 'Robotics Build Lab III', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-370', title: 'Motion Planning & SLAM', credits: 4, type: 'core' },
            { code: 'ENG-371', title: 'Machine Learning for Robotics', credits: 3, type: 'core' },
            { code: 'ENG-372', title: 'Human-Robot Interaction', credits: 3, type: 'elective' },
            { code: 'ENG-330', title: 'Junior Seminar in Robotics', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-380', title: 'Advanced Control Systems', credits: 3, type: 'elective' },
            { code: 'ENG-381', title: 'Field Robotics', credits: 3, type: 'elective' },
            { code: 'ENG-382', title: 'Robot Ethics & Society', credits: 3, type: 'seminar' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'ENG-390', title: 'Capstone Design Preparation', credits: 1, type: 'fieldwork' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-401', title: 'Senior Robotics Capstone I (Design & Build)', credits: 4, type: 'capstone' },
            { code: 'ENG-410', title: 'Soft Robotics / Advanced Topics', credits: 3, type: 'elective' },
            { code: 'ENG-411', title: 'Robotics Entrepreneurship', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-402', title: 'Senior Robotics Capstone II (Deploy & Test)', credits: 4, type: 'capstone' },
            { code: 'ENG-420', title: 'Artemis Robotics Expo Preparation', credits: 2, type: 'capstone' },
            { code: 'ENG-430', title: 'Capstone Presentation & Demo', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Mechatronic Design', detail: 'Design and build robotic mechanisms integrating mechanical, electrical, and computational components.' },
      { outcome: 'Embedded Systems', detail: 'Program microcontrollers and real-time systems that interact reliably with physical sensors and actuators.' },
      { outcome: 'Perception & Vision', detail: 'Use cameras, LIDAR, and other sensors to estimate robot state and environment.' },
      { outcome: 'Control & Planning', detail: 'Design controllers and motion planners that make robots move reliably and safely.' },
      { outcome: 'Ethical Autonomy', detail: 'Reason about the labor, safety, and societal implications of deploying autonomous systems.' },
      { outcome: 'Capstone Mastery', detail: 'Design, build, and deploy a working robotic system, demonstrated at the Artemis Robotics Expo.' },
    ],
    careerOutcomes: [
      { role: 'Robotics Engineer', sector: 'Robotics Industry', description: 'Build robots at companies like Boston Dynamics, Fetch, or emerging agricultural/surgical robotics startups.' },
      { role: 'Autonomous Systems Engineer', sector: 'Automotive & Aerospace', description: 'Develop perception, planning, or control systems for self-driving cars, drones, or aircraft.' },
      { role: 'Computer Vision Engineer', sector: 'Tech Industry', description: 'Build vision systems for industrial inspection, AR/VR, or medical imaging.' },
      { role: 'Field Robotics Specialist', sector: 'Agriculture, Mining, Ocean', description: 'Deploy autonomous systems in farms, mines, oceans, or polar stations.' },
      { role: 'Research Scientist', sector: 'Academia & Industry Labs', description: 'Pursue graduate study and research in robotics, perception, or control.' },
      { role: 'Founder / CTO', sector: 'Robotics Startup', description: 'Launch robotics ventures leveraging the Artemis network and Robotics Bay.' },
    ],
  },

  "AI Engineering (B.S.)": {
    ...generateProgramData("AI Engineering (B.S.)"),
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    directorName: "Prof. Priya Venkataraman",
    directorLocation: "Turing Pavilion, Room 705",
    coDirectorTitle: "Associate Director",
    coDirectorName: "Dr. Marcus Webb",
    coDirectorLocation: "Responsible AI Lab, Room 308",
    website: "https://artemis.collegium.edu/ai-engineering",
    overviewParagraphs: [
      "AI Engineering at Artemis is a rigorous four-year program that trains engineers to design, build, deploy, and maintain large-scale artificial intelligence systems that are safe, reliable, and socially beneficial. Distinct from both Computer Science (which emphasizes fundamentals) and Data Science (which emphasizes analysis), AI Engineering focuses on the engineering discipline required to ship AI systems that work in production at scale.",
      "The curriculum covers the full AI engineering stack: foundation models, distributed training systems, inference infrastructure, evaluation and assurance, alignment and safety, and the operational, legal, and ethical context of deployment. Every major completes a year-long industry capstone with a partner AI lab."
    ],
    requirementsParagraphs: [
      "Majors complete twelve term courses: four foundations (mathematics, ML fundamentals, distributed systems, AI ethics), four core AI engineering courses (foundation models, training infrastructure, inference systems, evaluation & assurance), two specialization electives, and a year-long industry capstone.",
      "AI Ethics is not optional or siloed — it is woven into every core course, and every project must include a written safety and impact assessment that is graded alongside the technical work."
    ],
    seniorRequirement: "A year-long industry capstone with a partner AI lab, producing a deployable system, a technical report, and a public safety case presentation.",
    advising: "Each major has a faculty advisor and is matched with an industry mentor for their capstone year.",
    requirementsArray: [
      { name: "Mathematical Foundations", detail: "2 courses in linear algebra, probability, optimization, and information theory." },
      { name: "ML Fundamentals", detail: "2 courses in statistical learning, deep learning, and modern architectures." },
      { name: "Distributed Systems", detail: "2 courses in distributed computing, GPU clusters, and large-scale training." },
      { name: "AI Ethics & Safety", detail: "2 courses in alignment, evaluation, and the operational ethics of deployment." },
      { name: "Specialization Electives", detail: "2 electives in NLP, vision, robotics, or reinforcement learning." },
      { name: "Industry Capstone", detail: "Year-long capstone with a partner AI lab, including a public safety case." }
    ],
    summaryDistribution: "12 term credits: 4 foundations, 4 core AI engineering, 2 specialization electives, plus industry capstone.",
    firstYearParagraphs: [
      "First-year students take Mathematical Foundations for AI, Introduction to Machine Learning, Programming at Scale, and the AI Ethics & Society seminar.",
      "Strong mathematical preparation (calculus, linear algebra) is strongly recommended; a summer bootcamp brings admitted students up to speed if needed."
    ],
    certificateText: "The Certificate in AI Safety & Alignment is available to students who complete three additional advanced courses in alignment research, evaluation methodology, and AI governance, plus a safety-focused capstone.",
    certificateRequirements: "Three 400-level courses in alignment, evaluation, or governance, plus a capstone whose primary deliverable is a safety case rather than a feature.",
    facultyProfessors: "Prof. Priya Venkataraman (Foundation Models), Dr. Marcus Webb (AI Safety), Prof. Daniel Achebe (Distributed Training)",
    facultyAssociate: "Dr. Hana Park (Evaluation & Assurance), Dr. Lucien Bouchard (Inference Systems)",
    facultyAssistant: "Dr. Aaliyah Brown (Alignment), Dr. Sven Eriksson (Reinforcement Learning)",
    facultyLecturers: "Nina Rodriguez (ML Ops), Tomás Cabral (GPU Programming)",
    coursesLinks: [
      { label: "View Catalog for AI Engineering" },
      { label: "Industry Capstone Partners" },
      { label: "AI Safety Reading Group" },
      { label: "Senior Capstone Archive" }
    ],
    curriculum: [
      {
        year: 1, label: 'Year 1 — Foundations',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-181', title: 'Mathematical Foundations for AI', credits: 4, type: 'foundation' },
            { code: 'ENG-182', title: 'Introduction to Machine Learning', credits: 3, type: 'core' },
            { code: 'ENG-130', title: 'Programming at Scale', credits: 3, type: 'foundation' },
            { code: 'ART-101', title: 'Academic Writing & Rhetoric', credits: 3, type: 'foundation' },
            { code: 'ENG-183', title: 'AI Ethics & Society Seminar', credits: 1, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-184', title: 'Linear Algebra & Optimization', credits: 4, type: 'foundation' },
            { code: 'ENG-185', title: 'Probability & Information Theory', credits: 3, type: 'foundation' },
            { code: 'ENG-186', title: 'Data Structures & Algorithms', credits: 3, type: 'foundation' },
            { code: 'ART-102', title: 'Quantitative Reasoning', credits: 3, type: 'foundation' },
            { code: 'ENG-187', title: 'ML Lab I', credits: 1, type: 'lab' },
          ]},
        ],
      },
      {
        year: 2, label: 'Year 2 — Intermediate',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-280', title: 'Deep Learning', credits: 4, type: 'core' },
            { code: 'ENG-281', title: 'Distributed Systems', credits: 4, type: 'core' },
            { code: 'ART-201', title: 'Ethics & Society', credits: 3, type: 'foundation' },
            { code: 'ENG-282', title: 'AI Ethics & Governance', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-290', title: 'Foundation Models', credits: 4, type: 'core' },
            { code: 'ENG-291', title: 'Training Infrastructure & GPU Clusters', credits: 3, type: 'core' },
            { code: 'ENG-292', title: 'Statistical Learning Theory', credits: 3, type: 'core' },
            { code: 'ELE-210', title: 'Open Elective I', credits: 3, type: 'elective' },
          ]},
        ],
      },
      {
        year: 3, label: 'Year 3 — Advanced',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-380', title: 'Inference Systems & Serving', credits: 4, type: 'core' },
            { code: 'ENG-381', title: 'Evaluation, Assurance & Red-Teaming', credits: 3, type: 'core' },
            { code: 'ENG-382', title: 'Alignment & Safety Methods', credits: 3, type: 'core' },
            { code: 'ENG-330', title: 'Junior Seminar in AI Engineering', credits: 3, type: 'seminar' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-390', title: 'Specialization Elective I (NLP/Vision/RL/Robotics)', credits: 3, type: 'elective' },
            { code: 'ENG-391', title: 'Specialization Elective II', credits: 3, type: 'elective' },
            { code: 'ART-301', title: 'Global Citizenship Seminar', credits: 3, type: 'seminar' },
            { code: 'ENG-392', title: 'AI Policy & Law', credits: 3, type: 'seminar' },
            { code: 'ENG-393', title: 'Capstone Partner Matching', credits: 1, type: 'fieldwork' },
          ]},
        ],
      },
      {
        year: 4, label: 'Year 4 — Capstone',
        semesters: [
          { name: 'Fall', courses: [
            { code: 'ENG-401', title: 'Industry Capstone in AI Engineering I', credits: 4, type: 'capstone' },
            { code: 'ENG-410', title: 'Advanced ML Systems', credits: 3, type: 'elective' },
            { code: 'ENG-411', title: 'MLOps & Production AI', credits: 3, type: 'elective' },
            { code: 'ELE-410', title: 'Open Elective V', credits: 3, type: 'elective' },
          ]},
          { name: 'Spring', courses: [
            { code: 'ENG-402', title: 'Industry Capstone in AI Engineering II', credits: 4, type: 'capstone' },
            { code: 'ENG-420', title: 'Safety Case Workshop', credits: 3, type: 'capstone' },
            { code: 'ENG-430', title: 'Public Safety Case Presentation', credits: 2, type: 'capstone' },
            { code: 'ELE-411', title: 'Open Elective VI', credits: 3, type: 'elective' },
          ]},
        ],
      },
    ],
    learningOutcomes: [
      { outcome: 'Mathematical Foundations', detail: 'Apply linear algebra, probability, optimization, and information theory to AI engineering problems.' },
      { outcome: 'ML Engineering', detail: 'Design, train, and evaluate modern ML models, including foundation models, across modalities.' },
      { outcome: 'Systems Engineering', detail: 'Build distributed training and inference systems that operate reliably at production scale.' },
      { outcome: 'Evaluation & Assurance', detail: 'Design rigorous evaluations, red-team systems, and produce defensible safety cases for AI deployments.' },
      { outcome: 'Alignment & Safety', detail: 'Apply alignment methods, monitor deployed systems, and intervene when behavior drifts.' },
      { outcome: 'Capstone Mastery', detail: 'Ship a deployable AI system with an industry partner, including a public safety case.' },
    ],
    careerOutcomes: [
      { role: 'AI Engineer', sector: 'AI Labs', description: 'Build and deploy large-scale AI systems at frontier AI labs and major tech companies.' },
      { role: 'ML Infrastructure Engineer', sector: 'Tech Industry', description: 'Design and operate training clusters, inference fleets, and ML platforms at scale.' },
      { role: 'AI Safety Researcher', sector: 'AI Safety', description: 'Work on alignment, evaluation, and assurance at AI safety institutes and labs.' },
      { role: 'AI Policy Analyst', sector: 'Government & Think Tanks', description: 'Advise governments on AI regulation, governance, and risk.' },
      { role: 'Research Scientist', sector: 'Academia & Industry Labs', description: 'Pursue graduate study and research in AI/ML.' },
      { role: 'Founder / CTO', sector: 'AI Startup', description: 'Launch applied AI ventures, often leveraging the Artemis network and partner labs.' },
    ],
  },
};
