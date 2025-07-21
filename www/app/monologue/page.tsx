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
import { GET_MONOLOGUES } from "@/lib/graphql/queries"
import { Monologue, CodeCategory } from "@/lib/types/generated"
import { mockCodeCategories } from "@/lib/data/mock"
import { Search, Filter, X, SlidersHorizontal } from "lucide-react"

export default function MonologuePage() {
  const { data, loading } = useQuery<{ monologues: Monologue[] }>(GET_MONOLOGUES)
  const monologues = data?.monologues || []
  
  // フィルター状態
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // フィルタリング処理
  const filteredMonologues = monologues.filter((monologue) => {
    // 検索クエリフィルター
    if (searchQuery && !monologue.content.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // カテゴリーフィルター
    if (selectedCategory && monologue.codeCategory?.id !== selectedCategory) {
      return false
    }
    
    // タグフィルター
    if (selectedTags.length > 0 && !selectedTags.some(tag => monologue.tags.includes(tag))) {
      return false
    }
    
    return true
  })

  // 全タグの取得
  const allTags = Array.from(new Set(monologues.flatMap(m => m.tags)))

  const handleCategorySelect = (category: CodeCategory | null) => {
    setSelectedCategory(category?.id)
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
    setSelectedCategory(undefined)
    setSelectedTags([])
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTags.length > 0

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">モノローグ</h1>
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
                  placeholder="モノローグを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* フィルターボタン */}
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="md:w-auto"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                フィルター
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                    {(selectedCategory ? 1 : 0) + selectedTags.length + (searchQuery ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>

            {/* アクティブフィルターの表示 */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">フィルター中:</span>
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {mockCodeCategories.find(c => c.id === selectedCategory)?.name}
                    <X 
                      className="w-3 h-3 cursor-pointer hover:text-destructive" 
                      onClick={() => setSelectedCategory(undefined)}
                    />
                  </Badge>
                )}
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

            {/* タグクラウド */}
            {!showFilters && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-2">人気のタグ:</span>
                {allTags.slice(0, 8).map(tag => (
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
            )}
          </motion.div>

          {/* メインコンテンツ */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* サイドバー（フィルター表示時またはデスクトップ） */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:block"
              >
                <CodeCategoryNav
                  categories={mockCodeCategories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategorySelect}
                  showHierarchy={false}
                />
              </motion.div>
            )}

            {/* モノローグ一覧 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={showFilters ? "lg:col-span-3" : "lg:col-span-4"}
            >
              {filteredMonologues.length > 0 ? (
                <>
                  {/* 結果件数 */}
                  <div className="mb-6 text-sm text-muted-foreground">
                    {filteredMonologues.length}件のモノローグ
                    {hasActiveFilters && ` (${monologues.length}件中)`}
                  </div>
                  
                  {/* モノローグカード */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMonologues.map((monologue, index) => (
                      <MonologueCard
                        key={monologue.id}
                        monologue={monologue}
                        index={index}
                        onCategoryClick={setSelectedCategory}
                        onTagClick={handleTagClick}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">モノローグが見つかりません</h3>
                  <p className="text-muted-foreground mb-4">
                    検索条件を変更するか、フィルターをクリアしてください。
                  </p>
                  {hasActiveFilters && (
                    <Button onClick={clearFilters} variant="outline">
                      フィルターをクリア
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