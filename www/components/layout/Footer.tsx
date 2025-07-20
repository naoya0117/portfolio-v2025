import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Email", href: "mailto:contact@example.com", icon: Mail },
]

export const Footer = () => {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Portfolio. Built with Next.js & Tailwind CSS.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <Button variant="ghost" size="icon">
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}