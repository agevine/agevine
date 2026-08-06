# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
