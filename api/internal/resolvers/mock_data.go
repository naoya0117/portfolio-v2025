package resolvers

import (
	"time"

	"github.com/naoya0117/portfolio-v2025-api/internal/models"
)

var mockProfile = &models.Profile{
	ID:    "1",
	Name:  "山田太郎",
	Title: stringPtr("フルスタック開発者"),
	Bio:   stringPtr("Next.js、React、TypeScript、Goを使った現代的なWebアプリケーション開発を専門としています。ユーザー体験とパフォーマンスを重視したソリューションの提供に情熱を注いでいます。"),
	AvatarURL: stringPtr("/api/placeholder/150/150"),
	SocialLinks: []*models.SocialLink{
		{Platform: "GitHub", URL: "https://github.com", Icon: stringPtr("github")},
		{Platform: "Twitter", URL: "https://twitter.com", Icon: stringPtr("twitter")},
		{Platform: "LinkedIn", URL: "https://linkedin.com", Icon: stringPtr("linkedin")},
	},
}

var mockSkills = []*models.Skill{
	{ID: "1", Name: "React", Category: "Frontend", Level: 9, DisplayOrder: 1, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "2", Name: "Next.js", Category: "Frontend", Level: 8, DisplayOrder: 2, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "3", Name: "TypeScript", Category: "Language", Level: 9, DisplayOrder: 3, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "4", Name: "JavaScript", Category: "Language", Level: 9, DisplayOrder: 4, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "5", Name: "Go", Category: "Backend", Level: 7, DisplayOrder: 5, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "6", Name: "Node.js", Category: "Backend", Level: 8, DisplayOrder: 6, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "7", Name: "PostgreSQL", Category: "Database", Level: 7, DisplayOrder: 7, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "8", Name: "GraphQL", Category: "API", Level: 8, DisplayOrder: 8, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "9", Name: "Tailwind CSS", Category: "Styling", Level: 9, DisplayOrder: 9, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "10", Name: "Docker", Category: "DevOps", Level: 7, DisplayOrder: 10, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "11", Name: "AWS", Category: "Cloud", Level: 6, DisplayOrder: 11, CreatedAt: time.Now(), UpdatedAt: time.Now()},
	{ID: "12", Name: "Git", Category: "Tools", Level: 9, DisplayOrder: 12, CreatedAt: time.Now(), UpdatedAt: time.Now()},
}

var mockExperiences = []*models.Experience{
	{
		ID:           "1",
		Company:      "テック株式会社",
		Position:     "シニア フルスタック開発者",
		Description:  stringPtr("大規模Webアプリケーションの設計・開発・運用を担当。React、Next.js、Goでのマイクロサービスアーキテクチャによるシステム構築をリード。"),
		StartDate:    "2022-04",
		IsCurrent:    true,
		Technologies: []string{"React", "Next.js", "Go", "PostgreSQL", "Docker", "AWS"},
	},
	{
		ID:           "2",
		Company:      "スタートアップ合同会社",
		Position:     "フロントエンド開発者",
		Description:  stringPtr("SaaSプロダクトのフロントエンド開発を担当。Vue.js からReactへの移行プロジェクトをリード。UIコンポーネントライブラリの設計・構築。"),
		StartDate:    "2020-06",
		EndDate:      stringPtr("2022-03"),
		IsCurrent:    false,
		Technologies: []string{"React", "Vue.js", "TypeScript", "Storybook", "Jest"},
	},
	{
		ID:           "3",
		Company:      "システム開発会社",
		Position:     "ジュニア開発者",
		Description:  stringPtr("受託開発プロジェクトにて、PHP、JavaScriptでのWebアプリケーション開発に従事。基礎的な開発スキルを習得。"),
		StartDate:    "2018-04",
		EndDate:      stringPtr("2020-05"),
		IsCurrent:    false,
		Technologies: []string{"PHP", "JavaScript", "MySQL", "jQuery", "Bootstrap"},
	},
}

var mockCodeCategories = []*models.CodeCategory{
	{
		ID:          "react-hooks",
		Name:        "React Hooks",
		Slug:        "react-hooks",
		Description: stringPtr("React Hooksの使い方とパターン"),
		Color:       stringPtr("#61dafb"),
		Icon:        stringPtr("⚛️"),
	},
	{
		ID:          "typescript-tips",
		Name:        "TypeScript Tips",
		Slug:        "typescript-tips",
		Description: stringPtr("TypeScript活用のコツとベストプラクティス"),
		Color:       stringPtr("#3178c6"),
		Icon:        stringPtr("🔷"),
	},
	{
		ID:          "performance",
		Name:        "パフォーマンス最適化",
		Slug:        "performance-optimization",
		Description: stringPtr("Webアプリのパフォーマンス改善テクニック"),
		Color:       stringPtr("#ff6b6b"),
		Icon:        stringPtr("⚡"),
	},
	{
		ID:          "api-design",
		Name:        "API設計",
		Slug:        "api-design",
		Description: stringPtr("REST APIとGraphQLの設計パターン"),
		Color:       stringPtr("#4ecdc4"),
		Icon:        stringPtr("🔌"),
	},
}

