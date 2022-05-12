import { Document } from "mongodb";

export class Ticket implements Document {
  show: string;
  seats: number;
}
