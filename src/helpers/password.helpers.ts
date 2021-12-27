import { hash, compare } from "bcrypt";

export const passwordHelpers = {
  hashPassword: async (password: string, salt: number = 10) => {
    const hashedPAssword = await hash(password, salt);
    return hashedPAssword;
  },

  comparePassword: (
    password: string,
    encriptedPssword: string
  ): Promise<boolean> => {
    return compare(password, encriptedPssword);
  },
};
