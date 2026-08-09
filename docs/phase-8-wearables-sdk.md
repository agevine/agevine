# Phase 8: Wearables SDK Initialization

## Overview
Phase 8 marked the beginning of the `@agevine/wearables` SDK, designed to abstract away the complexity of IoT integrations.

## Key Changes
- **Package Setup**: Bootstrapped the `packages/wearables` directory as a TypeScript module inside the monorepo.
- **Core Client**: Developed the `AgevineClient` class with basic HTTP REST sync methods for sending `heartRate` and `steps`.
- **Mock Adapters**: Created initial interface contracts and mock adapters for testing the data flow before integrating real hardware.
