export const createProperty = async (url: string, data: any,token:any) => { 
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
};