import { CreateSessionInput, RideType } from "./spinning.types";

export type SessionFormData = Omit<CreateSessionInput, "startAt" | "endAt"> & {
  startAt: Date;
  endAt: Date;
};

export const rideTypes: { label: string; value: RideType }[] = [
  { label: "Normal Ride", value: "NORMAL" },
  { label: "Event Ride", value: "EVENT" },
  { label: "Intro Ride", value: "INTRO" },
];