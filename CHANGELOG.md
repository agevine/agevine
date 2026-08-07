# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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

## [0.0.1] - 2026-08-05

### Added
- Scaffolded `ui-core` Family Dashboard with Next.js and Tailwind CSS.
- Initial monorepo scaffolding for the Agevine Open-Source core.
- Set up `api-gateway` with TypeScript, Express, and `tsx` execution.
- Added `landing-page` basic structure.
- Initialized `.gitignore`, `LICENSE` (AGPL-3.0), and `.npmignore`.

### Changed
- Migrated out of the root repository to isolate the OSS layer from proprietary models.

### Fixed
- Replaced `ts-node` with `tsx` to ensure compatibility with Node.js v24.
