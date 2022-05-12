import { Document } from "mongodb";

export interface User extends Document {
  name: string;
  email: string;
  password: string;
}
