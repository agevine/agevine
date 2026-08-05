# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2026-08-05

### Added
- Initial monorepo scaffolding for the Agevine Open-Source core.
- Set up `api-gateway` with TypeScript, Express, and `tsx` execution.
- Added `landing-page` basic structure.
- Initialized `.gitignore`, `LICENSE` (AGPL-3.0), and `.npmignore`.

### Changed
- Migrated out of the root repository to isolate the OSS layer from proprietary models.

### Fixed
- Replaced `ts-node` with `tsx` to ensure compatibility with Node.js v24.
