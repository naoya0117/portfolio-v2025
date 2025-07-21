"use client"

import { motion } from "framer-motion"
import { CalendarDays, Code, MessageSquare, Image, ExternalLink, Heart, Trophy } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monologue } from "@/lib/types/generated"
import { UrlPreviewCard } from "./UrlPreviewCard"
import { cn } from "@/lib/utils"

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
    case "URL_PREVIEW":
      return { icon: ExternalLink, label: "リンク", color: "text-purple-600" }
    case "IMAGE":
      return { icon: Image, label: "画像", color: "text-green-600" }
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Icon className={cn("h-5 w-5", contentInfo.color)} />
              <span className="text-sm text-muted-foreground">
                {contentInfo.label}
              </span>
              
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
            
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              {formatDate(monologue.publishedAt || monologue.createdAt)}
            </div>
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
            {/* URLプレビュー */}
            {monologue.contentType === "URL_PREVIEW" && monologue.urlPreview && showPreview ? (
              <UrlPreviewCard
                preview={monologue.urlPreview}
                size="compact"
                className="mb-2"
              />
            ) : (
              <p className="text-sm leading-relaxed line-clamp-3">
                {monologue.content}
              </p>
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
            
            {/* フッター */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex items-center gap-4 text-muted-foreground">
                {/* いいね */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  onClick={handleLike}
                >
                  <Heart className="w-3 h-3 mr-1" />
                  {monologue.likeCount || 0}
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
    </motion.div>
  )
}