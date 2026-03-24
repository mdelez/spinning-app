import { authClient } from "@/auth/auth.config";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

type ApiOptions = RequestInit & {
  requireAuth?: boolean;
};

export async function api<T>(
  path: string,
  options: ApiOptions = {}
): Promise<T> {
  const { requireAuth = true, ...fetchOptions } = options;

  let headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers || {}),
  };

  if (requireAuth) {
    // Get session from Better Auth
    const session = await authClient.getSession();
    const token = session.data?.session.token;

    if (!token) {
      throw new Error("No access token found. User is not authenticated.");
    }

    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }

  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json();
}