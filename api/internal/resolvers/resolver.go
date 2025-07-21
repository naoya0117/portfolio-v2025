package resolvers

// THIS CODE WILL BE UPDATED WITH SCHEMA CHANGES. PREVIOUS IMPLEMENTATION FOR SCHEMA CHANGES WILL BE KEPT IN THE COMMENT SECTION. IMPLEMENTATION FOR UNCHANGED SCHEMA WILL BE KEPT.

import (
	"context"
	"fmt"
	"time"

	"github.com/naoya0117/portfolio-v2025-api/internal/database"
	"github.com/naoya0117/portfolio-v2025-api/internal/generated"
	"github.com/naoya0117/portfolio-v2025-api/internal/models"
)

type Resolver struct{
	DB *database.DB
}

// generateID generates a simple ID for demo purposes
func generateID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

// CreatedAt is the resolver for the createdAt field.
func (r *monologueResolver) CreatedAt(ctx context.Context, obj *models.Monologue) (string, error) {
	return obj.CreatedAt.Format(time.RFC3339), nil
}

// UpdatedAt is the resolver for the updatedAt field.
func (r *monologueResolver) UpdatedAt(ctx context.Context, obj *models.Monologue) (string, error) {
	return obj.UpdatedAt.Format(time.RFC3339), nil
}

// LikeMonologue is the resolver for the likeMonologue field.
func (r *mutationResolver) LikeMonologue(ctx context.Context, id string) (*models.LikeResponse, error) {
	// Find the monologue and increment like count
	for i, monologue := range mockMonologues {
		if monologue.ID == id {
			if mockMonologues[i].LikeCount == nil {
				mockMonologues[i].LikeCount = intPtr(1)
			} else {
				*mockMonologues[i].LikeCount++
			}
			
			return &models.LikeResponse{
				ID:        id,
				LikeCount: *mockMonologues[i].LikeCount,
				IsLiked:   true, // In real implementation, check user state
			}, nil
		}
	}
	return nil, fmt.Errorf("monologue not found")
}

// GenerateURLPreview is the resolver for the generateUrlPreview field.
func (r *mutationResolver) GenerateURLPreview(ctx context.Context, url string) (*models.URLPreview, error) {
	// In a real implementation, this would fetch the URL and extract metadata
	// For now, return a mock preview
	return &models.URLPreview{
		Title:       "Generated Preview",
		Description: stringPtr("This is a generated preview for " + url),
		ImageURL:    stringPtr("https://via.placeholder.com/400x200"),
		SiteName:    stringPtr("Example Site"),
		URL:         url,
		Favicon:     stringPtr("https://via.placeholder.com/32x32"),
		CreatedAt:   time.Now().Format(time.RFC3339),
	}, nil
}

// CreateCodeCategory is the resolver for the createCodeCategory field.
func (r *mutationResolver) CreateCodeCategory(ctx context.Context, input models.CreateCodeCategoryInput) (*models.CodeCategory, error) {
	newCategory := &models.CodeCategory{
		ID:          generateID(),
		Name:        input.Name,
		Slug:        input.Slug,
		Description: input.Description,
		ParentID:    input.ParentID,
		Color:       input.Color,
		Icon:        input.Icon,
	}
	
	// Add to mockCodeCategories (in real implementation, save to database)
	mockCodeCategories = append(mockCodeCategories, newCategory)
	
	return newCategory, nil
}

// UpdateCodeCategory is the resolver for the updateCodeCategory field.
func (r *mutationResolver) UpdateCodeCategory(ctx context.Context, id string, input models.UpdateCodeCategoryInput) (*models.CodeCategory, error) {
	for i, category := range mockCodeCategories {
		if category.ID == id {
			if input.Name != nil {
				mockCodeCategories[i].Name = *input.Name
			}
			if input.Slug != nil {
				mockCodeCategories[i].Slug = *input.Slug
			}
			if input.Description != nil {
				mockCodeCategories[i].Description = input.Description
			}
			if input.ParentID != nil {
				mockCodeCategories[i].ParentID = input.ParentID
			}
			if input.Color != nil {
				mockCodeCategories[i].Color = input.Color
			}
			if input.Icon != nil {
				mockCodeCategories[i].Icon = input.Icon
			}
			return mockCodeCategories[i], nil
		}
	}
	return nil, nil
}

