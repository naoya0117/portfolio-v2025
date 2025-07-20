"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Users, Code, Gamepad2, Calendar, Award } from "lucide-react"

// 静的データ
const teamProjects = [
  {
    id: "minecraft-bot",
    title: "MinecraftBotContest",
    description: "プログラミング初学者のための学内プログラミングコンテストの開発スタッフとして参加。キーボードをエミュレートし、C言語でマイクラのキャラを操作できる関数を作成。機能追加を3人チームで行った。",
    technologies: ["Python"],
    teamSize: 3,
    role: "開発スタッフ",
    links: {
      github: "https://github.com"
    },
    icon: Code
  },
  {
    id: "susumu-kun",
    title: "走れ!すすむくん!",
    description: "学部3年時に大学の学祭に出展したブラウザベースの2Dアクションゲーム。ゼミ生10名で開発し、主にフロントエンド側のゲームのアルゴリズム部分を担当。担当した機能は、敵の当たり判定、敵の出現、プレイヤーのキーボード操作等。",
    technologies: ["React.js", "Express.js", "Phaser.js"],
    teamSize: 10,
    role: "フロントエンド開発",
    links: {
      demo: "https://example.com",
      github: "https://github.com"
    },
    icon: Gamepad2
  },
  {
    id: "schedule-app",
    title: "springboot-schedule-app",
    description: "学部3年の授業にて作成したユーザの予定を登録・削除・共有するためのカレンダーアプリ。4人チームで作成。授業内の評価で2位を獲得。",
    technologies: ["Java", "Spring Boot"],
    teamSize: 4,
    role: "バックエンド開発",
    award: "授業内評価 2位",
    links: {
      github: "https://github.com"
    },
    icon: Calendar
  },
  {
    id: "kansai-odyssey",
    title: "関西オデッセイ",
    description: "2023年の学生ハッカソンイベントKC3Hack2023に参加。「関西をええかんじに」をテーマとした観光スポットを回りながらポイントを獲得するスタンプラリー形式のゲームを6人チームで作成。デイジイエル賞を受賞。",
    technologies: ["React"],
    teamSize: 6,
    role: "フロントエンド開発",
    award: "デイジイエル賞",
    links: {
      github: "https://github.com"
    },
    icon: Award
  }
]

export const TeamProjectsSection = () => {
  return (
    <section id="team-projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">チーム開発経験</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            大学での授業やハッカソンでのチーム開発プロジェクトを紹介します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamProjects.map((project, index) => {
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
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{project.teamSize}名チーム</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.role}
                      </Badge>
                      {project.award && (
                        <Badge className="text-xs bg-yellow-500 hover:bg-yellow-600">
                          {project.award}
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
                      {project.links.demo && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                          asChild
                        >
                          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            デモを見る
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