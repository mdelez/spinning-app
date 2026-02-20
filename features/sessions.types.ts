export interface Session {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  description: string;
  instructor: Instructor;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
}