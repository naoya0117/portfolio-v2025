"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
}

// 静的データ
const profile = {
  name: "Naoya",
  title: "Student Engineer",
  bio: "エンジニアを目指してWeb開発、Linux、コンテナ技術を中心に学習中です。情報科学系の大学院に在籍し、インターンシップで業務の経験を積みながら技術を習得しています。",
  socialLinks: [
    { platform: "github", url: "https://github.com/naoya0117", icon: "github" },
    { platform: "email", url: "mailto:portfolio-v2025@matuhasi.com", icon: "email" },
  ]
}

export const HeroSection = () => {

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image
                src="/images/profile.webp"
                alt={profile.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
                draggable={false}
                priority
              />
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            {profile.title}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {profile.bio}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex justify-center space-x-4 mb-12"
          >
            {profile.socialLinks.map((link, index: number) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap] || Github
              return (
                <motion.div
                  key={link.platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.35 + index * 0.05, duration: 0.2 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-12 w-12 rounded-full border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <IconComponent className="h-5 w-5" />
                    </Button>
                  </a>
                </motion.div>
              )
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a href="#skills">
              <Button
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                スキルを見る
              </Button>
            </a>
            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                ブログを読む
              </Button>
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
