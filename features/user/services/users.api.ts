import { api } from "@/lib/api";
import { Instructor, User, UserRide } from "@/types/spinning.types";

export async function getUserById(id: string): Promise<User> {
    return api(`/users/${id}`);
}

export async function getInstructors(): Promise<Instructor[]> {
    return api("/users/instructors");
}

export async function getInstructorBio(id: string): Promise<Instructor> {
    return api(`/users/instructors/${id}/bio`);
}

export async function updateUser(bio: string): Promise<void> {
    return api("/users/me", {
        method: "PATCH",
        body: JSON.stringify({ bio }),
    });
}

export async function getUserRides(): Promise<UserRide[]> {
    return api("/users/rides/me");
}