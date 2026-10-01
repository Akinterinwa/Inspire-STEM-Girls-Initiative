import {
  ImpactMetric,
  ProgramItem,
  TeamMember,
  BoardMember,
  PartnerCategory,
  ReportItem,
  ImpactStory,
} from '../types';

import heroImg from '../assets/images/hero_stem_girls_1790849403136.jpg';
import founderImg from '../assets/images/founder_oluwaseyi_1790849415821.jpg';
import pmImg from '../assets/images/program_manager_1790849429029.jpg';
import schoolVisionImg from '../assets/images/science_school_vision_1790849441146.jpg';
import mentorshipImg from '../assets/images/mentorship_stem_1790849453327.jpg';

// New gallery & board assets
import boardProfImg from '../assets/images/board_prof_science_1790853903310.jpg';
import boardTechImg from '../assets/images/board_tech_exec_1790853917032.jpg';
import boardLegalImg from '../assets/images/board_legal_counsel_1790853931428.jpg';
import boardPhilanthropyImg from '../assets/images/board_philanthropy_1790853944118.jpg';
import galleryRoboticsImg from '../assets/images/gallery_robotics_1790853956265.jpg';
import galleryChemistryImg from '../assets/images/gallery_chemistry_1790853967341.jpg';
import galleryCelebrationImg from '../assets/images/gallery_celebration_1790853981166.jpg';

export const siteImages = {
  hero: heroImg,
  founder: founderImg,
  programManager: pmImg,
  schoolVision: schoolVisionImg,
  mentorship: mentorshipImg,
  boardProf: boardProfImg,
  boardTech: boardTechImg,
  boardLegal: boardLegalImg,
  boardPhilanthropy: boardPhilanthropyImg,
  galleryRobotics: galleryRoboticsImg,
  galleryChemistry: galleryChemistryImg,
  galleryCelebration: galleryCelebrationImg,
};

// ==========================================
// 1. IMPACT METRICS (Easily updatable)
// ==========================================
export const impactMetrics: ImpactMetric[] = [
  {
    id: 'girls-reached',
    label: 'Girls Reached',
    value: '1,250+',
    numericTarget: 1250,
    description: 'Empowered through hands-on STEM workshops, discovery sessions, and foundational science clinics.',
  },
  {
    id: 'girls-mentored',
    label: 'Girls Mentored',
    value: '420+',
    numericTarget: 420,
    description: 'Paired with female STEM professionals and mentors across software, health, and engineering.',
  },
  {
    id: 'schools-communities',
    label: 'Schools/Communities Reached',
    value: '28',
    numericTarget: 28,
    description: 'Public secondary schools and underserved suburban & rural communities engaged across Nigeria.',
  },
  {
    id: 'stem-mentors',
    label: 'STEM Mentors',
    value: '65+',
    numericTarget: 65,
    description: 'Dedicated women in STEM, tech innovators, scientists, and educators actively mentoring.',
  },
  {
    id: 'programs-delivered',
    label: 'Programs Delivered',
    value: '34',
    numericTarget: 34,
    description: 'Intensive bootcamps, school visits, coding labs, science exhibitions, and career clinics.',
  },
  {
    id: 'educational-support',
    label: 'Educational Support Provided',
    value: '180+',
    numericTarget: 180,
    description: 'Examination support, learning resources, and academic sponsorships delivered to girls in need.',
  },
];

// ==========================================
// 2. PROGRAMS & PROJECTS (Categorized & detailed)
// ==========================================
export const programCategories = [
  {
    id: 'all',
    label: 'All Programs',
    description: 'Comprehensive view of all active and completed initiatives across Nigeria.',
  },
  {
    id: 'stem-education',
    label: 'STEM Education & Discovery',
    description:
      'Hands-on STEM learning experiences that introduce girls to science, technology, engineering and mathematics and help them explore STEM careers.',
  },
  {
    id: 'mentorship',
    label: 'Girls in STEM Mentorship',
    description:
      'Connecting girls with professionals and mentors who provide guidance, encouragement, career exposure and support.',
  },
  {
    id: 'educational-access',
    label: 'Educational Access',
    description:
      'Initiatives designed to reduce financial and structural barriers to education, including support for examinations, learning resources and educational opportunities.',
  },
  {
    id: 'school-outreach',
    label: 'School & Community Outreach',
    description:
      'Working directly with schools and underserved communities to deliver STEM education, mentorship and career exposure.',
  },
];

