import { Document } from "mongodb";

import { getCollection } from "config/dbConfig";

export class Admin implements Document {
  name: string;
  email: string;
  password?: string;
}

export const admin = getCollection<Admin>("admin");
