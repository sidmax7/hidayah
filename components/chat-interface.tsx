"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Send, Loader2, RefreshCw, XCircle } from "lucide-react"
import MessageList from "./message-list"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ReactMarkdown from 'react-markdown'

export default function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error, stop } = useChat({
    api: "/api/chat",
    streamProtocol: 'data',
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Hide welcome message when user starts typing
  useEffect(() => {
    if (input.trim().length > 0) {
      setShowWelcome(false)
    }
  }, [input])

  // Hide welcome message when there are messages
  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false)
    }
  }, [messages])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setShowWelcome(false)
      handleSubmit(e)
    }
  }

  const MarkdownMessage = ({ content }: { content: string }) => {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    )
  }

  return (
    <Card className="flex flex-col h-[85vh] md:h-[85vh] lg:h-[90vh] w-full max-w-[95vw] mx-auto overflow-hidden border shadow-lg">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Chat with Imam</h2>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => window.location.reload()} title="Start a new conversation">
            <RefreshCw className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-hidden relative">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          {showWelcome && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <h3 className="text-lg font-medium">Welcome to Hidayah</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Ask any questions about Islamic education and guidance. I&apos;m here to help clarify your doubts regarding
                Deen and Duniya.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-6 w-full max-w-md">
                {[
                  "What is the importance of prayer in Islam?",
                  "How can I improve my relationship with Allah?",
                  "What does Islam say about mental health?",
                  "How to balance worldly life and religious duties?",
                ].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="text-sm justify-start h-auto py-2 px-3"
                    onClick={() => {
                      handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)
                      inputRef.current?.focus()
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <MessageList 
            messages={messages} 
            renderContent={(content) => <MarkdownMessage content={content} />} 
          />

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription className="flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                An error occurred. Please try again or refresh the page.
              </AlertDescription>
            </Alert>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Button variant="outline" size="sm" onClick={() => stop()} className="flex items-center">
                <XCircle className="h-4 w-4 mr-2" />
                Stop generating
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </ScrollArea>
      </div>

      <div className="p-4 border-t mt-auto">
        <form onSubmit={handleFormSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask a question about Islamic guidance..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()} className="transition-all duration-200">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </Card>
  )
}

