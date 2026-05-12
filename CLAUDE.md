# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start the dev server (choose iOS/Android/web from the menu)
pnpm start

# Run on physical iPhone
npx expo run:ios --device

# Run on specific platforms
pnpm ios
pnpm android
pnpm web

# Lint
pnpm lint
```

There is no test suite in this project.

## Environment

Copy `.env` and set `EXPO_PUBLIC_API_URL` to the local IP of the backend server (e.g. `http://192.168.1.119:3000`). `localhost` won't work on physical devices or emulators — use the machine's LAN IP.

## Architecture

This is an **Expo Router** (file-based routing) React Native app for a spinning/cycling studio. It targets iOS, Android, and web.

### Routing structure

```
app/
  _layout.tsx              # Root: wraps QueryClientProvider, AuthProvider, ThemeProvider
  login.tsx
  signup.tsx
  (protected)/
    _layout.tsx            # Guards all children — redirects to /login if not authenticated
    (tabs)/
      _layout.tsx          # Bottom tab bar; "Manage" tab is hidden for USER role
      (bookings)/          # User's upcoming bookings + booking detail
      rides/               # Browse & book rides
      manage/              # INSTRUCTOR/ADMIN ride management (create, edit, check-in)
      account.tsx
```

### Auth

Auth is handled by **Better Auth** (`better-auth` + `@better-auth/expo`). The auth client lives in `auth/auth.config.ts` and is configured to persist sessions via `expo-secure-store`. The `AuthContext` (`context/authContext.tsx`) wraps the whole app and exposes `user`, `isLoggedIn`, `logIn`, `logOut`, and `signUp`. The protected layout reads `AuthContext` to gate access; the splash screen stays visible until `isReady` is true (session restore is complete).

The `User` type carries a `role` field (`USER | INSTRUCTOR | ADMIN | SUPER_ADMIN`) that controls tab visibility and feature access throughout the app.

### API layer

`lib/api.ts` exports a single typed `api<T>(path, options)` helper. It reads `EXPO_PUBLIC_API_URL`, attaches a Bearer token from the Better Auth session, and throws on non-2xx responses. All feature-level API calls go through this helper.

### Feature modules

Data-fetching logic is colocated under `features/<domain>/`:

- `services/<domain>.api.ts` — raw fetch calls using `lib/api.ts`
- `hooks/use<Domain>.ts` — TanStack Query `useQuery`/`useMutation` wrappers

Domains: `rides`, `bookings`, `studios`, `user`.

Query keys follow a loose string convention (e.g. `"rides"`, `"ride-${id}-bookings"`). There is a known TODO to standardize them.

### Styling

Styling uses **NativeWind** (Tailwind CSS for React Native). Use `className` props with Tailwind utilities. The `ThemedText` component (`components/ThemedText.tsx`) reads the React Navigation theme to apply the correct text color automatically — prefer it over plain `<Text>`. For cases where a specific color is needed, pass the `color` prop.

Dark/light mode is driven by `useColorScheme` from `hooks/use-color-scheme.ts`.
