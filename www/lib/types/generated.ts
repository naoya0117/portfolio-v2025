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
  contentType: "TEXT" | "CODE" | "IMAGE" | "URL_PREVIEW"
  codeLanguage?: string
  codeSnippet?: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  
  // 新規フィールド
  url?: string
  urlPreview?: UrlPreview
  relatedBlogPosts?: string[]
  series?: string
  category?: string
  codeCategory?: CodeCategory
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  likeCount?: number
}

export interface UrlPreview {
  title: string
  description?: string
  imageUrl?: string
  siteName?: string
  url: string
  favicon?: string
  createdAt: string
}

export interface CodeCategory {
  id: string
  name: string
  slug: string
  description?: string
  parentId?: string
  color?: string
  icon?: string
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