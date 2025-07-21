# Monologue機能 拡張設計書

## 1. 概要

現在のMonologue機能を拡張し、URLプレビュー機能、ブログとの関連性、コードスニペットのカテゴリー分類を追加した包括的な設計。

## 2. 拡張データ構造

### 2.1 Monologue拡張インターフェース

```typescript
export interface Monologue {
  id: string
  content: string
  contentType: "TEXT" | "CODE" | "IMAGE" | "URL_PREVIEW"
  
  // 既存フィールド
  codeLanguage?: string
  codeSnippet?: string
  tags: string[]
  isPublished: boolean
  publishedAt?: string
  createdAt: string
  updatedAt: string
  
  // 新規フィールド
  // URL プレビュー関連
  url?: string
  urlPreview?: UrlPreview
  
  // ブログとの関連
  relatedBlogPosts?: string[]
  series?: string
  category?: string
  
  // コードカテゴリー
  codeCategory?: CodeCategory
  difficulty?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
  
  // メタデータ
  viewCount?: number
  likeCount?: number
  bookmarkCount?: number
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
```

### 2.2 ブログとの関連構造

```typescript
export interface BlogPost {
  // 既存フィールド
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
  
  // 新規フィールド
  relatedMonologues?: string[]
  series?: string
  category?: string
}

export interface ContentSeries {
  id: string
  title: string
  slug: string
  description?: string
  coverImageUrl?: string
  tags: string[]
  isPublished: boolean
  createdAt: string
  updatedAt: string
}
```

## 3. コードカテゴリー分類システム

### 3.1 階層構造設計

```typescript
export interface CodeCategoryTree {
  // プログラミング言語
  languages: {
    javascript: CodeCategory
    typescript: CodeCategory
    python: CodeCategory
    go: CodeCategory
    rust: CodeCategory
  }
  
  // フレームワーク・ライブラリ
  frameworks: {
    react: CodeCategory
    nextjs: CodeCategory
    vue: CodeCategory
    express: CodeCategory
    fastapi: CodeCategory
  }
  
  // 用途・パターン
  patterns: {
    algorithms: CodeCategory
    dataStructures: CodeCategory
    designPatterns: CodeCategory
    apiDesign: CodeCategory
    testing: CodeCategory
    performance: CodeCategory
  }
  
  // 技術領域
  domains: {
    frontend: CodeCategory
    backend: CodeCategory
    mobile: CodeCategory
    devops: CodeCategory
    ml: CodeCategory
  }
}
```

### 3.2 カテゴリー例

```typescript
const codeCategories: CodeCategory[] = [
  {
    id: "js-basics",
    name: "JavaScript基礎",
    slug: "javascript-basics",
    description: "JavaScript の基本的な書き方とパターン",
    color: "#f7df1e",
    icon: "🟨"
  },
  {
    id: "react-hooks",
    name: "React Hooks",
    slug: "react-hooks", 
    description: "React Hooks の使い方とパターン",
    parentId: "react",
    color: "#61dafb",
    icon: "⚛️"
  },
  {
    id: "performance",
    name: "パフォーマンス最適化",
    slug: "performance-optimization",
    description: "コードのパフォーマンス改善テクニック",
    color: "#ff6b6b",
    icon: "⚡"
  }
]
```

## 4. URL プレビュー機能

### 4.1 プレビューデータ取得

```typescript
export interface UrlPreviewService {
  // URL からメタデータを取得
  fetchPreview(url: string): Promise<UrlPreview>
  
  // プレビューデータの更新
  refreshPreview(monologueId: string): Promise<UrlPreview>
  
  // プレビューデータのキャッシュ管理
  getCachedPreview(url: string): UrlPreview | null
}
```

### 4.2 プレビュー表示コンポーネント

```typescript
export interface UrlPreviewCardProps {
  preview: UrlPreview
  size?: "compact" | "full"
  showFavicon?: boolean
  onClick?: () => void
}
```

## 5. ブログ-モノローグ関連システム

### 5.1 関連コンテンツ推薦

```typescript
export interface ContentRecommendation {
  // タグベースの関連性
  getRelatedByTags(contentId: string, type: "blog" | "monologue"): Promise<RelatedContent[]>
  
  // シリーズベースの関連性
  getSeriesContent(seriesId: string): Promise<ContentSeries & { items: RelatedContent[] }>
  
  // カテゴリーベースの関連性
  getCategoryContent(categoryId: string): Promise<RelatedContent[]>
}

export interface RelatedContent {
  id: string
  title: string
  type: "blog" | "monologue"
  excerpt?: string
  tags: string[]
  publishedAt: string
  readTime?: number
}
```

### 5.2 シリーズ管理

