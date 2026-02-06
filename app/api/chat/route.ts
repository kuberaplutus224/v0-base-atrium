import { generateText } from 'ai'

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
    const body = await req.json()
    const messages = body.messages || []

    console.log('[v0] API: Received', messages.length, 'messages')
    console.log('[v0] API: Last message content:', messages[messages.length - 1]?.content?.substring(0, 50))

    if (!messages || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 })
    }

    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    console.log('[v0] API: Calling generateText with model: anthropic/claude-opus-4.5')

    const result = await generateText({
      model: 'anthropic/claude-opus-4.5',
      system: systemPrompt,
      messages: formattedMessages,
      maxOutputTokens: 1024,
    })

    console.log('[v0] API: generateText completed')
    console.log('[v0] API: Result text length:', result.text.length)
    console.log('[v0] API: Result preview:', result.text.substring(0, 100))

    // Return as streaming SSE-like format for compatibility with client
    const encoder = new TextEncoder()
    const text = result.text

    const readable = new ReadableStream({
      start(controller) {
        // Send the full text in chunks to simulate streaming
        const chunkSize = 50
        for (let i = 0; i < text.length; i += chunkSize) {
          const chunk = text.slice(i, i + chunkSize)
          const sseMessage = `data: ${JSON.stringify({ text: chunk })}\n\n`
          controller.enqueue(encoder.encode(sseMessage))
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('[v0] API: Error:', error)
    const message = error instanceof Error ? error.message : String(error)
    console.error('[v0] API: Full error stack:', error)
    return Response.json({ error: message }, { status: 500 })
  }
}

