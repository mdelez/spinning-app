import { Studio } from "@/types/spinning.types";
import { useQuery } from "@tanstack/react-query";
import { getGetStudios, getStudioById } from "../services/studios.api";

export function useGetStudios() {
  return useQuery<Studio[]>({
    queryKey: ["studios"],
    queryFn: () => getGetStudios(),
  });
}

export function useGetStudio(id: string) {
  return useQuery<Studio>({
    queryKey: ["studio", id],
    queryFn: () => getStudioById(id),
    enabled: !!id,
  });
}