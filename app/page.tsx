import ChatInterface from "@/components/chat-interface"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <header className="w-full max-w-4xl flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Hidayah
          </h1>
          <span className="text-sm text-muted-foreground">Islamic Guidance</span>
        </div>
        <ThemeToggle />
      </header>

      <div className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center py-4">
        <ChatInterface />
      </div>

      <footer className="w-full max-w-4xl py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Hidayah provides AI-generated Islamic guidance. Always consult with qualified scholars for important religious
          matters.
        </p>
      </footer>
    </main>
  )
}

