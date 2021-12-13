import { hash, compare } from "bcrypt";

export default {
  hashPassword: async (password: string, salt: number = 10) => {
    const hashedPAssword = await hash(password, salt);
    return hashedPAssword;
  },

  comparePassword: (
    password: string,
    encruptedPssword: string
  ): Promise<boolean> => {
    return compare(password, encruptedPssword);
  },
};
