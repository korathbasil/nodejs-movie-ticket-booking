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

  public static signup(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return new Promise<ObjectId>(async (resolve, reject) => {
      const admins = await this.isAdminAlraedyExists();
      if (admins) return reject("Admin already exists");

      const hashedPassword = await passwordHelpers.hashPassword(data.password);
      const newAdmin = {
        ...data,
        password: hashedPassword,
      };
      const newAdminDocDetails = await adminCollection.insertOne(newAdmin);
      return resolve(newAdminDocDetails.insertedId);
    });
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
