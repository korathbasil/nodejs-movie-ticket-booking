import { Document } from "mongodb";

import { getCollection } from "../config/dbConfig";

export class Movie implements Document {
  title: string;
  runtimeInMinutes: number;
}

export const movieCollection = getCollection<Movie>("movies")!;
