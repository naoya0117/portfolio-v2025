"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { CalendarDays, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/data/mock"

interface BlogCardProps {
  post: BlogPost
  index: number
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

const calculateReadTime = (content: string) => {
  const wordsPerMinute = 400
  const wordCount = content.length / 2 // 日本語の場合の概算
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return readTime
}

export const BlogCard = ({ post, index }: BlogCardProps) => {
  const readTime = calculateReadTime(post.content)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
          {post.coverImageUrl && (
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">
                  {post.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          <CardHeader>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {readTime}分
                </div>
              </div>
            </div>
            
            <CardTitle className="group-hover:text-primary transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {post.excerpt && (
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}