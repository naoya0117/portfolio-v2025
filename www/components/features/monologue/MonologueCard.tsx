"use client"

import { motion } from "framer-motion"
import { CalendarDays, Code, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Monologue } from "@/lib/data/mock"

interface MonologueCardProps {
  monologue: Monologue
  index: number
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

export const MonologueCard = ({ monologue, index }: MonologueCardProps) => {
  const Icon = monologue.contentType === "CODE" ? Code : MessageSquare

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                {monologue.contentType === "CODE" ? "コード" : "テキスト"}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 mr-1" />
              {formatDate(monologue.publishedAt || monologue.createdAt)}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <p className="text-sm leading-relaxed line-clamp-3">
              {monologue.content}
            </p>

            {monologue.contentType === "CODE" && monologue.codeSnippet && (
              <div className="bg-muted p-3 rounded-md">
                <pre className="text-xs overflow-x-auto">
                  <code className="language-typescript">
                    {monologue.codeSnippet.split('\n').slice(0, 5).join('\n')}
                    {monologue.codeSnippet.split('\n').length > 5 && '\n...'}
                  </code>
                </pre>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {monologue.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}