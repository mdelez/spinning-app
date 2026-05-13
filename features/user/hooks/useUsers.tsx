import { Instructor, UpdateUserInput, User, UserRide } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInstructor, getInstructors, getUserById, getUserRides, updateUser } from "../services/users.api";

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

export function useGetInstructor(id: string) {
  return useQuery<Instructor>({
    queryKey: ["instructor", id],
    queryFn: () => getInstructor(id),
    enabled: !!id,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateUserInput) => updateUser(input),
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