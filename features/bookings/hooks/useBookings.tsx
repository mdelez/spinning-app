import { Booking } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBooking, getBookingsForUser } from "../services/bookings.api";

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
        queryKey: ["bookings-user", data.userId],
      });
    },
  });
}