var mockMonologues = []*models.Monologue{
	{
		ID:               "1",
		Content:          "React 19の新機能について調べていたところ、use()フックの存在を知りました。Promiseを直接扱えるようになるのは便利そうです。",
		ContentType:      models.ContentTypeText,
		Tags:             []string{"React", "JavaScript"},
		IsPublished:      true,
		PublishedAt:      stringPtr("2025-01-15T10:00:00Z"),
		CreatedAt:        time.Date(2025, 1, 15, 10, 0, 0, 0, time.UTC),
		UpdatedAt:        time.Date(2025, 1, 15, 10, 0, 0, 0, time.UTC),
		Category:         stringPtr("技術メモ"),
		LikeCount:        intPtr(12),
		RelatedBlogPosts: []string{"1"},
	},
	{
		ID:          "2",
		Content:     "カスタムフックでデータフェッチングを抽象化する方法",
		ContentType: models.ContentTypeCode,
		CodeLanguage: stringPtr("typescript"),
		CodeSnippet: stringPtr(`const useAsyncData = <T>(asyncFn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    asyncFn()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { data, loading, error }
}`),
		Tags:             []string{"React", "TypeScript", "Hooks"},
		IsPublished:      true,
		PublishedAt:      stringPtr("2025-01-10T15:30:00Z"),
		CreatedAt:        time.Date(2025, 1, 10, 15, 30, 0, 0, time.UTC),
		UpdatedAt:        time.Date(2025, 1, 10, 15, 30, 0, 0, time.UTC),
		CodeCategory:     mockCodeCategories[0],
		Difficulty:       difficultyPtr(models.DifficultyIntermediate),
		LikeCount:        intPtr(24),
		RelatedBlogPosts: []string{"1"},
	},
	{
		ID:          "3",
		Content:     "便利なReact Hooksライブラリ",
		ContentType: models.ContentTypeURLPreview,
		URL:         stringPtr("https://github.com/streamich/react-use"),
		URLPreview: &models.URLPreview{
			Title:       "react-use",
			Description: stringPtr("Collection of essential React Hooks"),
			ImageURL:    stringPtr("https://repository-images.githubusercontent.com/146641387/38ba6700-5db6-11ea-8af8-b5b0c92e5e2b"),
			SiteName:    stringPtr("GitHub"),
			URL:         "https://github.com/streamich/react-use",
			Favicon:     stringPtr("https://github.githubassets.com/favicons/favicon.svg"),
			CreatedAt:   "2025-01-12T09:00:00Z",
		},
		Tags:        []string{"React", "Hooks", "ライブラリ"},
		IsPublished: true,
		PublishedAt: stringPtr("2025-01-12T09:00:00Z"),
		CreatedAt:   time.Date(2025, 1, 12, 9, 0, 0, 0, time.UTC),
		UpdatedAt:   time.Date(2025, 1, 12, 9, 0, 0, 0, time.UTC),
		Category:    stringPtr("ツール紹介"),
		LikeCount:   intPtr(8),
	},
}

var mockBlogPosts = []*models.BlogPost{
	{
		ID:          "1",
		Title:       "Next.js 15で変わったこと",
		Slug:        "nextjs-15-changes",
		Excerpt:     stringPtr("Next.js 15の新機能と変更点について詳しく解説します。"),
		Content:     "# Next.js 15で変わったこと\n\nNext.js 15がリリースされ、多くの新機能と改善が加えられました...",
		Tags:        []string{"Next.js", "React", "Web Development"},
		Status:      models.BlogStatusPublished,
		PublishedAt: stringPtr("2025-01-01T09:00:00Z"),
		CreatedAt:   "2025-01-01T09:00:00Z",
		UpdatedAt:   "2025-01-01T09:00:00Z",
	},
	{
		ID:          "2",
		Title:       "TypeScriptの型システムを理解する",
		Slug:        "understanding-typescript-type-system",
		Excerpt:     stringPtr("TypeScriptの型システムの基礎から応用まで、実例とともに学びます。"),
		Content:     "# TypeScriptの型システムを理解する\n\nTypeScriptの型システムは強力で、適切に使用することで...",
		Tags:        []string{"TypeScript", "Programming", "Type Safety"},
		Status:      models.BlogStatusPublished,
		PublishedAt: stringPtr("2024-12-15T14:00:00Z"),
		CreatedAt:   "2024-12-15T14:00:00Z",
		UpdatedAt:   "2024-12-15T14:00:00Z",
	},
}

func stringPtr(s string) *string {
	return &s
}

func intPtr(i int) *int {
	return &i
}

func difficultyPtr(d models.Difficulty) *models.Difficulty {
	return &d
}