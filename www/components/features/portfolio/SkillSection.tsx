"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Terminal, 
  Container, 
  Server, 
  Cloud,
  Code,
  Database,
  Layers,
  Coffee,
  Zap,
  Wrench,
  GitBranch,
  Globe
} from "lucide-react"

// 静的データ
const mainSkills = [
  {
    id: "linux",
    name: "Linux",
    icon: Terminal,
    description: "学部1年生の冬からシェルに興味を持ち自分のメインPCにインストール。開発環境やデスクトップ環境をいじりながら、シェル操作や設定ファイルの基礎を学んだ。ArchLinuxを愛用。",
    level: "高"
  },
  {
    id: "docker",
    name: "Docker",
    icon: Container,
    description: "学部3年時にweb開発を始めたことがきっかけで入門。いろんな場面で広く利用しており、学部4年時はDockerをテーマとした卒業研究に取り組んだ。",
    level: "高"
  },
  {
    id: "nginx",
    name: "Nginx",
    icon: Server,
    description: "webアプリを公開する際のwebサーバとして利用。また、保有するVPS上で複数のアプリケーションを公開するためのリバースプロキシにも利用。",
    level: "中"
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: Cloud,
    description: "修士1年の春から入門。OSS(Helm Chart)や自作アプリケーションのデプロイを行った。ディストリビューションはk3s。修論テーマとして検討中。",
    level: "中"
  },
  {
    id: "react",
    name: "React",
    icon: Code,
    description: "学部3年生時にweb開発を始めたことがきっかけで入門。静的アプリの開発を学んだ。(Javascript, Typescript)",
    level: "中"
  },
  {
    id: "laravel",
    name: "Laravel",
    icon: Layers,
    description: "学部3年生の冬から今に至るまでインターンシップ先の業務にて利用。MVCモデルやバックエンドの基礎を学んだ。(PHP)",
    level: "中"
  },
  {
    id: "mysql",
    name: "MySQL",
    icon: Database,
    description: "web開発で広く利用。SQL操作やトランザクションについて学習。",
    level: "中"
  }
]

const additionalMainSkills = [
  {
    category: "その他",
    skills: [
      { name: "AWS", icon: Cloud },
      { name: "Cloudflare", icon: Layers },
      { name: "Traefik", icon: Server }
    ]
  }
]

const otherSkills = [
  {
    category: "授業や研究でそれなりに利用",
    skills: [
      { name: "C", icon: Code },
      { name: "Java", icon: Coffee },
      { name: "Spring Boot", icon: Layers },
      { name: "FastAPI", icon: Zap },
      { name: "PostgreSQL", icon: Database }
    ]
  },
  {
    category: "学習中・興味のある技術", 
    skills: [
      { name: "Go", icon: Code },
      { name: "Web Assembly", icon: Globe }
    ]
  }
]

export const SkillSection = () => {

  return (
    <section id="skills" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">技術経験</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            これまで習得してきた技術スタックと、それぞれの経験について紹介します。
          </p>
        </motion.div>

        {/* 主要スキル */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold mb-8 text-center"
          >
            主要スキル
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainSkills.map((skill, index) => {
              const IconComponent = skill.icon
              return (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <span>{skill.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {skill.level}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {skill.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 主要スキルのその他 */}
        <div className="mb-16">
          {additionalMainSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-6">{category.category}</h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: skillIndex * 0.1 
                      }}
                    >
                      <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                        <IconComponent className="h-4 w-4" />
                        {skill.name}
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* その他のスキル */}
        <div className="space-y-12">
          {otherSkills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6">{category.category}</h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const IconComponent = skill.icon
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                    >
                      <Badge variant="outline" className="flex items-center gap-2 px-3 py-2 text-sm">
                        <IconComponent className="h-4 w-4" />
                        {skill.name}
                      </Badge>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}