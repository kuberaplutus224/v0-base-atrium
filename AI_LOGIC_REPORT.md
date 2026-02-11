# AI Logic & Intelligence Report: Atrium Platform (Data-Driven Update)

This report details the underlying logic, heuristics, and Artificial Intelligence models powering the various features within the Atrium dashboard.

## 🤖 1. Conversational Intelligence (Base Chat)
*   **Logic Engine**: Anthropic Claude Opus 4.5.
*   **Context Injection (NEW)**: The system now injects real-time summary statistics (Total Revenue, Avg Revenue, Transaction Count) for the selected date range directly into the AI context. This allows the LLM to provide deterministic answers about the current period without external tool calls.

## 🧮 2. Scenario Simulator (Historical Mathematical Modeling)
*   **Logic Type**: Data-Grounded Deterministic Modeling.
*   **Historical Baseline (Updated)**: The simulator now fetches **Real Total Revenue** and **Transaction Count** for the selected period to establish a precise baseline and calculate the **Average Order Value (AOV)**.
*   **Elasticity Model (Updated)**: Uses a standard elasticity curve where price impact is calculated relative to the dynamic AOV: `Impact = Baseline * (1 + (Increase / AOV)) * (1 - volume_drop)`.

## ☕ 3. The Base Report (Narrative Synthesis)
*   **Logic Type**: Real-Time Delta Tracking.
*   **Analysis Logic (NEW)**: Compares current range data vs. the immediately preceding period of the same length (e.g., this week vs last week). 
*   **Dynamic Insights (NEW)**: Automatically generates narrative points based on actual deltas (e.g., "% Growth", "Acquisition Velocity").

## 📊 4. Customer Logic (Vibe Check)
*   **Logic Type**: Hash-Based Behavioral Simulation.
*   **Mechanism (NEW)**: Simulates "Data Drift" by fluctuating sentiment levels and rotating top keywords based on the uniqueness of the selected date interval, providing a more dynamic and "alive" dashboard experience.
