// declare global {
//   namespace Express {
//     interface Request {
//       user?: any;
//       session?: any;
//       files?: any;
//     }
//   }
// }

declare namespace Express {
  interface Request {
    user?: any;
    session?: any;
    files?: any;
    flash?: any;
    session: {
      admin?: IAdminSession;
    };
  }
}

interface IAdminSession {
  email: string;
}
