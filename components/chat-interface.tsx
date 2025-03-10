"use client"

import type React from 'react';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Loader2,
  Mic,
  Paperclip,
  RefreshCw,
  Send,
  XCircle,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChat } from '@ai-sdk/react';

import MessageList from './message-list';
import { ThemeToggle } from './theme-toggle';

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
  const [showWelcome, setShowWelcome] = useState(true)
  const [isMounted, setIsMounted] = useState(false);
  const [isSafari, setIsSafari] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    setIsSafari(isSafariBrowser)
  }, [])

  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Keep focus on input field after messages change
  useEffect(() => {
    // Short delay to ensure focus happens after any other operations
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
    
    return () => clearTimeout(focusTimer)
  }, [messages])

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setShowWelcome(false)
      handleSubmit(e)
      
      // Immediately refocus the input field
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
    }
  }

  const MarkdownMessage = ({ content }: { content: string }) => {
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h1: (props) => <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />,
            h2: (props) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
            h3: (props) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
            h4: (props) => <h4 className="text-base font-bold mt-3 mb-2" {...props} />,
            p: (props) => <p className="mb-4" {...props} />,
            ul: (props) => <ul className="list-disc pl-6 mb-4" {...props} />,
            ol: (props) => <ol className="list-decimal pl-6 mb-4" {...props} />,
            li: (props) => <li className="mb-1" {...props} />,
            blockquote: (props) => <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4" {...props} />,
            hr: (props) => <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />,
            a: (props) => <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />,
            strong: (props) => <strong className="font-bold" {...props} />,
            em: (props) => <em className="italic" {...props} />,
            code: (props) => {
              const { className } = props;
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match && !className?.includes('code-block');
              
              return isInline 
                ? <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
                : <code className="block bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm overflow-x-auto my-4" {...props} />;
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    )
  }

  // Suggestion questions
  const suggestions = [
    "What is the importance of prayer in Islam?",
    "How can I improve my relationship with Allah?",
    "What does Islam say about mental health?",
    "How to balance worldly life and religious duties?",
  ]

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-20 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between px-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold">Hidayah</h1>
              <p className="text-xs text-muted-foreground">Islamic Guidance AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  window.location.reload()
                }} 
                title="Start a new conversation"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            )}
            {isMounted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  window.location.href = '/donate';
                }}
                title="Support Hidayah"
              >
                Support Us
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main chat area - Auto height with natural scrolling */}
      <div 
        className={`flex-1 px-4 ${messages.length > 0 ? 'overflow-y-auto' : 'overflow-hidden'} pb-32 max-w-4xl mx-auto w-full`}
        onClick={() => inputRef.current?.focus()} // Focus input when clicking anywhere in the chat area
      >
        {showWelcome && messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <h3 className="text-lg font-medium">Welcome to Hidayah</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md px-2">
              Ask any questions about Islamic education and guidance. I&apos;m here to help clarify your doubts regarding
              Deen and Duniya.
            </p>
            
            {/* Responsive suggestion grid */}
            <div className="w-full max-w-md px-2 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    className="text-sm justify-start h-auto py-2 px-3 text-left break-words whitespace-normal"
                    onClick={() => {
                      handleInputChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>)
                      inputRef.current?.focus()
                    }}
                  >
                    <span className="line-clamp-2">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <MessageList 
              messages={messages} 
              renderContent={(content) => <MarkdownMessage content={content} />} 
            />

            {error && (
              <Alert variant="destructive" className="mt-4 bg-opacity-80 backdrop-blur-sm">
                <AlertDescription className="flex items-center">
                  <XCircle className="h-4 w-4 mr-2" />
                  An error occurred. Please try again or refresh the page.
                </AlertDescription>
              </Alert>
            )}

            {isLoading && (
              <div className="flex items-center justify-center py-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    stop()
                    // Refocus input after stopping generation
                    setTimeout(() => inputRef.current?.focus(), 0)
                  }} 
                  className="flex items-center bg-opacity-80 backdrop-blur-sm"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Stop generating
                </Button>
              </div>
            )}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - Fixed at the bottom with Grok-like design */}
      <div className="fixed bottom-0 left-0 right-0 py-4 px-4 bg-background/80 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleFormSubmit} className="relative">
            <div className="flex items-center relative bg-muted/30 border border-muted rounded-full overflow-hidden">
              {/* Optional attachment button */}
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => inputRef.current?.focus()} // Refocus input after clicking
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                placeholder="How can Hidayah help?"
                className={`flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 pl-12 pr-12 py-3 ${isSafari ? "safari-fix" : ""}`}
                disabled={isLoading}
                autoFocus // Add autoFocus attribute
              />
              
              {/* Optional mic button */}
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-12 h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                onClick={() => inputRef.current?.focus()} // Refocus input after clicking
              >
                <Mic className="h-4 w-4" />
              </Button>
              
              {/* Send button */}
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="absolute right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
                size="icon"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </form>
          
          {/* Disclaimer text */}
          <p className="text-xs text-muted-foreground text-center mt-2">
            Hidayah provides AI-generated Islamic guidance. Always consult with qualified scholars for important religious matters.
          </p>
        </div>
      </div>
    </div>
  )
}

