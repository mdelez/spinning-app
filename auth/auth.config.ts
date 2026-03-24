import { expoClient } from '@better-auth/expo/client';
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from 'better-auth/react';
import * as SecureStore from 'expo-secure-store';

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  disableDefaultFetchPlugins: true,
  plugins: [
    expoClient({
      scheme: 'spinningapp',
      storagePrefix: 'spinningapp',
      storage: SecureStore,
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