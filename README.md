# instaNeeds

InstaNeeds is a grocery delivery application with a React frontend and an Express/MongoDB backend. Users can browse products and categories, create accounts, authenticate with access and refresh tokens, manage a cart, and create orders.

## Project Structure

```text
instaNeeds/
├── backend/     Express API, MongoDB models, authentication, cart and order APIs
├── frontend/    React, Vite, Tailwind CSS and TanStack Query client
└── README.md
```

## Requirements

- Node.js 20 or newer
- pnpm
- MongoDB database

## Setup

Install dependencies separately in both applications:

```bash
cd backend
pnpm install

cd ../frontend
pnpm install
```

Create the backend environment file `backend/.env.development.local` and the frontend environment file `frontend/.env` as described in their respective READMEs.

Seed the database after configuring MongoDB:

```bash
cd backend
node src/database/categorySeed.js
node src/database/seed.js
```

Run the applications in separate terminals:

```bash
cd backend
pnpm dev
```

```bash
cd frontend
pnpm dev
```

The frontend normally runs at `http://localhost:5173`. The API normally runs at the backend port configured in `PORT`.

## Documentation

- [Frontend README](frontend/README.md)
- [Backend README](backend/README.md)

## Current Scope

- Product and category browsing
- Featured products
- User sign-up, sign-in, sign-out and refresh-token authentication
- Protected cart operations
- Order creation and user order access
- Admin-protected product and category management routes
- Consistent JSON API error responses

## Planned Work

- Complete admin order-management endpoints
- Complete category deletion behavior
- Add payment processing
- Add automated backend and frontend tests