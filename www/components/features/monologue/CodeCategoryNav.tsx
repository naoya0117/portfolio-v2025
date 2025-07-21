"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronRight, Filter, X } from "lucide-react"
import { CodeCategory } from "@/lib/types/generated"
import { cn } from "@/lib/utils"

interface CodeCategoryNavProps {
  categories: CodeCategory[]
  selectedCategory?: string
  onCategorySelect: (category: CodeCategory | null) => void
  showHierarchy?: boolean
  className?: string
}

interface DifficultyFilterProps {
  selectedDifficulty?: string
  onDifficultySelect: (difficulty: string | null) => void
}

const DIFFICULTY_LEVELS = [
  { value: "BEGINNER", label: "初級", color: "bg-green-500" },
  { value: "INTERMEDIATE", label: "中級", color: "bg-yellow-500" },
  { value: "ADVANCED", label: "上級", color: "bg-red-500" }
]

const DifficultyFilter = ({ selectedDifficulty, onDifficultySelect }: DifficultyFilterProps) => (
  <div className="space-y-2">
    <div className="flex items-center gap-2 text-sm font-medium">
      <Filter className="w-4 h-4" />
      難易度
    </div>
    <div className="flex flex-wrap gap-2">
      {DIFFICULTY_LEVELS.map((level) => (
        <Button
          key={level.value}
          variant={selectedDifficulty === level.value ? "default" : "outline"}
          size="sm"
          onClick={() => onDifficultySelect(
            selectedDifficulty === level.value ? null : level.value
          )}
          className="h-7 text-xs"
        >
          <div className={cn("w-2 h-2 rounded-full mr-1", level.color)} />
          {level.label}
        </Button>
      ))}
    </div>
  </div>
)

export const CodeCategoryNav = ({
  categories,
  selectedCategory,
  onCategorySelect,
  showHierarchy = false,
  className
}: CodeCategoryNavProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>()

  // カテゴリーの階層構造を構築
  const rootCategories = categories.filter(cat => !cat.parentId)
  const getChildCategories = (parentId: string) => 
    categories.filter(cat => cat.parentId === parentId)

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId)
    } else {
      newExpanded.add(categoryId)
    }
    setExpandedCategories(newExpanded)
  }

  const handleCategoryClick = (category: CodeCategory) => {
    if (selectedCategory === category.id) {
      onCategorySelect(null)
    } else {
      onCategorySelect(category)
    }
  }

  const renderCategory = (category: CodeCategory, level = 0) => {
    const isSelected = selectedCategory === category.id
    const hasChildren = getChildCategories(category.id).length > 0
    const isExpanded = expandedCategories.has(category.id)
    
    return (
      <div key={category.id} className={cn("select-none", level > 0 && "ml-4")}>
        <div
          className={cn(
            "flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors",
            "hover:bg-muted/50",
            isSelected && "bg-primary/10 border border-primary/20"
          )}
          onClick={() => handleCategoryClick(category)}
        >
          {/* 展開/折りたたみボタン */}
          {hasChildren && showHierarchy && (
            <Button
              variant="ghost"
              size="sm"
              className="w-4 h-4 p-0"
              onClick={(e) => {
                e.stopPropagation()
                toggleExpanded(category.id)
              }}
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </Button>
          )}
          
          {/* カテゴリーアイコン */}
          {category.icon && (
            <span className="text-lg">{category.icon}</span>
          )}
          
          {/* カテゴリー名 */}
          <div className="flex-1 flex items-center gap-2">
            <span className={cn(
              "text-sm font-medium",
              isSelected && "text-primary"
            )}>
              {category.name}
            </span>
            
            {/* カテゴリーカラー */}
            {category.color && (
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
            )}
          </div>
          
          {/* 選択状態の表示 */}
          {isSelected && (
            <X className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        
        {/* 説明文 */}
        {isSelected && category.description && (
          <div className="mt-1 ml-8 text-xs text-muted-foreground">
            {category.description}
          </div>
        )}
        
        {/* 子カテゴリー */}
        {hasChildren && showHierarchy && isExpanded && (
          <div className="mt-1">
            {getChildCategories(category.id).map(child => 
              renderCategory(child, level + 1)
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-4">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">カテゴリー</h3>
          {(selectedCategory || selectedDifficulty) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                onCategorySelect(null)
                setSelectedDifficulty(undefined)
              }}
              className="h-7 text-xs"
            >
              クリア
            </Button>
          )}
        </div>
        
        {/* 難易度フィルター */}
        <DifficultyFilter
          selectedDifficulty={selectedDifficulty}
          onDifficultySelect={(difficulty) => setSelectedDifficulty(difficulty || undefined)}
        />
        
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-2">技術カテゴリー</div>
          
          {/* カテゴリー一覧 */}
          <div className="space-y-1">
            {showHierarchy ? (
              rootCategories.map(category => renderCategory(category))
            ) : (
              categories.map(category => renderCategory(category))
            )}
          </div>
        </div>
        
        {/* 選択中の状態表示 */}
        {(selectedCategory || selectedDifficulty) && (
          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground mb-2">適用中のフィルター</div>
            <div className="flex flex-wrap gap-1">
              {selectedCategory && (
                <Badge variant="secondary" className="text-xs">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </Badge>
              )}
              {selectedDifficulty && (
                <Badge variant="secondary" className="text-xs">
                  {DIFFICULTY_LEVELS.find(d => d.value === selectedDifficulty)?.label}
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}