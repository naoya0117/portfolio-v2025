"use client"

import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { BlogCard } from "@/components/features/blog/BlogCard"
import { PageContainer } from "@/components/layout/PageContainer"
import { GET_BLOG_POSTS } from "@/lib/graphql/queries"
import { BlogPost } from "@/lib/types/generated"

export default function BlogPage() {
  const { data, loading } = useQuery<{ blogPosts: BlogPost[] }>(GET_BLOG_POSTS)
  const posts = data?.blogPosts || []

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ブログ</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              技術的な学びや開発体験について、より詳細に記事にしています。
            </p>
          </motion.div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: BlogPost, index: number) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  index={index}
                />
              ))}
            </div>
          ) : (
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