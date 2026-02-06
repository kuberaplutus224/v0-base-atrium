import { streamText } from 'ai'

const systemPrompt = `You are SellerGPT, an AI business assistant specifically designed for merchants and e-commerce entrepreneurs. Your expertise includes:

- Sales strategy and optimization
- Revenue growth tactics
- Customer engagement and retention
- Inventory management
- Pricing strategies
- Marketing recommendations
- Business analytics and insights
- Platform-specific optimization (Shopify, WooCommerce, etc.)
- Customer service best practices

You provide actionable, specific advice tailored to merchants' businesses. Be conversational but professional. Offer practical solutions and ask clarifying questions when needed. Focus on helping merchants understand their data, identify opportunities, and make informed business decisions.`

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    console.log('[v0] API: Received', messages.length, 'messages')
    console.log('[v0] API: Last message:', messages[messages.length - 1]?.content.substring(0, 50))

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const result = streamText({
      model: 'anthropic/claude-opus-4.5',
      system: systemPrompt,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      abortSignal: req.signal,
    })

    console.log('[v0] API: streamText initialized')

    // Use the built-in toTextStreamResponse for proper SSE encoding
    const sseStream = result.toTextStreamResponse()
    console.log('[v0] API: Returning SSE stream')
    return sseStream
  } catch (error) {
    console.error('[v0] API: Chat error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
