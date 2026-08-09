# Agevine UI Core (Family Dashboard)

This is the frontend Next.js application that serves as the primary dashboard for families and adult children to monitor their parents' health and coordinate care.

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** tailwind 

## Development Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3001`.

## Design Philosophy

To maintain the premium, clinical-grade trust of the Agevine platform, this application strictly uses custom Vanilla CSS rather than generic component libraries. 

Key design tokens (like `--glass-bg` and `--brand-primary`) are defined in `src/app/globals.css`. Always utilize the `.glass-panel` utility class for metric cards and containers to maintain consistent styling.

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
- Your dashboard is now live at `http://localhost:3001`
- Your API Gateway is now live at `http://localhost:3005`

**Default Admin Password**: `agevine`
