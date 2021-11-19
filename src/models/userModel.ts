import { Document } from "mongodb";

import { getCollection } from "../config/dbConfig";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}

export const users = getCollection<User>("user");
