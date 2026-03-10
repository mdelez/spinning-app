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

export function useCheckInUser(rideId: string) {
  const queryClient = useQueryClient();
  const queryKey = [`ride-${rideId}-bookings`];

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