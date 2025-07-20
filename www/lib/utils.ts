import { type ClassValue, clsx } from "clsx"

export const cn = (...inputs: ClassValue[]) => {
  return clsx(inputs)
}

export const COMMON_STYLES = {
  button: {
    base: "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground"
  },
  card: {
    base: "rounded-lg border bg-card text-card-foreground shadow-sm",
    interactive: "hover:shadow-md transition-shadow cursor-pointer"
  },
  layout: {
    container: "container mx-auto px-4",
    section: "py-12 md:py-16 lg:py-20"
  }
} as const