import { hash, compare } from "bcrypt";

export const passwordHelpers = {
  hashPassword: async (password: string, salt: number | string = 10) => {
    return hash(password, salt);
  },

  comparePassword: (
    password: string,
    encriptedPssword: string
  ): Promise<boolean> => {
    return compare(password, encriptedPssword);
  },
};
