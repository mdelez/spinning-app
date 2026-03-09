import { Bike, Booking, Session, UpdateSessionInput } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSession, deleteSession, getAvailableBikeForSessionById, getGetSessions, getSessionBookings, getSessionById, updateSession } from "../services/sessions.api";

// TODO: fix query keys
export function useGetSessions(params?: { instructorId: string }) {
  const queryKey = params?.instructorId? `sessions-instructor-${params.instructorId}` : "sessions";
  return useQuery<Session[]>({
    queryKey: [queryKey],
    queryFn: () => getGetSessions(params),
  });
}

export function useGetSession(id: string) {
  return useQuery<Session>({
    queryKey: ["session", id],
    queryFn: () => getSessionById(id),
    enabled: !!id, // only run if id exists
  });
}

export function useGetSessionBookings(id: string) {
  const queryKey = `session-${id}-bookings`;
  return useQuery<Booking[]>({
    queryKey: [queryKey],
    queryFn: () => getSessionBookings(id),
    enabled: !!id
  });
}

// export function useGetSessionsByInstructor(instructorId: string) {
//   return useQuery<Session[]>({
//     queryKey: ["sessions-instructor", instructorId],
//     queryFn: () => getSessionsByInstructor(instructorId),
//     enabled: !!instructorId
//   });
// }

export function useGetAvailableBikesForSession(id: string) {
  return useQuery<Bike[]>({
    queryKey: ["session-", id, "-available-bikes"],
    queryFn: () => getAvailableBikeForSessionById(id),
    enabled: !!id, // only run if id exists
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['sessions-instructor-', data.instructor.id]
      })
    }
  })
}

export function useUpdateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: UpdateSessionInput }) => updateSession(id, updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['sessions-instructor-', data.instructor.id]
      });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sessionId }: { sessionId: string; instructorId: string }) => deleteSession(sessionId),
    onMutate: async ({ sessionId, instructorId }) => {
      await queryClient.cancelQueries({ queryKey: ["sessions-instructor-", instructorId] });

      const previous = queryClient.getQueryData<Session[]>(["sessions-instructor-", instructorId]);

      queryClient.setQueryData<Session[]>(["sessions-instructor-", instructorId], (old) =>
        old?.filter((session) => session.id !== sessionId)
      );

      return { previous };
    },
    onError: (_err, variables, context) => {
      const { instructorId } = variables;
      if (context?.previous) {
        queryClient.setQueryData(["sessions-instructor-", instructorId], context.previous);
      }
    },
    onSuccess: (_data, variables) => {
      const { instructorId } = variables;
      queryClient.invalidateQueries({ queryKey: ["sessions-instructor-", instructorId] });
    },
  });
}