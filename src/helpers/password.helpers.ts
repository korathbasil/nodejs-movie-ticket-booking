import { hash, compare } from "bcrypt";

export const passwordHelpers = {
  hashPassword: async (password: string) => {
    const salt = "jibbrish";
    return hash(password, salt);
  },

  comparePassword: (
    password: string,
    encriptedPssword: string
  ): Promise<boolean> => {
    return compare(password, encriptedPssword);
  },
};
