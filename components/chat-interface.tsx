'use client'

import React from 'react'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Send, Copy, Share2 } from 'lucide-react'
import MorningBriefing from './morning-briefing'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const interactiveKeywords = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'product', 'sales', 'revenue', 'customers']

export default function ChatInterface() {
  const [localMessages, setLocalMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [localMessages])

  const handleCopyToClipboard = (content: string, id: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleShareToTeam = (content: string) => {
    const text = `Check this insight from SellerGPT:\n\n"${content}"`
    if (navigator.share) {
      navigator.share({
        title: 'SellerGPT Insight',
        text: text,
      })
    } else {
      alert('Share feature not available on this device')
    }
  }

  const parseMessageWithChips = (content: string) => {
    const parts: (string | { type: 'chip'; text: string })[] = []
    let lastIndex = 0

    interactiveKeywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi')
      let match

      while ((match = regex.exec(content)) !== null) {
        if (match.index > lastIndex) {
          parts.push(content.substring(lastIndex, match.index))
        }
        parts.push({ type: 'chip', text: match[0] })
        lastIndex = match.index + match[0].length
      }
    })

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    return parts.length > 0 ? parts : [content]
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setLocalMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      console.log('[v0] Chat: Sending message to API')
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...localMessages, userMessage],
        }),
      })

      console.log('[v0] Chat: Response status:', response.status)

      if (!response.ok) {
        const error = await response.json()
        console.error('[v0] Chat: API error:', error)
        throw new Error(`API error: ${error.error}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let assistantContent = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim()) continue
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim()
            if (data === '[DONE]') {
              console.log('[v0] Chat: Stream finished')
              continue
            }
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                assistantContent += parsed.text
                console.log('[v0] Chat: Added text:', parsed.text)
              }
            } catch (e) {
              console.log('[v0] Chat: Could not parse:', data)
            }
          }
        }
      }

      if (!assistantContent.trim()) {
        throw new Error('No text content received from AI')
      }

      console.log('[v0] Chat: Final response:', assistantContent.substring(0, 100))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantContent,
      }

      setLocalMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('[v0] Chat error:', error)
      const errorMsg = error instanceof Error ? error.message : 'Failed to get response'
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Error: ${errorMsg}. Please check the browser console and API logs for details.`,
      }
      setLocalMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Pinned Morning Briefing */}
      <div className="sticky top-0 z-20 pb-4">
        <MorningBriefing />
      </div>

      {/* Messages Container */}
      <div className="flex flex-col gap-4">
        {localMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-12">
            <p className="text-center text-muted-foreground">
              Start a conversation with your AI business assistant
            </p>
          </div>
        ) : (
          <>
            {localMessages.map((message, index) => (
              <React.Fragment key={message.id}>
                <div
                  className={`animate-fadeIn flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-md ${
                      message.role === 'user'
                        ? 'rounded-3xl rounded-br-none bg-secondary text-secondary-foreground'
                        : 'rounded-lg'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 px-4 pt-3">
                          <div className="h-6 w-6 rounded-full bg-accent" />
                          <span className="text-xs font-semibold text-muted-foreground">
                            SellerGPT
                          </span>
                        </div>
                        <div className="px-4 pb-3 text-sm leading-relaxed">
                          {parseMessageWithChips(message.content).map((part, idx) => {
                            if (typeof part === 'string') {
                              return <span key={idx}>{part}</span>
                            }
                            return (
                              <button
                                key={idx}
                                className="mx-1 inline-block rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
                              >
                                {part.text}
                              </button>
                            )
                          })}
                        </div>
                        <div className="flex items-center justify-between border-t border-border px-4 py-2">
                          <span className="text-xs text-muted-foreground">
                            Generated from Square Sales Data // 99% Accuracy
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleCopyToClipboard(message.content, message.id)}
                              className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-secondary/30"
                              title="Copy to clipboard"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleShareToTeam(message.content)}
                              className="rounded p-1.5 text-muted-foreground transition-colors hover:bg-secondary/30"
                              title="Share to team"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                        {copiedId === message.id && (
                          <div className="px-4 pb-2 text-xs text-accent">✓ Copied</div>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-3">
                        <p className="break-words text-sm leading-relaxed">{message.content}</p>
                      </div>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
            {isLoading && (
              <div className="flex animate-fadeIn justify-start">
                <div className="rounded-lg px-4 py-3">
                  <p className="shimmer-text text-sm font-medium">Reviewing your ledger...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Form - Fixed at bottom */}
      <form onSubmit={handleSendMessage} className="sticky bottom-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 -mx-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-border bg-card px-4 py-3 text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-3 text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}

