"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, BarChart3, Activity } from "lucide-react"

export const GitHubStatsSection = () => {
  return (
    <section id="github-stats" className="py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">GitHub統計</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GitHubでの活動状況と使用言語の統計を表示します。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 活動統計 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <span>活動統計</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api?username=naoya0117&show_icons=true&theme=light&hide_border=true"
                  alt="GitHub Stats"
                  className="max-w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* 利用言語 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BarChart3 className="h-5 w-5 text-primary" />
                  </div>
                  <span>利用言語</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <img
                  src="https://github-readme-stats.vercel.app/api/top-langs/?username=naoya0117&layout=compact&theme=light&hide_border=true"
                  alt="Top Languages"
                  className="max-w-full h-auto rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* GitHub Readme Stats の説明 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            Powered by{" "}
            <a
              href="https://github.com/anuraghazra/github-readme-stats"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub Readme Stats
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}