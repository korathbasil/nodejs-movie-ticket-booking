export {};

declare global {
  namespace Express {
    interface Request {
      user?: any;
      session: any;
      files: any;
    }
  }
}
