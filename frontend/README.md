# InstaNeeds Frontend

The frontend is a React single-page application built with Vite. It uses React Router for navigation, TanStack Query for server state, Axios for API requests, React Hook Form for forms, and Tailwind CSS with DaisyUI for styling.

## Requirements

- Node.js 20 or newer
- pnpm
- A running InstaNeeds backend

## Install and Run

```bash
pnpm install
pnpm dev
```

Build and lint the application with:

```bash
pnpm build
pnpm lint
```

## Environment Variables

Create `frontend/.env`:

```env
VITE_SERVER_URL=http://localhost:8000/api/v1
```

`VITE_SERVER_URL` must include the backend API prefix. Vite exposes only variables beginning with `VITE_` to browser code.

## Application Structure

```text
src/
├── components/       Reusable UI components
├── context/           Auth and cart providers
├── hooks/             React Query and application hooks
├── lib/               Axios client, environment and shared utilities
├── pages/             Route-level screens
├── queryOptions/      TanStack Query configuration
├── routes/            React Router configuration
└── services/          API service functions
```

## Authentication

The frontend sends the access token as a bearer token. The backend stores the refresh token in an HTTP-only cookie. The shared Axios client retries eligible `401` responses through `/auth/refresh` and forwards login or refresh errors to the caller.

All API errors can be read from Axios errors using:

```js
error.response?.status
error.response?.data?.message
error.response?.data?.data
```

The shared `getApiErrorMessage` helper provides a safe fallback for UI messages.

## API Usage

Use the shared client from `src/lib/axios.js` for application requests:

```js
import api from "@/lib/axios";

const response = await api.get("/products");
return response.data.data;
```

Do not create separate Axios clients for regular API calls, because that bypasses the shared authorization and refresh behavior.

## Main Routes

- `/` home page
- `/products` product listing and search
- `/products/:id` product details
- `/signin` sign-in
- `/signup` sign-up
- `/cart` protected cart page
- `/checkout` protected checkout page

## Error Handling

Query pages expose loading and error states. Mutations display API messages through toast notifications. Backend errors use the common shape:

```json
{
	"success": false,
	"message": "A useful error message",
	"data": null
}
```