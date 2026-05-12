import { User, UserRide } from "@/types/spinning.types";
import { useQuery } from "@tanstack/react-query";
import { getInstructors, getUserById, getUserRides } from "../services/users.api";

export function useGetUserById(id: string) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id
  })
}

export function useGetInstructors() {
  return useQuery<User[]>({
    queryKey: ["instructors"],
    queryFn: () => getInstructors()
  })
}

export function useGetUserRides() {
  return useQuery<UserRide[]>({
    queryKey: ["user-rides-me"],
    queryFn: () => getUserRides()
  })
}