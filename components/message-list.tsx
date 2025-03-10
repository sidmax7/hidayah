'use client'

import {
  ChurchIcon as Mosque,
  User,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Message } from '@ai-sdk/react';

interface MessageListProps {
  messages: Message[]
  renderContent?: (content: string) => React.ReactNode
}

export default function MessageList({ messages, renderContent }: MessageListProps) {
  if (!messages.length) {
    return null
  }

  return (
    <div className="space-y-4 pt-4 max-w-3xl mx-auto">
      {messages.map((message, index) => {
        const isUser = message.role === "user"
        const isConsecutive = index > 0 && messages[index - 1].role === message.role

        return (
          <div
            key={index}
            className={cn(
              "flex gap-3 w-full",
              isUser ? "justify-end" : "justify-start",
              isConsecutive ? "mt-1" : "mt-6",
            )}
          >
            {!isUser && !isConsecutive && (
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Mosque className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            {!isUser && isConsecutive && <div className="w-8" />}

            <div
              className={cn(
                "rounded-lg px-4 py-2 max-w-[85%] text-sm",
                isUser 
                  ? "bg-primary bg-opacity-90 text-gray-500 dark:text-gray-300 rounded-tr-none" 
                  : "bg-muted bg-opacity-80 backdrop-blur-sm rounded-tl-none prose-container",
              )}
            >
              {renderContent ? renderContent(message.content) : message.content}
            </div>

            {isUser && !isConsecutive && (
              <Avatar className="h-8 w-8 mt-0.5">
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            {isUser && isConsecutive && <div className="w-8" />}
          </div>
        )
      })}
    </div>
  )
}

