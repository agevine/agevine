# Phase 14: Patient Context Management

## Overview
Phase 14 introduced multi-patient support, allowing the dashboard to cleanly switch context between different family members or patients.

## Key Changes
- **Patient Selector**: Built the dynamic `PatientSelector` dropdown component for the Topbar/Header to switch context instantly.
- **Database Schema Expansion**: Extended the `patients` schema in `api-gateway` to include critical real-time status fields:
  - `doctorEmail`: For the one-click Contact Doctor functionality.
  - `deviceBattery`: For live battery monitoring.
  - `deviceStatus`: To easily track if a wearable is "Online" or "Offline".
- **Dynamic Routing**: Updated dashboard fetch logic to append `?patientId={id}` parameters to all API calls based on the active selection in the context state.
