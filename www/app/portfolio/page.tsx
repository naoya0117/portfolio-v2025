"use client"

import { motion } from "framer-motion"
import { SkillSection } from "@/components/features/portfolio/SkillSection"
import { ExperienceSection } from "@/components/features/portfolio/ExperienceSection"
import { PageContainer } from "@/components/layout/PageContainer"

export default function PortfolioPage() {
  return (
    <PageContainer>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">ポートフォリオ</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              これまでに培ったスキルと経験を紹介します。
            </p>
          </motion.div>
        </div>
      </section>
      
      <SkillSection />
      <ExperienceSection />
    </PageContainer>
  )
}