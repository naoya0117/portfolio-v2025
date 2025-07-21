"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Globe } from "lucide-react"
import { UrlPreview } from "@/lib/types/generated"
import { cn } from "@/lib/utils"

interface UrlPreviewCardProps {
  preview: UrlPreview
  size?: "compact" | "full"
  showFavicon?: boolean
  onClick?: () => void
  className?: string
}

export const UrlPreviewCard = ({
  preview,
  size = "full",
  showFavicon = true,
  onClick,
  className
}: UrlPreviewCardProps) => {
  const isCompact = size === "compact"
  
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      window.open(preview.url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20",
        "group overflow-hidden",
        className
      )}
      onClick={handleClick}
    >
      <div className={cn(
        "flex",
        isCompact ? "items-center gap-3 p-3" : "flex-col"
      )}>
        {/* プレビュー画像 */}
        {preview.imageUrl && !isCompact && (
          <div className="relative w-full h-48 overflow-hidden">
            <img
              src={preview.imageUrl}
              alt={preview.title}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        {/* コンテンツ部分 */}
        <div className={cn(
          "flex-1",
          !isCompact && "p-4"
        )}>
          <div className="flex items-start gap-2 mb-2">
            {/* ファビコン・サイト情報 */}
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {showFavicon && (
                <div className="flex-shrink-0">
                  {preview.favicon ? (
                    <img
                      src={preview.favicon}
                      alt={`${preview.siteName} favicon`}
                      className="w-4 h-4"
                    />
                  ) : (
                    <Globe className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
              )}
              
              {preview.siteName && (
                <Badge variant="secondary" className="text-xs truncate">
                  {preview.siteName}
                </Badge>
              )}
            </div>
            
            {/* 外部リンクアイコン */}
            <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          
          {/* タイトル */}
          <h3 className={cn(
            "font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors",
            isCompact ? "text-sm" : "text-base"
          )}>
            {preview.title}
          </h3>
          
          {/* 説明文 */}
          {preview.description && (
            <p className={cn(
              "text-muted-foreground line-clamp-2",
              isCompact ? "text-xs" : "text-sm"
            )}>
              {preview.description}
            </p>
          )}
          
          {/* URL表示 */}
          <div className="mt-2">
            <p className={cn(
              "text-muted-foreground truncate",
              isCompact ? "text-xs" : "text-xs"
            )}>
              {new URL(preview.url).hostname}
            </p>
          </div>
        </div>
        
        {/* コンパクト版での画像 */}
        {preview.imageUrl && isCompact && (
          <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
            <img
              src={preview.imageUrl}
              alt={preview.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </Card>
  )
}