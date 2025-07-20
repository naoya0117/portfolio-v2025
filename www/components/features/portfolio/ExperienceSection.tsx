"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"


// 静的データ（個人の経歴に基づくタイムライン）
const experiences = [
  {
    id: "1",
    date: "2025年4月",
    title: "同大学の修士課程に進学",
    description: "情報科学系大学院",
    isCurrent: true
  },
  {
    id: "2", 
    date: "2025年3月",
    title: "大学を卒業",
    description: "情報系大学",
    isCurrent: false
  },
  {
    id: "3",
    date: "2021年4月",
    title: "大阪の情報系の大学に入学",
    description: "初めてPCに触る。学部では、プログラミングやソフトウェア工学の基礎を学ぶ。",
    isCurrent: false
  },
  {
    id: "4",
    date: "2021年3月",
    title: "静岡の普通科高校卒業",
    description: "",
    isCurrent: false
  },
  {
    id: "5",
    date: "2003年1月",
    title: "誕生",
    description: "",
    isCurrent: false
  }
]

export const ExperienceSection = () => {

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
            学歴と個人的な技術学習の経歴について紹介します。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {experiences.map((experience, index: number) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 w-3 h-3 bg-primary rounded-full z-10 mt-2">
                    {experience.isCurrent && (
                      <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="w-full ml-12">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground font-mono">
                          {experience.date}
                        </span>
                        {experience.isCurrent && (
                          <Badge className="bg-green-500 hover:bg-green-600 text-xs">
                            現在
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {experience.title}
                      </h3>
                      {experience.description && (
                        <p className="text-muted-foreground">
                          {experience.description}
                        </p>
                      )}
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