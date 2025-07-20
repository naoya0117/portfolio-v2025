"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LazySectionProps {
  children: React.ReactNode
  className?: string
  threshold?: number
}

export const LazySection = ({ 
  children, 
  className = "", 
  threshold = 0.1 
}: LazySectionProps) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={className}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  )
}