import { Instructor, User, UserRide } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInstructorBio, getInstructors, getUserById, getUserRides, updateUser } from "../services/users.api";

export function useGetUserById(id: string) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id
  })
}

export function useGetInstructors() {
  return useQuery<Instructor[]>({
    queryKey: ["instructors"],
    queryFn: () => getInstructors()
  })
}

export function useGetInstructorBio(id: string) {
  return useQuery<Instructor>({
    queryKey: ["instructor-bio", id],
    queryFn: () => getInstructorBio(id),
    enabled: !!id,
  });
}

export function useUpdateInstructorBio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bio: string) => updateUser(bio),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
  });
}

export function useGetUserRides() {
  return useQuery<UserRide[]>({
    queryKey: ["user-rides-me"],
    queryFn: () => getUserRides()
  })
}