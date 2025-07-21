"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MessageSquare, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export const CTASection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* お礼のメッセージ */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ご訪問ありがとうございます
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              このポートフォリオをご覧いただき、誠にありがとうございます。<br />
              日々の学びや開発で得た気づきや知見を以下のページで発信しています。<br />
              ぜひご覧ください。
            </p>
          </div>

          {/* CTAボタン */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/monologue">
              <Button
                size="lg"
                className="group text-lg px-8 py-4 h-auto min-w-[200px]"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                モノローグを見る
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/blog">
              <Button
                variant="outline"
                size="lg"
                className="group text-lg px-8 py-4 h-auto min-w-[200px]"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                ブログを読む
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          {/* 補足メッセージ */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 text-sm text-muted-foreground"
          >
            <p>
              モノローグでは日々の開発での短い気づきを、<br className="sm:hidden" />
              ブログではより詳細な技術記事を投稿しています。
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
