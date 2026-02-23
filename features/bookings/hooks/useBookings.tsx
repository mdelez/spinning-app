import { Booking } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, deleteBooking, getBookingById, getBookingsForUser } from "../services/bookings.api";

export function useBookingById(id: string) {
  return useQuery<Booking>({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
    enabled: !!id
  })
}

export function useBookingsForUser(id: string) {
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