import { Document } from "mongodb";

export class Screen implements Document {
  name: string;
  seats: Seat[];
  shows: string[];
}

type Seat = {};
