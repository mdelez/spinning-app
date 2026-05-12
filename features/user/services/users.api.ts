import { api } from "@/lib/api";
import { User, UserRide } from "@/types/spinning.types";

export async function getUserById(id: string): Promise<User> {
    return api(`/users/${id}`);
}

export async function getInstructors(): Promise<User[]> {
    return api("/users/instructors");
}

export async function getUserRides(): Promise<UserRide[]> {
    return api("/users/rides/me");
}