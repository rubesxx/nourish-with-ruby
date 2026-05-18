'use client'

import { useEffect, useRef, useState } from 'react'
import { getUser } from '@/lib/storage'
import { detectPhase } from '@/lib/cycleEngine'
import type { UserProfile } from '@/lib/types'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED = [
  'What should I eat this week for my phase?',
  'Why do I crave sugar before my period?',
  'What supplements help with perimenopause symptoms?',
  'How does bone loss in menopause work and what slows it?',
  'Is soy actually good for hormonal balance?',
]

export default function ChatPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    setProfile(getUser())
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text: string) {
    if (!text.trim() || streaming) return

    const userMsg: Message = { role: 'user', content: text.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setStreaming(true)

    // Add empty assistant message that we'll stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const phaseInfo = profile?.lifeStage === 'cycling' ? detectPhase(profile) : null
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userContext: {
            name: profile?.name,
            lifeStage: profile?.lifeStage,
            currentPhase: phaseInfo?.label,
          },
        }),
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages(prev => {
          const updated = [...prev]
          const last = updated[updated.length - 1]
          if (last.role === 'assistant') {
            updated[updated.length - 1] = { ...last, content: last.content + chunk }
          }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setStreaming(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex flex-col h-dvh max-w-lg mx-auto">
      {/* Header */}
      <div className="flex-shrink-0 px-4 pt-10 pb-4 border-b border-brand-muted">
        <h1 className="text-xl font-black text-brand-text">AI Nutritionist</h1>
        <p className="text-brand-dim text-xs mt-0.5">Evidence-based, hormone-aware. Ask anything.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="animate-fade-in">
            <div className="rounded-2xl bg-brand-surface border border-brand-muted p-5 mb-6">
              <p className="text-brand-text font-semibold mb-1">
                Hello{profile?.name ? `, ${profile.name}` : ''}
              </p>
              <p className="text-brand-dim text-sm">
                I&apos;m your women&apos;s health nutritionist. Ask me anything about cycle nutrition,
                perimenopause, menopause, supplements, or food and hormones.
              </p>
            </div>
            <p className="text-xs text-brand-dim uppercase tracking-widest mb-3">Try asking</p>
            <div className="flex flex-col gap-2">
              {SUGGESTED.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-left px-4 py-3 rounded-xl border border-brand-muted text-brand-dim text-sm hover:border-brand-pink hover:text-brand-text transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'text-white rounded-br-sm'
                  : 'bg-brand-surface text-brand-text rounded-bl-sm'
              }`}
              style={msg.role === 'user' ? { background: 'linear-gradient(135deg, #6B21A8, #DB2777)' } : {}}
            >
              {msg.content || (
                <span className="flex gap-1 items-center text-brand-dim">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dim animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dim animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-dim animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="flex-shrink-0 border-t border-brand-muted px-4 py-3 flex gap-3 items-end"
        style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          disabled={streaming}
          placeholder="Ask your nutritionist..."
          rows={1}
          className="flex-1 bg-brand-surface border border-brand-muted rounded-xl px-4 py-3 text-brand-text placeholder:text-brand-dim focus:outline-none focus:border-brand-pink text-sm resize-none max-h-32 disabled:opacity-50"
          style={{ fieldSizing: 'content' } as React.CSSProperties}
        />
        <button
          onClick={() => send(input)}
          disabled={streaming || !input.trim()}
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-30 gradient-purple-pink"
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="white" strokeWidth={2.5}>
            <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
