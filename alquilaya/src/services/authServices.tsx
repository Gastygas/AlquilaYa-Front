import { IUser } from "@/Interfaces/IUser";

export const loginService = async (url: string, data: IUser ) => {    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
        });
    return await response.json();
};

export const registerService = async (url: string, data: IUser ) => { 
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};