"use client"

import { motion } from "framer-motion"
import { useQuery } from "@apollo/client"
import { ArrowDown, Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GET_PROFILE } from "@/lib/graphql/queries"
import { Profile, SocialLink } from "@/lib/types/generated"
import Link from "next/link"

const iconMap = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
  email: Mail,
}

export const HeroSection = () => {
  const { data, loading } = useQuery<{ profile: Profile }>(GET_PROFILE)
  const profile = data?.profile

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-32 w-32 rounded-full bg-muted mx-auto mb-8"></div>
          <div className="h-8 w-64 bg-muted rounded mx-auto mb-4"></div>
          <div className="h-6 w-48 bg-muted rounded mx-auto"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-4xl font-bold text-primary">
              {profile?.name?.charAt(0) || "T"}
            </div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            {profile?.name || "Developer"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8"
          >
            {profile?.title || "Full Stack Developer"}
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            {profile?.bio || "Creating amazing digital experiences"}
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center space-x-4 mb-12"
          >
            {profile?.socialLinks?.map((link: SocialLink, index: number) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap] || Github
              return (
                <motion.div
                  key={link.platform}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
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
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <a href="#portfolio">
              <Button
                size="lg"
                className="text-lg px-8 py-4 h-auto"
              >
                ポートフォリオを見る
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}