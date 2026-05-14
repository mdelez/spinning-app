import { RideTokens } from "@/types/spinning.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRideTokens, getRideTokensBalance } from "../api/rideTokens.api";

export function useGetRideTokensBalance() {
    return useQuery<RideTokens>({
        queryKey: ["ride-tokens-user"],
        queryFn: () => getRideTokensBalance()
    })
}

export function useAddRideTokens() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { amountUnits: number}) => addRideTokens(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["ride-tokens-user"]
            })
        }
    })
}