import { api } from "@/lib/api";
import { Booking, CreateBookingInput, UpdateBookingInput } from "@/types/spinning.types";

export async function getBookings(): Promise<Booking[]> {
    return api("/bookings");
}

export async function getBookingsForUser(id: string): Promise<Booking[]> {
    return api(`/bookings?userId=${id}`);
}

export async function getBookingById(id: string): Promise<Booking> {
    return api(`/bookings/${id}`);
}

export async function createBooking(bookingData: CreateBookingInput): Promise<Booking> {
    return api("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
    });
}

export async function updateBooking(id: string, bookingData: Partial<UpdateBookingInput>): Promise<Booking> {
    return api(`/bookings/${id}`, {
        method: "PATCH",
        body: JSON.stringify(bookingData),
    })
}

export async function deleteBooking(id: string): Promise<void> {
    return api(`/bookings/${id}`, {
        method: 'DELETE'
    })
}