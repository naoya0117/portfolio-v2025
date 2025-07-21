# API Usage Guide

## Docker Compose で API を起動する

### 開発環境（PostgreSQLデータベース使用）

```bash
# フロントエンド + API + データベースを起動
docker-compose up www api db

# または、バックグラウンドで起動
docker-compose up -d www api db

# データベースのヘルスチェックが完了してからAPIが起動します
```

### APIのみ起動（モックデータ）

```bash
# 環境変数を設定せずにAPIのみを起動するとモックデータで動作
DB_HOST= docker-compose up api
```

## 環境変数

### フロントエンド用
- `NEXT_PUBLIC_API_URL`: APIサーバーのURL（デフォルト: http://localhost:8080/query）

### API用
- `PORT`: APIサーバーのポート（デフォルト: 8080）
- `GO_ENV`: 環境（development/production）
- `DB_HOST`: PostgreSQLホスト（production環境のみ）
- `DB_PORT`: PostgreSQLポート（production環境のみ）
- `DB_USER`: PostgreSQLユーザー（production環境のみ）
- `DB_PASSWORD`: PostgreSQLパスワード（production環境のみ）
- `DB_NAME`: データベース名（production環境のみ）

## GraphQL エンドポイント

- **GraphQL Playground**: http://localhost:8080/
- **GraphQL API**: http://localhost:8080/query

## 利用可能なクエリ

### Profile
```graphql
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
```

### Skills
```graphql
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
```

### Experiences
```graphql
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
```

### Monologues（フィルタリング対応）
```graphql
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
      likeCount
      urlPreview {
        title
        description
        imageUrl
        siteName
        url
        favicon
      }
      codeCategory {
        id
        name
        slug
        color
        icon
      }
      difficulty
    }
    totalCount
    hasNextPage
  }
}
```

### Code Categories
```graphql
query GetCodeCategories {
  codeCategories {
    id
    name
    slug
    description
    color
    icon
  }
}
```

### Blog Posts
```graphql
query GetBlogPosts {
  blogPosts {
    id
    title
    slug
    excerpt
    content
    tags
    status
    publishedAt
  }
}
```

## ミューテーション

### いいね機能
```graphql
mutation LikeMonologue($id: ID!) {
  likeMonologue(id: $id) {
    id
    likeCount
    isLiked
  }
}
```

### URLプレビュー生成
```graphql
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
```

### CodeCategory管理（管理者向け）
```graphql
mutation CreateCodeCategory($input: CreateCodeCategoryInput!) {
  createCodeCategory(input: $input) {
    id
    name
    slug
    description
    color
    icon
  }
}
```

## テスト用コマンド

```bash
# Profileクエリのテスト
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ profile { id name title } }"}' \
  http://localhost:8080/query

# Monologuesクエリのテスト
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"{ monologues { nodes { id content contentType tags likeCount } totalCount } }"}' \
  http://localhost:8080/query

# いいね機能のテスト
curl -X POST -H "Content-Type: application/json" \
  -d '{"query":"mutation { likeMonologue(id: \"1\") { id likeCount isLiked } }"}' \
  http://localhost:8080/query
```

## 利用可能なサービス

| サービス | ポート | 説明 |
|----------|--------|------|
| www | 3000 | Next.js フロントエンド |
| api | 8080 | Go GraphQL API（開発用） |
| go-api | 8081 | Go GraphQL API（本格運用用） |
| postgres | 5432 | PostgreSQL（本格運用用） |

## フロントエンドでの利用

```typescript
import { useQuery } from '@apollo/client'
import { GET_MONOLOGUES } from '@/lib/graphql/queries'
import apiClient from '@/lib/graphql/api-client'

// モックデータの代わりにAPIクライアントを使用
const { data, loading, error } = useQuery(GET_MONOLOGUES, {
  client: apiClient,
  variables: {
    limit: 10,
    tags: ["React", "TypeScript"]
  }
})
```