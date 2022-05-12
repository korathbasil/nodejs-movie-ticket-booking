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
      user?: UserSession;
    };
  }
}

interface IAdminSession {
  email: string;
}

type UserSession = {
  _id: string;
  name: string;
  email: string;
};
