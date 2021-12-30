import { UserService } from "../user.service";

describe("User service", () => {
  describe("signup", () => {
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

  describe("login", () => {
    it("doesn't login with wrong password", async () => {
      const user = {
        name: "James Bond",
        email: "bond@email.com",
        password: "iambond",
      };
      await UserService.signup(user);

      const isLoggedIn = await UserService.login({
        email: "bond@email.com",
        password: "iambon",
      });

      expect(isLoggedIn).toBe(false);
    });

    it("return undefined with invalid email", async () => {
      const isLoggedIn = await UserService.login({
        email: "bond@emil.com",
        password: "iambon",
      });

      expect(typeof isLoggedIn).toBe("undefined");
    });
  });
});
