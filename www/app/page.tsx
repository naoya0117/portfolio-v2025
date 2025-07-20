"use client"

import { HeroSection } from "@/components/features/home/HeroSection"
import { SkillSection } from "@/components/features/portfolio/SkillSection"
import { ExperienceSection } from "@/components/features/portfolio/ExperienceSection"
import { PageContainer } from "@/components/layout/PageContainer"

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <div id="portfolio">
        <SkillSection />
        <ExperienceSection />
      </div>
    </PageContainer>
  )
}
