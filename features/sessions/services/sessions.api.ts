import { Session } from "@/features/sessions.types";
import { api } from "@/lib/api";

export async function getSessions(): Promise<Session[]> {
  return api("/sessions");
}

export async function getSessionById(id: string): Promise<Session> {
  return api(`/sessions/${id}`);
}

// Example: create a new session
export async function createSession(sessionData: Partial<Session>): Promise<Session> {
  return api("/sessions", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
}

// Example: update a session
export async function updateSession(id: string, sessionData: Partial<Session>): Promise<Session> {
  return api(`/sessions/${id}`, {
    method: "PUT",
    body: JSON.stringify(sessionData),
  });
}