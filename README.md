# BMW Elite — Luxury Car Showroom Website

BMW Elite is a modern car showroom web application inspired by BMW's premium design. It aims to give visitors an engaging way to explore vehicles, view car details, and interact with showroom booking features through a responsive interface.

> **Project status:** The frontend is deployed on Vercel. Backend and database features require the API server and MongoDB configuration to be available.

## Features

- Modern, luxury-inspired showroom interface
- Responsive design for desktop and mobile screens
- Vehicle browsing and car detail views
- Search and filtering for vehicles (where implemented)
- Booking or test-drive request interface (where implemented)
- React component-based frontend
- Express API and MongoDB integration in the project backend

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- HTML5 and CSS3
- Lucide React icons
- Framer Motion

### Backend
- Node.js
- Express.js
- TypeScript
- Mongoose
- Zod for request validation

### Database
- MongoDB

### Tools and Deployment
- Git and GitHub
- Vercel

## Project Structure

```text
bmw-elite-atharva/
└── bmv project/
    ├── api/
    │   └── index.ts
    ├── client/
    │   ├── src/
    │   ├── index.html
    │   ├── package.json
    │   └── vite.config.ts
    ├── server/
    │   ├── src/
    │   └── package.json
    ├── vercel.json
    └── README.md
```

## Live Demo

[Open BMW Elite](https://bmw-elite-atharva-client-d4cn-git-main-atharva-project1.vercel.app/)

If the link asks visitors to sign in, review the Vercel project's Production deployment protection and public domain settings.

## Run the Frontend Locally

### Prerequisites
- Node.js (LTS recommended)
- npm

1. Open a terminal in the frontend directory:

   ```bash
   cd "bmv project/client"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the Vite development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in the terminal (typically `http://localhost:5173`).

5. Create a production build:

   ```bash
   npm run build
   ```

## Run the Backend Locally

1. Open a second terminal in the backend directory:

   ```bash
   cd "bmv project/server"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory. Add your own MongoDB connection string locally:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   ```

   Replace the placeholder with your own connection string. **Never commit `.env` files, database passwords, or secret keys to GitHub.**

4. Start the backend in development mode:

   ```bash
   npm run dev
   ```

5. If configured successfully, the API health endpoint is usually available at `http://localhost:4000/api/health`.

## API Overview

The backend is designed to provide endpoints for features such as:

- `GET /api/health` — check API status and database mode
- `GET /api/vehicles` — retrieve vehicle listings
- `GET /api/vehicles/featured` — retrieve featured vehicles
- `GET /api/vehicles/:id` — retrieve a vehicle by ID
- `POST /api/bookings` — submit a booking request
- `GET /api/admin/stats` — retrieve admin statistics

Availability depends on the backend being running and configured correctly.

## Environment Variables

Configure environment variables in your local `.env` file or hosting provider's project settings.

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string used by the backend |
| `PORT` | Local backend port (commonly `4000`) |
| `CLIENT_ORIGIN` | Optional comma-separated allowed frontend origin(s) for CORS |

Do not include real credentials in this README or in source control.

## Deployment Notes

- The frontend can be deployed separately as a Vite application.
- API-powered functionality requires a reachable backend and correct API base URL.
- If frontend and backend are deployed separately, configure the frontend API URL and backend CORS origins accordingly.
- Configure environment variables in the hosting dashboard, not in committed source files.
- Test the production URL in a private/incognito window and on another device before sharing it.

## Skills Demonstrated

- Frontend development with React and TypeScript
- Responsive user interface design
- API integration
- Backend development with Express
- MongoDB data access with Mongoose
- Form and request validation
- GitHub version control and deployment workflows

## Future Improvements

- Complete end-to-end booking flow
- Add richer vehicle specifications and comparison
- Improve loading, empty, and error states
- Add secure authentication and role-based access if needed
- Add automated tests and accessibility improvements

## Disclaimer

This is an independent educational portfolio project inspired by BMW's luxury showroom experience. It is not an official BMW website and is not affiliated with or endorsed by BMW. Vehicle names, trademarks, and logos belong to their respective owners.

---

**Built as a web development portfolio project.**
