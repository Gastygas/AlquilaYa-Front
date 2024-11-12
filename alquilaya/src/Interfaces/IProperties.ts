import { IUser } from "./IUser";

export interface IProperty {
    id: string;     // Nuevo atributo para el identificador único
    propertyName: string;
    address: string;
    addressUrl: string;
    bill: string;
    country: string;
    city: string;
    price: number;
    capacity: number;
    bedrooms: number;
    bathrooms: number;
    wifi: boolean;
    petFriendly: boolean;
    airConditioning: boolean;
    heating: boolean;
    pool: boolean;
    parking: boolean;
    streaming: boolean;
    yard: boolean;
    grill: boolean;
    appliance: boolean;
    cleaningService: boolean;
    catering: boolean;
    description: string;
    propertyStatus: "pending" | "cancelled" | "maintenance" | "approved";
    photos: string [];
    lat: string;
    lng: string;
    //bookings: Booking[];
    //specialprice: SpecialPrice[];
    user:IUser
}

export default IProperty;
