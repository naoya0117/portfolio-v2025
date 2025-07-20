"use client"

import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { CalendarDays, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GET_EXPERIENCES } from "@/lib/graphql/queries"
import { Experience } from "@/lib/types/generated"

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long"
  })
}

const calculateDuration = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const end = endDate ? new Date(endDate) : new Date()
  const months = (end.getFullYear() - start.getFullYear()) * 12 + 
                 (end.getMonth() - start.getMonth())
  
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  
  if (years === 0) {
    return `${remainingMonths}ヶ月`
  } else if (remainingMonths === 0) {
    return `${years}年`
  } else {
    return `${years}年 ${remainingMonths}ヶ月`
  }
}

export const ExperienceSection = () => {
  const { data, loading } = useQuery<{ experiences: Experience[] }>(GET_EXPERIENCES)
  const experiences = data?.experiences || []

  if (loading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-8 w-32 bg-muted rounded mx-auto mb-4"></div>
            <div className="h-6 w-64 bg-muted rounded mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">経歴</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            これまでの職歴と、携わってきたプロジェクトについて紹介します。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5"></div>

            <div className="space-y-12">
              {experiences.map((experience: Experience, index: number) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 z-10">
                    {experience.isCurrent && (
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 ml-12 md:ml-0">
                    <div className={index % 2 === 0 ? "md:mr-8" : "md:ml-8"}>
                      <Card className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg mb-1">
                                {experience.position}
                              </CardTitle>
                              <p className="text-primary font-semibold mb-2">
                                {experience.company}
                              </p>
                            </div>
                            {experience.isCurrent && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                現在
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <div className="flex items-center space-x-1">
                              <CalendarDays className="h-4 w-4" />
                              <span>
                                {formatDate(experience.startDate)} - {" "}
                                {experience.endDate ? formatDate(experience.endDate) : "現在"}
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>
                                {calculateDuration(experience.startDate, experience.endDate)}
                              </span>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {experience.description}
                          </p>

                          <div>
                            <h4 className="text-sm font-semibold mb-2">使用技術</h4>
                            <div className="flex flex-wrap gap-2">
                              {experience.technologies.map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}