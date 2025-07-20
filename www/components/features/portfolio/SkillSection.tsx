"use client"

import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GET_SKILLS_BY_CATEGORY } from "@/lib/graphql/queries"
import { SkillCategory } from "@/lib/types/generated"

const SkillProgressBar = ({ level, name }: { level: number; name: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span>{name}</span>
      <span className="text-muted-foreground">{level}/10</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level * 10}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
      />
    </div>
  </div>
)

export const SkillSection = () => {
  const { data, loading } = useQuery<{ skillsByCategory: SkillCategory[] }>(GET_SKILLS_BY_CATEGORY)
  const skillCategories = data?.skillsByCategory || []

  if (loading) {
    return (
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-6 w-64 bg-muted rounded mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="skills" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">スキル</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            これまで習得してきた技術スタックと、それぞれの習熟度を紹介します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category: SkillCategory, categoryIndex: number) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{category.category}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.skills.length} skills
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex: number) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.1 + skillIndex * 0.05 
                      }}
                    >
                      <SkillProgressBar level={skill.level} name={skill.name} />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}