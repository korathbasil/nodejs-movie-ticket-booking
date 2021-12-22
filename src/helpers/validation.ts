import { body } from "express-validator";

const formValidator = {
  isEmail: (fieldname: string) => {
    return body(fieldname).normalizeEmail().isEmail();
  },
};

export { formValidator };
