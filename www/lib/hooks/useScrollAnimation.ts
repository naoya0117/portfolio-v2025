"use client"

import { useEffect, useState } from "react"

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const updateScrollY = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 50)
    }

    window.addEventListener("scroll", updateScrollY)
    updateScrollY()

    return () => window.removeEventListener("scroll", updateScrollY)
  }, [])

  return { scrollY, isScrolled }
}

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  threshold = 0.1
) => {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef, threshold])

  return isInView
}