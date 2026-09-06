# InstaNeeds Backend

The backend is an Express API backed by MongoDB and Mongoose. It provides authentication, product, category, cart, user and order endpoints.

## Requirements

- Node.js 20 or newer
- pnpm
- MongoDB

## Install and Run

```bash
pnpm install
pnpm dev
```

The server listens on the port configured by `PORT`. The root health response is available at `GET /`.

## Environment Variables

Create `backend/.env.development.local`:

```env
PORT=8000
NODE_ENV=development
DB_URI=mongodb://127.0.0.1:27017
DB_NAME=instaNeeds
CLIENT_URL=http://localhost:5173
JWT_SECRET=replace-me
JWT_ACCESS_SECRET=replace-me
JWT_REFRESH_SECRET=replace-me
JWT_EXPIRE_IN=15m
ACCESS_TOKEN_EXPIRE_IN=15m
REFRESH_TOKEN_EXPIRE_IN=7d
```

Use long, unique secrets outside local development. The environment module validates all required variables at startup.

## Database Seeding

Run the seed scripts from the `backend` directory after MongoDB is available:

```bash
node src/database/categorySeed.js
node src/database/seed.js
```

The scripts update existing records by name/title and create missing records.

## API Base URL

All application routes are mounted under:

```text
/api/v1
```

For local development, examples use `http://localhost:8000/api/v1`.

## Endpoints

### Authentication

| Method | Endpoint | Auth |
| --- | --- | --- |
| POST | `/auth/signup` | Public |
| POST | `/auth/signin` | Public |
| GET | `/auth/me` | Access token |
| POST | `/auth/refresh` | Refresh cookie |
| POST | `/auth/signout` | Refresh cookie |
| POST | `/auth/signout-all` | Refresh cookie |

### Products and Categories

| Method | Endpoint | Auth |
| --- | --- | --- |
| GET | `/products` | Public |
| GET | `/products/featured` | Public |
| GET | `/products/:id` | Public |
| GET | `/products/category/:category` | Public |
| POST | `/products` | Admin |
| PUT | `/products/:id` | Admin |
| DELETE | `/products/:id` | Admin |
| POST | `/products/bulk` | Admin |
| GET | `/categories` | Public |
| GET | `/categories/:id` | Public |
| POST | `/categories` | Admin |
| DELETE | `/categories` | Admin |

### Cart, Users and Orders

| Method | Endpoint | Auth |
| --- | --- | --- |
| GET | `/cart` | Access token |
| POST | `/cart` | Access token |
| DELETE | `/cart` | Access token |
| DELETE | `/cart/clear` | Access token |
| GET | `/users` | Access token, admin |
| GET | `/users/:id` | Access token |
| POST | `/orders/create` | Access token |
| GET | `/orders/user/:id` | Access token, owner |
| GET | `/orders/:orderId` | Access token, owner |

Prefix each endpoint with `/api/v1`, for example `GET /api/v1/products`.

## Response Contract

Successful responses and errors use the same envelope:

```json
{
	"success": true,
	"message": "products found",
	"data": {}
}
```

Errors use an appropriate HTTP status and this shape:

```json
{
	"success": false,
	"message": "Invalid email or password",
	"data": null
}
```

Common statuses are `400` for invalid input, `401` for missing or invalid authentication, `403` for insufficient permissions, `404` for missing resources, `409` for conflicts, and `500` for unexpected server failures.

Unhandled errors and unknown routes are normalized by the global middleware in `src/middleware/error.middleware.js`.

## Backend Structure

```text
src/
├── config/       Environment and database configuration
├── controllers/  Request handlers
├── database/     Seed data and seed scripts
├── middleware/   Authentication, authorization, rate limit and errors
├── models/       Mongoose models
├── routes/       Express route definitions
├── utils/        API response and authentication helpers
├── app.js        Express application setup
└── server.js     Database connection and server startup
```

## Development Notes

- CORS is configured for `CLIENT_URL` and credentials are enabled for refresh cookies.
- Access tokens are sent in the `Authorization: Bearer <token>` header.
- Refresh tokens are HTTP-only cookies and are rotated by `/auth/refresh`.
- `pnpm test` is not implemented yet.
