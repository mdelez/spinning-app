import { CreateRideInput, RideType } from "./spinning.types";

export type RideFormData = Omit<CreateRideInput, "startAt" | "endAt"> & {
  startAt: Date;
  endAt: Date;
};

export const rideTypes: { label: string; value: RideType }[] = [
  { label: "Normal Ride", value: "NORMAL" },
  { label: "Event Ride", value: "EVENT" },
  { label: "Intro Ride", value: "INTRO" },
];