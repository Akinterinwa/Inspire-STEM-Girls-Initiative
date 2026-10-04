export type PageId =
  | 'home'
  | 'about'
  | 'programs'
  | 'impact'
  | 'vision'
  | 'team'
  | 'partners'
  | 'reports'
  | 'get-involved'
  | 'donate'
  | 'admin';

export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  numericTarget?: number;
  description: string;
}

export type ProgramCategory =
  | 'stem-education'
  | 'mentorship'
  | 'educational-access'
  | 'school-outreach';

export interface ProgramItem {
  id: string;
  name: string;
  category: ProgramCategory;
  categoryLabel: string;
  date: string;
  location: string;
  girlsReached: number;
  ageGroup: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  images: string[];
  outcomes: string[];
  partners: string[];
  status: 'Completed' | 'Ongoing' | 'Upcoming';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
  isStaff: boolean;
}

export interface BoardMember {
  id: string;
  name: string;
  role: string;
  affiliation: string;
  bio: string;
  image: string;
  isConfirmed: boolean;
}

export interface PartnerItem {
  name: string;
  type: string;
  logoType: 'school' | 'community' | 'tech' | 'stem' | 'advisory';
  description?: string;
  badgeText?: string;
  nature?: string;
  role?: string;
  location?: string;
}

export interface PartnerCategory {
  id: string;
  title: string;
  description: string;
  partners: PartnerItem[];
}

export interface ReportItem {
  id: string;
  title: string;
  year: string;
  publishedDate: string;
  description: string;
  fileSize: string;
  highlights: string[];
  featured?: boolean;
}

export interface ImpactStory {
  id: string;
  studentName: string;
  age: number;
  school: string;
  location: string;
  programAttended: string;
  quote: string;
  story: string;
  outcome: string;
}

export interface SocialUpdate {
  id: string;
  platform: 'instagram' | 'linkedin';
  author: string;
  authorHandle: string;
  date: string;
  timeAgo: string;
  category: 'workshop' | 'mentorship' | 'student-spotlight' | 'milestone';
  categoryLabel: string;
  image: string;
  content: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  sharesCount?: number;
  url: string;
  shortcode?: string;
  isOfficialEmbed?: boolean;
  verified?: boolean;
}
