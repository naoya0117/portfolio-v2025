import { PageContainer } from "@/components/layout/PageContainer"
import { BlogPostDetail } from "@/components/features/blog/BlogPostDetail"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  return (
    <PageContainer>
      <BlogPostDetail slug={slug} />
    </PageContainer>
  )
}