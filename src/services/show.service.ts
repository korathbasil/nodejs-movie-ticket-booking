import { getCollection } from "../config/dbConfig";
import collections from "../config/collections";
import { Show } from "../models/Show.model";

const showCollection = getCollection<Show>(collections.SHOWS)!;

export default class ShowCollection {
  public static async addShow(showDetails: { time: Date }) {
    return showCollection.insertOne(showDetails);
  }
}

//   addShow: (screenId, showDetails) => {
//     return new Promise(async (resolve, reject) => {
//       showDetails.movie = ObjectID(showDetails.movie);
//       const screen = await db
//         .getDb()
//         .collection(collections.SCREEN_COLLECTION)
//         .findOne({ _id: ObjectID(screenId) });
//       const vipSeats = new Array();
//       const premiumSeats = new Array();
//       const executiveSeats = new Array();
//       const normalSeats = new Array();
//       // No of seats
//       const rowSeats = parseInt(screen.rowSeats);
//       const vip = parseInt(screen.vip);
//       const premium = parseInt(screen.premium);
//       const executive = parseInt(screen.executive);
//       const normal = parseInt(screen.normal);
//       const lettersArray = [
//         "A",
//         "B",
//         "C",
//         "D",
//         "E",
//         "F",
//         "G",
//         "H",
//         "I",
//         "J",
//         "K",
//         "L",
//         "M",
//         "N",
//         "O",
//         "P",
//         "Q",
//         "R",
//         "S",
//         "T",
//         "U",
//         "V",
//         "W",
//         "X",
//         "Y",
//         "Z",
//         "AA",
//         "AB",
//         "AC",
//         "AD",
//         "AE",
//         "AF",
//         "AG",
//         "AH",
//         "AI",
//         "AJ",
//         "AK",
//         "AL",
//         "AM",
//         "AN",
//         "AO",
//         "AP",
//         "AQ",
//         "AR",
//         "AS",
//         "AT",
//         "AU",
//         "AV",
//         "AW",
//         "AX",
//         "AY",
//         "AZ",
//       ];
//       const numbersArray = [
//         1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
//         21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
//         39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
//         57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74,
//         75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92,
//         93, 94, 95, 96, 97, 98, 99, 100,
//       ];
//       // Creating VIP seats
//       for (let i = 0; i < vip; i++) {
//         vipSeats.push(new Array());
//       }
//       for (i = 0; i < vip; i++) {
//         for (let j = 0; j < rowSeats; j++) {
//           vipSeats[i][j] = {
//             seatId: lettersArray[i] + numbersArray[j],
//             booked: false,
//           };
//         }
//       }
//       // console.log(vipSeats);
//       // Creating Premium seats
//       for (i = vip; i < premium + vip; i++) {
//         premiumSeats.push(new Array());
//       }
//       for (i = vip; i < premium + vip; i++) {
//         for (j = 0; j < rowSeats; j++) {
//           premiumSeats[i - vip][j] = {
//             seatId: lettersArray[i] + numbersArray[j],
//             booked: false,
//           };
//         }
//       }
//       // console.log(premiumSeats);
//       // Creating Executive seats
//       for (i = vip + premium; i < vip + premium + executive; i++) {
//         executiveSeats.push(new Array());
//       }
//       for (i = vip + premium; i < premium + vip + executive; i++) {
//         for (j = 0; j < rowSeats; j++) {
//           executiveSeats[i - (vip + premium)][j] = {
//             seatId: lettersArray[i] + numbersArray[j],
//             booked: false,
//           };
//         }
//       }
//       // console.log(executiveSeats);
//       // Creating Normal seats
//       for (
//         i = vip + premium + executive;
//         i < premium + vip + executive + normal;
//         i++
//       ) {
//         normalSeats.push(new Array());
//       }
//       for (
//         i = vip + premium + executive;
//         i < premium + vip + executive + normal;
//         i++
//       ) {
//         for (j = 0; j < rowSeats; j++) {
//           normalSeats[i - (vip + premium + executive)][j] = {
//             seatId: lettersArray[i] + numbersArray[j],
//             booked: false,
//           };
//         }
//       }
//       // console.log(normalSeats);
//       showDetails.vipSeats = vipSeats;
//       showDetails.premiumSeats = premiumSeats;
//       showDetails.executiveSeats = executiveSeats;
//       showDetails.normalSeats = normalSeats;
//       // Adding show to Show collection
//       db.getDb()
//         .collection(collections.SHOW_COLLECTION)
//         .insertOne(showDetails)
//         .then((data) => {
//           db.getDb()
//             .collection(collections.SCREEN_COLLECTION)
//             .updateOne(
//               { _id: ObjectID(screenId) },
//               {
//                 $push: { shows: ObjectID(data.ops[0]._id) },
//               }
//             )
//             .then(() => resolve());
//         });
//     });
//   },
