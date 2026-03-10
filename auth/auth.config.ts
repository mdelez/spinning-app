import { expoClient } from '@better-auth/expo/client';
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: 'http://192.168.1.119:3000', // Your Better Auth backend URL
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: 'spinningapp', // Your app's scheme (defined in app.json)
      storagePrefix: 'spinningapp', // A prefix for storage keys
      storage: SecureStore, // Pass SecureStore for token storage
    }),
  ],
});