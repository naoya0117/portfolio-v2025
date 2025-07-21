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

// モックカテゴリーデータ
export const mockCodeCategories: CodeCategory[] = [
  {
    id: "react-hooks",
    name: "React Hooks",
    slug: "react-hooks",
    description: "React Hooksの使い方とパターン",
    color: "#61dafb",
    icon: "⚛️"
  },
  {
    id: "typescript-tips",
    name: "TypeScript Tips",
    slug: "typescript-tips", 
    description: "TypeScript活用のコツとベストプラクティス",
    color: "#3178c6",
    icon: "🔷"
  },
  {
    id: "performance",
    name: "パフォーマンス最適化",
    slug: "performance-optimization",
    description: "Webアプリのパフォーマンス改善テクニック",
    color: "#ff6b6b",
    icon: "⚡"
  },
  {
    id: "api-design",
    name: "API設計",
    slug: "api-design",
    description: "REST APIとGraphQLの設計パターン",
    color: "#4ecdc4",
    icon: "🔌"
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
    updatedAt: "2025-01-15T10:00:00Z",
    category: "技術メモ",
    likeCount: 12,
    relatedBlogPosts: ["1"]
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
    updatedAt: "2025-01-10T15:30:00Z",
    codeCategory: mockCodeCategories[0],
    difficulty: "INTERMEDIATE",
    likeCount: 24,
    relatedBlogPosts: ["1"]
  },
  {
    id: "3",
    content: "便利なReact Hooksライブラリを見つけました。https://github.com/streamich/react-use には様々なカスタムフックが用意されていて、開発が効率的になりそうです。",
    contentType: "TEXT",
    url: "https://github.com/streamich/react-use",
    urlPreview: {
      title: "react-use",
      description: "Collection of essential React Hooks",
      imageUrl: "https://repository-images.githubusercontent.com/146641387/38ba6700-5db6-11ea-8af8-b5b0c92e5e2b",
      siteName: "GitHub",
      url: "https://github.com/streamich/react-use",
      favicon: "https://github.githubassets.com/favicons/favicon.svg",
      createdAt: "2025-01-12T09:00:00Z"
    },
    tags: ["React", "Hooks", "ライブラリ"],
    isPublished: true,
    publishedAt: "2025-01-12T09:00:00Z",
    createdAt: "2025-01-12T09:00:00Z",
    updatedAt: "2025-01-12T09:00:00Z",
    category: "ツール紹介",
    likeCount: 8
  },
  {
    id: "4",
    content: "useMemoとuseCallbackの使い分け",
    contentType: "CODE",
    codeLanguage: "typescript",
    codeSnippet: `// 重い計算をメモ化
const expensiveValue = useMemo(() => {
  return heavyCalculation(data)
}, [data])

// コールバック関数をメモ化
const handleClick = useCallback((id: string) => {
  onItemClick(id)
}, [onItemClick])

// オブジェクトもメモ化できる
const config = useMemo(() => ({
  apiUrl: process.env.API_URL,
  timeout: 5000
}), [])`,
    tags: ["React", "Hooks", "パフォーマンス"],
    isPublished: true,
    publishedAt: "2025-01-08T14:20:00Z",
    createdAt: "2025-01-08T14:20:00Z",
    updatedAt: "2025-01-08T14:20:00Z",
    codeCategory: mockCodeCategories[2],
    difficulty: "INTERMEDIATE",
    likeCount: 35,
    series: "React パフォーマンス最適化"
  },
  {
    id: "5",
    content: "TypeScriptの型ガードで安全性向上",
    contentType: "CODE",
    codeLanguage: "typescript",
    codeSnippet: `// カスタム型ガード
const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

// 使用例
const processValue = (value: unknown) => {
  if (isString(value)) {
    // この中では value は string 型として扱われる
    console.log(value.toUpperCase())
  }
}

// 配列の型ガード
const isStringArray = (arr: unknown[]): arr is string[] => {
  return arr.every(isString)
}`,
    tags: ["TypeScript", "型安全性", "ベストプラクティス"],
    isPublished: true,
    publishedAt: "2025-01-05T11:45:00Z",
    createdAt: "2025-01-05T11:45:00Z",
    updatedAt: "2025-01-05T11:45:00Z",
    codeCategory: mockCodeCategories[1],
    difficulty: "ADVANCED",
    likeCount: 18
  },
  {
    id: "6",
    content: "Next.js 15の新機能まとめ記事を読みました。https://nextjs.org/blog/next-15 パフォーマンス改善やReact 19への対応など、多くの変更が含まれています。",
    contentType: "TEXT",
    url: "https://nextjs.org/blog/next-15",
    urlPreview: {
      title: "Next.js 15",
      description: "Next.js 15 is now stable and ready for production",
      imageUrl: "https://nextjs.org/static/blog/next-15/twitter-card.png",
      siteName: "Next.js Blog",
      url: "https://nextjs.org/blog/next-15",
      favicon: "https://nextjs.org/favicon.ico",
      createdAt: "2025-01-03T16:30:00Z"
    },
    tags: ["Next.js", "React", "アップデート"],
    isPublished: true,
    publishedAt: "2025-01-03T16:30:00Z",
    createdAt: "2025-01-03T16:30:00Z",
    updatedAt: "2025-01-03T16:30:00Z",
    category: "アップデート情報",
    likeCount: 6
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