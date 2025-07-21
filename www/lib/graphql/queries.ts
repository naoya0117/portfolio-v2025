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
  query GetMonologues(
    $limit: Int
    $offset: Int
    $categoryId: String
    $tags: [String!]
    $difficulty: Difficulty
  ) {
    monologues(
      limit: $limit
      offset: $offset
      categoryId: $categoryId
      tags: $tags
      difficulty: $difficulty
    ) {
      nodes {
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
        url
        urlPreview {
          title
          description
          imageUrl
          siteName
          url
          favicon
          createdAt
        }
        relatedBlogPosts
        series
        category
        codeCategory {
          id
          name
          slug
          description
          color
          icon
        }
        difficulty
        likeCount
      }
      totalCount
      hasNextPage
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
      url
      urlPreview {
        title
        description
        imageUrl
        siteName
        url
        favicon
        createdAt
      }
      relatedBlogPosts
      series
      category
      codeCategory {
        id
        name
        slug
        description
        color
        icon
      }
      difficulty
      likeCount
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

// Code Category Queries
export const GET_CODE_CATEGORIES = gql`
  query GetCodeCategories {
    codeCategories {
      id
      name
      slug
      description
      parentId
      color
      icon
    }
  }
`

export const GET_CODE_CATEGORIES_HIERARCHY = gql`
  query GetCodeCategoriesHierarchy {
    codeCategoriesHierarchy {
      id
      name
      slug
      description
      color
      icon
      children {
        id
        name
        slug
        description
        color
        icon
      }
    }
  }
`

// Related Content Query
export const GET_RELATED_CONTENT = gql`
  query GetRelatedContent($monologueId: ID!, $limit: Int = 6) {
    relatedContent(monologueId: $monologueId, limit: $limit) {
      id
      title
      type
      excerpt
      tags
      publishedAt
      readTime
    }
  }
`

// Mutations
export const LIKE_MONOLOGUE = gql`
  mutation LikeMonologue($id: ID!) {
    likeMonologue(id: $id) {
      id
      likeCount
      isLiked
    }
  }
`

export const GENERATE_URL_PREVIEW = gql`
  mutation GenerateUrlPreview($url: String!) {
    generateUrlPreview(url: $url) {
      title
      description
      imageUrl
      siteName
      url
      favicon
      createdAt
    }
  }
`

export const CREATE_CODE_CATEGORY = gql`
  mutation CreateCodeCategory($input: CreateCodeCategoryInput!) {
    createCodeCategory(input: $input) {
      id
      name
      slug
      description
      parentId
      color
      icon
    }
  }
`

export const UPDATE_CODE_CATEGORY = gql`
  mutation UpdateCodeCategory($id: ID!, $input: UpdateCodeCategoryInput!) {
    updateCodeCategory(id: $id, input: $input) {
      id
      name
      slug
      description
      parentId
      color
      icon
    }
  }
`

export const DELETE_CODE_CATEGORY = gql`
  mutation DeleteCodeCategory($id: ID!) {
    deleteCodeCategory(id: $id)
  }
`