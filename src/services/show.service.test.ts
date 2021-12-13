import showService from "./show.service";

describe("Show service", () => {
  test("addShow adds a show", async () => {
    const id = await showService.addShow({ time: new Date() });

    console.log(id);
  });
});
