"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { BlogCard } from "@/components/features/blog/BlogCard"
import { PageContainer } from "@/components/layout/PageContainer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GET_BLOG_POSTS } from "@/lib/graphql/queries"
import { BlogPost } from "@/lib/types/generated"
import { Search, X, Filter } from "lucide-react"

export default function BlogPage() {
  const { data, loading } = useQuery<{ blogPosts: BlogPost[] }>(GET_BLOG_POSTS)
  const posts = data?.blogPosts || []
  
  // 検索・フィルター状態
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // フィルタリング処理
  const filteredPosts = posts.filter((post) => {
    // 検索クエリフィルター（タイトル、概要、内容を検索）
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      const titleMatch = post.title.toLowerCase().includes(searchLower)
      const excerptMatch = post.excerpt?.toLowerCase().includes(searchLower) || false
      const contentMatch = post.content.toLowerCase().includes(searchLower)
      
      if (!titleMatch && !excerptMatch && !contentMatch) {
        return false
      }
    }
    
    // タグフィルター
    if (selectedTags.length > 0 && !selectedTags.some(tag => post.tags.includes(tag))) {
      return false
    }
    
    return true
  })
  
  // 全タグの取得
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)))
  
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }
  
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
  }
  
  const hasActiveFilters = searchQuery || selectedTags.length > 0

  if (loading) {
    return (
      <PageContainer>
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
              <div className="h-6 w-64 bg-muted rounded mx-auto"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
              ))}
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              日々の学びや開発の記録を記事としてまとめています。
            </p>
          </motion.div>
          
          {/* 検索・フィルターエリア */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-4xl mx-auto"
          >
            {/* 検索バー */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="ブログ記事を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* アクティブフィルターの表示 */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-muted-foreground">フィルター中:</span>
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
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground mr-2">タグ:</span>
              {allTags.slice(0, 10).map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* 記事一覧 */}
          {filteredPosts.length > 0 ? (
            <>
              {/* 結果件数 */}
              <div className="mb-6 text-sm text-muted-foreground text-center">
                {filteredPosts.length} 記事{filteredPosts.length !== posts.length && ` (${posts.length} 記事中)`}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post: BlogPost, index: number) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : posts.length > 0 ? (
            // フィルター結果なし
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">記事が見つかりませんでした</h3>
              <p className="text-muted-foreground mb-4">
                検索条件を変更してみてください。
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  フィルターをクリア
                </Button>
              )}
            </motion.div>
          ) : (
            // 記事なし
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground">まだブログ記事が投稿されていません。</p>
            </motion.div>
          )}
        </div>
      </section>
    </PageContainer>
  )
}
