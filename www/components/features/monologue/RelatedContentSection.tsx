"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, MessageSquare, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface RelatedContent {
  id: string
  title: string
  type: "blog" | "monologue"
  excerpt?: string
  tags: string[]
  publishedAt: string
  readTime?: number
}

interface RelatedContentSectionProps {
  relatedItems: RelatedContent[]
  maxItems?: number
  layout?: "horizontal" | "vertical"
  className?: string
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    month: "short",
    day: "numeric"
  })
}

const ContentTypeIcon = ({ type }: { type: "blog" | "monologue" }) => {
  return type === "blog" ? (
    <BookOpen className="w-4 h-4 text-blue-600" />
  ) : (
    <MessageSquare className="w-4 h-4 text-purple-600" />
  )
}

const RelatedContentCard = ({ 
  content, 
  isCompact = false 
}: { 
  content: RelatedContent
  isCompact?: boolean 
}) => {
  const handleClick = () => {
    const path = content.type === "blog" ? `/blog/${content.id}` : `/monologue/${content.id}`
    window.location.href = path
  }

  if (isCompact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer transition-colors"
        onClick={handleClick}
      >
        <ContentTypeIcon type={content.type} />
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm line-clamp-1">{content.title}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-muted-foreground">
              {formatDate(content.publishedAt)}
            </span>
            {content.readTime && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {content.readTime}分
                </span>
              </>
            )}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground" />
      </div>
    )
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <ContentTypeIcon type={content.type} />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-sm mb-1 line-clamp-2">{content.title}</h4>
            {content.excerpt && (
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {content.excerpt}
              </p>
            )}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {formatDate(content.publishedAt)}
              </div>
              {content.readTime && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {content.readTime}分
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-1">
              {content.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs h-5">
                  {tag}
                </Badge>
              ))}
              {content.tags.length > 3 && (
                <Badge variant="outline" className="text-xs h-5">
                  +{content.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const RelatedContentSection = ({
  relatedItems,
  maxItems = 6,
  layout = "vertical",
  className
}: RelatedContentSectionProps) => {
  if (!relatedItems.length) {
    return null
  }

  const displayItems = relatedItems.slice(0, maxItems)
  const isHorizontal = layout === "horizontal"

  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-primary" />
          関連コンテンツ
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className={cn(
          "space-y-3",
          isHorizontal && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-0"
        )}>
          {displayItems.map((item) => (
            <RelatedContentCard 
              key={`${item.type}-${item.id}`}
              content={item}
              isCompact={!isHorizontal}
            />
          ))}
        </div>
        
        {relatedItems.length > maxItems && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              さらに表示 ({relatedItems.length - maxItems}件)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}