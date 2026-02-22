import { Bike, Session } from "@/types/spinning.types";
import { useQuery } from "@tanstack/react-query";
import { getAvailableBikeForSessionById, getSessionById, getSessions } from "../services/sessions.api";

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

export function useGetAvailableBikes(id: string) {
  return useQuery<Bike[]>({
    queryKey: ["sessions", id, "available-bikes"],
    queryFn: () => getAvailableBikeForSessionById(id),
    enabled: !!id, // only run if id exists
  });
}