"use client"

import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { 
  mockProfile, 
  mockSkills, 
  mockExperiences, 
  mockMonologues, 
  mockBlogPosts,
  mockCodeCategories
} from '@/lib/data/mock'

const typeDefs = gql`
  type Profile {
    id: ID!
    name: String!
    title: String
    bio: String
    avatarUrl: String
    socialLinks: [SocialLink!]!
  }

  type SocialLink {
    platform: String!
    url: String!
    icon: String
  }

  type Skill {
    id: ID!
    name: String!
    category: String!
    level: Int!
    iconUrl: String
    displayOrder: Int!
  }

  type Experience {
    id: ID!
    company: String!
    position: String!
    description: String
    startDate: String!
    endDate: String
    isCurrent: Boolean!
    technologies: [String!]!
  }

  type Monologue {
    id: ID!
    content: String!
    contentType: String!
    codeLanguage: String
    codeSnippet: String
    tags: [String!]!
    isPublished: Boolean!
    publishedAt: String
    createdAt: String!
    updatedAt: String!
    url: String
    urlPreview: UrlPreview
    relatedBlogPosts: [String!]
    series: String
    category: String
    codeCategory: CodeCategory
    difficulty: String
    likeCount: Int
  }

  type UrlPreview {
    title: String!
    description: String
    imageUrl: String
    siteName: String
    url: String!
    favicon: String
    createdAt: String!
  }

  type CodeCategory {
    id: ID!
    name: String!
    slug: String!
    description: String
    parentId: String
    color: String
    icon: String
  }

  type BlogPost {
    id: ID!
    title: String!
    slug: String!
    excerpt: String
    content: String!
    coverImageUrl: String
    tags: [String!]!
    status: String!
    seoTitle: String
    seoDescription: String
    publishedAt: String
    createdAt: String!
    updatedAt: String!
  }

  type SkillCategory {
    category: String!
    skills: [Skill!]!
  }

  type Query {
    profile: Profile
    skills: [Skill!]!
    skillsByCategory: [SkillCategory!]!
    experiences: [Experience!]!
    monologues: [Monologue!]!
    monologue(id: ID!): Monologue
    blogPosts: [BlogPost!]!
    blogPost(slug: String!): BlogPost
    codeCategories: [CodeCategory!]!
  }
`

const resolvers = {
  Query: {
    profile: () => mockProfile,
    skills: () => mockSkills,
    skillsByCategory: () => {
      const categories = mockSkills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = []
        }
        acc[skill.category].push(skill)
        return acc
      }, {} as Record<string, typeof mockSkills>)

      return Object.entries(categories).map(([category, skills]) => ({
        category,
        skills: skills.sort((a, b) => a.displayOrder - b.displayOrder)
      }))
    },
    experiences: () => mockExperiences.sort((a, b) => {
      if (a.isCurrent && !b.isCurrent) return -1
      if (!a.isCurrent && b.isCurrent) return 1
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    }),
    monologues: () => mockMonologues.filter(m => m.isPublished),
    monologue: (_: unknown, { id }: { id: string }) => 
      mockMonologues.find(m => m.id === id && m.isPublished),
    blogPosts: () => mockBlogPosts.filter(p => p.status === 'PUBLISHED'),
    blogPost: (_: unknown, { slug }: { slug: string }) => 
      mockBlogPosts.find(p => p.slug === slug && p.status === 'PUBLISHED'),
    codeCategories: () => mockCodeCategories
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  typeDefs,
  resolvers,
  connectToDevTools: true,
})

export default client