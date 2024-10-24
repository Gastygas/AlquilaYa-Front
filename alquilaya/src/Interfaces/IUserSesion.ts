import { IUser } from "./IUser";

export interface IUserSession     {
    login: boolean,
    user: IUser,
    token: string
  }
