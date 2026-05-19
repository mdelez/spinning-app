import { Bike, Booking, Ride, UpdateRideInput } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createRide, deleteRide, getAvailableBikeForRideById, getGetRides, getRideBookings, getRideById, updateRide } from "../services/rides.api";

// TODO: fix query keys
export function useGetRides(params?: { instructorId: string }) {
  const queryKey = params?.instructorId? `rides-instructor-${params.instructorId}` : "rides";
  return useQuery<Ride[]>({
    queryKey: [queryKey],
    queryFn: () => getGetRides(params),
  });
}

export function useGetRide(id: string) {
  return useQuery<Ride>({
    queryKey: ["ride", id],
    queryFn: () => getRideById(id),
    enabled: !!id, // only run if id exists
  });
}

export function useGetRideBookings(id: string) {
  const queryKey = `ride-${id}-bookings`;
  return useQuery<Booking[]>({
    queryKey: [queryKey],
    queryFn: () => getRideBookings(id),
    enabled: !!id
  });
}

export function useGetAvailableBikesForRide(id: string) {
  return useQuery<Bike[]>({
    queryKey: ["ride-", id, "-available-bikes"],
    queryFn: () => getAvailableBikeForRideById(id),
    enabled: !!id, // only run if id exists
  });
}

export function useCreateRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRide,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['rides-instructor-', data.instructor.id]
      })
    }
  })
}

export function useUpdateRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: UpdateRideInput }) => updateRide(id, updateData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['rides-instructor-', data.instructor.id]
      });
    },
  });
}

export function useDeleteRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rideId }: { rideId: string; instructorId: string }) => deleteRide(rideId),
    onMutate: async ({ rideId, instructorId }) => {
      await queryClient.cancelQueries({ queryKey: ["rides-instructor-", instructorId] });

      const previous = queryClient.getQueryData<Ride[]>(["rides-instructor-", instructorId]);

      queryClient.setQueryData<Ride[]>(["rides-instructor-", instructorId], (old) =>
        old?.filter((ride) => ride.id !== rideId)
      );

      return { previous };
    },
    onError: (_err, variables, context) => {
      const { instructorId } = variables;
      if (context?.previous) {
        queryClient.setQueryData(["rides-instructor-", instructorId], context.previous);
      }
    },
    onSuccess: (_data, variables) => {
      const { instructorId } = variables;
      queryClient.invalidateQueries({ queryKey: ["rides-instructor-", instructorId] });
    },
  });
}