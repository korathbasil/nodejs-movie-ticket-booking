import { ObjectId } from "mongodb";

import { Admin } from "../models";
import { getCollection } from "../config/dbConfig";
import { passwordHelpers } from "../helpers";

export class AdminService {
  public static async isAdminAlraedyExists(): Promise<boolean> {
    const adminCollection = getCollection<Admin>("admin")!;

    const admin = await adminCollection.find().toArray();
    console.log("!!!" + admin);
    if (admin && admin.length !== 0) return true;
    return false;
  }

  public static async getADminById(id: string): Promise<Admin | null> {
    const adminCollection = getCollection<Admin>("admin")!;

    return adminCollection.findOne({ _id: new ObjectId(id) });
  }

  public static async signup(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<ObjectId> {
    const adminCollection = getCollection<Admin>("admin")!;

    const admins = await this.isAdminAlraedyExists();
    if (admins) throw new Error("Admin alrready exists");

    const hashedPassword = await passwordHelpers.hashPassword(data.password);
    const newAdmin = {
      ...data,
      password: hashedPassword,
    };
    const newAdminDocDetails = await adminCollection.insertOne(newAdmin);
    return newAdminDocDetails.insertedId;
  }

  public static async login(data: {
    email: string;
    password: string;
  }): Promise<Admin> {
    const adminCollection = getCollection<Admin>("admin")!;

    const selectedDoc = await adminCollection.findOne({ email: data.email });

    if (!selectedDoc) throw new Error("Admin not found");
    if (!selectedDoc.password) throw new Error("Admin credentials not set");

    const isPasswordTrue = await passwordHelpers.comparePassword(
      data.password,
      selectedDoc.password
    );

    if (!isPasswordTrue) throw new Error("Incorrect password");

    const { password, ...admin } = selectedDoc;

    return admin;
  }
}
