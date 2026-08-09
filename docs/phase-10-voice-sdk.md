# Phase 10: Voice SDK Initialization

## Overview
Phase 10 introduced the `@agevine/voice` SDK, enabling the platform to accept and process AI-driven voice check-ins.

## Key Changes
- **Package Setup**: Bootstrapped the `packages/voice` directory.
- **Voice Client**: Created the `AgevineVoiceClient` class to handle `logCall` events.
- **Webhook Integration**: Added `POST /api/v1/voice/webhook` to the API Gateway to securely receive and store transcripts, summaries, and sentiment scores from third-party AI callers like Retell and Vapi.
