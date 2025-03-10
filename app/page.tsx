'use client'
import ChatInterface from "@/components/chat-interface"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">

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

