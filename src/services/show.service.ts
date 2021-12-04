import { getCollection } from "config/dbConfig";
import { Show } from "models/Show.model";

const showCollection = getCollection<Show>("shows");

export class ShowCollection {
  public static async addShow() {}
}
