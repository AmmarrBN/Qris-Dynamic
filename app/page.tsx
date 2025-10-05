"use client"
import { QRISGenerator } from "@/components/qris-generator"
import { ThemeToggle } from "@/components/theme-toggle"
import { FloatingShapes } from "@/components/floating-shapes"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingShapes />

      <div className="relative z-10">
        <header className="glass-effect border-b border-border/30 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 transition-transform hover:scale-105">
                <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  QRIS Dynamic
                </h1>
                <p className="text-xs text-muted-foreground">Payment Generator</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
                <span className="text-sm font-semibold text-primary">Instant • Secure • Easy</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                Generate Dynamic{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  QRIS
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                Transform your static QRIS into dynamic payment codes with custom amounts in seconds
              </p>
            </div>

            <QRISGenerator />
          </div>
        </main>

        <footer className="glass-effect border-t border-border/30 mt-24">
          <div className="container mx-auto px-4 py-8 text-center">
            <p className="text-sm text-muted-foreground">QRIS Dynamic Generator • Secure Payment Processing</p>
            <p className="text-xs text-muted-foreground/60 mt-2">Built with modern web technologies</p>
            <p className="text-xs text-muted-foreground/60 mt-3">
              © 2025 Copyright By{" "}
              <a
                href="https://github.com/AmmarrBN"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-300 font-medium hover:underline"
              >
                AmmarBN
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
