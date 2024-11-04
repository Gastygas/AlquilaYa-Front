import { IChangePassword } from "@/Interfaces/IChangePassword";
import { IUser } from "@/Interfaces/IUser";
import { IUserLogin } from "@/Interfaces/IUserLogin";

export const loginService = async (url: string, data: IUserLogin ) => {    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
        });
    return await response.json();
};

export const registerService = async (url: string, data: Partial<IUser>) => { 
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};

export const forgotPasswordService = async(url:string) =>{
    const response = await fetch(url, {
        method: "GET",
    });
    return await response.json();
}

export const changePasswordService = async (url: string, data:IChangePassword) => {    
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify(data)
        });
    return await response.json();
};