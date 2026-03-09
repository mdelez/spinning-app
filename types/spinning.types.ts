export type Role = "USER" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";

export type RideType = "NORMAL" | "EVENT" | "INTRO";

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
  theme?: string;
  startAt: string;
  endAt: string;
  description?: string;
  rideType: RideType;
  tokenPrice: number;
  instructor: Instructor;
  studio: Studio;
}

export interface CreateSessionInput {
  theme?: string;
  startAt: string;
  endAt: string;
  description?: string;
  instructorId: string;
  studioId: string;
  rideType: RideType;
  tokenPrice?: number;
}

export type UpdateSessionInput = Partial<{
  name?: string;
  startAt?: string;
  endAt?: string;
  description?: string;
  instructor?: Instructor;
  studioId?: string;
}>

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

  checkedIn: boolean;
  checkedInAt?: string;
  checkedInBy?: string;
  checkedOutAt?: string;
  checkedOutBy?: string;

  friendEmail?: string;
  friendName?: string;
  friendShoeSize?: number;
  friendWaiverSigned?: boolean;

  paid: boolean;
  createdAt: string;

  session: Session;
  bike: Bike;
  user: User;
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

export interface Studio {
  id: string;
  name: string;
}