import { Document } from "mongodb";

import { getCollection } from "config/dbConfig";

interface User extends Document {
  name: string;
  email: string;
  password: string;
}

const users = getCollection<User>("user");

export default users;
