# Changelog

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Phase 23: Code Audit & Type Safety**: Eliminated all `any` type annotations across the entire codebase (17 instances). Created shared `lib/types.ts` and `lib/api.ts`. Fixed null sentiment score crash, removed 2 orphan files, and removed unused imports/variables.
- **Phase 22: Voice Sentiment Trend Analysis**: Added a new `SentimentChart` component and wired up the `/voice-logs` page to fetch live data. Transcripts are now parsed into chat bubbles, and the emotional sentiment trend is plotted over time.
- **Phase 21: Settings & System Configurations**: Dedicated settings page for updating the caregiver profile, verifying active `.env` integrations (Twilio, SendGrid, OpenAI), and securely exporting all Agevine data to JSON.
- **Phase 20: Patient Management UI**: Full CRUD interface in the dashboard for managing family members. Includes an Add Member modal and direct database synchronization.
- **Phase 20: Patient API Routes**: Added `POST /api/patients` and a cascading `DELETE /api/patients/:id` to `api-gateway`.
- **Phase 19: Alerts & Notifications Engine**: Configurable patient alerts for vitals thresholds (e.g. Heart Rate > 120 bpm) and cognitive/fall flags. Dispatches via Email, SMS, or Webhook.
- **Phase 19: `@agevine/iot` SDK**: A brand new open-source SDK for integrating non-wearable smart home sensors (fall detection mats, BLE devices) with MQTT and Webhook adapters.
- **Alerts Dashboard**: Added a new `/alerts` view in the UI core to manage rules and view alert history.
- **IoT Webhooks API**: Real-time event ingestion route at `/api/v1/iot/webhook`.

### Changed
- Dashboard sidebar now includes the Alerts Engine icon.
- `evaluateAlerts` logic automatically fires asynchronously after Wearables webhook ingestion.

## [Phase 18] - 2026-08-07### Added
- **Phase 18**: Overhauled the OSS dashboard (`ui-core`) to stream live vitals data using a native WebSocket client instead of polling.
- **Phase 18**: Centralized API and WebSocket URLs using dynamic `.env` configuration.
- **Phase 17 CI/CD**: Added GitHub Actions workflow (`.github/workflows/ci.yml`) to automatically enforce linting, building, and caching via Turborepo on all pull requests and merges to `main`.
- **Wearables SDK Completion**: Fully implemented real OAuth token exchange and data fetching for Oura and Whoop cloud adapters.
- **Native iOS WebSocket**: Implemented native `URLSessionWebSocketTask` in `AgevineHealthKit.swift` to stream `HKQuantityTypeIdentifier.heartRate` samples to the API Gateway.
- **Native Android Flow**: Implemented `HealthConnectClient.readRecords` polling loop within a coroutine flow in `AgevineHealthConnect.kt`.
- **UI Synchronization**: Stripped out experimental glassmorphism styling and completely synchronized the OSS `ui-core` dashboard and the SaaS dashboard with standard flat-card design and Agevine branding.
- **Source Control**: Added a root `.gitignore` to prevent `node_modules` and build folders across the entire monorepo from being tracked by git, fixing the 10k pending changes issue.
- **Phase 16**: Upgraded `@agevine/wearables` SDK with native mobile modules for iOS (`AgevineHealthKit.swift`) and Android (`AgevineHealthConnect.kt`).
- **Phase 16**: Added `OuraAdapter`, `WhoopAdapter`, and `GarminAdapter` for standardized OAuth data aggregation.
- **Phase 16**: Implemented real-time WebSocket EKG streaming in the SDK and upgraded API Gateway to act as a WebSocket Server using `ws`.
- **Phase 14**: Added dynamic `PatientSelector` dropdown to the dashboard to switch context between different patients.
- **Phase 14**: Extended `patients` schema with `doctorEmail`, `deviceBattery`, and `deviceStatus` to eliminate mock data.
- **Phase 13**: Integrated real API Gateway data into the Dashboard Overview UI (`GET /api/vitals` and `GET /api/vitals/history`).
- **Phase 15**: Upgraded `@agevine/voice` SDK to support Text-to-Speech (TTS) integration with an extensible `TTSAdapter` interface.
- Added `OpenAIVoiceAdapter` to generate photorealistic AI speech.
- Added `POST /api/v1/voice/synthesize` endpoint to API Gateway to stream dynamic MP3 audio to the dashboard.
- Replaced the browser's native `window.speechSynthesis` with a real HTML5 `<audio>` player inside the dashboard's AI Voice Check-in Card.

- Initialized `.gitignore`, `LICENSE` (AGPL-3.0), and `.npmignore`.

### Changed
- Migrated out of the root repository to isolate the OSS layer from proprietary models.

### Fixed
- Replaced `ts-node` with `tsx` to ensure compatibility with Node.js v24.
