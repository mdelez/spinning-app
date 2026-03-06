import { api } from "@/lib/api";
import { Bike, CreateSessionInput, Session, UpdateSessionInput } from "@/types/spinning.types";

export async function getGetSessions(params?: { instructorId: string }): Promise<Session[]> {
  if (!params) {
    return api("/sessions");
  } else {
    return api(`/sessions?instructorId=${params.instructorId}`)
  }
}

export async function getSessionById(id: string): Promise<Session> {
  return api(`/sessions/${id}`);
}

export async function getSessionsByInstructor(id: string): Promise<Session[]> {
  return api(`/sessions?instructorId=${id}`);
}

export async function getAvailableBikeForSessionById(id: string): Promise<Bike[]> {
  return api(`/sessions/${id}/available-bikes`);
}

export async function createSession(sessionData: CreateSessionInput): Promise<Session> {
  return api("/sessions", {
    method: "POST",
    body: JSON.stringify(sessionData),
  });
}

export async function updateSession(id: string, sessionData: UpdateSessionInput): Promise<Session> {
  return api(`/sessions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(sessionData),
  });
}

export async function deleteSession(id: string): Promise<void> {
  return api(`/sessions/${id}`, {
    method: "DELETE",
  })
}