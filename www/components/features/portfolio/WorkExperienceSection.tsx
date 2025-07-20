"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Building, MapPin } from "lucide-react"

// 静的データ
const workExperience = [
  {
    id: "office-navi",
    company: "オフィスナビ株式会社",
    position: "インターンシップ",
    period: "2023年12月 - 現在",
    duration: "1年以上",
    description: "物件検索サイトや社内サイトの開発に携わらせていただいています。",
    projects: [
      {
        name: "オフィスナビrental-office-search",
        description: "物件検索サイトの開発・保守",
        technologies: ["Laravel", "React", "jQuery", "MySQL"]
      }
    ],
    isCurrent: true
  }
]

export const WorkExperienceSection = () => {
  return (
    <section id="work-experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">実務経験</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            インターンシップでの実務経験について紹介します。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {workExperience.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <span>{work.company}</span>
                      </CardTitle>
                      <p className="text-lg font-semibold text-primary">
                        {work.position}
                      </p>
                    </div>
                    {work.isCurrent && (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        現在
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground space-x-4 pt-2">
                    <div className="flex items-center space-x-1">
                      <CalendarDays className="h-4 w-4" />
                      <span>{work.period}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{work.duration}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {work.description}
                  </p>

                  {work.projects && work.projects.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-4">主要プロジェクト</h4>
                      <div className="space-y-4">
                        {work.projects.map((project, projectIndex) => (
                          <div
                            key={projectIndex}
                            className="border-l-2 border-primary/20 pl-4 space-y-2"
                          >
                            <h5 className="font-medium">{project.name}</h5>
                            <p className="text-sm text-muted-foreground">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}