# Phase 13: Dashboard API Integration

## Overview
Phase 13 focused on wiring up the static dashboard UI to the real API Gateway. This transitioned the dashboard from a visual mockup to a functional data consumer.

## Key Changes
- **Vitals Integration**: Replaced hardcoded vitals metrics with a live `GET /api/vitals` fetch to display current heart rate, steps, and battery levels.
- **Vitals History**: Implemented `GET /api/vitals/history` integration into the `VitalsChart` component to plot the last 12 readings for heart rate and steps using Recharts.
- **Error Boundaries**: Added graceful fallback states and "Offline" indicators if the API Gateway cannot be reached or the database is empty.
