import { hash, compare } from "bcrypt";

export default {
  hashPassword: async (password: string) => {
    const SALT = 10;
    const hashedPAssword = await hash(password, SALT);
    return hashedPAssword;
  },

  comparePassword: (
    password: string,
    encruptedPssword: string
  ): Promise<boolean> => {
    return compare(password, encruptedPssword);
  },
};
