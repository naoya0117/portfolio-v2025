"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Terminal, Gamepad2, Building } from "lucide-react"

// 静的データ
const personalProjects = [
  {
    id: "linux-from-scratch",
    title: "Linux From Scratch",
    description: "ドキュメントを頼りにLinuxディストリビューションを自作するプロジェクトです。限界がくるまではDockerコンテナで構築予定。現在着手中。",
    technologies: ["Linux", "Docker"],
    status: "進行中",
    links: {
      github: "https://github.com",
      project: "https://project-page.com"
    },
    icon: Terminal
  },
  {
    id: "vim-tetris", 
    title: "vim-tetris",
    description: "vimのキーバインドやモードを搭載したtetrisです。vimの学習用アプリケーションとして作成し、jhlkでブロックのブロック操作や、:w, :q, ddを用いてブロックの削除を行います。1ヶ月の期間で作成し、授業内で2位の評価をいただきました。内部でマルチスレッドの排他制御等を行っています。",
    technologies: ["C", "Docker"],
    status: "完成",
    award: "授業内評価 2位",
    duration: "1ヶ月",
    links: {
      github: "https://github.com"
    },
    icon: Gamepad2
  }
]

export const PersonalProjectsSection = () => {
  return (
    <section id="personal-projects" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">個人開発・趣味</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            個人的に取り組んでいる開発プロジェクトや趣味の活動を紹介します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {personalProjects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-lg">{project.title}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge 
                        variant={project.status === "進行中" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                      {project.award && (
                        <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600">
                          {project.award}
                        </Badge>
                      )}
                      {project.duration && (
                        <Badge variant="outline" className="text-xs">
                          {project.duration}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div>
                      <h4 className="text-sm font-semibold mb-2">使用技術</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {project.links.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.links.project && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={project.links.project} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            Project Page
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}