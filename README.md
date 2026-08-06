<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/leaf.svg" width="80" height="80" alt="Agevine Logo">
  
  # Agevine (OSS)
  **The open-source operating system for eldercare AI.**

  [![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)
  [![NPM Voice SDK](https://img.shields.io/npm/v/@agevine/voice?label=%40agevine%2Fvoice)](https://www.npmjs.com/package/@agevine/voice)
  [![NPM Wearables SDK](https://img.shields.io/npm/v/@agevine/wearables?label=%40agevine%2Fwearables)](https://www.npmjs.com/package/@agevine/wearables)
</div>

<br />

<div align="center">
  <img src="./dashboard-preview.png" alt="Agevine Dashboard Preview" style="border-radius: 8px; max-width: 100%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);" />
</div>

Agevine is a modern, open-source platform designed to unify health data from **smartwatches** and **AI Voice Callers** into a single, beautifully designed dashboard. 

It is built for families and independent caregivers who want complete ownership over their loved ones' health data without relying on expensive, proprietary SaaS solutions.

---

## ⚡ 1-Click Installation (Docker)

The absolute easiest way to get Agevine running on your own server (or locally) is using Docker Compose. It automatically spins up the PostgreSQL database, the Node.js API Gateway, and the Next.js Dashboard.

```bash
# Clone the repository
git clone https://github.com/yourusername/agevine-oss.git
cd agevine-oss/oss

# Boot up the entire stack
docker-compose up -d
```

That's it! 
- Your dashboard is now live at `http://localhost:3000`
- Your API Gateway is now live at `http://localhost:3001`

**Default Admin Password**: `agevine`

---

## 🏗️ Architecture

Agevine relies on a powerful "push" architecture. Instead of pulling from 10 different fragmented APIs, Agevine provides two simple NPM packages that you can drop into any app to push data directly into your self-hosted dashboard.

```mermaid
graph TD;
    A[Apple Watch / Fitbit] -->|"@agevine/wearables"| C(Agevine API Gateway);
    B[Retell AI / Vapi AI Caller] -->|"@agevine/voice"| C;
    C -->|"Drizzle ORM"| D[(PostgreSQL)];
    D --> E[Agevine Next.js Dashboard];
```

---

## 📦 The SDKs

Agevine comes with two MIT-licensed Node.js SDKs for integrating your devices.

### `@agevine/wearables`
Use this SDK in your companion apps to stream live IoT vitals.
```typescript
import { AgevineWearableClient } from '@agevine/wearables';

const client = new AgevineWearableClient({ endpoint: 'http://localhost:3001' });
await client.logVitals({ patientId: 1, heartRate: 72, steps: 3500 });
```

### `@agevine/voice`
Use this SDK in your AI Voice webhook handlers (like Retell AI or Bland AI).
```typescript
import { AgevineVoiceClient } from '@agevine/voice';

const client = new AgevineVoiceClient({ endpoint: 'http://localhost:3001' });
await client.logCall({ patientId: 1, sentimentScore: 85, summary: "Feeling well." });
```

---

## 📖 Documentation

For detailed guides on how to build custom hardware integrations or deploy Agevine to production on AWS/Render, check out our [Documentation Site](/docs).

## 📄 License
The Agevine core platform (Dashboard and API) is licensed under **AGPLv3**. 
The Agevine SDKs (`@agevine/voice` and `@agevine/wearables`) are licensed under **MIT** so you can safely integrate them into proprietary applications.
