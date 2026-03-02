export type Role = "USER" | "INSTRUCTOR" | "ADMIN";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  dateOfBirth: Date;
  shoeSize: number;
}

export interface Session {
  id: string;
  name: string;
  startAt: string;
  endAt: string;
  description: string;
  instructor: Instructor;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Bike {
  id: string;
  bikeNumber: number;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  bikeId: string;

  friendEmail?: string;
  friendName?: string;
  friendShoeSize?: number;
  friendWaiverSigned?: boolean;

  paid: boolean;
  createdAt: string;

  session: Session;
  bike: Bike;
}

export interface CreateBookingInput {
  userId: string;
  sessionId: string;
  userBikeId: string;
  paid: boolean;

  friendEmail?: string;
  friendName?: string;
  friendShoeSize?: number;
  friendWaiverSigned?: boolean;
}

export type UpdateBookingInput = Partial<{
  bikeId: string;
  friendEmail?: string;
  friendName?: string;
  friendShoeSize?: number;
  friendWaiverSigned?: boolean;
  paid?: boolean;
}>;