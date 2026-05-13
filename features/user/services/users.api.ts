import { api } from "@/lib/api";
import { Instructor, UpdateUserInput, User, UserRide } from "@/types/spinning.types";

export async function getUserById(id: string): Promise<User> {
    return api(`/users/${id}`);
}

export async function getInstructors(): Promise<Instructor[]> {
    return api("/users/instructors");
}

export async function getInstructor(id: string): Promise<Instructor> {
    return api(`/users/instructors/${id}`);
}

export async function getMe(): Promise<User> {
    console.log('HELLO');
    return api("/users/me");
}

export async function updateUser(input: UpdateUserInput): Promise<void> {
    console.log('input: ', input);
    return api("/users/me", {
        method: "PATCH",
        body: JSON.stringify(input),
    });
}

export async function getUserRides(): Promise<UserRide[]> {
    return api("/users/rides/me");
}