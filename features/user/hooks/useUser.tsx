import { User } from "@/types/spinning.types";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/user.api";

export function useGetUserById(id: string) {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id
  })
}