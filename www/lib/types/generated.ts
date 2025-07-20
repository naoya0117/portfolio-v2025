// GraphQL generated types
export interface Profile {
  id: string
  name: string
  title?: string
  bio?: string
  avatarUrl?: string
  socialLinks: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  iconUrl?: string
  displayOrder: number
}

export interface SkillCategory {
  category: string
  skills: Skill[]
}

export interface Experience {
  id: string
  company: string
  position: string
  description?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  technologies: string[]
}

export interface Monologue {
  id: string
  content: string
  contentType: "TEXT" | "CODE" | "IMAGE"
  codeLanguage?: string
  codeSnippet?: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  coverImageUrl?: string
  tags: string[]
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  seoTitle?: string
  seoDescription?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
}