import { Document } from "mongodb";

export class Movie implements Document {
  title: string;
  year: number;
  runtimeInMinutes: number;
}
