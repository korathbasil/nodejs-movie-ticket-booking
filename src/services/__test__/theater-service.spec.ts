import { TheaterService } from "../theater.service";

describe("Theater Service", () => {
  const newTheaterData = {
    name: "SATHYAM THEATERS",
    email: "sathyam@email.com",
    phone: "9876543210",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600014",
    ownerName: "Jason Sathya",
    ownerEmail: "jason@email.com",
    ownerPhone: "9876787654",
  };
  describe("addTheater", () => {
    it("adds a theater", async () => {
      const newDocRef = await TheaterService.addTheater(newTheaterData);

      expect(newDocRef).toHaveProperty("insertedId");
    });
  });
});
