export interface Project {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  imagePlaceholderGradient: string;
}

export interface SkillItem {
  name: string;
  level: string; // e.g. "Core Foundation", "Practical", "Relational Systems", etc.
  description: string;
  tags: string[];
  iconKey?: string;
  subcategory?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  subcategories?: string[];
  skills: SkillItem[];
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}
