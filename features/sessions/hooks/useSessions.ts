import { Session } from "@/features/sessions.types";
import { useQuery } from "@tanstack/react-query";
import { getSessionById, getSessions } from "../services/sessions.api";

export function useSessions() {
  return useQuery<Session[]>({
    queryKey: ["sessions"],
    queryFn: getSessions,
  });
}

export function useSession(id: string) {
  return useQuery<Session>({
    queryKey: ["sessions", id],
    queryFn: () => getSessionById(id),
    enabled: !!id, // only run if id exists
  });
}