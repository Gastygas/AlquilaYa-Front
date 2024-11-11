export interface IPayments {
    id: string;
    method : string;
    date: Date
    amount: number;
    paymentStatus: string;
    transactionId: string;
    
}