import { api } from "@/lib/api";
import { Studio } from "@/types/spinning.types";

export async function getGetStudios(): Promise<Studio[]> {
    return api("/studios");
}

export async function getStudioById(id: string): Promise<Studio> {
    return api(`/studios/${id}`);
}