import { api } from "@/lib/api";
import { Bike, Session } from "@/types/spinning.types";

export async function getSessions(): Promise<Session[]> {
  return api("/sessions");
}

export async function getSessionById(id: string): Promise<Session> {
  return api(`/sessions/${id}`);
}

export async function getAvailableBikeForSessionById(id: string): Promise<Bike[]> {
  return api(`/sessions/${id}/available-bikes`);
}

export async function createSession(sessionData: Partial<Session>): Promise<Session> {
  return api("/sessions", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
}

export async function updateSession(id: string, sessionData: Partial<Session>): Promise<Session> {
  return api(`/sessions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(sessionData),
  });
}