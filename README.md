# Agevine OSS (Open Source Core)

Welcome to the **Agevine Open Source** repository. This repository contains the foundational building blocks for a clinical-grade, AI-native elder care coordination platform.

Agevine is built to bridge the gap between families and their aging parents at home by utilizing standard devices (like Apple Watches and voice calls) instead of relying on intrusive hardware or cameras.

## 🚀 Features (In Development)
- **API Gateway:** The central nervous system that ingests wearable data, manages patients, and handles Twilio voice transcripts.
- **UI Core:** The Family Dashboard built with Next.js and Tailwind CSS for adult children to monitor their parents' health and coordinate care.
- **Wearables SDK (Coming Soon):** Open-source libraries to ingest vitals from Garmin and Apple Health.

## 🏗️ Architecture Stack
- **Language:** TypeScript
- **Backend:** Node.js / Express
- **Database:** PostgreSQL (Self-hosted via Docker)
- **ORM:** Drizzle ORM
- **License:** AGPL-3.0 (Ensuring data sovereignty and preventing malicious commercial forks).

## 🛠️ Quick Start

To run the open-source infrastructure on your local machine:

### 1. Start the Database
Ensure you have Docker installed, then run the database container:
```bash
docker compose up -d
```

### 2. Start the API Gateway
Navigate to the API Gateway folder to install dependencies and run migrations:
```bash
cd api-gateway
npm install
npx drizzle-kit push
npm run dev
```

The gateway will now be listening for health data on port 3001!

### 3. Start the UI Dashboard
Navigate to the UI Core folder to start the Next.js frontend:
```bash
cd ui-core
npm run dev
```

The Family Dashboard will be available at http://localhost:3000!

---

*Agevine is built on an Open-Core model. By open-sourcing our API and SDKs, we guarantee absolute transparency and data sovereignty for families. For our proprietary predictive AI models (SaaS), visit our official website.*