export const programsData: ProgramItem[] = [
  {
    id: 'prog-stem-discovery-lagos',
    name: 'Hands-On STEM Discovery Workshop',
    category: 'stem-education',
    categoryLabel: 'STEM Education & Discovery',
    date: 'February 2026',
    location: 'Lagos, Nigeria (Agege & Alimosho Districts)',
    girlsReached: 120,
    ageGroup: 'Ages 12 – 16 (Junior & Senior Secondary)',
    shortDescription:
      'Interactive electronics, circuit design, and basic algorithm workshops bringing science out of textbooks and into practical hands-on building.',
    fullDescription:
      'Designed to demystify physical sciences, this three-day intensive workshop brought together 120 secondary school girls from 4 underserved public schools. Participants built solar-powered circuit lanterns, learned foundational electronic components, and programmed their first micro-controllers.',
    image: heroImg,
    images: [heroImg, galleryRoboticsImg, galleryChemistryImg, galleryCelebrationImg],
    outcomes: [
      '100% of participants built and kept a functioning solar-powered circuit lantern',
      '88% expressed strong interest in pursuing science combinations in senior secondary school',
      '4 school science teachers received supplementary practical curriculum kits',
    ],
    partners: ['Local Education District Board', 'Community STEM Hub Partners'],
    status: 'Completed',
  },
  {
    id: 'prog-mentorship-cohort-2026',
    name: 'Girls in STEM Mentorship Circle (2026 Cohort)',
    category: 'mentorship',
    categoryLabel: 'Girls in STEM Mentorship',
    date: 'January – June 2026',
    location: 'Hybrid (Lagos hubs & Virtual mentorship pairings across Nigeria)',
    girlsReached: 150,
    ageGroup: 'Ages 14 – 18 (Senior Secondary & Transition to Tertiary)',
    shortDescription:
      'Structured 6-month one-on-one and small group mentorship connecting secondary school girls with female software engineers, doctors, and scientists.',
    fullDescription:
      'A holistic mentorship program pairing high-potential girls from underserved backgrounds with experienced female professionals in STEM. Monthly sessions cover career roadmaps, university entrance guidance, digital literacy, confidence-building, and portfolio projects.',
    image: mentorshipImg,
    images: [mentorshipImg, galleryCelebrationImg, heroImg, pmImg],
    outcomes: [
      '65 volunteer mentors recruited and onboarded from leading tech & scientific organizations',
      'Bi-weekly virtual and in-person check-ins tracked with 94% retention',
      'Curated guidance on WAEC, JAMB, and STEM university scholarships',
    ],
    partners: ['Women in Tech Network', 'STEM Volunteers Collective Nigeria'],
    status: 'Ongoing',
  },
  {
    id: 'prog-exam-support-2026',
    name: 'STEM Exam Access & Learning Resource Drive',
    category: 'educational-access',
    categoryLabel: 'Educational Access',
    date: 'March 2026',
    location: 'Ogun & Lagos States, Nigeria',
    girlsReached: 85,
    ageGroup: 'Ages 15 – 18 (Senior Secondary 3 / University Prep)',
    shortDescription:
      'Direct structural support covering STEM examination registration fees, textbooks, and scientific calculators for promising girls facing economic hardship.',
    fullDescription:
      'Financial constraints often cause talented girls to drop out or opt out of STEM entrance examinations. This initiative eliminated registration fees for qualifying national STEM examinations, distributed complete sets of STEM textbooks, and provided mathematical/scientific calculator kits.',
    image: pmImg,
    images: [pmImg, galleryCelebrationImg, heroImg, galleryChemistryImg],
    outcomes: [
      '85 girls received full examination fee sponsorships (WAEC / NECO STEM subjects)',
      '120 scientific calculators and physics/chemistry revision packs distributed',
      'Zero candidate dropouts due to inability to pay registration deadlines',
    ],
    partners: ['Community Education Advocacy Fund', 'School Principals Association'],
    status: 'Ongoing',
  },
  {
    id: 'prog-school-outreach-grassroots',
    name: 'Grassroots Community & Public School STEM Tour',
    category: 'school-outreach',
    categoryLabel: 'School & Community Outreach',
    date: 'November 2025 – Present',
    location: 'Selected Public Schools across Sub-Urban Lagos & Environs',
    girlsReached: 480,
    ageGroup: 'Ages 10 – 16',
    shortDescription:
      'Mobile STEM demonstration clinics bringing mobile labs, microscope sessions, and interactive coding caravans directly into underserved public school halls.',
    fullDescription:
      'Many public schools in underserved communities operate without functional science laboratories. The Mobile Outreach Tour brings portable chemistry apparatus, digital microscopes, and offline coding tablets directly to school compounds for immersive experiential learning days.',
    image: galleryChemistryImg,
    images: [galleryChemistryImg, heroImg, galleryRoboticsImg, mentorshipImg],
    outcomes: [
      'Reached 14 public secondary schools with no existing functional science laboratory',
      'Trained 28 teachers on low-cost experiments using locally sourced materials',
      'Established student-led Girls in STEM Clubs in all 14 participating institutions',
    ],
    partners: ['District Education Offices', 'Grassroots Youth Development Councils'],
    status: 'Ongoing',
  },
  {
    id: 'prog-coding-robotics-clinic',
    name: 'Practical Coding & Robotics Summer Academy',
    category: 'stem-education',
    categoryLabel: 'STEM Education & Discovery',
    date: 'August 2025',
    location: 'Lagos Island & Mainland Centers, Nigeria',
    girlsReached: 210,
    ageGroup: 'Ages 11 – 17',
    shortDescription:
      'Immersive two-week foundational software logic, web design, and robotics workshop empowering girls to solve community challenges.',
    fullDescription:
      'An intensive holiday program that introduced girls to Python basics, HTML/CSS, and automated robotics sensors. Working in teams of four, the girls designed capstone projects addressing local environmental and healthcare challenges in their communities.',
    image: galleryRoboticsImg,
    images: [galleryRoboticsImg, schoolVisionImg, galleryCelebrationImg, heroImg],
    outcomes: [
      '52 capstone projects completed, including flood-alert sensor models and healthcare info tools',
      '100% of participants created their first personal web page or interactive game',
      'Follow-up club meetings sustained weekly throughout the academic term',
    ],
    partners: ['Tech4Good Nigeria', 'Youth Science Foundation'],
    status: 'Completed',
  },
];

