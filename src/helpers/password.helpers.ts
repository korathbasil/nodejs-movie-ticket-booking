import { hash } from "bcrypt";

export default {
  hashPassword: async (password: string) => {
    const SALT = 10;
    const hashedPAssword = await hash(password, SALT);
    return hashedPAssword;
  },
};
