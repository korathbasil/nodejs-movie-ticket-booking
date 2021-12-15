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

    return adminCollection?.findOne({ _id: new ObjectId(id) });
  }

  public static signup(data: {
    name: string;
    email: string;
    password: string;
  }) {
    return new Promise<ObjectId>(async (resolve, reject) => {
      const adminCollection = getCollection<Admin>("admin")!;

      const admins = await this.isAdminAlraedyExists();
      if (admins) return reject("Admin already exists");

      const hashedPassword = await passwordHelpers.hashPassword(data.password);
      const newAdmin = {
        ...data,
        password: hashedPassword,
      };
      const newAdminDocDetails = await adminCollection?.insertOne(newAdmin);
      return resolve(newAdminDocDetails.insertedId);
    });
  }

  public static login(data: { email: string; password: string }) {
    const adminCollection = getCollection<Admin>("admin")!;

    return new Promise<Admin>(async (resolve, reject) => {
      const selectedDoc = await adminCollection.findOne({ email: data.email });

      if (!selectedDoc) return reject("Admin not found");
      if (!selectedDoc.password) return reject("Admin credentials not set");

      const isPasswordTrue = await passwordHelpers.comparePassword(
        data.password,
        selectedDoc.password
      );

      if (!isPasswordTrue) return reject("Incorrect password");

      const { password, ...admin } = selectedDoc;

      return resolve(admin as Admin);
    });
  }
}
