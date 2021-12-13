import { ObjectId } from "mongodb";

import { getCollection } from "../config/dbConfig";
import { passwordHelpers } from "helpers";
import { Admin } from "../models";

const adminCollection = getCollection<Admin>("admin")!;

export class AdminServices {
  public static async isAdminAlraedyExists(): Promise<boolean> {
    const admin = await adminCollection.find().toArray();
    if (admin.length === 0) return false;
    return true;
  }

  public static async getADminById(id: string): Promise<Admin | null> {
    return adminCollection.findOne({ _id: new ObjectId(id) });
  }

  public static async signup(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const admins = await this.isAdminAlraedyExists();

    if (admins && admins.length === 0) return undefined;

    const hashedPassword = await passwordHelpers.hashPassword(
      data.password,
      10
    );
    const newAdmin = {
      ...data,
      password: hashedPassword,
    };

    return adminCollection.insertOne(newAdmin);
  }

  public static async login(data: { email: string; password: string }) {
    const selectedUser = await adminCollection.findOne({ email: data.email });

    if (!selectedUser) return;

    const isPasswordTrue = await passwordHelpers.comparePassword(
      data.password,
      selectedUser.password!
    );

    if (!isPasswordTrue) return null;

    return selectedUser;
  }
}
