import { Document } from "mongodb";

import { getCollection } from "../config/dbConfig";

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
  name: string;
  email: string;
  password: string;
  address: TheaterAddress;
  owner: TheaterOwner;
}

export const users = getCollection<Theater>("theaters");
