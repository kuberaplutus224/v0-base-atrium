import { streamText, convertToModelMessages } from 'ai'

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

    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'No messages provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Format messages for streamText
    const formattedMessages = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }))

    console.log('[v0] API: Calling streamText with', formattedMessages.length, 'messages')

    const result = streamText({
      model: 'anthropic/claude-opus-4.5',
      system: systemPrompt,
      messages: formattedMessages,
      maxOutputTokens: 1024,
    })

    console.log('[v0] API: streamText result created')

    // Create a simple SSE response
    const encoder = new TextEncoder()
    let totalText = ''

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            totalText += chunk
            console.log('[v0] API: Text chunk:', chunk)
            // Send each chunk as SSE data
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: chunk })}\n\n`))
          }
          console.log('[v0] API: Stream complete, total text:', totalText.length, 'chars')
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('[v0] API: Stream error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('[v0] API: Error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
