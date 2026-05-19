import { api } from "@/lib/api";
import { RideTokens } from "@/types/spinning.types";

export async function getRideTokensBalance(): Promise<RideTokens> {
    return api("/ride-token-transactions/balance")
}

export async function addRideTokens(payload: {amountUnits: number}) {
    return api("/ride-token-transactions/purchase", {
        method: "POST",
        body: JSON.stringify(payload)
    })
}