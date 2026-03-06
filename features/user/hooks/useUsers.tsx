import { User } from "@/types/spinning.types";
import { useQuery } from "@tanstack/react-query";
import { getInstructors, getUserById } from "../services/users.api";

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