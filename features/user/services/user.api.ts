import { api } from "@/lib/api";
import { User } from "@/types/spinning.types";

export async function getUserById(id: string): Promise<User> {
    return api(`/users/${id}`);
}