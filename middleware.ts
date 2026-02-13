import { NextRequest, NextResponse } from 'next/server'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMITS = {
  read: { windowMs: 60000, maxRequests: 60 },
  write: { windowMs: 60000, maxRequests: 10 },
  chat: { windowMs: 60000, maxRequests: 15 },
  upload: { windowMs: 60000, maxRequests: 5 },
} as const

function checkRateLimit(key: string, config: { windowMs: number; maxRequests: number }) {
  const now = Date.now()
  const existing = rateLimitMap.get(key)

  if (!existing || now > existing.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + config.windowMs })
    return { allowed: true, remaining: config.maxRequests - 1, resetIn: Math.ceil(config.windowMs / 1000) }
  }

  if (existing.count >= config.maxRequests) {
    return { allowed: false, remaining: 0, resetIn: Math.ceil((existing.resetTime - now) / 1000) }
  }

  existing.count++
  return { allowed: true, remaining: config.maxRequests - existing.count, resetIn: Math.ceil((existing.resetTime - now) / 1000) }
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'

  let config = RATE_LIMITS.read
  if (request.method === 'POST') {
    if (pathname.startsWith('/api/chat')) config = RATE_LIMITS.chat
    else if (pathname.startsWith('/api/upload')) config = RATE_LIMITS.upload
    else config = RATE_LIMITS.write
  }

  const result = checkRateLimit(ip + ':' + pathname + ':' + request.method, config)

  if (!result.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(result.resetIn),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(result.resetIn),
        },
      }
    )
  }

  const response = NextResponse.next()
  const origin = request.headers.get('origin') || ''
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'http://localhost:3000',
  ]

  if (allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin)
  }

  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Max-Age', '86400')
  response.headers.set('X-RateLimit-Remaining', String(result.remaining))
  response.headers.set('X-RateLimit-Reset', String(result.resetIn))

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers: response.headers })
  }

  return response
}

export const config = {
  matcher: '/api/:path*',
}
