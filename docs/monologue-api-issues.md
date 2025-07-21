# Monologue機能 API実装イシュー

## イシュー1: GraphQLクエリの拡張とフィルタリング機能追加

### 概要
Monologue機能で使用されているコンポーネントに対応するため、GraphQLクエリを拡張し、フィルタリング機能を追加する必要があります。

### 現在の状況
- フロントエンドではカテゴリー、タグ、難易度でのフィルタリング機能が実装済み
- URLプレビュー、いいね機能、関連コンテンツ表示機能が実装済み
- しかし、対応するAPIエンドポイントが不足している

### 必要な対応

#### 1. GET_MONOLOGUESクエリの拡張
現在のクエリに以下のフィールドとパラメータを追加：

**追加パラメータ:**
- `limit: Int` - ページネーション用
- `offset: Int` - ページネーション用  
- `categoryId: String` - カテゴリーフィルター
- `tags: [String!]` - タグフィルター
- `difficulty: Difficulty` - 難易度フィルター

**追加フィールド:**
```graphql
urlPreview {
  title
  description
  imageUrl
  siteName
  favicon
}
series
difficulty
likeCount
codeCategory {
  id
  name
  icon
  color
}
```

**レスポンス形式:**
```graphql
{
  nodes: [Monologue!]!
  totalCount: Int!
  hasNextPage: Boolean!
}
```

#### 2. 実装優先度
- **High**: フィルタリング機能（カテゴリー、タグ、難易度）
- **High**: ページネーション機能
- **Medium**: URLプレビューフィールド
- **Medium**: いいね機能フィールド
- **Low**: 関連コンテンツ

#### 3. 技術仕様
- GraphQL (gqlgen)使用
- PostgreSQLでのフィルタリングクエリ最適化
- Apollo Cacheとの互換性確保

#### 4. 受入条件
- [ ] 既存のGET_MONOLOGUESクエリが拡張される
- [ ] カテゴリー、タグ、難易度でのフィルタリングが動作する
- [ ] ページネーション機能が正常に動作する
- [ ] フロントエンドコンポーネントとの連携が確認できる

---

## イシュー2: CodeCategoriesのCRUD APIエンドポイント実装

### 概要
Monologue機能のカテゴリー機能で使用するCodeCategoriesのCRUD APIエンドポイントを実装する必要があります。

### 現在の状況
- フロントエンドでCodeCategoryNavコンポーネントが実装済み
- モックデータ（mockCodeCategories）で動作確認済み
- 階層構造対応のカテゴリー表示機能あり

### 必要なエンドポイント

#### 1. クエリ
```graphql
# 全カテゴリー取得
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

# 階層構造でのカテゴリー取得
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
```

#### 2. ミューテーション（管理者向け）
```graphql
# カテゴリー作成
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

# カテゴリー更新
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

# カテゴリー削除
mutation DeleteCodeCategory($id: ID!) {
  deleteCodeCategory(id: $id)
}
```

#### 3. 入力型定義
```graphql
input CreateCodeCategoryInput {
  name: String!
  slug: String!
  description: String
  parentId: String
  color: String
  icon: String
}

input UpdateCodeCategoryInput {
  name: String
  slug: String
  description: String
  parentId: String
  color: String
  icon: String
}
```

#### 4. データベース設計
```sql
CREATE TABLE code_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id UUID REFERENCES code_categories(id),
  color VARCHAR(7), -- HEX color code
  icon VARCHAR(10), -- Emoji or icon identifier
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 5. 実装優先度
- **High**: 基本CRUD機能
- **Medium**: 階層構造対応
- **Low**: バリデーション強化

#### 6. 受入条件
- [ ] CodeCategoryの基本CRUD操作が実装される
- [ ] 階層構造でのカテゴリー取得が可能
- [ ] フロントエンドのCodeCategoryNavコンポーネントと連携できる
- [ ] スラッグの重複チェック機能
- [ ] 管理画面での編集機能対応

---

## イシュー3: いいね機能とURLプレビュー生成API実装

### 概要
Monologue機能で使用するいいね機能とURLプレビュー自動生成機能のAPIエンドポイントを実装する必要があります。

### 必要なエンドポイント

#### 1. いいね機能
```graphql
# いいねの追加/削除
mutation LikeMonologue($id: ID!) {
  likeMonologue(id: $id) {
    id
    likeCount
    isLiked # ユーザーがいいねしているかどうか
  }
}

# いいね状態の取得
query GetMonologueLikes($ids: [ID!]!) {
  monologueLikes(ids: $ids) {
    monologueId
    likeCount
    isLiked
  }
}
```

#### 2. URLプレビュー生成
```graphql
# URLプレビューの生成
mutation GenerateUrlPreview($url: String!) {
  generateUrlPreview(url: $url) {
    title
    description
    imageUrl
    siteName
    favicon
    url
  }
}
```

#### 3. データベース設計
```sql
-- いいね機能
CREATE TABLE monologue_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monologue_id UUID NOT NULL REFERENCES monologues(id),
  user_ip VARCHAR(45), -- ゲストユーザー向け
  user_id UUID, -- 将来の認証ユーザー向け
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(monologue_id, user_ip)
);

-- URLプレビュー
CREATE TABLE url_previews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url VARCHAR(2048) NOT NULL UNIQUE,
  title VARCHAR(500),
  description TEXT,
  image_url VARCHAR(2048),
  site_name VARCHAR(200),
  favicon VARCHAR(2048),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### 4. 実装優先度
- **High**: いいね機能（基本的なカウント機能）
- **Medium**: URLプレビュー生成
- **Low**: いいね状態の永続化（IPベース）

#### 5. 受入条件
- [ ] いいね数のカウント機能が動作する
- [ ] URLからメタデータを取得してプレビューを生成できる
- [ ] 同じURLのプレビューはキャッシュされる
- [ ] フロントエンドのコンポーネントと連携できる

---

## イシュー4: 関連コンテンツ取得API実装

### 概要
Monologue詳細ページで表示する関連コンテンツ（他のMonologueやBlogPost）を取得するAPIを実装する必要があります。

### 必要なエンドポイント

#### 1. 関連コンテンツ取得
```graphql
query GetRelatedContent($monologueId: ID!, $limit: Int = 6) {
  relatedContent(monologueId: $monologueId, limit: $limit) {
    id
    title
    type # "monologue" | "blog"
    excerpt
    tags
    publishedAt
    readTime
  }
}
```

#### 2. アルゴリズム
- 同じタグを持つコンテンツ
- 同じカテゴリーのコンテンツ
- 同じシリーズのコンテンツ
- 投稿日が近いコンテンツ

#### 3. 実装優先度
- **Medium**: 基本的な関連コンテンツ取得
- **Low**: 高度なレコメンドアルゴリズム

#### 4. 受入条件
- [ ] タグベースでの関連コンテンツ取得が動作する
- [ ] MonologueとBlogPostが混在して返される
- [ ] RelatedContentSectionコンポーネントと連携できる

---

## 実装の推奨順序

1. **イシュー2**: CodeCategoriesのCRUD（基礎となるカテゴリー機能）
2. **イシュー1**: GraphQLクエリ拡張（コア機能のフィルタリング）
3. **イシュー3**: いいね機能とURLプレビュー（ユーザー体験向上）
4. **イシュー4**: 関連コンテンツ（付加価値機能）

各イシューは独立して実装可能ですが、上記の順序で実装することで段階的に機能を拡張できます。