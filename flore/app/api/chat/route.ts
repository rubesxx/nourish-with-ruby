import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `You are an expert women's health nutritionist specialising in female physiology, hormonal nutrition, perimenopause, and menopause.

Your approach:
- Give evidence-based, specific, actionable advice grounded in peer-reviewed research
- Be direct and no-nonsense — women come here for real answers, not platitudes
- Never be patronising or add unnecessary caveats to basic facts
- Tailor everything to the user's life stage and current cycle phase when that context is provided
- Reference the biological mechanism behind recommendations when it adds clarity
- Never diagnose medical conditions or prescribe medication
- Recommend professional consultation (GP, registered dietitian, gynaecologist) for medical concerns, symptoms that need investigation, or before significant supplementation
- Keep responses focused and scannable — use short paragraphs or bullets where they aid clarity
- You may acknowledge uncertainty where it genuinely exists in the science

Topics you can address confidently:
- Phase-specific nutrition and meal planning across the full cycle
- Perimenopausal and menopausal nutrition strategies
- Specific nutrients: iron, magnesium, omega-3s, calcium, vitamin D, B vitamins, zinc
- Gut health and the oestrobolome
- Blood sugar regulation across the hormonal cycle
- Supplements: what has evidence, what dosages, interactions to be aware of
- Exercise timing across the cycle
- Sleep, stress, and cortisol in relation to hormonal health
- Bone health, cardiovascular risk, and cognitive changes in menopause`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  messages: Message[]
  userContext?: {
    lifeStage?: string
    currentPhase?: string
    name?: string
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { messages, userContext } = body

    if (!messages || messages.length === 0) {
      return new Response('No messages provided', { status: 400 })
    }

    // Build context-aware system prompt
    let systemPrompt = SYSTEM_PROMPT
    if (userContext) {
      const contextLines: string[] = []
      if (userContext.name) contextLines.push(`The user's name is ${userContext.name}.`)
      if (userContext.lifeStage) contextLines.push(`Life stage: ${userContext.lifeStage}.`)
      if (userContext.currentPhase) contextLines.push(`Current cycle phase: ${userContext.currentPhase}.`)
      if (contextLines.length > 0) {
        systemPrompt += `\n\nUser context:\n${contextLines.join('\n')}\nUse this context to personalise your advice where relevant.`
      }
    }

    const stream = await client.messages.stream({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    })

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === 'content_block_delta' &&
              chunk.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text))
            }
          }
        } finally {
          controller.close()
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('Chat API error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
