"use client"

import { motion } from "framer-motion"
import { CalendarDays, Code, MessageSquare, Image, ExternalLink, Heart, Trophy, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monologue } from "@/lib/types/generated"
import { UrlPreviewCard } from "./UrlPreviewCard"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface MonologueCardProps {
  monologue: Monologue
  index: number
  showPreview?: boolean
  showCategory?: boolean
  onCategoryClick?: (category: string) => void
  onTagClick?: (tag: string) => void
  onLike?: (id: string) => void
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

// URLを検出する関数
const detectUrlInText = (text: string): { url: string; position: number } | null => {
  const urlRegex = /(https?:\/\/[^\s]+)/g
  const match = urlRegex.exec(text)
  if (match) {
    return {
      url: match[1],
      position: match.index!
    }
  }
  return null
}

const getDifficultyInfo = (difficulty?: string) => {
  switch (difficulty) {
    case "BEGINNER":
      return { label: "初級", color: "bg-green-500", textColor: "text-green-700" }
    case "INTERMEDIATE":
      return { label: "中級", color: "bg-yellow-500", textColor: "text-yellow-700" }
    case "ADVANCED":
      return { label: "上級", color: "bg-red-500", textColor: "text-red-700" }
    default:
      return null
  }
}

const getContentTypeInfo = (contentType: string) => {
  switch (contentType) {
    case "CODE":
      return { icon: Code, label: "コード", color: "text-blue-600" }
    case "IMAGE":
      return { icon: Image, label: "画像", color: "text-green-600" }
    case "BLOG":
      return { icon: BookOpen, label: "ブログ", color: "text-purple-600" }
    default:
      return { icon: MessageSquare, label: "テキスト", color: "text-gray-600" }
  }
}

export const MonologueCard = ({ 
  monologue, 
  index, 
  showPreview = true,
  showCategory = true,
  onCategoryClick,
  onTagClick,
  onLike
}: MonologueCardProps) => {
  const contentInfo = getContentTypeInfo(monologue.contentType)
  const difficultyInfo = getDifficultyInfo(monologue.difficulty)
  const Icon = contentInfo.icon

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onLike) {
      onLike(monologue.id)
    }
  }

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation()
    if (onTagClick) {
      onTagClick(tag)
    }
  }

  const handleCategoryClick = (e: React.MouseEvent, category: string) => {
    e.stopPropagation()
    if (onCategoryClick) {
      onCategoryClick(category)
    }
  }

  const cardContent = (
    <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          {/* タイムライン向けヘッダー - 日付を大きく */}
          <div className="mb-3">
            <div className="flex items-center text-xs text-muted-foreground mb-1">
              <CalendarDays className="h-3 w-3 mr-1" />
              {formatDate(monologue.publishedAt || monologue.createdAt)}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon className={cn("h-4 w-4", contentInfo.color)} />
                <span className="text-sm font-medium text-foreground">
                  {contentInfo.label}
                </span>
              </div>
              
              {/* ライクカウントをヘッダーに移動 */}
              <div className="flex items-center text-xs text-muted-foreground">
                <Heart className="w-3 h-3 mr-1" />
                {monologue.likeCount || 0}
              </div>
            </div>
          </div>

          {/* バッジ行 */}
          <div className="flex flex-wrap items-center gap-2">
            {/* 難易度バッジ */}
            {difficultyInfo && (
              <Badge variant="outline" className="text-xs h-5">
                <div className={cn("w-2 h-2 rounded-full mr-1", difficultyInfo.color)} />
                {difficultyInfo.label}
              </Badge>
            )}
            
            {/* シリーズバッジ */}
            {monologue.series && (
              <Badge variant="secondary" className="text-xs h-5">
                <Trophy className="w-3 h-3 mr-1" />
                {monologue.series}
              </Badge>
            )}
          </div>
          
          {/* コードカテゴリー */}
          {showCategory && monologue.codeCategory && (
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={(e) => handleCategoryClick(e, monologue.codeCategory!.id)}
              >
                {monologue.codeCategory.icon && (
                  <span className="mr-1">{monologue.codeCategory.icon}</span>
                )}
                {monologue.codeCategory.name}
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* ブログタイプの場合の特別表示 */}
            {monologue.contentType === "BLOG" && (monologue as any).blogData ? (
              <>
                {/* ブログタイトル */}
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {(monologue as any).blogData.title}
                </h3>
                
                {/* ブログ概要 */}
                {(monologue as any).blogData.excerpt && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {(monologue as any).blogData.excerpt}
                  </p>
                )}
                
                {/* ブログへのリンク */}
                <div className="flex items-center space-x-2 text-sm text-primary">
                  <BookOpen className="w-4 h-4" />
                  <span>記事を読む</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </>
            ) : (
              <>
                {/* 通常のテキストコンテンツ */}
                <p className="text-base leading-relaxed">
                  {monologue.content}
                </p>
                
                {/* URLプレビュー - テキスト内のURLまたは明示的なurlPreview */}
                {showPreview && (
                  (monologue.urlPreview || detectUrlInText(monologue.content)) && (
                    <UrlPreviewCard
                      preview={monologue.urlPreview || {
                        title: "リンクプレビュー",
                        url: detectUrlInText(monologue.content)?.url || "",
                        createdAt: new Date().toISOString()
                      }}
                      size="compact"
                      className="mb-2"
                    />
                  )
                )}
              </>
            )}

            {/* コードスニペット */}
            {monologue.contentType === "CODE" && monologue.codeSnippet && (
              <div className="bg-muted p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {monologue.codeLanguage || "code"}
                  </Badge>
                </div>
                <pre className="text-xs overflow-x-auto">
                  <code className={`language-${monologue.codeLanguage || 'text'}`}>
                    {monologue.codeSnippet.split('\n').slice(0, 5).join('\n')}
                    {monologue.codeSnippet.split('\n').length > 5 && '\n...'}
                  </code>
                </pre>
              </div>
            )}

            {/* タグ */}
            <div className="flex flex-wrap gap-2">
              {monologue.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="text-xs cursor-pointer hover:bg-secondary/80"
                  onClick={(e) => handleTagClick(e, tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            {/* フッター - シンプル化 */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-3">
                {/* いいねボタン */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs hover:text-primary"
                  onClick={handleLike}
                >
                  <Heart className="w-3 h-3" />
                </Button>
              </div>
              
              {/* カテゴリー表示 */}
              {monologue.category && (
                <Badge variant="outline" className="text-xs">
                  {monologue.category}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
    </Card>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ブログタイプの場合はリンクでラップ */}
      {monologue.contentType === "BLOG" && monologue.url ? (
        <Link href={monologue.url} className="block">
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </motion.div>
  )
}