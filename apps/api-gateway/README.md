# Agevine API Gateway

This is the core backend service for the Agevine Open-Source ecosystem. It is a lightweight, clinical-grade Express server built with TypeScript, handling all data ingestion from wearables and voice engines.

## Tech Stack
- **Framework:** Express.js
- **Language:** TypeScript (executed via `tsx`)
- **Database:** PostgreSQL (via Drizzle ORM)

## Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Ensure you have a `.env` file containing your `DATABASE_URL`. By default, it connects to the local Docker Compose instance:
   ```env
   DATABASE_URL="postgres://postgres:postgrespassword@localhost:5432/agevine"
   ```

3. **Database Migrations:**
   Whenever you update `src/db/schema.ts`, run the following commands to push changes to your database:
   ```bash
   npx drizzle-kit generate
   npx drizzle-kit push
   ```

4. **Start the Server:**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3001` with hot-reloading enabled.

## ⚡ 1-Click Installation (Docker)

The absolute easiest way to get Agevine running on your own server (or locally) is using Docker Compose. It automatically spins up the PostgreSQL database, the Node.js API Gateway, and the Next.js Dashboard.

```bash
# Clone the repository
git clone https://github.com/agevine/agevine.git
cd agevine

# Boot up the entire stack
docker-compose up -d
```

That's it! 
- Your dashboard is now live at `http://localhost:3000`
- Your API Gateway is now live at `http://localhost:3001`

**Default Admin Password**: `agevine`
