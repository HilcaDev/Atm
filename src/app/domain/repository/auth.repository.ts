import { IUser } from "src/app/auth/interfaces/auth.interface";

export interface IAuthRepository {
  validation(username:string, password:string):boolean;
  verifyAuthentication():boolean;
  logout():void;
}
