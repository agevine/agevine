# Getting Started with Agevine OSS

Welcome to the Agevine Open-Source repository! This repository contains the foundational components for running a self-hosted elder care coordination platform.

## Prerequisites
- Node.js (v20 or higher is recommended, v24 is supported).
- npm, pnpm, or yarn.

## Running the API Gateway
The API Gateway is the central nervous system of Agevine, handling incoming data from wearables and voice interactions.

1. Navigate to the API gateway directory:
   ```bash
   cd api-gateway
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on port 3001):
   ```bash
   npm run dev
   ```

## Running the UI Core Dashboard
The Family Dashboard is the primary web interface built with Next.js and Tailwind CSS.

1. Navigate to the UI Core directory:
   ```bash
   cd ui-core
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server (runs on port 3000):
   ```bash
   npm run dev
   ```

## Next Steps
- We will be migrating this to a Turborepo structure to link the UI and API seamlessly.
