import { userServices } from "../services";
import { connectToDatabase } from "../config/dbConfig";

jest.setTimeout(10000);

beforeEach(async () => {
  await connectToDatabase();
});

describe("User Services", () => {
  describe("signup", () => {
    const signup = userServices.signup;
    it("returns Promise<ObjectId>", async () => {
      const newUser = {
        name: "James",
        email: "james@email.com",
        password: "123",
      };
      const newUserId = await signup(newUser);
      console.log(newUserId);
      expect(newUserId).toBe(true);
    });
  });
});
