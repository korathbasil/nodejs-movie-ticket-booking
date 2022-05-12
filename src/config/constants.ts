import dotenv from "dotenv";

dotenv.config();

export const DB_CONNECTION_URL = "mongodb://localhost:27017";

export const NODE_ENV = process.env.NODE_ENV || "dev";