```typescript
export interface SeriesManagement {
  createSeries(series: Omit<ContentSeries, "id" | "createdAt" | "updatedAt">): Promise<ContentSeries>
  addToSeries(seriesId: string, contentId: string, type: "blog" | "monologue"): Promise<void>
  getSeriesOrder(seriesId: string): Promise<{ order: number; contentId: string; type: string }[]>
  reorderSeries(seriesId: string, newOrder: { contentId: string; type: string }[]): Promise<void>
}
```

## 6. UIコンポーネント設計

### 6.1 拡張MonologueCard

```typescript
export interface EnhancedMonologueCardProps {
  monologue: Monologue
  showPreview?: boolean
  showRelated?: boolean
  showCategory?: boolean
  onCategoryClick?: (category: CodeCategory) => void
  onTagClick?: (tag: string) => void
}
```

### 6.2 コードカテゴリーナビゲーション

```typescript
export interface CodeCategoryNavProps {
  categories: CodeCategory[]
  selectedCategory?: string
  onCategorySelect: (category: CodeCategory) => void
  showHierarchy?: boolean
}
```

### 6.3 関連コンテンツセクション

```typescript
export interface RelatedContentSectionProps {
  currentContent: { id: string; type: "blog" | "monologue" }
  relatedItems: RelatedContent[]
  maxItems?: number
  layout?: "horizontal" | "vertical"
}
```

## 7. API エンドポイント設計

### 7.1 GraphQL スキーマ拡張

```graphql
type Monologue {
  id: ID!
  content: String!
  contentType: ContentType!
  codeLanguage: String
  codeSnippet: String
  tags: [String!]!
  isPublished: Boolean!
  publishedAt: String
  createdAt: String!
  updatedAt: String!
  
  # 新規フィールド
  url: String
  urlPreview: UrlPreview
  relatedBlogPosts: [BlogPost!]!
  series: ContentSeries
  category: String
  codeCategory: CodeCategory
  difficulty: Difficulty
  viewCount: Int
  likeCount: Int
  bookmarkCount: Int
}

type UrlPreview {
  title: String!
  description: String
  imageUrl: String
  siteName: String
  url: String!
  favicon: String
  createdAt: String!
}

type CodeCategory {
  id: ID!
  name: String!
  slug: String!
  description: String
  parentId: String
  color: String
  icon: String
  children: [CodeCategory!]!
  monologues(first: Int, after: String): MonologueConnection!
}

enum ContentType {
  TEXT
  CODE
  IMAGE
  URL_PREVIEW
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### 7.2 新規クエリ

```graphql
type Query {
  # 既存
  monologues(first: Int, after: String): MonologueConnection!
  monologue(id: ID!): Monologue
  
  # 新規
  monologuesByCategory(categoryId: String!, first: Int, after: String): MonologueConnection!
  monologuesBySeries(seriesId: String!): [Monologue!]!
  relatedContent(contentId: String!, contentType: ContentType!): [RelatedContent!]!
  codeCategories: [CodeCategory!]!
  codeCategoryTree: CodeCategoryTree!
  generateUrlPreview(url: String!): UrlPreview!
}
```

## 8. 実装フェーズ

### Phase 1: コードカテゴリー基盤
1. CodeCategory データ構造実装
2. カテゴリー管理画面
3. Monologue へのカテゴリー追加
4. カテゴリーフィルタリング機能

### Phase 2: URL プレビュー
1. URL 検出とプレビュー取得
2. UrlPreview コンポーネント
3. プレビューキャッシュシステム
4. URL_PREVIEW コンテンツタイプ対応

### Phase 3: ブログ関連機能
1. 関連コンテンツ推薦システム
2. シリーズ管理機能
3. 関連コンテンツ表示UI
4. クロスリファレンス機能

### Phase 4: 高度な機能
1. コンテンツ分析とレコメンデーション
2. 統計とアナリティクス
3. 検索機能の拡張
4. パフォーマンス最適化

## 9. 主な拡張ポイント

### 🔗 URLプレビュー機能
- 新しいコンテンツタイプ `URL_PREVIEW` 追加
- メタデータ自動取得（タイトル、説明、画像、ファビコン）
- キャッシュシステムによる高速表示

### 📚 ブログとの関連システム
- `relatedBlogPosts` / `relatedMonologues` による双方向関連
- `ContentSeries` によるシリーズ化
- タグベースの自動推薦機能

### 🏷️ コードカテゴリー分類
- 階層型カテゴリー構造（言語 → フレームワーク → パターン）
- 難易度レベル（初級・中級・上級）
- 視覚的なカテゴリーナビゲーション

この設計により、Monologue機能は単純なマイクロブログから、開発者向けの包括的なナレッジベースシステムへと進化します。