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