# Phase 22: Voice Sentiment Trend Analysis

## Overview
The Voice Sentiment Trend Analysis feature provides a macro-level view of a patient's emotional well-being over time, derived from the automated AI voice check-ins.

## Features
- **SentimentChart**: A new `SentimentChart.tsx` component that uses Recharts to render an area chart. The chart plots the `sentimentScore` (1-100) and displays a gradient from Negative (Red) to Positive (Green).
- **Live Voice Logs**: The `/voice-logs` page in `ui-core` has been fully wired up to fetch live data from the API Gateway (`GET /api/voice-logs`).
- **Smart Transcript Parsing**: Raw text transcripts from the database are now dynamically parsed and rendered as conversational chat bubbles, matching the AI vs. Patient dialog flow.

## Architecture
- **API Gateway**: Exposes `GET /api/voice-logs` which retrieves logs ordered by timestamp.
- **UI Core**: The `VoiceLogsPage` component fetches the logs, sets the latest log as active, renders the `SentimentChart`, and displays the parsed transcript using the active log's `transcript` and `summary`.

## Integration
To populate sentiment data, the Voice SDK or AI Caller webhook must send a `sentimentScore` integer (1-100) alongside the `summary` and `transcript` when `POST`ing to `/api/v1/voice/webhook`.
