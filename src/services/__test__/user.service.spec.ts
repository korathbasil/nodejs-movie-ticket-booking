import { UserService } from "../user.service";

describe("User service", () => {
  describe("login", () => {
    it("registers user", async () => {
      const user = {
        name: "James Bond",
        email: "bond@email.com",
        password: "iambond",
      };
      const userDocRef = await UserService.signup(user);
      expect(typeof userDocRef).toBe("object");
    });

    it("doesn't registers same user twice", async () => {
      const user = {
        name: "James Bond",
        email: "bond@email.com",
        password: "iambond",
      };
      const userDocRef = await UserService.signup(user);
      expect(typeof userDocRef).toBe("object");
      const userDocRef2 = await UserService.signup(user);
      expect(typeof userDocRef2).toBe("undefined");
    });
  });
});
