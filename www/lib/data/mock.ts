export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatarUrl: string
  socialLinks: SocialLink[]
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  iconUrl?: string
  displayOrder: number
}

export interface Experience {
  id: string
  company: string
  position: string
  description: string
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

export const mockProfile: Profile = {
  id: "1",
  name: "山田太郎",
  title: "フルスタック開発者",
  bio: "Next.js、React、TypeScript、Goを使った現代的なWebアプリケーション開発を専門としています。ユーザー体験とパフォーマンスを重視したソリューションの提供に情熱を注いでいます。",
  avatarUrl: "/api/placeholder/150/150",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com", icon: "github" },
    { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
    { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
  ]
}

export const mockSkills: Skill[] = [
  { id: "1", name: "React", category: "Frontend", level: 9, displayOrder: 1 },
  { id: "2", name: "Next.js", category: "Frontend", level: 8, displayOrder: 2 },
  { id: "3", name: "TypeScript", category: "Language", level: 9, displayOrder: 3 },
  { id: "4", name: "JavaScript", category: "Language", level: 9, displayOrder: 4 },
  { id: "5", name: "Go", category: "Backend", level: 7, displayOrder: 5 },
  { id: "6", name: "Node.js", category: "Backend", level: 8, displayOrder: 6 },
  { id: "7", name: "PostgreSQL", category: "Database", level: 7, displayOrder: 7 },
  { id: "8", name: "GraphQL", category: "API", level: 8, displayOrder: 8 },
  { id: "9", name: "Tailwind CSS", category: "Styling", level: 9, displayOrder: 9 },
  { id: "10", name: "Docker", category: "DevOps", level: 7, displayOrder: 10 },
  { id: "11", name: "AWS", category: "Cloud", level: 6, displayOrder: 11 },
  { id: "12", name: "Git", category: "Tools", level: 9, displayOrder: 12 },
]

export const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "テック株式会社",
    position: "シニア フルスタック開発者",
    description: "大規模Webアプリケーションの設計・開発・運用を担当。React、Next.js、Goでのマイクロサービスアーキテクチャによるシステム構築をリード。",
    startDate: "2022-04",
    isCurrent: true,
    technologies: ["React", "Next.js", "Go", "PostgreSQL", "Docker", "AWS"]
  },
  {
    id: "2",
    company: "スタートアップ合同会社",
    position: "フロントエンド開発者",
    description: "SaaSプロダクトのフロントエンド開発を担当。Vue.js からReactへの移行プロジェクトをリード。UIコンポーネントライブラリの設計・構築。",
    startDate: "2020-06",
    endDate: "2022-03",
    isCurrent: false,
    technologies: ["React", "Vue.js", "TypeScript", "Storybook", "Jest"]
  },
  {
    id: "3",
    company: "システム開発会社",
    position: "ジュニア開発者",
    description: "受託開発プロジェクトにて、PHP、JavaScriptでのWebアプリケーション開発に従事。基礎的な開発スキルを習得。",
    startDate: "2018-04",
    endDate: "2020-05",
    isCurrent: false,
    technologies: ["PHP", "JavaScript", "MySQL", "jQuery", "Bootstrap"]
  }
]

export const mockMonologues: Monologue[] = [
  {
    id: "1",
    content: "React 19の新機能について調べていたところ、use()フックの存在を知りました。Promiseを直接扱えるようになるのは便利そうです。",
    contentType: "TEXT",
    tags: ["React", "JavaScript"],
    isPublished: true,
    publishedAt: "2025-01-15T10:00:00Z",
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z"
  },
  {
    id: "2",
    content: "カスタムフックでデータフェッチングを抽象化する方法",
    contentType: "CODE",
    codeLanguage: "typescript",
    codeSnippet: `const useAsyncData = <T>(asyncFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    asyncFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}`,
    tags: ["React", "TypeScript", "Hooks"],
    isPublished: true,
    publishedAt: "2025-01-10T15:30:00Z",
    createdAt: "2025-01-10T15:30:00Z",
    updatedAt: "2025-01-10T15:30:00Z"
  }
]

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Next.js 15で変わったこと",
    slug: "nextjs-15-changes",
    excerpt: "Next.js 15の新機能と変更点について詳しく解説します。",
    content: "# Next.js 15で変わったこと\n\nNext.js 15がリリースされ、多くの新機能と改善が加えられました...",
    tags: ["Next.js", "React", "Web Development"],
    status: "PUBLISHED",
    publishedAt: "2025-01-01T09:00:00Z",
    createdAt: "2025-01-01T09:00:00Z",
    updatedAt: "2025-01-01T09:00:00Z"
  },
  {
    id: "2",
    title: "TypeScriptの型システムを理解する",
    slug: "understanding-typescript-type-system",
    excerpt: "TypeScriptの型システムの基礎から応用まで、実例とともに学びます。",
    content: "# TypeScriptの型システムを理解する\n\nTypeScriptの型システムは強力で、適切に使用することで...",
    tags: ["TypeScript", "Programming", "Type Safety"],
    status: "PUBLISHED",
    publishedAt: "2024-12-15T14:00:00Z",
    createdAt: "2024-12-15T14:00:00Z",
    updatedAt: "2024-12-15T14:00:00Z"
  }
]