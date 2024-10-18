export interface IProperty {
    id: string;     // Nuevo atributo para el identificador único
    name: string;
    adress: string;
    adressUrl: string;
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
    description: string;
    propertyStatus: string;
    photo: string;
    //bookings: Booking[];
    //specialprice: SpecialPrice[];
}

export default IProperty;
