import { useState, useEffect } from 'react'

interface VibeCheckProps {
  sentiment?: number
  keywords?: string[]
  dates?: string[]
}

export default function VibeCheck({
  sentiment: initialSentiment = 88,
  keywords: initialKeywords = ['Friendly Staff', 'Fast WiFi', 'Expensive Pastries'],
  dates
}: VibeCheckProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [sentiment, setSentiment] = useState(initialSentiment)
  const [keywords, setKeywords] = useState(initialKeywords)

  useEffect(() => {
    if (!dates || dates.length === 0) return

    // Simulate data-driven drift based on date hash
    const dateHash = dates.join('').length % 15
    const drift = (dateHash - 7) * 2 // -14 to +14 variation
    setSentiment(Math.min(100, Math.max(0, initialSentiment + drift)))

    if (dateHash > 10) {
      setKeywords(['Long Wait Times', 'Fast WiFi', 'Friendly Staff'])
    } else if (dateHash < 5) {
      setKeywords(['Best Coffee', 'Friendly Staff', 'Cozy Atmosphere'])
    } else {
      setKeywords(initialKeywords)
    }
  }, [dates?.join(',')])

  const sentimentLevel = Math.min(Math.max(sentiment, 0), 100)
  const isPositive = sentimentLevel > 60

  return (
    <div className="space-y-4">
      {/* Label */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Customer Sentiment
        </p>
      </div>

      {/* Sentiment Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="h-2 w-full rounded-full bg-secondary/40" />

        {/* Filled Bar with gradient */}
        <div
          className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${sentimentLevel}%`,
            background: isPositive
              ? 'linear-gradient(90deg, #9CAF88 0%, #8BA876 100%)'
              : 'linear-gradient(90deg, #B8956A 0%, #A68558 100%)',
          }}
        />
      </div>

      {/* Sentiment Value and Tooltip Trigger */}
      <div className="flex items-center justify-between">
        <p className="font-serif text-lg font-semibold text-foreground">
          {sentimentLevel}%
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {isPositive ? 'Positive' : 'Neutral'}
          </span>
        </p>

        {/* Hover Tooltip */}
        <div className="relative">
          <button
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={() => setShowTooltip(!showTooltip)}
            className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Top Keywords
          </button>

          {/* Tooltip */}
          {showTooltip && (
            <div className="absolute right-0 top-full mt-2 z-10 w-48 space-y-2 rounded-lg subtle-border bg-card p-3 animate-fadeIn">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                From Recent Reviews
              </p>
              <div className="space-y-1.5">
                {keywords.map((keyword, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: isPositive ? '#9CAF88' : '#B8956A',
                      }}
                    />
                    <span className="text-xs text-foreground">{keyword}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