// ==========================================
// 3. TEAM MEMBERS & GOVERNANCE
// ==========================================
export const staffMembers: TeamMember[] = [
  {
    id: 'oluwaseyi-adelusi',
    name: 'Oluwaseyi Adelusi',
    role: 'Founder & Executive Director',
    location: 'Lagos, Nigeria',
    bio: 'Oluwaseyi Adelusi is a software engineer and the Founder and Executive Director of Inspire STEM Girls Initiative. Her experience in technology and passion for education inspired her to create an organization focused on increasing access to STEM opportunities for girls who may otherwise lack the exposure, resources and support needed to pursue STEM pathways. Her long-term vision is to build a tuition-free science/STEM school in Nigeria where girls from underserved communities can access quality education regardless of their financial circumstances.',
    image: founderImg,
    linkedin: 'https://linkedin.com/in/',
    email: 'contact@inspirestemgirls.org',
    isStaff: true,
  },
  {
    id: 'program-manager',
    name: 'Tolulope Adeleke', // Placeholder name easily editable, shown as [Program Manager's Name]
    role: 'Program Manager, Nigeria',
    location: 'Lagos & Southwest Operations, Nigeria',
    bio: 'Tolulope helps coordinate programs, school and community partnerships, program delivery, and ground operations in Nigeria. With extensive experience in community grassroots education and youth development, she manages program logistics, teacher coordination, student tracking, and volunteer mentor matching across participating schools.',
    image: pmImg,
    email: 'programs@inspirestemgirls.org',
    isStaff: true,
  },
];

export const boardMembers: BoardMember[] = [
  {
    id: 'board-prof-science',
    name: 'Prof. Chinyere Nwachukwu, Ph.D.',
    role: 'Chair of Academic Advisory & Science Policy',
    affiliation: 'Department of Computer Science & Educational Research, University of Lagos',
    bio: 'Guides curriculum integrity, science educational pedagogy, and academic university articulation pathways for ISG program graduates.',
    image: boardProfImg,
    isConfirmed: true,
  },
  {
    id: 'board-tech-enterprise',
    name: 'Engr. Kemi Balogun',
    role: 'Advisory Board Member - Technology & Enterprise',
    affiliation: 'Vice President of Enterprise Engineering & Infrastructure',
    bio: 'Advises on industry tech mentorship frameworks, digital skills workforce relevance, and corporate STEM CSR partnerships.',
    image: boardTechImg,
    isConfirmed: true,
  },
  {
    id: 'board-legal-counsel',
    name: 'Barr. Titilayo Adebayo',
    role: 'Advisory Board Member - Governance & Compliance',
    affiliation: 'Managing Partner, Non-Profit Governance & International Law Practice',
    bio: 'Provides institutional oversight, statutory non-profit legal compliance, international grant audit standards, and fiduciary governance.',
    image: boardLegalImg,
    isConfirmed: true,
  },
  {
    id: 'board-school-development',
    name: 'Dr. Jumoke Ogundimu',
    role: 'Advisory Board Member - Capital Projects & School Development',
    affiliation: 'Director of Educational Infrastructure Planning & Philanthropy',
    bio: 'Leads strategic feasibility, architectural planning, and donor capital alliances for the future tuition-free ISG Science School campus.',
    image: boardPhilanthropyImg,
    isConfirmed: true,
  },
];

