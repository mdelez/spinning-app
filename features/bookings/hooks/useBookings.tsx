import { Booking } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as SecureStore from 'expo-secure-store';
import { checkInUserByBookingId, createBooking, deleteBooking, getBookingById, getBookingsForUser } from "../services/bookings.api";

export function useGetBookingById(id: string) {
  return useQuery<Booking>({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
    enabled: !!id
  })
}

export function useGetBookingsForUser(id: string) {
  return useQuery<Booking[]>({
    queryKey: ["bookings-user", id],
    queryFn: () => getBookingsForUser(id),
    enabled: !!id
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      // invalidate bookings for that user
      queryClient.invalidateQueries({
        queryKey: ["bookings-user", data[0].userId],
      });
    },
  });
}

export function useCheckInUser(sessionId: string) {
  const queryClient = useQueryClient();
  const queryKey = [`session-${sessionId}-bookings`];

  return useMutation({
    mutationFn: ({ bookingId }: { bookingId: string }) =>
      checkInUserByBookingId(bookingId),

    onMutate: async ({ bookingId }) => {
      await queryClient.cancelQueries({ queryKey });

      const previousBookings = queryClient.getQueryData<Booking[]>(queryKey);

      // get current user from storage
      const stored = await SecureStore.getItemAsync("auth-token");
      const currentUser = stored ? JSON.parse(stored) : { id: "unknown" };

      queryClient.setQueryData<Booking[]>(queryKey, old =>
        old?.map(b => {
          if (b.id !== bookingId) return b;

          if (!b.checkedIn) {
            // check in
            return {
              ...b,
              checkedIn: true,
              checkedInAt: new Date().toISOString(),
              checkedInBy: currentUser.id,
              checkedOutAt: undefined,
              checkedOutBy: undefined,
            };
          } else {
            // check out
            return {
              ...b,
              checkedIn: false,
              checkedInAt: undefined,
              checkedInBy: undefined,
              checkedOutAt: new Date().toISOString(),
              checkedOutBy: currentUser.id,
            };
          }
        })
      );

      return { previousBookings };
    },

    onError: (_err, _variables, context: any) => {
      if (context?.previousBookings) {
        queryClient.setQueryData(queryKey, context.previousBookings);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

// export function useCheckInUser(sessionId: string) {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ bookingId }: { bookingId: string }) =>
//       checkInUserByBookingId(bookingId),

//     onMutate: async ({ bookingId }) => {
//       await queryClient.cancelQueries({ queryKey: ["booking", bookingId] });
//       await queryClient.cancelQueries({ queryKey: [`session-${sessionId}-bookings`] });

//       // snapshot previous data
//       const previousBooking = queryClient.getQueryData<Booking>(["booking", bookingId]);
//       const previousBookings = queryClient.getQueryData<Booking[]>([`session-${sessionId}-bookings`]);

//       const stored = await SecureStore.getItemAsync("auth-token");
//       const currentUser = stored ? JSON.parse(stored) : { id: "unknown" };

//       // optimistically update single booking cache
//       queryClient.setQueryData<Booking>(["booking", bookingId], old =>
//         old
//           ? {
//             ...old,
//             checkedIn: !old.checkedIn,
//             checkedInAt: !old.checkedIn ? new Date().toISOString() : undefined,
//             checkedInBy: !old.checkedIn ? currentUser.id : undefined,
//             checkedOutAt: old.checkedIn ? new Date().toISOString() : undefined,
//             checkedOutBy: old.checkedIn ? currentUser.id : undefined,
//           }
//           : old
//       );

//       // optimistically update session bookings list
//       queryClient.setQueryData<Booking[]>([`session-${sessionId}-bookings`], old =>
//         old?.map(b =>
//           b.id === bookingId
//             ? queryClient.getQueryData<Booking>(["booking", bookingId])!
//             : b
//         )
//       );

//       // return snapshots for rollback
//       return { previousBooking, previousBookings };
//     },

//     onError: (_err, variables, context: any) => {
//       const bookingId = variables.bookingId;
//       if (context?.previousBooking) {
//         queryClient.setQueryData(["booking", bookingId], context.previousBooking);
//       }
//       if (context?.previousBookings) {
//         queryClient.setQueryData([`session-${sessionId}-bookings`], context.previousBookings);
//       }
//     },

//     onSettled: (_data, _error, variables) => {
//       const bookingId = variables.bookingId;
//       queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
//       queryClient.invalidateQueries({ queryKey: [`session-${sessionId}-bookings`] });
//     },
//   });
// }

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId }: { bookingId: string; userId: string }) => deleteBooking(bookingId),
    onMutate: async ({ bookingId, userId }) => {
      await queryClient.cancelQueries({ queryKey: ["bookings-user", userId] });

      const previous = queryClient.getQueryData<Booking[]>(["bookings-user", userId]);

      queryClient.setQueryData<Booking[]>(["bookings-user", userId], (old) =>
        old?.filter((booking) => booking.id !== bookingId)
      );

      return { previous };
    },
    onError: (_err, variables, context) => {
      const { userId } = variables;
      if (context?.previous) {
        queryClient.setQueryData(["bookings-user", userId], context.previous);
      }
    },
    onSuccess: (_data, variables) => {
      const { userId } = variables;
      queryClient.invalidateQueries({ queryKey: ["bookings-user", userId] });
    },
  });
}