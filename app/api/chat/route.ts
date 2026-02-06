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

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: 'anthropic/claude-opus-4.5',
      system: systemPrompt,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(JSON.stringify({ error: 'Failed to process chat message' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
