import { gql } from '@apollo/client'

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      name
      title
      bio
      avatarUrl
      socialLinks {
        platform
        url
        icon
      }
    }
  }
`

export const GET_SKILLS = gql`
  query GetSkills {
    skills {
      id
      name
      category
      level
      iconUrl
      displayOrder
    }
  }
`

export const GET_SKILLS_BY_CATEGORY = gql`
  query GetSkillsByCategory {
    skillsByCategory {
      category
      skills {
        id
        name
        level
        iconUrl
        displayOrder
      }
    }
  }
`

export const GET_EXPERIENCES = gql`
  query GetExperiences {
    experiences {
      id
      company
      position
      description
      startDate
      endDate
      isCurrent
      technologies
    }
  }
`

export const GET_MONOLOGUES = gql`
  query GetMonologues {
    monologues {
      id
      content
      contentType
      codeLanguage
      codeSnippet
      tags
      isPublished
      publishedAt
      createdAt
      updatedAt
    }
  }
`

export const GET_MONOLOGUE = gql`
  query GetMonologue($id: ID!) {
    monologue(id: $id) {
      id
      content
      contentType
      codeLanguage
      codeSnippet
      tags
      isPublished
      publishedAt
      createdAt
      updatedAt
    }
  }
`

export const GET_BLOG_POSTS = gql`
  query GetBlogPosts {
    blogPosts {
      id
      title
      slug
      excerpt
      content
      coverImageUrl
      tags
      status
      seoTitle
      seoDescription
      publishedAt
      createdAt
      updatedAt
    }
  }
`

export const GET_BLOG_POST = gql`
  query GetBlogPost($slug: String!) {
    blogPost(slug: $slug) {
      id
      title
      slug
      excerpt
      content
      coverImageUrl
      tags
      status
      seoTitle
      seoDescription
      publishedAt
      createdAt
      updatedAt
    }
  }
`