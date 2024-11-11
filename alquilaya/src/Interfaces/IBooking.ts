import { IPayments } from "./IPayments";
import IProperty from "./IProperties";

export interface IBooking {
    id: string;
    propertyId: string;
    dateStart: string;
    dateEnd: string;
    price: number;
    status: string;
    user: string;
    payment : IPayments
    property: IProperty
}