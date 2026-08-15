export interface Project {
  id: string;
  title: string;
  client: string;
  category: 'AI Systems' | 'Cloud & Infra' | 'Web Platforms' | 'FinTech' | 'Creative Dev';
  tagline: string;
  description: string;
  metrics: { label: string; value: string; detail: string }[];
  techStack: string[];
  year: string;
  status: 'Production' | 'Featured' | 'Open Source';
  architecture: {
    overview: string;
    flow: string[];
    challenges: string[];
    solutions: string[];
  };
  liveDemoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
  technologies: string[];
  badge: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend & DB' | 'AI & ML' | 'DevOps & Cloud' | 'Security';
  ring: 'Core' | 'Adopt' | 'Trial' | 'Assess';
  description: string;
  useCase: string;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  bio: string;
  avatarText: string;
  github: string;
  linkedin: string;
  status: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarText: string;
  projectRef: string;
}

export interface AIScopeResult {
  summary: string;
  recommendedStack: {
    frontend: string;
    backend: string;
    database: string;
    ai_layer: string;
    infrastructure: string;
  };
  keyArchitecturalDecisions: string[];
  milestones: {
    phase: string;
    duration: string;
    deliverables: string;
  }[];
  estimatedEffortWeeks: string;
  recommendedTeamSize: string;
  securityAndComplianceTips: string[];
}

export interface InquiryFormData {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: string;
  isStreaming?: boolean;
  isError?: boolean;
  metadata?: {
    latencyMs?: number;
    model?: string;
    actionSuggested?: 'book_call' | 'estimate_cost' | 'audit_repo' | 'view_services';
  };
}

export interface GitHubRepoData {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  language: string;
  license: string;
  topics: string[];
  defaultBranch: string;
  updatedAt: string;
  htmlUrl: string;
  ownerAvatar?: string;
}

export interface GitHubRepoAnalysis {
  healthScore: number;
  summary: string;
  architectureAssessment: string;
  performanceOpportunities: string[];
  securityReview: string[];
  modernizationRoadmap: string[];
  recommendedStudioServices: string[];
}
