export type Role = "USER" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";

export type RideType = "NORMAL" | "EVENT" | "INTRO";

export interface User {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    firstName: string;
    lastName: string;
    role: Role;
    dateOfBirth: Date;
    shoeSize: number;
    createdAt: Date;
    updatedAt: Date;
    instructorProfile?: InstructorProfile;
}

export interface Ride {
    id: string;
    theme?: string;
    startAt: string;
    endAt: string;
    description?: string;
    rideType: RideType;
    tokenPriceUnits: number;
    instructor: Instructor;
    studio: Studio;
    availableSpots: number;
}

export interface CreateRideInput {
    theme?: string;
    startAt: string;
    endAt: string;
    description?: string;
    instructorId: string;
    studioId: string;
    rideType: RideType;
}

export type UpdateRideInput = Partial<{
    name?: string;
    startAt?: string;
    endAt?: string;
    description?: string;
    instructor?: Instructor;
    studioId?: string;
}>

export interface InstructorProfile {
    id: string;
    bio?: string;
    spotifyLink?: string;
    image?: string;
}

export type UpdateUserInput = {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    shoeSize?: number;
    bio?: string;
    spotifyLink?: string;
};

export interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    instructorProfile?: InstructorProfile;
}

export interface Bike {
    id: string;
    bikeNumber: number;
}

export interface Booking {
    id: string;
    userId: string;
    rideId: string;
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

    ride: Ride;
    bike: Bike;
    user: User;
}

export interface CreateBookingInput {
    userId: string;
    rideId: string;
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

export type UserRide =
    | {
        rideId: string;
        startAt: string;
        endAt: string;
        theme?: string | null;
        rideType: RideType;
        instructor: string;
        studioName: string;
        status: "BOOKED";
        booking: {
            bookingId: string;
            bikeNumber: number;
        };
        waitlist: null;
    }
    | {
        rideId: string;
        startAt: string;
        endAt: string;
        theme?: string | null;
        rideType: RideType;
        instructor: string;
        studioName: string;
        status: "WAITLISTED";
        booking: null;
        waitlist: {
            position: number | null;
            status: "WAITING" | "NOTIFIED";
            reservedUntil: string | null;
        };
    };

export type RideTokens = {
    balance: number;
}