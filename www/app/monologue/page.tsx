"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { MonologueCard } from "@/components/features/monologue/MonologueCard"
import { CodeCategoryNav } from "@/components/features/monologue/CodeCategoryNav"
import { PageContainer } from "@/components/layout/PageContainer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { GET_MONOLOGUES, GET_BLOG_POSTS } from "@/lib/graphql/queries"
import { Monologue, CodeCategory, BlogPost } from "@/lib/types/generated"
import { mockCodeCategories } from "@/lib/data/mock"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"

export default function MonologuePage() {
  const { data: monologueData, loading: monologueLoading } = useQuery<{ monologues: { nodes: Monologue[] } }>(GET_MONOLOGUES)
  const { data: blogData, loading: blogLoading } = useQuery<{ blogPosts: BlogPost[] }>(GET_BLOG_POSTS)
  
  const loading = monologueLoading || blogLoading
  
  // ブログ記事をモノローグ形式に変換
  const convertBlogToMonologue = (blog: BlogPost): Monologue => ({
    id: `blog-${blog.id}`,
    content: blog.title,
    contentType: "BLOG" as any,
    codeLanguage: null,
    codeSnippet: null,
    tags: blog.tags,
    isPublished: blog.status === "PUBLISHED",
    publishedAt: blog.publishedAt,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    url: `/blog/${blog.slug}`,
    urlPreview: blog.coverImageUrl ? {
      title: blog.title,
      description: blog.excerpt || undefined,
      imageUrl: blog.coverImageUrl,
      siteName: "Blog",
      url: `/blog/${blog.slug}`,
      favicon: undefined,
      createdAt: blog.createdAt
    } : undefined,
    relatedBlogPosts: undefined,
    series: undefined,
    category: "ブログ",
    codeCategory: undefined,
    difficulty: undefined,
    likeCount: 0,
    // ブログ固有のデータを保持
    blogData: {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      coverImageUrl: blog.coverImageUrl
    }
  } as any)
  
  // モノローグとブログを統合
  const rawMonologues = monologueData?.monologues?.nodes || []
  const rawBlogs = blogData?.blogPosts || []
  const blogAsMonologues = rawBlogs.filter(blog => blog.status === "PUBLISHED").map(convertBlogToMonologue)
  
  // 統合してpublishedAtで降順ソート
  const monologues = [...rawMonologues, ...blogAsMonologues].sort((a, b) => {
    const dateA = new Date(a.publishedAt || a.createdAt).getTime()
    const dateB = new Date(b.publishedAt || b.createdAt).getTime()
    return dateB - dateA
  })
  
  // フィルター状態
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedContentType, setSelectedContentType] = useState<string>("all")
  const [selectedTechCategories, setSelectedTechCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // モバイル用フィルタートグル状態
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // フィルタリング処理
  const filteredMonologues = monologues.filter((monologue) => {
    // 検索クエリフィルター
    if (searchQuery && !monologue.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // コンテンツタイプフィルター (ACTIVITYは除外)
    if (selectedContentType !== "all" && selectedContentType !== "ACTIVITY") {
      if (selectedContentType === "CODE" && monologue.contentType !== "CODE") {
        return false
      }
      if (selectedContentType === "TEXT" && monologue.contentType !== "TEXT") {
        return false
      }
      if (selectedContentType === "BLOG" && monologue.contentType !== "BLOG") {
        return false
      }
    }
    
    // 技術カテゴリーフィルター（OR条件）
    if (selectedTechCategories.length > 0) {
      if (!monologue.codeCategory || !selectedTechCategories.includes(monologue.codeCategory.id)) {
        return false
      }
    }
    
    // タグフィルター
    if (selectedTags.length > 0 && !selectedTags.some(tag => monologue.tags.includes(tag))) {
      return false
    }
    
    return true
  })

  // 全タグの取得
  const allTags = Array.from(new Set(monologues.flatMap(m => m.tags)))

  const handleTechCategoryToggle = (categoryId: string) => {
    setSelectedTechCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleTagFilter = (tag: string) => {
    handleTagClick(tag)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedContentType("all")
    setSelectedTechCategories([])
    setSelectedTags([])
  }

  const hasActiveFilters = searchQuery || (selectedContentType !== "all" && selectedContentType !== "ACTIVITY") || selectedTechCategories.length > 0 || selectedTags.length > 0
  
  // コンテンツタイプの定義
  const contentTypes = [
    { id: "all", label: "すべて" },
    { id: "CODE", label: "コードスニペット" },
    { id: "TEXT", label: "テキスト" },
    { id: "BLOG", label: "ブログ" },
    { id: "ACTIVITY", label: "アクティビティ", disabled: true, comingSoon: true }
  ]

  if (loading) {
    return (
      <PageContainer>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
              <div className="h-6 w-64 bg-muted rounded mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* ヘッダー */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Monologue</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              日々の開発で気づいたことや学んだことを気軽に投稿しています。
            </p>
          </motion.div>

          {/* 検索・フィルターエリア */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* 検索バー */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search monologues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* モバイル用フィルタートグル - PC表示では非表示 */}
              <Button
                variant={showMobileFilters ? "default" : "outline"}
                className="lg:hidden"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                フィルター
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                    {(selectedContentType !== "all" ? 1 : 0) + selectedTechCategories.length + selectedTags.length + (searchQuery ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* アクティブフィルターの表示 */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">フィルター中:</span>
                {selectedContentType !== "all" && selectedContentType !== "ACTIVITY" && (
                  <Badge variant="secondary" className="gap-1">
                    {contentTypes.find(ct => ct.id === selectedContentType)?.label}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => setSelectedContentType("all")}
                    />
                  </Badge>
                )}
                {selectedTechCategories.map(categoryId => (
                  <Badge key={categoryId} variant="secondary" className="gap-1">
                    {mockCodeCategories.find(c => c.id === categoryId)?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleTechCategoryToggle(categoryId)}
                    />
                  </Badge>
                ))}
                {selectedTags.map(tag => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => handleTagClick(tag)}
                    />
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-6 px-2 text-xs"
                >
                  すべてクリア
                </Button>
              </div>
            )}

            {/* タグクラウド - モバイルのみ表示 */}
            <div className="flex flex-wrap gap-2 lg:hidden">
              <span className="text-sm text-muted-foreground mr-2">人気のタグ:</span>
              {allTags.slice(0, 6).map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* メインコンテンツ */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* サイドバー（PCでは常に表示、モバイルでは条件表示） */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`lg:w-80 lg:flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}
            >
              <div className="space-y-6">
                {/* コンテンツタイプフィルター */}
                <div className="bg-card rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">コンテンツタイプ</h3>
                  <div className="space-y-2">
                    {contentTypes.map(type => (
                      <label key={type.id} className={`flex items-center space-x-2 ${type.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                        <input
                          type="radio"
                          name="contentType"
                          value={type.id}
                          checked={selectedContentType === type.id}
                          onChange={() => !type.disabled && setSelectedContentType(type.id)}
                          disabled={type.disabled}
                          className="text-primary"
                        />
                        <span className="text-sm flex items-center space-x-1">
                          <span>{type.label}</span>
                          {type.comingSoon && (
                            <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                              Coming Soon
                            </Badge>
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* 技術カテゴリーフィルター */}
                <div className="bg-card rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">技術カテゴリー</h3>
                  <div className="space-y-2">
                    {mockCodeCategories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTechCategories.includes(category.id)}
                          onChange={() => handleTechCategoryToggle(category.id)}
                          className="text-primary"
                        />
                        <span className="flex items-center space-x-1 text-sm">
                          {category.icon && <span>{category.icon}</span>}
                          <span>{category.name}</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* タグフィルター */}
                <div className="bg-card rounded-lg p-4 border">
                  <h3 className="font-semibold mb-3">タグ</h3>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 text-xs"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* タイムライン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex-1 min-w-0"
            >
              {filteredMonologues.length > 0 ? (
                <>
                  {/* 結果件数 */}
                  <div className="mb-8 text-sm text-muted-foreground">
                    {filteredMonologues.length} monologue{filteredMonologues.length !== 1 ? 's' : ''}
                    {hasActiveFilters && ` (${monologues.length} total)`}
                  </div>
                  
                  {/* タイムライン表示 */}
                  <div className="max-w-3xl mx-auto">
                    <div className="relative">
                      {/* タイムライン線 - レスポンシブ対応 */}
                      <div className="absolute left-5 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>
                      
                      {/* モノローグカード */}
                      <div className="space-y-6">
                        {filteredMonologues.map((monologue, index) => (
                          <div key={monologue.id} className="relative pl-16 md:pl-20">
                            {/* タイムライン点 - レスポンシブ対応 */}
                            <div className="absolute left-4 md:left-6 top-6 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-primary to-primary/80 border-2 border-background rounded-full shadow-sm"></div>
                            
                            <MonologueCard
                              monologue={monologue}
                              index={index}
                              onCategoryClick={(categoryId) => handleTechCategoryToggle(categoryId)}
                              onTagClick={handleTagClick}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No monologues found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try changing your search terms or clearing filters.
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline">
                      Clear Filters
                    </Button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}