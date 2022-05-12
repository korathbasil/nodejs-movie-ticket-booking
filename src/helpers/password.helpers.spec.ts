import { compare } from "bcrypt";

import { passwordHelpers } from "./password.helpers";

describe("Password helpers", () => {
  describe("hashPassword", () => {
    it("returns hashed password as a string", async () => {
      const password = "1234567890";

      const hashedPssword = await passwordHelpers.hashPassword(password);
      expect(typeof hashedPssword).toBe("string");
    });

    it("gives correct hashed string", async () => {
      const password = "1234567890";

      const hashedPssword = await passwordHelpers.hashPassword(password);
      const passwordsMath = await compare(password, hashedPssword);

      expect(passwordsMath).toBe(true);
    });
  });

  describe("comparePassword", () => {
    it("returns false for unmatching password", async () => {
      const password = "1234567890";

      const hashedPssword = await passwordHelpers.hashPassword(password);

      const passwordsMatch = await passwordHelpers.comparePassword(
        "12345",
        hashedPssword
      );

      expect(passwordsMatch).toBe(false);
    });

    it("returns true for matching password", async () => {
      const password = "1234567890";

      const hashedPssword = await passwordHelpers.hashPassword(password);

      const passwordsMatch = await passwordHelpers.comparePassword(
        password,
        hashedPssword
      );

      expect(passwordsMatch).toBe(true);
    });
  });
});
