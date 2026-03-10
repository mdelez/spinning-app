import { api } from "@/lib/api";
import { Bike, Booking, CreateRideInput, Ride, UpdateRideInput } from "@/types/spinning.types";

export async function getGetRides(params?: { instructorId: string }): Promise<Ride[]> {
  if (!params) {
    return api("/rides");
  } else {
    return api(`/rides?instructorId=${params.instructorId}`)
  }
}

export async function getRideById(id: string): Promise<Ride> {
  return api(`/rides/${id}`);
}

export async function getRideBookings(id: string): Promise<Booking[]> {
  return api(`/rides/${id}/bookings`);
}

export async function getAvailableBikeForRideById(id: string): Promise<Bike[]> {
  return api(`/rides/${id}/available-bikes`);
}

export async function createRide(rideData: CreateRideInput): Promise<Ride> {
  return api("/rides", {
    method: "POST",
    body: JSON.stringify(rideData),
  });
}

export async function updateRide(id: string, rideData: UpdateRideInput): Promise<Ride> {
  return api(`/rides/${id}`, {
    method: "PATCH",
    body: JSON.stringify(rideData),
  });
}

export async function deleteRide(id: string): Promise<void> {
  return api(`/rides/${id}`, {
    method: "DELETE",
  })
}