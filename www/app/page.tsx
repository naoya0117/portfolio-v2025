"use client"

import { HeroSection } from "@/components/features/home/HeroSection"
import { SkillSection } from "@/components/features/portfolio/SkillSection"
import { ExperienceSection } from "@/components/features/portfolio/ExperienceSection"
import { TeamProjectsSection } from "@/components/features/portfolio/TeamProjectsSection"
import { PersonalProjectsSection } from "@/components/features/portfolio/PersonalProjectsSection"
import { WorkExperienceSection } from "@/components/features/portfolio/WorkExperienceSection"
import { GitHubStatsSection } from "@/components/features/portfolio/GitHubStatsSection"
import { PageContainer } from "@/components/layout/PageContainer"

export default function Home() {
  return (
    <PageContainer>
      <HeroSection />
      <SkillSection />
      <ExperienceSection />
      <TeamProjectsSection />
      <PersonalProjectsSection />
      <WorkExperienceSection />
      <GitHubStatsSection />
    </PageContainer>
  )
}
