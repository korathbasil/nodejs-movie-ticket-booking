import { Document } from "mongodb";

type TheaterAddress = {
  city: string;
  state: string;
  pincode: string;
};

type TheaterOwner = {
  name: string;
  email: string;
  phone: string;
};

export class Theater implements Document {
  regNumber: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  address: TheaterAddress;
  owner: TheaterOwner;
}
