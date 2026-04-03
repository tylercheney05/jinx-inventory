# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Vite, proxies /api → http://localhost:8000)
npm run build     # Type-check + production build
npm run lint      # ESLint
npx tsc --noEmit  # Type-check only
```

No test runner is configured.

## Architecture

This is a React + TypeScript + Vite frontend that talks to a Django REST Framework backend running at `http://localhost:8000`. The Vite dev server proxies all `/api/*` requests to the backend — there is no Express middleware layer.

### State & data fetching

There are two distinct patterns in use:

**RTK Query (`src/services/`)** — used for all resource APIs. Each service file calls `createApi` with `baseQueryWithReauth` from `src/services/baseQuery.ts`, defines endpoints, and exports auto-generated hooks. The base query reads the Bearer token from Redux state via `prepareHeaders` and handles 401s by attempting a token refresh before retrying. New resource APIs belong here.

**Redux slices (`src/features/`)** — used only for global state that components need to `useSelector` from. Currently only `user.ts` lives here, managing auth state (tokens, user profile, loading). Prefer RTK Query for anything that doesn't need to be globally selected.

### Auth flow

- On app load, `checkAuth` thunk runs — reads `accessToken` from `sessionStorage` and `refreshToken` from `localStorage`, dispatches `setTokens`, then calls `GET /api/users/me`
- The axios instance in `src/lib/axios.ts` handles token refresh for non-RTK-Query calls (currently only used internally during auth). RTK Query calls go through `src/services/baseQuery.ts` which has its own refresh logic
- `ProtectedRoute` checks `isAuthenticated` from Redux; null = still loading (shows spinner), false = redirect to `/login`

### Adding a new resource API

1. Add TypeScript interfaces to `src/types/<resource>.ts`
2. Create `src/services/<resource>.ts` with `createApi`, add `tagTypes` if list+create endpoints need cache invalidation
3. Register the API's reducer and middleware in `src/store.ts`

### UI components

Shadcn-style components live in `src/components/ui/`. Forms use react-hook-form + zod (`zodResolver`) throughout — see `LoginPage.tsx` for the standard pattern. Toast notifications use `react-toastify`; `<ToastContainer>` is mounted once in `App.tsx`, call `toast.success()` / `toast.error()` anywhere.

Path alias `@/` maps to `src/`.
