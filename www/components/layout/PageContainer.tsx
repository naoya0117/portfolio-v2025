import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <main className={cn("min-h-screen pt-16", className)}>
      {children}
    </main>
  )
}