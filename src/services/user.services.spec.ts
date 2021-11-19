import { userServices } from "../services";

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
      expect(newUserId).toBe(true);
    });
  });
});
