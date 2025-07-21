package models

import "time"

type Skill struct {
	ID           string    `json:"id"`
	Name         string    `json:"name"`
	Category     string    `json:"category"`
	Level        int       `json:"level"`
	IconURL      *string   `json:"iconUrl"`
	DisplayOrder int       `json:"displayOrder"`
	CreatedAt    time.Time `json:"createdAt"`
	UpdatedAt    time.Time `json:"updatedAt"`
}

type Monologue struct {
	ID               string          `json:"id"`
	Content          string          `json:"content"`
	ContentType      ContentType     `json:"contentType"`
	CodeLanguage     *string         `json:"codeLanguage"`
	CodeSnippet      *string         `json:"codeSnippet"`
	Tags             []string        `json:"tags"`
	IsPublished      bool            `json:"isPublished"`
	PublishedAt      *string         `json:"publishedAt"`
	CreatedAt        time.Time       `json:"createdAt"`
	UpdatedAt        time.Time       `json:"updatedAt"`
	URL              *string         `json:"url"`
	URLPreview       *URLPreview     `json:"urlPreview"`
	RelatedBlogPosts []string        `json:"relatedBlogPosts"`
	Series           *string         `json:"series"`
	Category         *string         `json:"category"`
	CodeCategory     *CodeCategory   `json:"codeCategory"`
	Difficulty       *Difficulty     `json:"difficulty"`
	LikeCount        *int            `json:"likeCount"`
}