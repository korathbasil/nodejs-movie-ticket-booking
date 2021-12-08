import { hash } from "bcrypt";
import { getCollection } from "config/dbConfig";
import { passwordHelpers } from "helpers";
import { Admin } from "models/adminModel";
const db = require("../config/dbConfig");
const collections = require("../config/collections");
const { ObjectID } = require("mongodb");

const adminCollection = getCollection<Admin>("admin");

export class AdminServices {
  public static isAdminAlraedyExists(): Promise<Admin[]> | undefined {
    return adminCollection?.find().toArray();
  }

  public static async getADminById(
    id: string
  ): Promise<Admin | null | undefined> {
    return adminCollection?.findOne({ _id: ObjectID(id) });
  }

  public static async signup(data: {
    name: string;
    email: string;
    password: string;
  }) {
    const admins = await this.isAdminAlraedyExists();

    if (admins && admins.length === 0) return undefined;

    const hashedPassword = await hash(data.password, 10);
    const newAdmin = {
      ...data,
      password: hashedPassword,
    };

    return adminCollection?.insertOne(newAdmin);
  }

  public static async login(data: { email: string; password: string }) {
    const selectedUser = await adminCollection?.findOne({ email: data.email });

    if (!selectedUser) return;

    const isPasswordTrue = await passwordHelpers.comparePassword(
      data.password,
      selectedUser.password!
    );

    if (!isPasswordTrue) return null;

    return selectedUser;
  }

  public static async getAllTheaters() {}

  public static async addTheater() {}

  public static async getTheater() {}

  public static async editTheater() {}

  public static async deleteTheater() {}
}