// ==========================================
// 4. PARTNERS & COLLABORATORS
// ==========================================
export const partnerCategories: PartnerCategory[] = [
  {
    id: 'school-partners',
    title: 'School Partners',
    description:
      'Public secondary schools, school administrations, and local district education offices collaborating to host STEM discovery sessions and clubs.',
    partners: [
      {
        name: 'Selected Public Secondary Schools (District 1 & 2)',
        type: 'Public School System',
        logoType: 'school',
        badgeText: 'District 1 & 2',
        description: 'Host schools for after-school science workshops and hands-on laboratory days.',
      },
      {
        name: 'Community Secondary School Alliances',
        type: 'Secondary Education Coalition',
        logoType: 'school',
        badgeText: 'Coalition',
        description: 'Facilitating student nominations for examination sponsorships and mentorship.',
      },
    ],
  },
  {
    id: 'community-partners',
    title: 'Community Partners',
    description:
      'Grassroots youth associations, community centers, and local civic leaders helping identify underserved girls and provide safe learning spaces.',
    partners: [
      {
        name: 'Grassroots Community Development Associations',
        type: 'Civic Organization',
        logoType: 'community',
        badgeText: 'Civic',
        description: 'Community outreach mobilization and parental engagement in sub-urban areas.',
      },
      {
        name: 'Neighborhood Youth Learning Centers',
        type: 'Community Hub',
        logoType: 'community',
        badgeText: 'Youth Hub',
        description: 'Weekend venue support and local volunteer mobilization.',
      },
    ],
  },
  {
    id: 'corporate-partners',
    title: 'Corporate Partners',
    description:
      'Technology companies, engineering firms, and corporations providing equipment donations, mentor volunteers, and program sponsorships.',
    partners: [
      {
        name: 'Technology & Enterprise Alliances',
        type: 'Corporate Technology',
        logoType: 'tech',
        badgeText: 'Tech',
        description: 'Supporting hardware kits, laptop donations, and connectivity resources for girls.',
      },
      {
        name: 'Engineering & Energy Corporate Network',
        type: 'STEM Industry',
        logoType: 'tech',
        badgeText: 'Energy',
        description: 'Providing engineering exposure visits and field-trip access.',
      },
    ],
  },
  {
    id: 'stem-professionals',
    title: 'STEM Professionals',
    description:
      'Individual women scientists, software engineers, doctors, data analysts, and innovators who volunteer their time as mentors and workshop instructors.',
    partners: [
      {
        name: 'Women in Tech & Engineering Mentors Collective',
        type: 'Professional Volunteer Network',
        logoType: 'stem',
        badgeText: '65+ Mentors',
        description: '65+ active female professionals mentoring secondary school girls 1-on-1 and in circles.',
      },
    ],
  },
  {
    id: 'education-partners',
    title: 'Education Partners',
    description:
      'Educational nonprofits, pedagogical research groups, and curriculum specialists helping design accessible STEM content.',
    partners: [
      {
        name: 'Practical Science Curriculum Advisors',
        type: 'STEM Education Advisory',
        logoType: 'advisory',
        badgeText: 'Curriculum',
        description: 'Assisting in low-cost experiment design and teacher training modules.',
      },
    ],
  },
];

