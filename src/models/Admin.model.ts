import { Document } from "mongodb";

export class Admin implements Document {
  name: string;
  email: string;
  password?: string;
}
