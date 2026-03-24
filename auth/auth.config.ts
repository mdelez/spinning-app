import { expoClient } from '@better-auth/expo/client';
import { inferAdditionalFields } from "better-auth/client/plugins";
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
    inferAdditionalFields({
      user: {
        firstName: {
          type: "string",
          required: true
        },
        lastName: {
          type: "string",
          required: true
        },
        shoeSize: {
          type: "number",
          required: true
        },
        role: {
          type: ["USER", "INSTRUCTOR", "ADMIN"],
          required: false,
        }
      }
    })
  ],
});