// DeleteCodeCategory is the resolver for the deleteCodeCategory field.
func (r *mutationResolver) DeleteCodeCategory(ctx context.Context, id string) (bool, error) {
	for i, category := range mockCodeCategories {
		if category.ID == id {
			// Remove from slice (in real implementation, delete from database)
			mockCodeCategories = append(mockCodeCategories[:i], mockCodeCategories[i+1:]...)
			return true, nil
		}
	}
	return false, nil
}

// CreateMonologue is the resolver for the createMonologue field.
func (r *mutationResolver) CreateMonologue(ctx context.Context, input models.CreateMonologueInput) (*models.Monologue, error) {
	panic("not implemented")
}

// UpdateMonologue is the resolver for the updateMonologue field.
func (r *mutationResolver) UpdateMonologue(ctx context.Context, id string, input models.UpdateMonologueInput) (*models.Monologue, error) {
	panic("not implemented")
}

// DeleteMonologue is the resolver for the deleteMonologue field.
func (r *mutationResolver) DeleteMonologue(ctx context.Context, id string) (bool, error) {
	panic("not implemented")
}

// Profile is the resolver for the profile field.
func (r *queryResolver) Profile(ctx context.Context) (*models.Profile, error) {
	return mockProfile, nil
}

// Skills is the resolver for the skills field.
func (r *queryResolver) Skills(ctx context.Context) ([]*models.Skill, error) {
	return mockSkills, nil
}

// SkillsByCategory is the resolver for the skillsByCategory field.
func (r *queryResolver) SkillsByCategory(ctx context.Context) ([]*models.SkillCategory, error) {
	categories := make(map[string][]*models.Skill)
	for _, skill := range mockSkills {
		categories[skill.Category] = append(categories[skill.Category], skill)
	}

	result := make([]*models.SkillCategory, 0)
	for category, skills := range categories {
		result = append(result, &models.SkillCategory{
			Category: category,
			Skills:   skills,
		})
	}

	return result, nil
}

// Experiences is the resolver for the experiences field.
func (r *queryResolver) Experiences(ctx context.Context) ([]*models.Experience, error) {
	return mockExperiences, nil
}

// Monologue is the resolver for the monologue field.
func (r *queryResolver) Monologue(ctx context.Context, id string) (*models.Monologue, error) {
	for _, monologue := range mockMonologues {
		if monologue.ID == id {
			return monologue, nil
		}
	}
	return nil, nil
}

// Monologues is the resolver for the monologues field.
func (r *queryResolver) Monologues(ctx context.Context, limit *int, offset *int, categoryID *string, tags []string, difficulty *models.Difficulty) (*models.MonologuesResponse, error) {
	// Filter published monologues
	filtered := make([]*models.Monologue, 0)
	for _, m := range mockMonologues {
		if m.IsPublished {
			filtered = append(filtered, m)
		}
	}

	// Apply filtering logic
	if categoryID != nil || len(tags) > 0 || difficulty != nil {
		result := make([]*models.Monologue, 0)
		for _, m := range filtered {
			// Filter by difficulty
			if difficulty != nil && (m.Difficulty == nil || *m.Difficulty != *difficulty) {
				continue
			}

			// Filter by tags
			if len(tags) > 0 {
				hasTag := false
				for _, filterTag := range tags {
					for _, monologueTag := range m.Tags {
						if filterTag == monologueTag {
							hasTag = true
							break
						}
					}
					if hasTag {
						break
					}
				}
				if !hasTag {
					continue
				}
			}

			result = append(result, m)
		}
		filtered = result
	}

	// Apply pagination
	start := 0
	if offset != nil {
		start = *offset
	}

	end := len(filtered)
	if limit != nil && start+*limit < len(filtered) {
		end = start + *limit
	}

	if start >= len(filtered) {
		start = len(filtered)
		end = len(filtered)
	}

	return &models.MonologuesResponse{
		Nodes:       filtered[start:end],
		TotalCount:  len(filtered),
		HasNextPage: end < len(filtered),
	}, nil
}

