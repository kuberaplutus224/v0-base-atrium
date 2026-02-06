'use client'

import { useState } from 'react'

export default function ScenarioSimulator() {
  const [priceIncrease, setPriceIncrease] = useState(0.5)

  // Simplified impact calculation based on price increase
  const weeklyRevenue = 120 + priceIncrease * 200
  const customerRetention = 95 - priceIncrease * 8

  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6">
      {/* Title */}
      <div>
        <h3 className="font-serif text-sm font-semibold text-foreground">
          What if I increase Latte prices by ${priceIncrease.toFixed(2)}?
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">Explore pricing scenarios and their impact</p>
      </div>

      {/* Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-muted-foreground">Price Adjustment</label>
          <span className="font-semibold text-accent">+${priceIncrease.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.05"
          value={priceIncrease}
          onChange={(e) => setPriceIncrease(parseFloat(e.target.value))}
          className="w-full cursor-pointer appearance-none rounded-lg bg-secondary/30 outline-none"
          style={{
            background: `linear-gradient(to right, hsl(var(--secondary)) 0%, hsl(var(--accent)) ${(priceIncrease / 2) * 100}%, hsl(var(--secondary)) ${(priceIncrease / 2) * 100}%, hsl(var(--secondary)) 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$0.00</span>
          <span>$2.00</span>
        </div>
      </div>

      {/* Predicted Impact Box */}
      <div className="space-y-3 rounded-lg border border-border bg-background p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Predicted Impact
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* Weekly Revenue */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Weekly Revenue</p>
            <p
              className={`font-serif text-lg font-semibold ${
                weeklyRevenue >= 120 ? 'text-accent' : 'text-foreground'
              }`}
            >
              +${weeklyRevenue.toFixed(0)}
            </p>
          </div>

          {/* Customer Retention */}
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Customer Retention</p>
            <p
              className={`font-serif text-lg font-semibold ${
                customerRetention >= 95 ? 'text-foreground' : 'text-destructive'
              }`}
            >
              {customerRetention.toFixed(0)}%
            </p>
          </div>
        </div>

        {/* Insight */}
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            {priceIncrease < 0.5
              ? 'Small price increase with minimal customer impact. High opportunity.'
              : priceIncrease < 1
                ? 'Balanced approach. Good revenue growth with acceptable retention loss.'
                : priceIncrease < 1.5
                  ? 'Aggressive pricing. Monitor customer feedback closely.'
                  : 'High risk scenario. Consider segmented pricing strategy.'}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
        Simulate This Scenario
      </button>
    </div>
  )
}