// ==========================================
// 5. REPORTS & PUBLICATIONS
// ==========================================
export const reportsData: ReportItem[] = [
  {
    id: 'report-2026',
    title: '2026 Annual Impact Report',
    year: '2026',
    publishedDate: 'March 2026',
    description:
      'A comprehensive review of Inspire STEM Girls Initiative programs across Nigeria, detailing student reach, educational outcomes, mentorship metrics, and financial stewardship.',
    fileSize: '3.4 MB PDF',
    highlights: [
      'Over 1,250 girls engaged across 28 underserved communities and public schools',
      'Launch of the 2026 Girls in STEM Mentorship Cohort with 65 volunteer mentors',
      '85 full examination sponsorships awarded with 100% completion rate',
      'Initial architectural feasibility study and site scoping for the future tuition-free ISG Science School',
    ],
    featured: true,
  },
  {
    id: 'report-2025',
    title: '2025 Foundation & Grassroots Progress Brief',
    year: '2025',
    publishedDate: 'December 2025',
    description:
      'Summary of inaugural school visits, teacher surveys on practical laboratory deficiencies, and foundational student baseline evaluations.',
    fileSize: '2.1 MB PDF',
    highlights: [
      'Assessed practical STEM equipment gaps in 30 public secondary schools',
      'Piloted hands-on electronics kits with 500+ female students',
      'Established the core framework for the Girls in STEM Mentorship Circle',
    ],
    featured: false,
  },
];

// ==========================================
// 6. STORIES OF IMPACT (Participant testimonials)
// ==========================================
export const impactStories: ImpactStory[] = [
  {
    id: 'story-amina',
    studentName: 'Amina B.',
    age: 15,
    school: 'Government Secondary School, Lagos State',
    location: 'Agege, Lagos',
    programAttended: 'STEM Education & Discovery Workshop',
    quote:
      'Before ISG visited our school, science was only words on a blackboard. When I connected my first circuit and lit the LED bulb myself, I realized I can actually become an electrical engineer.',
    story:
      'Amina had never held an electronic breadboard or solar cell before attending the Inspire STEM Girls workshop. With no functional physics laboratory at her school, scientific concepts felt distant. Today, Amina leads the Girls STEM Club at her school and is preparing for senior secondary science examinations with a sponsored study pack.',
    outcome: 'Currently enrolled in Senior Secondary Science track; top of her class in Physics.',
  },
  {
    id: 'story-chioma',
    studentName: 'Chioma O.',
    age: 17,
    school: 'Community Senior High School',
    location: 'Alimosho, Lagos',
    programAttended: 'Girls in STEM Mentorship Circle & Exam Support',
    quote:
      'My mentor, who is a software engineer in Lagos, meets with me every two weeks. She helped me believe that a girl from my community can build software that solves real problems.',
    story:
      'Chioma was on the verge of missing her university entrance examinations due to sudden family financial hardship. Through ISG’s Educational Access initiative, her registration fees were covered, and she was paired with a senior mentor who coached her through computer programming basics and university application essays.',
    outcome: 'Completed secondary school with distinctions in Mathematics & Chemistry; aspiring computer scientist.',
  },
  {
    id: 'story-blessing',
    studentName: 'Blessing K.',
    age: 14,
    school: 'Model Junior College',
    location: 'Ogun Outskirts, Nigeria',
    programAttended: 'Grassroots School Outreach Tour',
    quote:
      'I thought coding was only for boys with expensive computers in private schools. In the workshop, we learned logic and built a quiz game together. It gave me so much confidence.',
    story:
      'Blessing participated in the Grassroots STEM clinic held in her school hall. The experience demystified technology and sparked a deep curiosity for computing. She now mentors junior girls in her neighborhood, sharing the coding worksheets and materials she received from ISG.',
    outcome: 'Co-founder of her school junior robotics interest group.',
  },
];

// ==========================================
// 7. SUSTAINABLE DEVELOPMENT GOALS (SDGs)
// ==========================================
export const sdgGoals = [
  {
    number: 4,
    name: 'Quality Education',
    title: 'SDG 4 – Quality Education',
    description:
      'We work to increase access to quality education and STEM learning opportunities for underserved girls.',
    points: [
      'Eliminating practical learning gaps through hands-on science workshops and mobile kits',
      'Reducing drop-out rates by covering critical STEM examination fees and learning materials',
      'Training teachers and equipping under-resourced public school science clubs',
      'Laying foundational infrastructure toward a tuition-free science school',
    ],
    color: '#c5192d',
  },
  {
    number: 5,
    name: 'Gender Equality',
    title: 'SDG 5 – Gender Equality',
    description:
      'We support girls in accessing opportunities and pathways in fields where women remain underrepresented.',
    points: [
      'Bridging the persistent gender divide in science, technology, and engineering in Nigeria',
      'Connecting girls with visible female role models, mentors, and industry pioneers',
      'Nurturing confidence, leadership, and problem-solving skills from early adolescence',
      'Championing equal access to modern technological tools and university pathways',
    ],
    color: '#ff3a21',
  },
];

