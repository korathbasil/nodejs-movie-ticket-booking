import app from "../app2";
import { connectToDatabase } from "../config/dbConfig";

import { admin } from "../models/adminModel";

describe("admin model", () => {
  test("creates a admin entry", async () => {
    app.listen(4000, () => console.log("App runnning on test server"));
    await connectToDatabase();
    const newAdmin = await admin?.insertOne({
      name: "Admin",
      email: "admin@email",
      password: "password",
    });

    expect(newAdmin?.insertedId).toBe(true);
  });
});
