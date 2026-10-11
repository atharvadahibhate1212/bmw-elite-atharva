# BMW ELITE — Full-Stack Showroom

A responsive BMW-inspired showroom demo built with React + Vite + TypeScript and an Express API. It includes a vehicle catalogue, search/filtering, vehicle details, comparison, configurator, test-drive enquiries, and a lightweight admin dashboard.

> Independent portfolio/demo project. Not affiliated with BMW AG. Prices/specifications in the seeded data are illustrative demo values and must be verified before public commercial use.

## Requirements
- Node.js 20+
- npm
- Optional: MongoDB Atlas connection string for persistent database storage

## Run locally

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
API runs at `http://localhost:4000`. Without `MONGODB_URI`, it runs with demo data in memory. In-memory changes reset when the server restarts.

### 2. Frontend
In another terminal:
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
Open the URL printed by Vite (usually `http://localhost:5173`).

## MongoDB persistence
Add a valid `MONGODB_URI` to `server/.env`. The API connects to MongoDB and seeds sample vehicles if the collection is empty. Do not commit `.env`.

## Deploy
- **Frontend on Vercel:** import the repository, set Root Directory to `client`, Framework Preset to Vite, Build Command `npm run build`, Output Directory `dist`, and Environment Variable `VITE_API_URL` to your deployed API URL (for example `https://your-api.example.com/api`).
- **Backend:** deploy the `server` folder to a Node.js host. Build Command `npm install && npm run build`; Start Command `npm start`. Configure `MONGODB_URI`, `CLIENT_ORIGIN`, and `PORT` in the host's environment settings.
- Add your real production domain to `CLIENT_ORIGIN` and update `VITE_API_URL`.

## Included API routes
- `GET /api/health`
- `GET /api/vehicles`
- `GET /api/vehicles/:id`
- `GET /api/vehicles/featured`
- `POST /api/bookings`
- `GET /api/bookings` (demo/admin view)
- `GET /api/admin/stats`

## Important production work
Before real-world use, add proper administrator authentication/authorization, email delivery, rate limiting, robust booking-slot management, production logging, privacy/consent handling, and verified market-specific vehicle data. The admin area in this starter is a portfolio demo and is not a secure dealership management system.
