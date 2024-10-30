import IProperty from "./IProperties";

export interface IUser{
    id: string,
    name:string,
    surname:string,
    dni:string,
    country:string,
    address: string,
    phone:string,
    email:string,
    password:string,
    isAdmin: boolean,
    properties: IProperty[]; 
}