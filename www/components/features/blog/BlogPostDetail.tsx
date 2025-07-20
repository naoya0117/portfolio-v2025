"use client"

import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GET_BLOG_POST } from "@/lib/graphql/queries"

interface BlogPostDetailProps {
  slug: string
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
  const wordCount = content.length / 2
  const readTime = Math.ceil(wordCount / wordsPerMinute)
  return readTime
}

export const BlogPostDetail = ({ slug }: BlogPostDetailProps) => {
  const { data, loading, error } = useQuery(GET_BLOG_POST, {
    variables: { slug }
  })

  const post = data?.blogPost

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-32 bg-muted rounded mb-8 animate-pulse"></div>
          <div className="h-12 w-3/4 bg-muted rounded mb-4 animate-pulse"></div>
          <div className="h-6 w-1/2 bg-muted rounded mb-8 animate-pulse"></div>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded w-full animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    notFound()
  }

  const readTime = calculateReadTime(post.content)

  return (
    <article className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/blog" className="mb-8">
              <Button variant="ghost" className="flex items-center">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ブログ一覧に戻る
              </Button>
            </Link>

            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex items-center space-x-6 text-muted-foreground mb-6">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {readTime}分で読める
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            {post.excerpt && (
              <div className="bg-accent/50 border-l-4 border-primary p-6 mb-12 rounded-r-lg">
                <p className="text-lg leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>
            )}

            <div className="prose prose-lg prose-invert max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </article>
  )
}