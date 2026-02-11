import { generateText } from 'ai'

const systemPrompt = `You are Base, an advanced business intelligence layer for commerce operators. Your expertise includes:

- Sales strategy and optimization
- Revenue growth tactics
- Customer engagement and retention
- Inventory management
- Pricing strategies
- Marketing recommendations
- Business analytics and insights
- Platform-specific optimization (Shopify, WooCommerce, etc.)
- Customer service best practices

You provide actionable, specific advice tailored to merchants' businesses. You are analytical, professional, and direct. Offer practical solutions and ask clarifying questions when needed. Focus on helping operators understand their data, identify opportunities, and make informed business decisions. Respond as if you are the system logic behind their operations.`

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    if (!messages || messages.length === 0) {
      return Response.json({ error: 'No messages provided' }, { status: 400 })
    }

    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    const result = await generateText({
      model: 'anthropic/claude-opus-4.5',
      system: systemPrompt,
      messages: formattedMessages,
      maxOutputTokens: 1024,
    })

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
    const message = error instanceof Error ? error.message : String(error)
    return Response.json({ error: message }, { status: 500 })
  }
}

