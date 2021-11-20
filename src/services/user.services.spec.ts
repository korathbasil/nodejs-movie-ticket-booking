import { userServices } from "../services";
import { connectToDatabase } from "../config/dbConfig";
import { AnyError, Db } from "mongodb";

describe("User Services", () => {
  connectToDatabase((err: AnyError | undefined, _: Db | null) => {
    if (err) console.log(err);
  });
  describe("signup", async () => {
    const signup = userServices.signup;
    it("returns Promise<ObjectId>", async () => {
      const newUser = {
        name: "James",
        email: "james@email.com",
        password: "123",
      };
      const newUserId = await signup(newUser);
      expect(newUserId).toBe(true);
    });
  });
});