// BlogPost is the resolver for the blogPost field.
func (r *queryResolver) BlogPost(ctx context.Context, slug string) (*models.BlogPost, error) {
	for _, post := range mockBlogPosts {
		if post.Slug == slug && post.Status == models.BlogStatusPublished {
			return post, nil
		}
	}
	return nil, nil
}

// BlogPosts is the resolver for the blogPosts field.
func (r *queryResolver) BlogPosts(ctx context.Context) ([]*models.BlogPost, error) {
	result := make([]*models.BlogPost, 0)
	for _, post := range mockBlogPosts {
		if post.Status == models.BlogStatusPublished {
			result = append(result, post)
		}
	}
	return result, nil
}

// CodeCategories is the resolver for the codeCategories field.
func (r *queryResolver) CodeCategories(ctx context.Context) ([]*models.CodeCategory, error) {
	return mockCodeCategories, nil
}

// CodeCategoriesHierarchy is the resolver for the codeCategoriesHierarchy field.
func (r *queryResolver) CodeCategoriesHierarchy(ctx context.Context) ([]*models.CodeCategory, error) {
	// For now, return flat list. In real implementation, build hierarchy
	return mockCodeCategories, nil
}

// RelatedContent is the resolver for the relatedContent field.
func (r *queryResolver) RelatedContent(ctx context.Context, monologueID string, limit *int) ([]*models.RelatedContent, error) {
	// Find the current monologue to get its tags
	var currentMonologue *models.Monologue
	for _, m := range mockMonologues {
		if m.ID == monologueID {
			currentMonologue = m
			break
		}
	}
	
	if currentMonologue == nil {
		return []*models.RelatedContent{}, nil
	}
	
	result := make([]*models.RelatedContent, 0)
	maxLimit := 6
	if limit != nil && *limit < maxLimit {
		maxLimit = *limit
	}
	
	// Find related monologues by tag similarity
	for _, m := range mockMonologues {
		if m.ID == monologueID || !m.IsPublished || len(result) >= maxLimit {
			continue
		}
		
		// Check for tag overlap
		hasCommonTag := false
		for _, tag1 := range currentMonologue.Tags {
			for _, tag2 := range m.Tags {
				if tag1 == tag2 {
					hasCommonTag = true
					break
				}
			}
			if hasCommonTag {
				break
			}
		}
		
		if hasCommonTag {
			result = append(result, &models.RelatedContent{
				ID:          m.ID,
				Title:       m.Content[:min(50, len(m.Content))] + "...", // Use first 50 chars as title
				Type:        models.ContentTypeText,
				Excerpt:     stringPtr(m.Content[:min(100, len(m.Content))] + "..."),
				Tags:        m.Tags,
				PublishedAt: *m.PublishedAt,
				ReadTime:    intPtr(2), // Mock read time
			})
		}
	}
	
	// Add related blog posts
	for _, post := range mockBlogPosts {
		if len(result) >= maxLimit {
			break
		}
		
		// Check for tag overlap with blog posts
		hasCommonTag := false
		for _, tag1 := range currentMonologue.Tags {
			for _, tag2 := range post.Tags {
				if tag1 == tag2 {
					hasCommonTag = true
					break
				}
			}
			if hasCommonTag {
				break
			}
		}
		
		if hasCommonTag && post.Status == models.BlogStatusPublished {
			result = append(result, &models.RelatedContent{
				ID:          post.ID,
				Title:       post.Title,
				Type:        models.ContentTypeText,
				Excerpt:     post.Excerpt,
				Tags:        post.Tags,
				PublishedAt: *post.PublishedAt,
				ReadTime:    intPtr(5), // Mock read time for blog posts
			})
		}
	}
	
	return result, nil
}

// min returns the minimum of two integers
func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// Monologue returns generated.MonologueResolver implementation.
func (r *Resolver) Monologue() generated.MonologueResolver { return &monologueResolver{r} }

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type monologueResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
/*
	type Resolver struct{}
*/
